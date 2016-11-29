import React from 'react';
const changeString = ' changed their name to '

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(e){
    e.preventDefault();
    if (this.nameInput.value !== this.props.currentUser){
      console.log("Change user message")
      this.props.newMessage(this.props.currentUser+changeString+this.nameInput.value, null, "change_user");
      this.props.shiftUser(this.nameInput.value);
    } else {
      this.props.newMessage(this.messageInput.value, this.nameInput.value);
    }
    setTimeout(function(){
      this.props.newMessage(this.messageInput.value, this.nameInput.value);
    }.bind(this), 1000)




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