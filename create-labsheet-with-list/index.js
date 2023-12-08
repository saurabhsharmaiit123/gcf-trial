const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

// Define the Cloud Function
functions.http('CreateLabsheetWithList', async (req, res) => {
    const outputContexts = req.body.queryResult.outputContexts;
    const createColumnsContext = outputContexts.find(context => context.name.includes('labsheet-info'));

    if (createColumnsContext) {
        const labsheetName = createColumnsContext.parameters['labsheet-name.original'];
        const columnType = createColumnsContext.parameters['column-type'];
        const numberOfColumns = createColumnsContext.parameters['no-of-columns.original'];
        const numberOfItems = createColumnsContext.parameters['items-in-list'];

        const question = `...`; // Keep your existing question string here

        const actual_payload = { question: question };
        const url = 'https://us-central1-gold-setup-382502.cloudfunctions.net/azure-openai-resolver';

        try {
            const response = await axios.post(url, actual_payload);
            const responseText = response.data;
            const match = /```json\s*([\s\S]*?)```/.exec(responseText);

            if (match && match[1]) {
                const responsePayload = {
                    "type": "DONE",
                    "message": JSON.parse(match[1])
                };
                res.send(`payload: ${JSON.stringify(responsePayload)}`);
            } else {
                res.send('Failed to extract JSON payload from the response.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            res.send(`Failed to get a response. Error: ${error.message}`);
        }
    } else {
        console.error('Output context "labsheet-info" not found.');
        res.send('Oops! Something went wrong. Please try again.');
    }
});
