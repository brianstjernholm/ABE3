var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home_controller')
const UserController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', homeController.homePage);

/////////////////////////  SIGNUP  /////////////////////////////
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup for app
 *     description: Creating a new user in the system, with email, password and role
 *     tags: [Frontpage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               role:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Created
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
 *                 accestoken:
 *                   type: string
 */
router.post('/signup', UserController.signup)


/////////////////////////  LOGIN  /////////////////////////////
/**
 * @swagger
 * /Login:
 *   post:
 *     summary: Login to app
 *     description: Supply email and password to login to app
 *     tags: [Frontpage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Succefully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                 accestoken:
 *                   type: string
 */
router.post('/login', UserController.login);

module.exports = router;
