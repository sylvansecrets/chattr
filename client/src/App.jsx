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
    this.uuidCheck = this.uuidCheck.bind(this);
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

  newMessages(messages_list, from_server=false){
    let message_list = {};
    for (let i=0; i<messages_list.length; i+= 1){
      let message = messages_list[i];
      if (this.uuidCheck(message.uuid)){
        console.log('Confirmed to have reached server');
        break;
      } else {
        let id = this.state.chatMessages.length + 1 + i;
        let uid = uuid.v4();
        let new_message = {id:id, text:message.text, type:message.type, user:message.user};
        message_list[uid] = new_message;
      }
      console.log("state addition", JSON.stringify(message_list))
    }
    // let new_state = this.state.chatMessages.concat(message_list);
    let new_state = Object.assign({}, this.state.chatMessages, message_list)
    this.setState({chatMessages: new_state});
    console.log('outgoing data', new_state)
    !from_server ? this.webSocket.send(JSON.stringify(new_state)) : {};
    console.log(this.state.chatMessages)
  }

  shiftUser(username){
    this.setState({
      currentUser: username
    })
  }

  // checks if a uid already exists inside this.state
  uuidCheck(uid){
    return Object.keys(this.state.chatMessages).indexOf(uid) != -1
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
          this.newMessages(JSON.parse(incoming_data.content), true);
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
        <div className='message_list'>
          <MessageList className='message_list'
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
