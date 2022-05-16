'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const SunshineConversationsApi = require('sunshine-conversations-client');

// Config
let defaultClient = SunshineConversationsApi.ApiClient.instance;
let basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'act_6275048027598500f5ad2b55';
basicAuth.password = '8ONzwAxg3zYPPtRlNTPEnjtcoJFlBTLAsHiU7nCozCNLJz9hzYStWmetjRJpQtw_nWzzL_9iIkM2lN9S1TPgOg';
const PORT = 8000;

const appApiInstance = new SunshineConversationsApi.AppsApi();
const messageApiInstance = new SunshineConversationsApi.MessagesApi()

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#operation/eventWebhooks
app.post('/messages', function(req, res) {
  console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const appId = req.body.app.id;
  const trigger = req.body.events[0].type;

  // Call REST API to send message https://docs.smooch.io/rest/#operation/postMessage
  if (trigger === 'conversation:message') {
    const authorType = req.body.events[0].payload.message.author.type;
    if(authorType === 'user'){
        const conversationId = req.body.events[0].payload.conversation.id;
        sendMessage(appId, conversationId);
        res.end();
    }
  }
});

const createApp = async (req, res) => {
  const appCreateBody = new SunshineConversationsApi.AppCreateBody('MyTestApp');
  try {
    const response = await appApiInstance.createApp(appCreateBody)
    console.log('API called successfully. Returned data: ' + response);
    res.status(200).send('OK')
  } catch (e) {
    console.log(e)
    res.status(400).send('NOT OK')
  }
}

app.get('/create', createApp)

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function sendMessage(appId, conversationId){
  const imageExampleUrl = 'https://daily.jstor.org/wp-content/uploads/2020/06/why_you_should_learn_the_names_of_trees_1050x700.jpg'

  const messagePost = new SunshineConversationsApi.MessagePost();  
  messagePost.setAuthor({type: 'business'});
  messagePost.setContent({type: 'image', mediaUrl: imageExampleUrl, altText: 'modal-image' });

  const response = await messageApiInstance.postMessage(appId, conversationId, messagePost);
  console.log('API RESPONSE:\n', response);
}
