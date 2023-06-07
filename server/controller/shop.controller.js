const asyncHandler = require("express-async-handler");
const { Shop, Worker } = require("../models");
const { validateDate } = require("../utils/validate.js");

// @desc    Create shop item
// @route   POST /api/shops
// @access  Private
const createShop = asyncHandler(async (req, res) => {
  const { name, total_revenue, open_date, area } = req.body;

  const newShop = {
    name: name,
    total_revenue: +total_revenue,
    open_date: open_date,
    area: +area,
  };

  // +
  if (newShop.name.length > 255) {
    res.status(400);
    throw new Error("Not valid name");
  }

  if (
    String(parseInt(newShop.total_revenue)).length > 131072 ||
    (String(newShop.total_revenue).split(".").length === 2 &&
      String(newShop.total_revenue).split(".")[1].length > 16383)
  ) {
    res.status(400);
    throw new Error("Not valid total_revenue");
  }

  if (!validateDate(newShop.open_date)) {
    res.status(400);
    throw new Error("Not valid open_date");
  }

  if (newShop.area > 2147483647) {
    res.status(400);
    throw new Error("Not valid area");
  }

  const shop = await Shop.create({
    name: name,
    total_revenue: total_revenue,
    open_date: open_date,
    area: area,
  });

  if (!shop) {
    res.status(404);
  }

  res.json(shop);
});

// @desc    Get shop items
// @route   GET /api/shops
// @access  Private
const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.findAll(req.query);

  if (!shops) {
    res.status(404);
  }

  res.json(shops);
});

// @desc    Get shop item
// @route   GET /api/shops/:id
// @access  Private
const getShop = asyncHandler(async (req, res) => {
  const shopId = +req.params.id;

  const shop = await Shop.findOne({
    where: {
      id: shopId,
    },
  });

  if (!shop) {
    res.status(404);
  }

  res.json(shop);
});

// @desc    Update shop item
// @route   PUT /api/shops/:id
// @access  Private
const updateShop = asyncHandler(async (req, res) => {
  const shopId = +req.params.id;

  const { name, total_revenue, open_date, area } = req.body;

  const newShop = {
    name: name,
    total_revenue: +total_revenue,
    open_date: open_date,
    area: +area,
  };

  // +
  if (newShop.name.length > 255) {
    res.status(400);
    throw new Error("Not valid name");
  }

  if (
    String(parseInt(newShop.total_revenue)).length > 131072 ||
    (String(newShop.total_revenue).split(".").length === 2 &&
      String(newShop.total_revenue).split(".")[1].length > 16383)
  ) {
    res.status(400);
    throw new Error("Not valid total_revenue");
  }

  if (!validateDate(newShop.open_date)) {
    res.status(400);
    throw new Error("Not valid open_date");
  }

  if (newShop.area > 2147483647) {
    res.status(400);
    throw new Error("Not valid area");
  }

  const updatedShop = await Shop.update(req.body, {
    where: {
      id: shopId,
    },
  });

  if (!updatedShop) {
    res.status(404);
  }

  res.json(updatedShop);
});

// @desc    Delete shop item
// @route   DELETE /api/shops/:id
// @access  Private
const deleteShop = asyncHandler(async (req, res) => {
  const shopId = +req.params.id;

  const findShop = await Shop.findOne({
    where: {
      id: shopId,
    },
  });

  if (!findShop) {
    res.status(404);
    throw new Error("No such shop");
  }

  await Worker.destroy({
    where: {
      shop_id: shopId,
    },
  });

  const deleteShop = await Shop.destroy({
    where: {
      id: shopId,
    },
  });

  res.json(deleteShop);
});

module.exports = { createShop, getAllShops, getShop, updateShop, deleteShop };
