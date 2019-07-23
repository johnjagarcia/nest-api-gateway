import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateway.module';
import { RoutesModule } from './routes/routes.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/users', {
      useNewUrlParser: true
    }),
    AuthModule,
    UsersModule,
    GatewayModule,
    RoutesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
