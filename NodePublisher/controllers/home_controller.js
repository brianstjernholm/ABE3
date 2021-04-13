// GET homepage

module.exports.homePage = function(req, res) {
    res.render('index', {
        title: 'Node Express Hotel Booking API'
    })
}