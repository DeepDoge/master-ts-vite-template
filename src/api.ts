import type { IncomingMessage, ServerResponse, RequestOptions } from "http"

export async function api<T extends IncomingMessage>(req: T, res: ServerResponse<T>, options: RequestOptions)
{
    res.end('Hello World')
}