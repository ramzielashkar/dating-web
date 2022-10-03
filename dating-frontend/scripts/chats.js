const chatPage = document.querySelector('.chat-section');
const allChatContainer = document.querySelector('.all-chats');


const getAllChats = () => {
const chat = `<div class="one-chat flex">
  <input type="hidden" name="" value="12" class="sender-id">
  <div class="sender-img">
    <img src="assets/images.jpeg" alt="" width="100%" height="100%">
  </div>
  <div class="sender-name">Ramzi El Ashkar</div>
</div>`;
allChatContainer.innerHTML+=chat;

};


for(let i=0; i<5;i++){
  getAllChats();
}
