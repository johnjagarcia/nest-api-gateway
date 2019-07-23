import * as httpProxy from 'http-proxy-middleware'

export interface Proxy extends httpProxy.Config {
    path: string[]
}
