const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const path = require("path");

exports.index = asyncHandler(async (req, res) => {
  res.json();
});

exports.get_image = asyncHandler(async (req, res) => {
  const imagePath = path.join(__dirname, "..", "public/images/waldo1.jpg");
  //console.log(req.params.id)
  res.sendFile(imagePath);
});

exports.get_targets = asyncHandler(async (req, res) => {
  res.json("hi");
});
