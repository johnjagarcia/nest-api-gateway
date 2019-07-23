import { Proxy } from "http-proxy-middleware";

export interface Gateway {
    getDefaultOptions(): any;
    getRoutes(): Proxy[];
}
