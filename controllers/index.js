const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const path = require("path");

const db = {
  image1: {
    targets: {
      1: [0,0],
      2: [1,1], 
      3: [2,2], 
    }
  },
  image2: {
    targets: {
      1: [16,16],
      2: [15,14], 
      3: [14,14]
    }
  },
  image3: {
    targets: {
      1: [6,6],
      2: [5,4], 
      3: [4,4],
    }
  }
}

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
  try {
    const targets = db["image" + req.params.id].targets;
    res.json(targets);
  } catch(err) {
    console.log(err);
    res.status(400).json("Invalid image ID");
  }
});
