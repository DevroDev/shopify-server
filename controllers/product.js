const Product = require("../models/product");
const slugify = require("slugify");

//product create api
//
exports.create = async (req, res) => {
  try {
    //console.log(req.body);
    //received data from front end
    req.body.slug = slugify(req.body.title);
    //body htal mar productcreate component ka values tway pr lar tal
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//product tway ko get lote mae api
exports.read = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

//show product
