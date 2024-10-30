import mongoose from 'mongoose';

// Definindo o esquema do usuário
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },         // Nome do usuário
  email: { type: String, required: true, unique: true }, // Email deve ser único
  password: { type: String, required: true },     // Senha do usuário
});

// Exportando o modelo do usuário
const User = mongoose.model('User', UserSchema); // Usando a constante `User` para exportação
export default User; // Exporta o modelo User como padrão
