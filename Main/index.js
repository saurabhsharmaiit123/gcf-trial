const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');

process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function callFunction(endpoint, agentData) {
    return axios.post(endpoint, { agent: agentData });
  }

  const functionMappings = {
    'Create a Labsheet': 'create-labsheet-payload',
    'Create Columns': 'create-column-payload',
    'Column Type': 'column-type-payload',
    'Column Type - yes': 'list-item-payload',
    'Column Type - yes - custom': 'confirm-create-labsheet-payload',
    'Confirm Create Labsheet With List': 'create-labsheet-with-list',
    'Column Type - no': 'confirm-create-labsheet-without-list-payload',
    'Confirm Create Labsheet Without List': 'create-labsheet-without-list',
    'Default Welcome Intent': 'welcome-intent-payload',
  };

  const intentMap = new Map();

  Object.entries(functionMappings).forEach(([intent, functionEndpoint]) => {
    intentMap.set(intent, agent => {
      callFunction(`https://us-central1-gold-setup-382502.cloudfunctions.net/${functionEndpoint}`, agent);
      // Handle response...
    });
  });

  agent.handleRequest(intentMap);
});
