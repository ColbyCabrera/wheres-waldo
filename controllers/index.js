const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const path = require("path");

const db = {
  image1: {
    targets: {
      1: [1, 8, 2, 8],
      2: [11, 9],
      3: [14, 9, 14, 10, 14, 8, 13, 9, 15, 9],
    },
  },
  image2: {
    targets: {
      1: [3, 14, 3, 15, 3, 16],
      2: [9, 13, 9, 14, 10, 13],
      3: [17, 10, 17, 11],
    },
  },
  image3: {
    targets: {
      1: [7, 17],
      2: [14, 19, 14, 18],
      3: [14, 14, 14, 13, 14, 15, 13, 14, 13, 15],
    },
  },
};

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
      imagePath += "2.jpg";
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
  try {
    const targets = db["image" + req.params.id].targets;
    res.json(targets);
  } catch (err) {
    console.log(err);
    res.status(400).json("Invalid image ID");
  }
});
