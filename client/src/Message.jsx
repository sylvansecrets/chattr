import React from 'react';

class Message extends React.Component {


  render(){
    const message = this.props.messageToRender;
    let style_obj = {}
    if (message.color){
      style_obj['color'] = message.color
    }
    return (
      <li className={message.class} key={this.props.uid}>
        <span className='author' style={style_obj}> {message.user} </span>
        <span className='message_body'> {message.text} </span>
      </li>
      )
  }
}

export default Message;