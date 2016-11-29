import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render(){
    return (
        <Message
          chatMessages = {this.props.chatMessages}
        />
      )
  }
}

MessageList.defaultProps = {
  chatMessages: []
}

export default MessageList;