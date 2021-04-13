const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { route } = require('../routes/hotel');

const { roles } = require("../roles");

////////////////  ROLE AUTH  ///////////////////////
exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "Du har ikke tilstrækkelig rettigheder"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
}


////////////////  ENCRYPTION  ///////////////////////
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


////////////////  REGISTRATION / LOGIN  ///////////////////////
exports.signup = async (req, res, next) => {
    try {
        const { email, password, role} = req.body // HUSK at body skal indeholde de tre keys
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "basic"});
        const accessToken = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        })
    } catch(error) {
        next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const {email, password } = req.body; //HUSK tilføj til re.body
        const user = await User.findOne({ email });
        if (!user) return next(new Error('Email eksisterer ikke'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password er ikke korrekt'))
        const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        })
    } catch(error) {
        next(error);
    }
}

////////////////  CRUD  ///////////////////////
// Middleware handling user requests

// Get all users
exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

// Get single user
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('Bruger findes ikke'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

// Change user role
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const newRole = req.body.role
        const update = {role: newRole}
        const doc = await User.findByIdAndUpdate(userId, update);
        res.status(200).json({
            data: doc,
            message: 'Brugerens rolle er opdateret'
        });
    }catch (error) {
        next(error)
    }
}

// Delete single user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'Brugeren er blevet slettet'
        });
    }catch (error) {
        next(error)
    }
}