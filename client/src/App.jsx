import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('uuid')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessages: [],
      currentUser: 'Anonymous'
    }
    this.newMessages = this.newMessages.bind(this);
    this.shiftUser = this.shiftUser.bind(this);
    this.webSocket = new WebSocket ("ws://localhost:4000/");
  }

  // newMessage(text, user, type="message"){
  //   const id = this.state.chatMessages.length + 1;
  //   console.log(text, user, type)
  //   let new_message = {id, text, type, user};
  //   let new_state = this.state.chatMessages.concat([new_message]);
  //   console.log( new_state)
  //   this.setState({chatMessages:new_state})
  //   console.log("chat messages", this.state.chatMessages);
  // }

  newMessages(incoming, from_server=false){
    let new_state = Object.assign({}, this.state.chatMessages, incoming)
    this.setState({chatMessages: new_state});
    console.log('outgoing data', new_state)
    !from_server ? this.webSocket.send(JSON.stringify(new_state)) : {};
  }

  shiftUser(username){
    this.setState({
      currentUser: username
    })
  }

  componentDidMount(){
    this.webSocket.onopen = function(event){
      console.log('Established connection to websocket')
    }

    this.webSocket.onmessage = (event) => {
      let incoming_data = JSON.parse(event.data)
      console.log("incoming data", event.data);
      switch (incoming_data.socket_type){
        case 'message':
          console.log("add message", incoming_data.content)
          this.newMessages(incoming_data.content, true);
          break;
        case 'user_count':
          this.setState({user_count: incoming_data.content})
      }
    }
  }

  render() {
    console.log("chatMessages", JSON.stringify(this.state.chatMessages));
    return (
      <div id='container'>
        <nav>
          <h1> Placeholder text </h1>
          <h3> Users Online {this.state.user_count} </h3>
        </nav>
        <div className='message_obj'>
          <MessageList className='message_obj'
            chatMessages = {this.state.chatMessages}
          />
        </div>
        <footer>
          <ChatBar
            newMessages = {this.newMessages}
            currentUser = {this.state.currentUser}
            shiftUser = {this.shiftUser}
          />
        </footer>
      </div>
    )
  }

}


export default App;
