document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("form");

    formElements.forEach((form) =>
        form.addEventListener("submit", function (event) {
            debugger;
            event.preventDefault();
            const submittedForm = event.target.closest("form"); //This will isolate the submitted form if theere are multiple forms in an html page
            const controller = new AbortController();
            if (submittedForm) {
                let allValidationResponse = checkValidations(submittedForm); // Validation function
                if (!allValidationResponse.responseStatus) {
                    controller.abort();
                }
            }
            //URL calls
            const url = form.action;
            const formData = ""; //take form data;

            fetch(url, {
                method: "POST", //take from form method
                headers: { "Content-Type": "application/json" },
                //signal: signal,
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((newUserData) =>
                    console.log("New user data: ", newUserData)
                )
                .catch((error) => {
                    console.log(error);
                });
        })
    );
});

function checkValidations(form) {
    debugger;
    let isValid = true;
    const textElements = form.querySelectorAll('input[type="text"]');
    //Check if there are textElements before using loop
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
