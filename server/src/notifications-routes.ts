import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey = 'BA73uYVcuXH7-sGkc7xltN2z_ExGbhgBAxpycHFef4SPnntteSi3DJ9-PCtTs_uTI7lr4apK4jlUgc_3KM_PReY';
const privateKey = 'Qa8tp4L0BK5s4q2o3DpLlmUsD8IRUGsDWAZyH4FFeNs';

WebPush.setVapidDetails(
    'http://localhost:3333',
    publicKey,
    privateKey
);

export async function notificationsRoutes(app: FastifyInstance) {

    app.get('/push/public_key', () => {
        return {
            publicKey,   
        }
    });

    app.post('/push/register', (request, response) => {
       //salvar no banco de dados
        return response.status(201).send();
    });

    app.post('/push/send', async (request, response) => {
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string(),
                })
            }) 
        })

        const { subscription } = sendPushBody.parse(request.body);

        WebPush.sendNotification(subscription, 'hello do backend');

        return response.status(201).send();
    });
}