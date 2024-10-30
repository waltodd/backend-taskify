import express from 'express';
import {
    createTask,
    getTaskById,
    getTasks,
    updateTask,
    deleteTask,
    completeTask,
    filterTasksByPriority,
    filterTasksByStatus
} from '../controllers/taskController.js';
import { verifyToken } from '../utils/authUtils.js';

const router = express.Router();

// Middleware to allow certain headers
router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Rota para criar uma nova tarefa
router.post('/', verifyToken, createTask);

// Rota para obter todas as tarefas do usuário
router.get('/', verifyToken, getTasks);

// Rota para obter uma tarefa específica pelo ID
router.get('/:id', verifyToken, getTaskById);

// Rota para atualizar uma tarefa existente
router.put('/:id', verifyToken, updateTask);

// Rota para remover uma tarefa
router.delete('/:id', verifyToken, deleteTask);

// Rota para marcar uma tarefa como concluída
router.patch('/:id/complete', verifyToken, completeTask);

// Rota para filtrar tarefas por prioridade
router.get('/filter/priority', verifyToken, filterTasksByPriority);

// Rota para filtrar tarefas por status
router.get('/filter/status', verifyToken, filterTasksByStatus);



export default router;
