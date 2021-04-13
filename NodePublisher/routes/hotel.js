const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotel_controller');

var jwt = require('express-jwt');
const { Router } = require('express');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"]
});

// router.route('')
//     .get(auth, hotelController.listHotels)
//     .post(auth, hotelController.grantAccessHotel('createAny', 'hotel'), hotelController.addHotel)
//     .delete(auth, hotelController.deleteHotel)

/////////////////////////  GET HOTELS  //////////////////////////////

/**
 * @swagger
 * /hotel:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all hotels and rooms
 *     description: requiring a list of all hotels with rooms from the database 
 *     tags: [Hotel]
 *     responses:
 *       200:
 *         description: Succefully returned list of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 rooms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       available:
 *                         type: boolean
 *                       _id:
 *                         type: string
 *                       number:
 *                         type: integer
 */
router.get('', auth, hotelController.grantAccessHotel('readAny', 'hotel'), hotelController.listHotels);


/////////////////////////  CREATE HOTEL  //////////////////////////////
/**
 * @swagger
 * /hotel:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create hotel
 *     description: Create new hotel by "name" and select "number" of rooms
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               number:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Succefully created hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 rooms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       available:
 *                         type: boolean
 *                       _id:
 *                         type: string
 *                       number:
 *                         type: integer
 */
router.post('', auth, hotelController.grantAccessHotel('createAny', 'hotel'), hotelController.addHotel);


/////////////////////////  EDIT HOTEL  //////////////////////////////
//router.put('/addRoom', auth, hotelController.addRoom)


/////////////////////////  DELETE HOTEL  //////////////////////////////
/**
 * @swagger
 * /hotel:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a hotel
 *     description: Delete a hotel by id
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succefully deleted hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 rooms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       available:
 *                         type: boolean
 *                       _id:
 *                         type: string
 *                       number:
 *                         type: integer
 *                 __v:
 *                   type: integer
 */
router.delete('', auth, hotelController.grantAccessHotel('deleteAny', 'hotel'), hotelController.deleteHotel)


/////////// Acting on specific hotel requests ////////////////////////
// router.route('/:hotelid')
//     .get(hotelController.getHotel)
//     .put(hotelController.updateHotel)
//     .delete(hotelController.deleteHotel)

module.exports = router;


