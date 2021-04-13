const hotelCollection = require('../models/hotel');
const room = require('../models/room');
const { roles } = require("../roles");


/////////////////////////  HOMEPAGE TEST  //////////////////////////////
module.exports.homepage = async function (req, res) {
    res.send('Hul igennem')
}


/////////////////////////  ROLE AUTH  //////////////////////////////
exports.grantAccessHotel = function(action, resource) {
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

/////////////////////////  CRUD  //////////////////////////////
// Get all hotels
module.exports.listHotels = async function (req, res) {
    var hotels = hotelCollection.find({})
        .populate('rooms')
        .exec((err, hotels) => {
            if (err) { res.send({ error: err.message }); }
            else { res.send(hotels); }
        });
}

// Get single hotel
module.exports.getHotel = async function (req, res) {
    hotel = hotelCollection.find({ name: req.body.name })
    .populate('rooms')
    .exec((err, hotel) => {
        if (err) { res.send({ error: err.message }); }
        else { res.send(hotel); }
    });
}

// Add a hotel
module.exports.addHotel = async function (req, res) {
    const newHotel = new hotelCollection({name: req.body.name});

    for (i=1; i <= req.body.number; i++) {
        var newRoom = new room({number: i});
        newHotel.rooms.push(newRoom);
    };

    const savedDoc = await newHotel.save();

    res.json(savedDoc)
    res.send('tag oplysninger i body og tilføj til et nyt hotel i controller inden det skubebs til databasen')
}

//#region not implemented
// Edit hotel
// module.exports.updateHotel = async function (req, res) {
//     res.send('update hotel with info in req body matching id in url param')
// }
//#endregion

// Delete hotel
module.exports.deleteHotel = async function (req, res) {
    const hotelid = req.body.hotelid
    var removed = await hotelCollection.findByIdAndRemove(hotelid)
    res.send(removed)
    //res.send(req.body.name)
}