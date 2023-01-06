import type { HttpProxy } from 'vite'

export const api: HttpProxy.Server['web'] = (req, res, options) => 
{
    res.end('Hello World')
}