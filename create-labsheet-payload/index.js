async function CreateLabsheetPayload(agent) {
    const labsheetName = agent.parameters['labsheet-name'];
    const responses = [
      `Fantastic! Your labsheet, ${labsheetName}, has been successfully created. How many columns do you want to add?`,
      `Wohhoo! Your labsheet, ${labsheetName}, has been successfully created. How many columns do you want to add?`,
      `Great news! Labsheet ${labsheetName} is ready. How many columns are you thinking of adding?`,
      `Congratulations! ${labsheetName} has been created. How many columns would you like to include?`,
      `Your labsheet, ${labsheetName}, is good to go! How many columns do you wish to add?`
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const customPayload = {
      "type": "REQUEST_INFO",
      "message": randomResponse
    };
    agent.add(`payload: ${JSON.stringify(customPayload)}`);
  }
  