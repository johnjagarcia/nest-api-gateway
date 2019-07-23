import { Injectable } from '@nestjs/common';
import { Gateway } from './interfaces/gateway.interface';
import routes from '../config/routes.json'

@Injectable()
export class GatewayService implements Gateway {

    getDefaultOptions(): object {
        return {
            logLevel: 'debug',
            changeOrigin: true,
            prependPath: false
        }
    }

    getRoutes(): any {
        return routes;
    }
}
