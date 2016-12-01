import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  prepareMessages() {
    let message_list = [];
    let uid_list = [];
    for (let uid in this.props.chatMessages){
      message_list.push(this.props.chatMessages[uid])
      uid_list.push(uid);
    }
    return [message_list, uid_list];
  }
  render(){
    const message_data = this.prepareMessages();
    const message_list = message_data[0];
    const uid_list = message_data[1];
    return (
      <ul>
      { message_list.map((message, index) =>
        <Message
          messageToRender = {message}
          uid = {uid_list[index]}
          key = {uid_list[index]}
        />
      )
    }
    </ul>
    )
  }
}

MessageList.defaultProps = {
  chatMessages: []
}

export default MessageList;