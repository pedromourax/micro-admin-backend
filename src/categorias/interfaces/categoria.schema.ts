import { Schema } from 'mongoose';

export const CategoriaSchema = new Schema({
    categoria: { type: String, unique: true },

    descricao: String,

    eventos: [{
        nome: String,
        operacao: String,
        valor: Number
    }]

}, { timestamps: true, collection: 'categorias' })