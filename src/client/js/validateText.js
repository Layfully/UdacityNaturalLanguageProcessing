function validateText(inputText) {
    return typeof(inputText) ===  "string" && inputText !== '';
}

function handleTextValidation(inputText) {
    let validationText = document.getElementById('validation');

    if(!validateText(inputText)) {
        validationText.innerText = "Text can't be empty";
    }
    else {
        validationText.innerText = "";
    }
}

export { validateText, handleTextValidation }
