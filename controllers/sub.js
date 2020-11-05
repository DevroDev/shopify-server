const Sub = require("../models/sub");
const slugify = require("slugify");

//api for creating category
//handling res from client side
exports.create = async (req, res) => {
  try {
    //parent par ma ya ml
    const { name,parent } = req.body;
    const category = await new Sub({ name,parent, slug: slugify(name) }).save();
    res.json(category);
  } catch {
    // console.log(err)
    res.status(400).send("Create sub failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  //params route parameter
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};
exports.update = async (req, res) => {
  const { name,parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name,parent, slug: slugify(name) },
      {new:true}//not require
    );
    res.json(updated)
  } catch (err) {}
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};
