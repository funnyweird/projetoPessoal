const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// Rota para criar tarefa
router.post('/tarefas', TarefaController.criarTarefa);

// Rota para listar tarefas
router.get('/tarefas', TarefaController.listarTarefas);

// Rota para editar tarefa
router.put('/tarefas/:id', TarefaController.editarTarefa);

// Rota para excluir tarefa
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;
