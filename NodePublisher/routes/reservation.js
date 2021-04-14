const express = require("express");
const router = express.Router();
const reservation_controller = require("../controllers/reservation_controller");

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation service. Make a reservation for a given day.
 */

/**
 * @swagger
 * /Reservation:
 *   post:
 *     summary: Sends a reservation to the server/db.
 *     tags: [Reservation]
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
 *               date:
 *                 type: string
 *                 required: true
 *               hotel:
 *                 type: string
 *                 required: true
 *               roomnumber:
 *                 type: integer
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               phonenumber:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Your reservation is
 */
router.post("", reservation_controller.reserve); // public route

module.exports = router;
