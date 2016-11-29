import React from 'react';

class Message extends React.Component {
  render(){
    return (
      <ul>
        {this.props.chatMessages.map(message => <li key={message.id}> {message.text} </li>)}
      </ul>
      )
  }
}

export default Message;