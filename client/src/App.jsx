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
    this.newMessage = this.newMessage.bind(this);
    this.shiftUser = this.shiftUser.bind(this);
  }

  newMessage(text, user, type="message"){
    const id = this.state.chatMessages.length + 1;
    console.log(text, user, type)
    let new_message = {id, text, type, user};
    let new_state = this.state.chatMessages.concat([new_message]);
    console.log( new_state)
    this.setState({chatMessages:new_state})
    console.log("chat messages", this.state);
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
            newMessage = {this.newMessage}
            currentUser = {this.state.currentUser}
            shiftUser = {this.shiftUser}
          />
        </footer>
      </div>
    )
  }

}


export default App;
