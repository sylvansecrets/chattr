// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const colors = [];
for (let i=0; i<7; i+=1){
  colors.push(`hsla(${Math.floor(i*360/7)}, 75%, 50%, 1)`)
}
console.log(colors);


// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function postUserCount(){
  wss.clients.forEach((clientSocket) => {
    clientSocket.send(JSON.stringify({
      socket_type: "user_count",
      content: wss.clients.length
    }));
  });
}

function randomColor(){
  selected =  colors[Math.floor(Math.random()*colors.length)]
  console.log(selected)
  return selected;
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.color = randomColor();
  postUserCount();

  ws.on('message', (message) => {
    message = JSON.parse(message);
    console.log('before adding color', message);

    wss.clients.forEach((clientSocket) => {
      for (uid in message){
        console.log(uid);
        console.log('individual', message[uid])
        message[uid]['color'] = ws.color
      }
      console.log('after adding color', message)
      clientSocket.send(JSON.stringify(message));
    })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    postUserCount();
  })
})
});