import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jogador } from './interfaces/jogador.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private logger = new Logger(JogadoresService.name)

    async criarJogador(CriarJogador: Jogador): Promise<Jogador> {
        try {
            const JogadorCriado = new this.jogadorModel(CriarJogador);
            return await JogadorCriado.save()
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        try {
            console.log("consultado todos os jogadores")
            return await this.jogadorModel.find().exec()
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async consultarJogadorPeloId(idJogador: string): Promise<Jogador> {
        try {
            return await this.jogadorModel.findOne({ _id: idJogador }).select('_id').exec()
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException("Jogador não encontrado")
        }
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: Jogador): Promise<Jogador> {
        try {

            return await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

    async deletarJogador(_id: string): Promise<any> {
        try {
            await this.jogadorModel.deleteOne({ _id }).exec()
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }
    }

}
