import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
