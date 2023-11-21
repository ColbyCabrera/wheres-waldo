const express = require("express");
const router = express.Router();
const index_controller = require("../controllers/index");

/* GET home page. */
router.get('/', index_controller.index);

router.get('/images', index_controller.images);

router.get('/images/:id', index_controller.get_image);

router.get('/images/:id/targets', index_controller.get_targets);

module.exports = router;
