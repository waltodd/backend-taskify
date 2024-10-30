import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../models/User'; // Modelo do usuário (Mongoose)

// Função de Login (signIn): Autentica o usuário e retorna um token JWT
export const signIn = async (req, res) => {
  const { email, password } = req.body; // Extrai email e senha do corpo da requisição
  try {
    // Verifica se o usuário existe pelo email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

    // Verifica se a senha corresponde usando argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas" });

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Envia o token como resposta
    res.json({ token });
  } catch (err) {
    // Lida com qualquer erro inesperado do servidor
    res.status(500).json({ error: err.message });
  }
};

// Função de Registro (signUp): Registra um novo usuário com senha criptografada e salva no banco de dados
export const signUp = async (req, res) => {
  const { name, email, password } = req.body; // Extrai nome, email e senha do corpo da requisição
  try {
    // Criptografa a senha do usuário para armazenamento seguro
    const hashedPassword = await argon2.hash(password);

    // Cria uma nova instância de usuário com a senha criptografada
    const user = new User({ name, email, password: hashedPassword });

    // Salva o usuário no banco de dados
    await user.save();

    // Retorna uma mensagem de sucesso
    res.status(201).json({ message: "Utilizador registado com sucesso" });
  } catch (err) {
    // Lida com erros do servidor e duplicidade de email
    res.status(500).json({ error: err.message });
  }
};

// Função para Obter o Usuário Atual (getCurrentUser): Retorna os detalhes do usuário autenticado
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário a partir da requisição (configurado durante a autenticação)

    // Busca o usuário pelo ID e exclui o campo de senha
    const user = await User.findById(userId).select('-password');
    
    // Se o usuário não for encontrado, envia uma resposta 404
    if (!user) return res.status(404).json({ message: "Utilizador não encontrado" });

    // Envia os dados do usuário como resposta
    res.status(200).json({ user });
  } catch (err) {
    // Lida com qualquer erro inesperado do servidor
    res.status(500).json({ error: err.message });
  }
};
