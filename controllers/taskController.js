import Task from"../models/Task.js";

// Função para criar uma nova tarefa
export const createTask = async (req, res) => {
  
  const { title, priority } = req.body;
  try {
    const task = new Task({ title, priority, userId: req.userId }); // Atribui o ID do usuário à tarefa
    await task.save();
    res.status(201).json(task); // Retorna a tarefa criada
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para obter todas as tarefas do usuário atual
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }); // Busca todas as tarefas do usuário
    res.status(200).json(tasks); // Retorna as tarefas
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para obter uma tarefa específica pelo ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id, userId: req.userId }); // Busca a tarefa pelo ID e pelo ID do usuário
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" }); // Retorna 404 se não encontrar
    res.status(200).json(task); // Retorna a tarefa encontrada
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para atualizar uma tarefa existente
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, priority },
      { new: true } // Retorna a tarefa atualizada
    );
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" }); // Retorna 404 se não encontrar
    res.status(200).json(task); // Retorna a tarefa atualizada
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para remover uma tarefa
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId }); // Remove a tarefa pelo ID e pelo ID do usuário
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" }); // Retorna 404 se não encontrar
    res.status(200).json({ message: "Tarefa removida com sucesso" }); // Retorna mensagem de sucesso
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para marcar uma tarefa como concluída
export const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { completed: true }, // Atualiza o status da tarefa para concluída
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" }); // Retorna 404 se não encontrar
    res.status(200).json(task); // Retorna a tarefa atualizada
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para filtrar tarefas por prioridade
export const filterTasksByPriority = async (req, res) => {
  const { priority } = req.query; // Obtém a prioridade a partir dos parâmetros da query
  try {
    const tasks = await Task.find({ userId: req.userId, priority }); // Filtra tarefas pela prioridade e ID do usuário
    res.status(200).json(tasks); // Retorna as tarefas filtradas
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};

// Função para filtrar tarefas por status (concluídas ou pendentes)
export const filterTasksByStatus = async (req, res) => {
  const { completed } = req.query; // Obtém o status a partir dos parâmetros da query
  try {
    const tasks = await Task.find({ userId: req.userId, completed }); // Filtra tarefas pelo status e ID do usuário
    res.status(200).json(tasks); // Retorna as tarefas filtradas
  } catch (err) {
    res.status(500).json({ error: err.message }); // Lida com erros
  }
};
