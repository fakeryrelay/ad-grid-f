const express = require("express");
const {
  createShop,
  deleteShop,
  getAllShops,
  getShop,
  updateShop,
} = require("../controller/shop.controller.js");

const router = express.Router();

router.route("/").post(createShop).get(getAllShops);

router.route("/:id").get(getShop).put(updateShop).delete(deleteShop);

module.exports = router;
