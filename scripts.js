
document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("form");

    formElements.forEach((form) =>
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("from outer page!");
            const submittedForm = event.target.closest("form"); //This will isolate the submitted form if theere are multiple forms in an html page
            const controller = new AbortController();
            if (submittedForm) {
                let allValidationResponse = checkValidations(submittedForm); // Validation function 
                if (!allValidationResponse.responseStatus) { controller.abort(); }
            }
            //URL calls
        })
    );
});

function checkValidations(form) {
    let isValid = true;
    const textElements = form.querySelectorAll('input[type="text"]');
    textElements.forEach((element) => {
        let validationResponse = checkValidationForText(element);
        if (!validationResponse.responseStatus) {
            isValid = false;
            console.log("Reason: ", validationResponse.responseMessage);
        }
    });

    const numberElements = form.querySelectorAll('input[type="number"]');
    numberElements.forEach((element) => {
        let validationResponse = checkValidationForNumber(element);
        if (!validationResponse.responseStatus) {
            isValid = false;
            console.log("Reason: ", validationResponse.responseMessage);
        }
    });

    if (isValid) {
        return { responseStatus: true, responseMessage: `Validation for form is successful` };
    } else {
        return { responseStatus: false, responseMessage: `Validation for form failed` };
    }
}


function checkValidationForText(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute('data-label');
    if (element.value.trim() === '') {
        return {
            responseStatus: false,
            responseMessage: `Input is empty for ${dataLabel}`
        };
    }
    if (element.value.length < element.getAttribute('data-length-min')) {
        return {
            responseStatus: false,
            responseMessage: `The minimun value for ${dataLabel} has not been reached`
        }
    }
    if (element.value.length > element.getAttribute('data-length-max')) {
        return {
            reponseStatus: false,
            responseMessage: `The maximum value for ${dataLabel} has been exceeded`
        };
    }
    return {
        responseStatus: true,
        responseMessage: `Validation for ${dataLabel} is succesful`
    };
}

function checkValidationForNumber(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute('data-label');
    if (element.value.trim() === '') {
        return {
            responseStatus: false,
            responseMessage: `Input is empty for ${dataLabel}`
        };
    }
    if (element.value.length < element.getAttribute('data-length-min')) {
        return {
            responseStatus: false,
            responseMessage: `The minimun value for ${dataLabel} has not been reached`
        }
    }
    if (element.value.length > element.getAttribute('data-length-max')) {
        return {
            reponseStatus: false,
            responseMessage: `The maximum value for ${dataLabel} has been exceeded`
        };
    }
    return { responseStatus: true, responseMessage: `Validation for ${dataLabel} is succesful` };
}
