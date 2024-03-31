import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria) {

    this.logger.log(`Cria categoria: ${JSON.stringify(categoria)}`)

    await this.appService.criarCategoria(categoria)

  }

  @MessagePattern('consultar-categoria')
  async consultarCategorias(@Payload() idCategoria: string) {

    this.logger.log(`Cria categoria: ${JSON.stringify(idCategoria)}`)

    if (idCategoria) {
      return await this.appService.consultarCategoriaPeloID(idCategoria)
    } else {
      console.log('asdasdas')
      return await this.appService.consultarCategorias()
    }

  }
}
