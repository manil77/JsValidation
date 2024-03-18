document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("form");

    formElements.forEach((form) =>
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const submittedForm = event.target.closest("form"); //This will isolate the submitted form if theere are multiple forms in an html page
            if (submittedForm) {
                checkValidations(submittedForm); // Validation function 
            }
            //URL calls
        })
    );
});

function checkValidations(form) {
    debugger;
    const textElements = form.querySelectorAll('input[type="text"]'); //Text element
    textElements.forEach((element) => {//Validation for input type"text"
        let validationResponse = checkValidationForText(element);
        if (!validationResponse.reponseStatus) {
            console.log("Reason: ", validationResponse.responseMessage);
        }
    });
    const numberElements = form.querySelectorAll('input[type="number"]');
    numberElements.forEach((element) => { //Validation for input type "number" here 
        let validationResponse = checkValidationForNumber(element);
        if (!validationResponse.responseStatus) {
            console.log("Reason: ", validationResponse.responseMessage);
        }

    })
}

function checkValidationForText(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute('data-label');
    if (element.value.trim() === '') {
        return { responseStatus: false, responseMessage: `Input is empty for ${dataLabel}` };
    }
    if (element.value.length < element.getAttribute('data-length-min')) {
        return { responseStatus: false, responseMessage: `The minimun value for ${dataLabel} has not been reached` }
    }
    if (element.value.length > element.getAttribute('data-length-max')) {
        return { reponseStatus: false, responseMessage: `The maximum value for ${dataLabel} has been exceeded` };
    }
    return { responseStatus: true, responseMessage: `Validation for ${dataLabel} is succesful` };
}

function checkValidationForNumber(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute('data-label');
    if (element.value.trim() === '') {
        return { responseStatus: false, responseMessage: `Input is empty for ${dataLabel}` };
    }
    if (element.value.length < element.getAttribute('data-length-min')) {
        return { responseStatus: false, responseMessage: `The minimun value for ${dataLabel} has not been reached` }
    }
    if (element.value.length > element.getAttribute('data-length-max')) {
        return { reponseStatus: false, responseMessage: `The maximum value for ${dataLabel} has been exceeded` };
    }
    return { responseStatus: true, responseMessage: `Validation for ${dataLabel} is succesful` };
}
