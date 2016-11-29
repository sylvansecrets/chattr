import React from 'react';

class Message extends React.Component {
  render(){
    return (
      <ul>
        {this.props.chatMessages.map(message =>
          <li key={message.id} className={message.type}>
            <span className='author'> {message.user} </span>
            <span className='message_body'>{message.text}</span>
          </li>)}
      </ul>
      )
  }
}

export default Message;