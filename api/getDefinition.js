import { initializeZapt } from '@zapt/zapt-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { word } = req.body;

        if (!word) {
            return res.status(400).json({ error: 'Word is required' });
        }

        const { createEvent } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

        const response = await createEvent('chatgpt_request', {
            prompt: `Define the word "${word}" in a concise and clear manner.`,
            response_type: 'text'
        });

        res.status(200).json({ meaning: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}