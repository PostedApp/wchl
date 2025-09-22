import { Response } from 'express';

export async function handlePingCommand(res: Response): Promise<Response> {
    return res.json({
        type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
        data: {
            content: 'Pong!',
        },
    });
}
