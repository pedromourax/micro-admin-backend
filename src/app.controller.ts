import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

const ackErrors: string[] = ['E11000']

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger = new Logger(AppController.name);


  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()


    this.logger.log(`Cria categoria: ${JSON.stringify(categoria)}`)
    try {
      await this.appService.criarCategoria(categoria)
      await channel.ack(originalMsg)
    } catch (error) {

      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      const errors = ackErrors.filter(ackError => error.message.includes(ackError))
      if (errors) await channel.ack(originalMsg)
    }

  }

  @MessagePattern('consultar-categoria')
  async consultarCategorias(@Payload() idCategoria: string, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    this.logger.log(`Consultar categoria: ${JSON.stringify(idCategoria)}`)

    try {
      if (idCategoria) {
        return await this.appService.consultarCategoriaPeloID(idCategoria)
      } else {
        return await this.appService.consultarCategorias()
      }
    } finally {
      await channel.ack(originalMsg)
    }

  }
  @EventPattern('atualizar-categoria')
  async atualizarCategorias(@Payload() data: any, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    this.logger.log(`Atualizar categoria: ${JSON.stringify(data)}`)

    try {

      const { _id, ...categoria } = data

      await this.appService.atualizarCategoria(_id, categoria)
      await channel.ack(originalMsg)
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      const errors = ackErrors.filter(ackError => error.message.includes(ackError))
      if (errors) await channel.ack(originalMsg)
    }


  }

}

