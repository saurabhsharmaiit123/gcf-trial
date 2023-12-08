async function ListItemsPayload(agent) {
    const responses = [
      "How many items would you like to add to your list?",
      "Specify the number of items you want to include in your list.",
      "Please specify how many items should be included in your list."
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const customPayload = {
      "type": "REQUEST_INFO",
      "message": randomResponse
    };
    agent.add(`payload: ${JSON.stringify(customPayload)}`);
  }