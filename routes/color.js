var express = require('express');
var router = express.Router();
var ColorModel = require('../models/ColorModel');
var ToyModel =require('../models/ToyModel');

router.get('/', async (req, res) => {
    var colors = await ColorModel.find({});
    res.render('color/index', { colors });
 })
 

router.get('/add', (req, res) => {
    res.render('color/add');
 })
 
 router.post('/add', async (req, res) => {
    var color = req.body;
    await ColorModel.create(color);
    res.redirect('/color');
 })

module.exports = router;