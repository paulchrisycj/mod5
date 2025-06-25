function toa(req, res, next){
    console.log(new Date())
    next()
}

module.exports = toa