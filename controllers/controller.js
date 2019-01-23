const connection = require('../database'),
      Photo      = require('../models/photo');

module.exports = {
    //show all photos
    fetchAllphotos(req, res, next){         
        Photo.find({})
        .then(result => {
            res.json(result)
        }) 
        .catch( err => {
            res.status(404).send("not found")
        })
    },
    addPhoto(req, res, next){
        const{
            photoID = null,
            name    = null,
            URL     = null,
            userID  = null
        } = req.body
        //initialize likes and rate:
        let likes = 0, likes_array = null, num_of_rates=0, rates_sum=0,rates_array=null, total_rate=0;
        const photo = new Photo ({photoID, name, URL, userID, likes, likes_array, num_of_rates, rates_sum,rates_array,total_rate})
        photo.save()
        .then(result => {
            console.log("Photo added!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send("not found")
        })
    },

    deletePhoto(req, res, next){
        const {id = null} = req.params
        Photo.deleteOne({photoID: id})
        .then(result => {
            console.log("Photo deleted!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send("not found") 
        })       
    },

    editPhoto(req,res, next){
        const { id   = null } = req.params
        const { name = null } = req.body 
        Photo.updateOne({photoID: id}, {name: name})
        .then(result => {
            console.log("Photo updated!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send("not found")
        })  
    },

    showApi(req, res){
        res.redirect('https://documenter.getpostman.com/view/5698727/RztfxCj9')
    },

    fallback(req, res){
        res.send('Got lost? This is a 404 page')
    }
}