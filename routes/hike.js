
const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Hike = require('./../models/Hike')
const path = require('path')




// GET- get all hikes ---------------------------
//not e1 can access it w/o token
router.get('/', Utils.authenticateToken, (req, res) => {
    //populate means it will fill the user field with the entire user doc
    //but only _id, first name and last name field (not pwd and email)
    //Hike.find().populate('user', '_id firstName lastName') 'title location stars description image'
  Hike.find().populate('hike', 'title location stars description image')
    .then(hikes => {
      if(hikes == null){
        return res.status(404).json({
          message: "No hikes found"
        })
      }
      res.json(hikes)
      console.log(hikes)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting hikes"
      })
    })  
})

// POST - create new hike --------------------------------------
//sending a post request
router.post('/', (req, res) => {
  // validate inputs and making sure any object is not empty 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "New hike content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
      //if image isnt there, send back an error
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new haircut
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new haircut
    let newHike = new Hike({
      location: req.body.location,
      description: req.body.description,
      stars: req.body.stars,
      //get unique file name from utils.js so no same names
      image: uniqueFilename,
      title: req.body.title,
      skillLevel: req.body.skillLevel,
      time: req.body.time,
      hikeDistance: req.body.hikeDistance,
    })
  
    newHike.save()
    .then(hike => {        
      // success!  
      // return 201 status with user object
      return res.status(201).json(hike)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating hike",
        error: err
      })
    })
  })
})

// export
module.exports = router

