import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render(){
    return (
      <div>
        <p> Placeholder message </p>
        <Message
          chatMessages = {this.props.chatMessages}
        />
      </div>
      )
  }
}

MessageList.defaultProps = {
  chatMessages: []
}

export default MessageList;