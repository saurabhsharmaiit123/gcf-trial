async function ConfirmCreateLabsheetPayload(agent) {
    const outputContexts = agent.contexts;
    const createColumnsContext = outputContexts.find(context => context.name.includes('labsheet-info'));
    if (createColumnsContext) {
      const labsheetName = createColumnsContext.parameters['labsheet-name.original'];
      const columnType = createColumnsContext.parameters['column-type'];
      const numberOfColumns = createColumnsContext.parameters['no-of-columns.original'];
      const numberOfItems = createColumnsContext.parameters['items-in-list'];
    const responses = [
      `So far, you want to create a labsheet named ${labsheetName} with ${numberOfColumns} columns of the type ${columnType}?`
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const customPayload = {
      "type": "REQUEST_CONFIRMATION",
      "message": randomResponse
    };
    agent.add(`payload: ${JSON.stringify(customPayload)}`);
  }
    }