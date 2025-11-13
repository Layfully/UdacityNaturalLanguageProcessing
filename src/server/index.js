import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

const PORT = 8081;
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!`);
});

app.post('/analyzeText', analyzeText);

async function analyzeText(req, res) {
    const API_URL = "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english";
    const API_KEY = process.env.HF_API_KEY;

    try {
        const payload = {
            inputs: req.body.text,
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const body = await response.json();
        console.log('API Response Body:', body); // Good for debugging!

        let highestScore = 0;
        let polarity = 'neutral';
        if (body.length > 0 && body[0].length > 0) {
            body[0].forEach(item => {
                if (item.score > highestScore) {
                    highestScore = item.score;
                    polarity = item.label.toLowerCase();
                }
            });
        }

        const responseData = {
            polarity: polarity,
            text: req.body.text
        };

        res.send(responseData);

    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send({ error: 'An error occurred while analyzing the text.' });
    }
}

export { analyzeText };