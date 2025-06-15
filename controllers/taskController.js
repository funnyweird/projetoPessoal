const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAll();
    // Se for uma requisição API, retorna JSON
    if (req.xhr || req.headers.accept.includes('application/json')) {
      return res.status(200).json(tasks);
    }
    // Se for uma requisição normal, retorna os dados para a view
    return tasks;
  } catch (error) {
    if (req.xhr || req.headers.accept.includes('application/json')) {
      return res.status(500).json({ error: error.message });
    }
    throw error;
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { titulo, descricao, status, prazo, user_id } = req.body;
  if (!titulo || !descricao || !user_id) {
    return res.status(400).json({ error: 'Título, descrição e user_id são obrigatórios.' });
  }
  try {
    const newTask = await taskModel.create({ titulo, descricao, status, prazo, user_id });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { titulo, descricao, status, prazo } = req.body;
  if (!titulo || !descricao) {
    return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
  }
  try {
    const updatedTask = await taskModel.update(req.params.id, { titulo, descricao, status, prazo });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted = await taskModel.deleteTask(req.params.id);
    if (deleted) {
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
