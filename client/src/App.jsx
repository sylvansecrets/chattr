import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessages: [],
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(text, type="message"){
    const id = this.state.chatMessages.length + 1;
    this.setState = this.state.chatMessages.concat([{
      id: id,
      text: text,
      type: type
    }])
    console.log(this.state);
  }
  render() {
    return (
      <div id='container'>
        <div>
          <h1> Placeholder text </h1>
        </div>
        <MessageList />
        <ChatBar
          newMessage = {this.newMessage}
        />
      </div>
    )
  }

}


export default App;
