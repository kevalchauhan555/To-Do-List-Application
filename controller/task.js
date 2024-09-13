const express = require("express");
const Task = require("../models/task");


// Get all tasks
module.exports.home = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index", { tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new task
module.exports.newTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send("Title is required");
  }

  const task = new Task({ title, description });
  try {
    await task.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Mark task as completed
module.exports.taskComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.completed) {
      return res.status(400).send("Task is already completed");
    }
    task.completed = true;
    await task.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Edit a task
module.exports.editTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render("edit", { task });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.edited = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send("Title is required");
  }

  try {
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
};



// Delete a task
module.exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
