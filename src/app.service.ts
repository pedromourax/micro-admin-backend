import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categorias/categoria.interface';
import { RpcException } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Jogador } from './interfaces/jogadores/jogador.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Jogador') private readonly JogadorModel: Model<Jogador>,
    @InjectModel('Categoria') private readonly CategoriasModel: Model<Categoria>) { }

  private logger = new Logger(AppService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.CategoriasModel(categoria);
      return await categoriaCriada.save()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }


  async consultarCategoriaPeloID(idCategoria: string) {
    try {
      console.log(`id: ${idCategoria}`)
      return await this.CategoriasModel.findOne({ _id: idCategoria }).exec()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async consultarCategorias() {
    try {
      return await this.CategoriasModel.find().exec()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }
}
