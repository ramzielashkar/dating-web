const chatPage = document.querySelector('.chat-section');
const chatsContainer  = document.querySelector('.chats-container');
const allChatContainer = document.querySelector('.all-chats');
const senderProfile = document.getElementById('sender-pp');
const senderName = document.getElementById('sender-name');
const chatInfo = document.querySelector('.chat-info');
const specificChats = document.querySelector('.specific-chat');
const messagesContainer = document.querySelector('.messages');
const messageInput= document.getElementById('message-to-send');
const sendBtn = document.querySelector('.sendmsg');

const displayAllChats = (data) => {
const chat = `<div class="one-chat flex">
  <input type="hidden" name="" value="${data.receiver_id}" class="sender-id">
  <div class="sender-img">
    <img src="../dating-server/storage/${data.profile_picture}" alt="" width="100%" height="100%">
  </div>
  <div class="sender-name">${data.name}</div>
</div>`;
allChatContainer.innerHTML+=chat;

};

const displaySpecificChat = (data) => {
  let chat = "";
  if(data.sender_id == user_id){
    console.log('true');
    chat = `<div class="my-msg">
          <p class = "message">${data.content}</p>
        </div>`;
  }else{
    chat = `<div class="sender-msg">
      <p class = "message">${data.content}</p>
    </div>`;
    }

    messagesContainer.innerHTML+= chat;
};

// function to display user to chat with
const displaySender = (data) => {
  const senderInfo = `<div class="sender-img">
<img src="../dating-server/storage/${data.profile_picture}" id = "sender-pp" alt="" width="100%" height="100%">
</div>
<div class="sender-name" id = "sender-name">${data.name}</div>
<input type="hidden" name="" value="${data.user_id}" class="sender-id">`;
chatInfo.innerHTML = senderInfo;
};

// function to fetch post API
const postApi = async (api_url, api_data, api_token = null, ) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                    'Authorization' : "Bearer" + api_token
                }
            }
        );
    }catch(error){
      console.log(error);
    }
}
// function to fetch get API
const getApi = async (api_url, api_token = null,) => {
    try{
        return await axios(
            api_url,
            { headers:{
                    'Authorization' : "Bearer" + api_token
                }
            }
        );
    }catch(error){
      console.log(error);
    }
}

// function to get All Chats
const getAllChats = async () => {
  const data = new FormData;
  data.append("user_id", user_id);
  const getChatsUrl = `${baseUrl}/getchat`;
  const response = await postApi(getChatsUrl, data, token).then((result) => {
  result.data.forEach((item, i) => {
    displayAllChats(item);
    const chat = document.querySelectorAll('.one-chat');
    chat.forEach((item, i) => {
        item.addEventListener('click', () => {
          const id = item.querySelector('.sender-id').value;
          getSender(id);
          getChat(id);
        });
    });

  });

  });
}

// function to get user to chat
const getSender = async (id) => {
  const getChatsUrl = `${baseUrl}/getprofile/${id}`;
  const response = await getApi(getChatsUrl, token).then((result) => {
    displaySender(result.data);
    messagesContainer.innerHTML = "";
  });
};
// function to get chats related to a user
const getChat = async (id) => {
  const data = new FormData;
  data.append("user_id", user_id);
  data.append("receiver_id", id);
  const getChatsUrl = `${baseUrl}/getchat`;
  const response = await postApi(getChatsUrl, data, token).then((result) => {
    result.data.forEach((item, i) => {
      console.log(item);
      displaySpecificChat(item);
    });

  });
};

// function to add a chat
const addChat = () => {
  sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    const id = sendBtn.parentElement.parentElement.querySelector('.chat-info').querySelector('.sender-id').value;
    const data = new FormData;
    data.append("sender_id", user_id);
    data.append("receiver_id", id);
    data.append('content', message);
    const addChatUrl = `${baseUrl}/chat`;
    const response = postApi(addChatUrl, data, token).then((result) => {
      messagesContainer.innerHTML = "";
      messageInput.value ="";
      getChat(id);
    });
 });
};

addChat();



  getAllChats();
