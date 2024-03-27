import { Document } from 'mongoose'
import { Categoria } from '../categorias/categoria.interface'

export interface Jogador extends Document {
    readonly telefone: string,
    readonly email: string,
    categoria: Categoria,
    nome: string,
    ranking: string,
    posicaoRanking: number,
    urlFotoPerfil: string
}