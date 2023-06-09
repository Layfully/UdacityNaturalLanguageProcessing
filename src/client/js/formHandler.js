export function getFormData() {
    let formText = document.getElementById('name').value
    Client.handleTextValidation(formText)
    return formText;
}

export async function fetchData(formText) {
    const response = await fetch('http://localhost:8081/analyzeText', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: formText })
    });
    return response.json();
}

export function updateDOM(data) {
    document.getElementById('results').innerHTML = `<p>Subjectivity: ${data.subjectivity} </p> <p>Polarity: ${data.polarity} </p> <p>Snippet: ${data.text} </p>`;
}

export function handleSubmit(event) {
    event.preventDefault()

    const formText = getFormData();

    fetchData(formText).then((data) => {
        updateDOM(data);
    });
}