//This script just validates the form

function checkValidations(form) {
    let isFormValid = true;
    const textElements = form.querySelectorAll('input[type="text"][required]');
    //Check if there are textElements before using loop
    textElements.forEach((element) => {
        let validationResponse = checkValidationForText(element);
        if (!validationResponse.responseStatus) {
            isFormValid = false;
            console.log("Reason: ", validationResponse.responseMessage);
        }
    });

    const numberElements = form.querySelectorAll('input[type="number"][required]');
    numberElements.forEach((element) => {
        let validationResponse = checkValidationForNumber(element);
        if (!validationResponse.responseStatus) {
            isFormValid = false;
            console.log("Reason: ", validationResponse.responseMessage);
        }
    });

    if (isFormValid) {
        return {
            responseStatus: true,
            responseMessage: `Validation for form is successful`,
        };
    } else {
        return {
            responseStatus: false,
            responseMessage: `Validation for form failed`,
        };
    }
}

function checkValidationForText(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute("data-label");
    if (element.value.trim() === "") {
        return {
            responseStatus: false,
            responseMessage: `Input is empty for ${dataLabel}`,
        };
    }
    if (element.value.length < element.getAttribute("data-length-min")) {
        return {
            responseStatus: false,
            responseMessage: `The minimun value for ${dataLabel} has not been reached`,
        };
    }
    if (element.value.length > element.getAttribute("data-length-max")) {
        return {
            reponseStatus: false,
            responseMessage: `The maximum value for ${dataLabel} has been exceeded`,
        };
    }
    return {
        responseStatus: true,
        responseMessage: `Validation for ${dataLabel} is succesful`,
    };
}

function checkValidationForNumber(element) {
    //Check your validations for text elements here
    const dataLabel = element.getAttribute("data-label");
    if (element.value.trim() === "") {
        return {
            responseStatus: false,
            responseMessage: `Input is empty for ${dataLabel}`,
        };
    }
    if (element.value.length < element.getAttribute("data-length-min")) {
        return {
            responseStatus: false,
            responseMessage: `The minimun value for ${dataLabel} has not been reached`,
        };
    }
    if (element.value.length > element.getAttribute("data-length-max")) {
        return {
            reponseStatus: false,
            responseMessage: `The maximum value for ${dataLabel} has been exceeded`,
        };
    }
    return {
        responseStatus: true,
        responseMessage: `Validation for ${dataLabel} is succesful`,
    };
}
