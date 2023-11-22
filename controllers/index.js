const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const path = require("path");

exports.index = asyncHandler(async (req, res) => {
  res.json();
});

exports.images = asyncHandler(async (req, res) => {
  const imagePath = path.join(__dirname, "..", "public/images/waldo1.jpg");
  res.sendFile(imagePath);

  /* // Process image data
    if (req.file) {
      let img = fs.readFileSync(req.file.path);
      let encode_img = img.toString("base64");
      let final_img = {
        contentType: req.file.mimetype,
        data: new Buffer.from(encode_img, "base64"),
      };
    */

  //img(src=`data:image/${item.image.contentType};base64,${item.image.data.toString('base64')}`) for client
});

exports.get_image = asyncHandler(async (req, res) => {
  const imagePath = path.join(__dirname, "..", "public/images/waldo1.jpg");
  res.sendFile(imagePath);
});

exports.get_targets = asyncHandler(async (req, res) => {
  res.json("hi");
});
