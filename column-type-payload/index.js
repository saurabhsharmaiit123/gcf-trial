const functions = require('@google-cloud/functions-framework');

// Define the Cloud Function
functions.http('column-type-payload', (req, res) => {
    // Extracting parameters from the request
    let ColumnType = req.body.queryResult.parameters['column-type'];

    // Define the array of responses
    const responses = [
        `Is any of your column type list?`,
        `Are there any list-type columns in your labsheet?`,
        `Want to confirm if you've added a list-type column to your labsheet`
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
