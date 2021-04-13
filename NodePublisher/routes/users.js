var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"]
});

const UserController = require('../controllers/user_controller');

/////////////////////////  GET USER  /////////////////////////////
/**
 * @swagger
 * /users/getUser/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get user
 *     description: Get user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Succesfully returned user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     __v:
 *                       type: integer
 */
router.get('/getUser/:userId', auth, UserController.grantAccess('readOwn', 'profile'), UserController.getUser);


/////////////////////////  GET ALL USERS  /////////////////////////////
/**
 * @swagger
 * /users/getAllUsers:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get all users
 *     description: Returns all registered user from database
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Succesfully returned users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                       _id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *                       __v:
 *                         type: integer
 */
router.get('/getAllUsers', auth, UserController.grantAccess('readAny', 'profile'), UserController.getUsers);


//////////////////////////  EDIT USER ROLE  ////////////////////////////////////////
/**
 * @swagger
 * /users/editUserRole/{userId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Change user role
 *     description: Finds user by id and changes role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Succesfully updated user role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     __v:
 *                       type: integer
 *                 message:
 *                   type: string
 */
router.put('/editUserRole/:userId', auth, UserController.grantAccess('updateAny', 'profile'), UserController.updateUser);


/////////////////////////  DELETE USER  /////////////////////////////
/**
 * @swagger
 * /users/deleteUser/{userId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user
 *     description: Deletes a user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Succesfully deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   nullable: true
 *                 message:
 *                   type: string
 */
router.delete('/deleteUser/:userId', auth, UserController.grantAccess('deleteAny', 'profile'), UserController.deleteUser);

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

module.exports = router;
