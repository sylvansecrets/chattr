import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
require('uuid')

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

  newMessages(messages_list, from_server=false){
    let message_list = [];
    for (let i=0; i<messages_list.length; i+= 1){
      let message = messages_list[i];
      let id = this.state.chatMessages.length + 1 + i;
      let uid = uuid.v4();
      let new_message = {id:id, text:message.text, type:message.type, user:message.user, uuid: uid};
      message_list.push(new_message)
    }
    console.log(message_list);
    let new_state = this.state.chatMessages.concat(message_list);
    this.setState({chatMessages: new_state});
    console.log(this.state.chatMessages);
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
      console.log(event.data);
      this.newMessages(JSON.parse(event.data), true)
    }

  }

  render() {
    return (
      <div id='container'>
        <nav>
          <h1> Placeholder text </h1>
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
