import React from 'react';

class Message extends React.Component {


  render(){
    const message = this.props.messageToRender;
    return (
      <li className={message.class} key={this.props.uid}>
        <span className='author'> {message.user} </span>
        <span className='message_body'> {message.text} </span>
      </li>
      )
  }
}

export default Message;