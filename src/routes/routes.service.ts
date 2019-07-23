import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './interfaces/route.interface';

@Injectable()
export class RoutesService {
    constructor(@InjectModel('Routes') private readonly routeModel: Model<Route>) { }

    async getRoutes(): Promise<Route[]> {
        return await this.routeModel.find().exec()
    }
}
