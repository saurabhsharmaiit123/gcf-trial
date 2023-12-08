async function CreateLabsheetWithList(agent) {
    const outputContexts = agent.contexts;
    const createColumnsContext = outputContexts.find(context => context.name.includes('labsheet-info'));
    if (createColumnsContext) {
      const labsheetName = createColumnsContext.parameters['labsheet-name.original'];
      const columnType = createColumnsContext.parameters['column-type'];
      const numberOfColumns = createColumnsContext.parameters['no-of-columns.original'];
      const numberOfItems = createColumnsContext.parameters['items-in-list'];
      const question = `Using the labsheet name ${labsheetName}, ${numberOfColumns} and ${columnType} and keep the column_name same as column_type an generate a json payload in the output using the following description:
     To create a labsheet you need to provide a name and a list of columns. 
  use this json for the labsheet: 
      {
          "apiKey": api_key,
          "name": ${labsheetName},
          "columns": []
      } 
  each column has this json format: 
      {
          "position": 0,
          "name": "Sample ID",
          "type": "ID",
          "references":[]
      } 
  where you need at least:
      - one ID type (and only one ID) 
      - any number of columns
  position is the sort order
  type can be NUMBER, TEXT, DATE or LIST
   If the type is LIST. eg. you have a list, the payload of the columns should also include the possible values for the list in the field references like this payload: 
        {
            "position": 0,
            "name": "Sample ID",
            "type": "ID",
            "references": ["item 1", "item 2".....] depending on numberOfItems
        } 
        Add as many items in reference equal to ${numberOfItems} inside list references.
  Also, only if you need a foreign key like columns, use CONNECTION as type. 
  You can only use one ID type per table.
  `;
  
      const actual_payload = {
        question: question
      };
      const url = 'https://us-central1-gold-setup-382502.cloudfunctions.net/azure-openai-resolver';
   try {
        const res = await axios.post(url, actual_payload);
        const responseText = res.data;
        const match = /```json\s*([\s\S]*?)```/.exec(responseText);
        if (match && match[1]) {
          const responsePayload = {
            "type": "DONE",
            "message": JSON.parse(match[1])
          };
          agent.add(`payload: ${JSON.stringify(responsePayload)}`);
        } else {
          agent.add('Failed to extract JSON payload from the response.');
        }
      } catch (error) {
        console.error('Error:', error.message);
        agent.add(`Failed to get a response. Error: ${error.message}`);
      }
    } else {
      console.error('Output context "labsheet-info" not found.');
      agent.add('Oops! Something went wrong. Please try again.');
    }
  }