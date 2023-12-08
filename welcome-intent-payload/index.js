async function WelcomeIntentPayload(agent) {
    const responses = [
      `Greetings, researcher! Scibot here, geared up to streamline your labsheet setup. You can type 'Create a Labsheet' followed by the name of labsheet to continue.`,
      `Hello, researcher! Scibot is ready to assist. Feel free to initiate the labsheet creation process by typing 'Create a Labsheet' followed by the desired name.`
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const customPayload = {
      "type": "REQUEST_INFO",
      "message": randomResponse
    };
    agent.add(`payload: ${JSON.stringify(customPayload)}`);
  }