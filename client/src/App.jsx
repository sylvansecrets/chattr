import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessages: [],
      currentUser: 'Anonymous'
    }
    this.newMessages = this.newMessages.bind(this);
    this.shiftUser = this.shiftUser.bind(this);
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

  newMessages(messages_list){
    let message_list = [];
    for (let i=0; i<messages_list.length; i+= 1){
      let message = messages_list[i];
      let id = this.state.chatMessages.length + 1 + i;
      let new_message = {id:id, text:message.text, type:message.type, user:message.user};
      message_list.push(new_message)
    }
    console.log(message_list);
    let new_state = this.state.chatMessages.concat(message_list);
    this.setState({chatMessages: new_state});
    console.log(this.state.chatMessages);
  }

  shiftUser(username){
    this.setState({
      currentUser: username
    })
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
