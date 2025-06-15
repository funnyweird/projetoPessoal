const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// Rota para a página principal (dashboard)
router.get('/', async (req, res) => {
    try {
        const tasks = await taskController.getAllTasks(req, res);
        res.render('pages/kanban-dashboard-faculdade', { tasks });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar tarefas' });
    }
});

// Rota para página de nova senha
router.get('/nova-senha', (req, res) => {
    res.render('pages/nova-senha', { 
        message: req.query.message || null,
        error: req.query.error || null 
    });
});

// Rota para página de login
router.get('/login', (req, res) => {
    res.render('pages/login', { 
        message: req.query.message || null,
        error: req.query.error || null 
    });
});

// Rota para página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('pages/cadastro', { 
        message: req.query.message || null,
        error: req.query.error || null 
    });
});

// Rota para dashboard de tarefas
router.get('/dashboard/:tipo', async (req, res) => {
    try {
        const tasks = await taskController.getAllTasks(req, res);
        const tipo = req.params.tipo; // faculdade, linguas, escrita, casa
        
        // Filtra as tarefas baseado no tipo
        const filteredTasks = tasks.filter(task => task.categoria === tipo);
        
        res.render(`pages/kanban-dashboard-${tipo}`, { 
            tasks: filteredTasks,
            tipo: tipo
        });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar dashboard' });
    }
});

module.exports = router; 