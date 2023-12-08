const functions = require('@google-cloud/functions-framework');

// Define the Cloud Function
functions.http('create-labsheet-payload', (req, res) => {
    // Assuming the request body is structured for Dialogflow webhook
    const labsheetName = req.body.queryResult.parameters['labsheet-name'];

    // Define the array of responses
    const responses = [
        `Fantastic! Your labsheet, ${labsheetName}, has been successfully created. How many columns do you want to add?`,
        `Wohhoo! Your labsheet, ${labsheetName}, has been successfully created. How many columns do you want to add?`,
        `Great news! Labsheet ${labsheetName} is ready. How many columns are you thinking of adding?`,
        `Congratulations! ${labsheetName} has been created. How many columns would you like to include?`,
        `Your labsheet, ${labsheetName}, is good to go! How many columns do you wish to add?`
    ];

    // Select a random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Create the custom payload
    const customPayload = {
        "type": "REQUEST_INFO",
        "message": randomResponse
    };

    // Send the response
    res.send(`payload: ${JSON.stringify(customPayload)}`);
});
