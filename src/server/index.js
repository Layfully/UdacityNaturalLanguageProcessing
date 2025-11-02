import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

// Initialize dotenv to load environment variables.
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

function parsePolarity(sentiment) {
    const sentimentMap = {
        "P+": "strong positive",
        "P": "positive",
        "NEU": "neutral",
        "N": "negative",
        "N+": "strong negative",
        "NONE": "without polarity"
    };
    return sentimentMap[sentiment];
}

async function analyzeText(req, res) {
    // FormData is available globally in recent Node versions.
    const formData = new FormData();
    formData.append("key", process.env.API_KEY);
    formData.append("txt", req.body.text);
    formData.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formData,
    };

    try {
        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const body = await response.json();

        const responseData = {
            subjectivity: body.subjectivity,
            polarity: parsePolarity(body.score_tag),
            text: body.sentence_list.length ? body.sentence_list[Math.floor(Math.random() * body.sentence_list.length)].text : req.body.text
        };

        res.send(responseData);

    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send({ error: 'An error occurred while analyzing the text.' });
    }
}

export { analyzeText, parsePolarity }