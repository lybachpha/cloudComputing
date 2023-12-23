var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');


router.use(async (req, res, next) => {
  try {
      const brands = await BrandModel.find({});
      res.locals.brands = brands;
      next();
  } catch (error) {
      next(error);
  }
});

router.use(async (req, res, next) => {
  try {
      const toys = await ToyModel.find({});
      res.locals.toys = toys;
      next();
  } catch (error) {
      next(error);
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;

  try {
      // Tìm các brand ID phù hợp
      const brandIds = await BrandModel.find({ name: new RegExp(keyword, "i") }).select('_id');
      const brandIdList = brandIds.map(brand => brand._id);

      // Tìm các toys phù hợp theo name, category, hoặc brand
      var toys = await ToyModel.find({
          $or: [
              { name: new RegExp(keyword, "i") },
              { category: new RegExp(keyword, "i") },
              { brand: { $in: brandIdList } }
          ]
      }).populate('brand');

      res.render('toy/list', { toys });
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});

router.get('/customer', async (req, res) => {
  var toys = await ToyModel.find({}).populate('brand');
  //Path: views/toy/index.hbs
  res.render('toy/list', { toys });
})

module.exports = router;
