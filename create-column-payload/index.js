const functions = require('@google-cloud/functions-framework');

// Define the Cloud Function
functions.http('create-column-payload', (req, res) => {
    // Assuming the request body is structured for Dialogflow webhook
    const ColumnNumber = req.body.queryResult.parameters['no-of-columns'];

    // Define the array of responses
    const responses = [
        `Hey, I have added ${ColumnNumber} columns to your labsheet. Would you mind specifying the type of each column? AVAILABLE TYPES are ID, TEXT, NUMBER, DATE, CONNECTION, LIST`,
        `Fantastic! Your labsheet now includes ${ColumnNumber} columns. What's the next step? Define the type for each column. You can choose from ID, TEXT, NUMBER, DATE, CONNECTION, LIST.`,
        `${ColumnNumber} columns have been successfully added to your labsheet. Let's move on to the next step and specify the type for each column. Options include ID, TEXT, NUMBER, DATE, CONNECTION, LIST.`,
        `${ColumnNumber} columns are now part of your labsheet. The next task is to define the type for each column. Choose from ID, TEXT, NUMBER, DATE, CONNECTION, LIST.`,
        `You've successfully created a labsheet with ${ColumnNumber} columns. Now, let's set the type for each column. Options include ID, TEXT, NUMBER, DATE, CONNECTION, LIST.`,
        `${ColumnNumber} columns have been added to your labsheet. Next up, specify the type for each column. Choose from ID, TEXT, NUMBER, DATE, CONNECTION, LIST.`
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
