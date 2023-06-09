const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.listen(8081, function () {
});

app.post('/analyzeText', analyzeText);

async function analyzeText(req, res) {
    const formData = new FormData();

    formData.append("key", process.env.API_KEY);
    formData.append("txt", req.body.text);
    formData.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
        const body = await response.json();

        const responseData = {
            subjectivity: body.subjectivity,
            polarity: parsePolarity(body.score_tag),
            text: body.sentence_list.length ? body.sentence_list[Math.floor(Math.random() * body.sentence_list.length)].text : req.body.text
        }

        res.send(responseData)

    } catch (error) {
        console.log('error', error);
    }
}

function parsePolarity(sentiment) {
    let sentimentMap = {
        "P+": "strong positive",
        "P": "positive",
        "NEU": "neutral",
        "N": "negative",
        "N+": "strong negative",
        "NONE": "without polarity"
    };

    return sentimentMap[sentiment];
}

export { analyzeText, parsePolarity }