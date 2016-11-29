import React from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(e){
    console.log("I am here");
    this.props.newMessage(this.messageInput.value);
    this.messageInput.value = '';
  }
  render(){
    return (
      <div id='entry_bar'>
        <form onSubmit = {this.submitHandler}>
          <input ref={el => this.messageInput = el} />
        </form>
      </div>
      )
  }
}

export default ChatBar