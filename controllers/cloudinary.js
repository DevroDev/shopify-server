const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// file data ko tone yin req.files.file.path nae u ya mal
exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", //jpeg,png
  });
  //image url in json json ko d format nae pyan mal
  //image url ko pal database htal ka u mal
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};
//preview ka image ko remove lote mae function
exports.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("OK");
  });
};
