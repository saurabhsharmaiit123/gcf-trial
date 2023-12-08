const functions = require('@google-cloud/functions-framework');

// Define the Cloud Function
functions.http('ListItemsPayload', (req, res) => {
    // Define the array of responses
    const responses = [
        "How many items would you like to add to your list?",
        "Specify the number of items you want to include in your list.",
        "Please specify how many items should be included in your list."
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
