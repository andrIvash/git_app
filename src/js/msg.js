/**
 * App status messages class
 */

class Message {
  /**
    * @param {text} containerId
   */
  constructor(containerId) {
     this.msgBox = document.querySelector(containerId);
     this.isShow = null;
  }

  /**
   * Show message according with type (error or not)
   * @param {text} msg
   * @param {boolean} errStatus
   */
   show(msg, errStatus) {
     if(this.isShow !== null) {
       clearInterval(this.isShow);
     }
     if (errStatus) {
       this.msgBox.classList.remove('messages_ok');
       this.msgBox.classList.add('messages_err');
     } else {
       this.msgBox.classList.remove('messages_err');
       this.msgBox.classList.add('messages_ok');
     }
     this.msgBox.classList.remove('messages_hide');
     this.msgBox.innerHTML = msg;
     this.isShow = setTimeout(() => {
       this.msgBox.classList.add('messages_hide');
       this.msgBox.innerHTML = '';
     }, 1500);
   }
}

export default function(...args) { return new Message(...args) };