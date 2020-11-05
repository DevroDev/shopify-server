const Category = require("../models/category");
const slugify = require("slugify");
const Sub = require("../models/sub");

//api for creating category
//handling res from client side
exports.create = async (req, res) => {
  try {
    //name ta khu htae ko pal front end ka po lr tae res ka nay yuu tal
    //console.log(req)body nae a thu par lar tae model ta khu lone par lar mal
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch {
    // console.log(err)
    res.status(400).send("Create category failed");
  }
};

//api for getting category list
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

//api for getting category
exports.read = async (req, res) => {
  //params route parameter
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

//api for updating category
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true } //not require
    );
    res.json(updated);
  } catch (err) {}
};

//api for remove or deleting category
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

//api for getting sub category belong to category
exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
