const express = require('express');
const router = express.Router();
const Rider = require('../models/rider');
const Driver = require('../models/driver');
const Cab = require('../models/cab');
const Match = require('../models/match');

// Add Rider
router.post('/addrider', async (req, res) => {
    const { name, email, phoneNumber, rating } = req.body;
    try {
        const existingRidere = await Rider.findOne({ email: email });
        const existingRiderp = await Rider.findOne({ phoneNumber: phoneNumber });
        if (existingRidere || existingRiderp ) {
            return res.status(400).send({ message: 'Rider already exists' });
        }
        const rider = new Rider({ name, email, phoneNumber, rating });
        await rider.save();
        res.send(rider);
    } catch (err) {
        res.status(400).send(err);
    }
});


// Get all Riders
router.get('/getriders', async (req, res) => {
    try {
        const riders = await Rider.find();
        res.json(riders);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add Driver
router.post('/adddriver', async (req, res) => {
    const { name, email, phoneNumber, rating, cab } = req.body;
    
    try {
        const existingDrivere = await Driver.findOne({ email: email });
        const existingDriverp = await Driver.findOne({ phoneNumber: phoneNumber });
        if (existingDrivere || existingDriverp) {
            return res.status(400).send({ message: 'Driver already exists' });
        }
        const driver = new Driver({ name, email, phoneNumber, rating, cab });
        await driver.save();
        res.send(driver);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Drivers
router.get('/getdrivers', async (req, res) => {
    try {
        const drivers = await Driver.find().populate('cab');
        res.json(drivers);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add Cab
router.post('/addcab', async (req, res) => {
    const { numberPlate, model } = req.body;
    const cab = new Cab({ numberPlate, model });
    try {
        await cab.save();
        res.send(cab);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Cabs
router.get('/getcabs', async (req, res) => {
    try {
        const cabs = await Cab.find();
        res.json(cabs);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Matches
router.get('/getmatches', async (req, res) => {
    try {
        const matches = await Match.find().populate('rider').populate('driver');
        res.json(matches);
    } catch (err) {
        res.status(400).send(err);
    }
});


// Get driver and cab details for a rider
router.get('/getdriverforrider/:riderId', async (req, res) => {
    try {
      const riderId = req.params.riderId;
      const rider = await Rider.findById(riderId);
      const drivers = await Driver.find({ rating: { $gt: rider.rating }, matched: false }).lean();
      if (drivers.length === 0) {
        return res.status(404).send('No eligible drivers found.');
      } else if (drivers.length === 1) {
        const driver = drivers[0];
        await Driver.findByIdAndUpdate(driver._id, { matched: true });
        const match = await Match.create({ rider: riderId, driver: driver._id });
        return res.json({ rider, driver, match });
      } else {
        const driver = drivers[Math.floor(Math.random() * drivers.length)];
        await Driver.findByIdAndUpdate(driver._id, { matched: true });
        const match = await Match.create({ rider: riderId, driver: driver._id });
        return res.json({ rider, driver, match });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  
  
  

module.exports = router;
