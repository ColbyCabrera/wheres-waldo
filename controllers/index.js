const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const path = require("path");

exports.index = asyncHandler(async (req, res) => {
  res.json();
});

exports.get_image = asyncHandler(async (req, res) => {
  let imagePath = path.join(__dirname, "..", "public/images/waldo");
  switch (req.params.id) {
    case "1":
      imagePath += "1.jpg";
      break;
    case "2":
      imagePath += "2.webp";
      break;
    case "3":
      imagePath += "3.jpg";
      break;
    default:
      imagePath += "3.jpg";
  }

  res.sendFile(imagePath);
});

exports.get_targets = asyncHandler(async (req, res) => {
  res.json("hi");
});
