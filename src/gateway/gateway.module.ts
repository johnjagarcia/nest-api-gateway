import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import httpProxy from 'http-proxy-middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import passport = require('passport');

import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { jwtConstants } from '../auth/constants';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/jwt-strategy';
import { AuthModule } from '../auth/auth.module';
import { LoggerMiddleware } from '../commons/middleware/logger.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600
      }
    }),
    UsersModule,
    AuthModule
  ],
  providers: [GatewayService, JwtStrategy],
  controllers: [GatewayController],
  exports: [GatewayService]
})
export class GatewayModule implements NestModule {

  constructor(private readonly gatewayService: GatewayService) { }

  configure(consumer: MiddlewareConsumer) {
    this.gatewayService.getRoutes().map(routeOptions => {
      console.log('routeOptions.path', routeOptions.path)
      const proxyPath = routeOptions.path;
      delete routeOptions.path;
      const proxyOptions = {
        ...this.gatewayService.getDefaultOptions(),
        ...routeOptions,
      };
      consumer
        .apply(
          passport.authenticate('jwt', { session: false }),
          LoggerMiddleware,
          httpProxy(proxyPath, proxyOptions)
        )
        .forRoutes(...proxyPath);
    })
  }
}
