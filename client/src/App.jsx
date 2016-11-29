import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatMessages: [],
    }
  }
  render() {
    return (
      <div id='container'>
        <div>
          <h1> Placeholder text </h1>
        </div>
        <MessageList />
        <ChatBar />
      </div>
    )
  }
}


export default App;
