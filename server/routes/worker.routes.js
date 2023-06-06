const express = require("express");
const {
  createWorker,
  getAllWorkers,
  getWorkersItemsByShop,
  updateWorkerItem,
  deleteWorkerItem,
} = require("../controller/worker.controller.js");

const router = express.Router();

router.route("/").post(createWorker).get(getAllWorkers);

router.route("/:id").get(getWorkersItemsByShop).put(updateWorkerItem).delete(deleteWorkerItem);

module.exports = router;
