import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kegivaldo000:aiKNRP8OLKULdltn@cluster0.8njalqq.mongodb.net/sradmbackend?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }, { name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
