// controllers/userController.js

const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).render('pages/cadastro', { message: null, error: 'Nome, email e senha são obrigatórios.' });
    }
    await userModel.create({ nome, email, senha });
    return res.redirect('/login');
  } catch (error) {
    res.status(500).render('pages/cadastro', { message: null, error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userModel.updateUser(req.params.id, name, email);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).render('pages/login', { message: null, error: 'Email e senha são obrigatórios.' });
    }
    const user = await userModel.findByEmailAndSenha(email, senha);
    if (user) {
      // Aqui você pode salvar o usuário na sessão, se desejar
      return res.redirect('/dashboard/faculdade');
    } else {
      return res.status(401).render('pages/login', { message: null, error: 'Email ou senha inválidos.' });
    }
  } catch (error) {
    res.status(500).render('pages/login', { message: null, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
