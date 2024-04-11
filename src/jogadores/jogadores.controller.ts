import { Controller, Logger } from '@nestjs/common';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';

const ackErrors: string[] = ['E11000']

@Controller('jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    private logger = new Logger(JogadoresController.name)

    @EventPattern('criar-jogador')
    async criarJogadores(@Payload() jogador: Jogador, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()


        try {
            await this.jogadoresService.criarJogador(jogador)
            await channel.ack(originalMsg)
        } catch (error) {
            this.logger.log(`Error: ${JSON.stringify(error.message)}`)

            const errors = ackErrors.filter(ackError => error.message.includes(ackError))
            if (errors) await channel.ack(originalMsg)
        }

    }

    @MessagePattern('consultar-jogadores')
    async consultarJogadores(@Payload() _id: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        this.logger.log(`Consultar jogador: ${JSON.stringify(_id)}`)
        try {

            if (_id["idJogador"]) {
                return await this.jogadoresService.consultarJogadorPeloId(_id["idJogador"])
            } else {
                return await this.jogadoresService.consultarTodosJogadores()
            }

        } finally {
            await channel.ack(originalMsg)
        }

    }




}
