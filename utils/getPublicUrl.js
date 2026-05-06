import ngrok from '@ngrok/ngrok';
import dotenv from 'dotenv';

dotenv.config();

let url = null;

export default async function getPublicUrl() {
    try {
        if (!url) {
            const listener = await ngrok.connect({
                authtoken: process.env.NGROK_AUTH_TOKEN,
                addr: process.env.PORT || 3000
            });

            url = listener.url();

            console.log(`Public URL in function: ${url}`);
        }

        return url;

    } catch (error) {
        console.error('Error connecting to ngrok:', error);
    }
}