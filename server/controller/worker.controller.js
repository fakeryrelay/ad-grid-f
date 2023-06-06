const asyncHandler = require("express-async-handler");
const { Worker, Shop } = require("../models");
const { validateDate } = require("../utils/validate.js");

// @desc    Create shop item
// @route   POST /api/shops
// @access  Private
const createWorker = asyncHandler(async (req, res) => {
  const { name, salary, hire_date, performance, shop_id } = req.body;

  if (typeof name !== "string" && name.length > 255) {
    res.status(400);
    throw new Error("Not valid name");
  }

  if (salary !== String(+salary)) {
    res.status(400);
    throw new Error("Not valid salary");
  }

  if (!validateDate(hire_date)) {
    res.status(400);
    throw new Error("Not valid hire_date");
  }

  if (+performance !== parseInt(performance)) {
    res.status(400);
    throw new Error("Not valid performance");
  }

  if (shop_id !== String(parseInt(shop_id))) {
    res.status(400);
    throw new Error("Not valid shop_id");
  }

  const worker = await Worker.create(req.body);

  res.json(worker);
});

// @desc    Get shops
// @route   GET /api/shops
// @access  Private
const getAllWorkers = asyncHandler(async (req, res) => {
  const monthStats = await Worker.findAll(req.query);

  if (!monthStats) {
    res.status(404);
  }

  res.json(monthStats);
});

// @desc    Get shop item
// @route   GET /api/shops/:shop_id
// @access  Private
const getWorkersItemsByShop = asyncHandler(async (req, res) => {
  const shopId = +req.params.id;

  const isShop = await Shop.findOne({
    where: {
      id: shopId,
    },
  });

  if (!isShop) {
    res.status(404);
    throw new Error('No such shop')
  }

  const shop = await Worker.findAll({
    where: {
      shop_id: shopId,
    },
    ...req.query,
  });

  if (!shop) {
    res.status(404);
  }

  res.json(shop);
});

// @desc    Update shop item
// @route   PUT /api/shops/:id
// @access  Private
const updateWorkerItem = asyncHandler(async (req, res) => {
  const monthStatId = +req.params.id;

  const { name, salary, hire_date, performance, shop_id } = req.body;

  if (typeof name !== "string" && name.length > 255) {
    res.status(400);
    throw new Error("Not valid name");
  }

  if (salary !== String(+salary)) {
    res.status(400);
    throw new Error("Not valid salary");
  }

  if (!validateDate(hire_date)) {
    res.status(400);
    throw new Error("Not valid hire_date");
  }

  if (+performance !== parseInt(performance)) {
    res.status(400);
    throw new Error("Not valid performance");
  }

  if (shop_id !== String(parseInt(shop_id))) {
    res.status(400);
    throw new Error("Not valid shop_id");
  }

  const updatedWorkerItem = await Worker.update(req.body, {
    where: {
      id: monthStatId,
    },
  });

  if (!updatedWorkerItem) {
    res.status(404);
  }

  res.json(updatedWorkerItem);
});

// @desc    Delete shop item
// @route   DELETE /api/shops/:id
// @access  Private
const deleteWorkerItem = asyncHandler(async (req, res) => {
  const monthStatId = +req.params.id;

    const deleteWorkerItem = await Worker.destroy({
      where: {
        id: monthStatId,
      },
    });

    if (!deleteWorkerItem) {
      res.status(404);
    }

    res.json(deleteWorkerItem);
});

module.exports = {
  createWorker,
  getAllWorkers,
  getWorkersItemsByShop,
  updateWorkerItem,
  deleteWorkerItem,
};
