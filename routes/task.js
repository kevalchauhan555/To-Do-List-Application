const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");

// Get all tasks
router.get("/", taskController.home);

// Create a new task
router.post("/add", taskController.newTask);

// Mark task as completed
router.post("/complete/:id", taskController.taskComplete);

// Edit a task
router.get("/edit/:id", taskController.editTask);

router.post("/edit/:id", taskController.edited);

// Delete a task
router.post("/delete/:id", taskController.deleteTask);

module.exports = router;
