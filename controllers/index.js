const express = require("express");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
//const passport = require("passport");
//const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res) => {
  res.json();
});
