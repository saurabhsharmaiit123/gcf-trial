async function ColumnTypePayload(agent) {
    const ColumnType = agent.parameters['column-type'];
    const responses = [
     `Is any of your column type list? `,
      `Are there any list-type columns in your labsheet?`,
      `Want to confirm if you've added a list-type column to your labsheet`
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const customPayload = {
      "type": "REQUEST_INFO",
      "message": randomResponse
    };
    agent.add(`payload: ${JSON.stringify(customPayload)}`);
  }