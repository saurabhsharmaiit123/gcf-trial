const functions = require('@google-cloud/functions-framework');

// Define the Cloud Function
functions.http('confirm-create-labsheet-without-list-payload', (req, res) => {
    // Assuming the request body is structured for Dialogflow webhook
    const outputContexts = req.body.queryResult.outputContexts;
    const createColumnsContext = outputContexts.find(context => context.name.includes('columntype-no-followup'));

    if (createColumnsContext) {
        // Extracting parameters from the context
        const labsheetName = createColumnsContext.parameters['labsheet-name.original'];
        const columnType = createColumnsContext.parameters['column-type'];
        const numberOfColumns = createColumnsContext.parameters['no-of-columns.original'];

        // Define the array of responses
        const responses = [
            `So far, you want to create a labsheet named ${labsheetName} with ${numberOfColumns} columns of the type ${columnType}?`
        ];

        // Select a random response
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Create the custom payload
        const customPayload = {
            "type": "REQUEST_CONFIRMATION",
            "message": randomResponse
        };

        // Send the response
        res.send(`payload: ${JSON.stringify(customPayload)}`);
    } else {
        res.send('No labsheet info found in the context.');
    }
});
