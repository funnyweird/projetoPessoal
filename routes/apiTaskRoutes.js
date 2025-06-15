const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');

// GET /api/tasks?area=faculdade
router.get('/', async (req, res) => {
  try {
    const area = req.query.area;
    let tasks = await taskModel.getAll();
    if (area) {
      tasks = tasks.filter(task => task.categoria === area);
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const newTask = await taskModel.create(req.body);
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id (para mover/editar)
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await taskModel.update(req.params.id, req.body);
    if (updatedTask) {
      res.json({ success: true, task: updatedTask });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await taskModel.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 