var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');

router.get('/', async (req, res) => {
   var toys = await ToyModel.find({}).populate('brand')
   res.render('toy/index', { toys });
})

// router.get('/:category', async (req, res) => {
//    try {
//        const category = req.params.category;
//        const toys = await ToyModel.find({ category: category });
//        res.render('toy/list', { toys });
//    } catch (error) {
//        res.status(500).json({ message: error.message });
//    }
// });
router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM student WHERE id = 'id'
   var toy = await ToyModel.findById(id).populate('brand');
   var brands = await BrandModel.find({});
   res.render('toy/detail', { toy, brands });
})

router.get('/customer', async (req, res) => {
   var toys = await ToyModel.find({}).populate('brand');
   //Path: views/toy/index.hbs
   res.render('toy/list', { toys });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('toy/add', { brands });
})

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToyModel.create(toy);
   res.redirect('/toy');
})


router.get('/delete/:id', async (req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id);
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('toy/edit', { toy, brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   try {
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/toy');
})
//  router.post('/search', async (req, res) => {
//    var keyword = req.body.keyword;
//    //SQL: SELECT * FROM toys WHERE model LIKE '%keyword%'
//    var toys = await ToyModel.find({ name: new RegExp(keyword, "i") }).populate('brand');
//    res.render('toy/index', { toys })
// })

router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   //relative search
   var toys = await ToyModel.find({ name: new RegExp(keyword, "i") });
   res.render('toy/index', { toys: toys });
})

module.exports = router;