import React from 'react';
const changeString = ' changed their name to '
const uuid = require('uuid');

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(e){
    e.preventDefault();
    let message_obj = {};
    if (this.nameInput.value !== this.props.currentUser){
      console.log("Change user message")
      message_obj[uuid.v4()] = ({text: this.props.currentUser+changeString+this.nameInput.value, type:'change_user'})
      this.props.shiftUser(this.nameInput.value);
    }
    message_obj[uuid.v4()] = ({text:this.messageInput.value, user:this.nameInput.value, type:'message'});

    message_obj !== {} ? this.props.newMessages(message_obj) : {};





    this.messageInput.value = '';
  }
  render(){
    return (
      <div id='entry_bar'>
        <form onSubmit = {this.submitHandler}>
          <input ref={el => this.nameInput = el} placeholder='Your Name (Optional)' id='username' />
          <input ref={el => this.messageInput = el} placeholder='Type a message and hit ENTER' id='new-message' />
          <input type='submit' className='invis' />
        </form>
      </div>
      )
  }
}

export default ChatBar