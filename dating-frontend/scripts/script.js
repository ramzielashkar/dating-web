const homeSection = document.getElementById('users-section');
const usersCards = document.querySelector('.users-cards');
const moreInfoSection = document.querySelector('.users-more-info');
const favoriteTab = document.getElementById('favorites');
const homeTab = document.getElementById('home');
const chatTab = document.getElementById('chats');
const profileTab = document.querySelector('.profile');
const burgerMenu = document.querySelector('.burger-menu');
const mobileNavBar = document.querySelector('.mobile-nav');
const user_id = localStorage.getItem('user_id');
const token = localStorage.getItem('token');
const baseUrl = "http://127.0.0.1:8000/api";
const mobileHome = document.getElementById('mobile-home');
const mobileFavorites = document.getElementById('mobile-favorites');
const mobileChats = document.getElementById('mobile-chats');
const mobileProfile = document.getElementById('mobile-profile');


// functions

// function to get users
const displayUsers = (data) => {
  const userCard = `<div class="user-card flex column">
  <input type="hidden" name="" value="${data.user_id}" class="user_id">
    <div class="user-img">
      <img src="../dating-server/storage/${data.profile_picture}" alt="" width="100%" height="100%">
    </div>
    <div class="user-info flex column">
      <div class="info flex">
        <div class="">Name:</div>
        <div class="data">${data.name}</div>
      </div>
      <div class="info flex">
        <div class="">Age:</div>
        <div class="data">${data.age}</div>
      </div>
      <div class="info flex">
        <div class="">Location:</div>
        <div class="data">${data.location}</div>
      </div>
    </div>
    <div class="actions flex">
      <i class="far fa-comment-alt chat-icon"></i>
      <i class="fa fa-solid fa-bookmark fav-icon"></i>
      <div class="end flex">
        <a class="more-info">more info</a>
      </div>
    </div>
  </div>`;
  usersCards.innerHTML+= userCard;
};

// function to display more info popup
const displayMoreInfo = (data) => {
  let interest = "";
if(data.interest_id == 1){
  interest="Male";
}else if(data.interest_id == 2){
  interest ="Female";
}else{
  interest = "Both";
}
const userMore = `<div class="user-more flex column">
<input type="hidden" name="" value="${data.id}" class="user_id">
  <div class="user-profile">
    <i class="fa fa-times close-moreinfo" aria-hidden="true"></i>
    <img src="../dating-server/storage/${data.profile_picture}" alt="" width="100%" height="100%">
  </div>
  <div class="user-info flex column">
    <div class="info flex">
      <div class="">Name:</div>
      <div class="data">${data.name}</div>
    </div>
    <div class="info flex">
      <div class="">Age:</div>
      <div class="data">${data.age}</div>
    </div>
    <div class="info flex">
      <div class="">Location:</div>
      <div class="data">${data.location}</div>
    </div>
    <div class="info flex">
      <div class="">Bio:</div>
      <div class="data">${data.bio}</div>
    </div>
    <div class="info flex">
      <div class="">Interest:</div>
      <div class="data">${interest}</div>
    </div>
  </div>
  <div class="block-user flex">
    <button type="button" name="button" class="btn btn-block">Block</button>
  </div>
</div>`;
moreInfoSection.innerHTML = userMore;
moreInfoSection.classList.remove('hidden');
};

// function to fetch Post API
const postAPI = async (api_url, api_data, api_token = null, ) => {
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


// function to fetch getUsers API
const getUsers = async(formData) => {
  usersCards.innerHTML =""
  const getUsersUrl = `${baseUrl}/getusers`;
  console.log(token);
const response = postAPI(getUsersUrl, formData, token).then((result) => {

  result.data.forEach((item, i) => {
    //console.log(item);
    displayUsers(item);
    const moreInfo = document.querySelectorAll('.more-info');
    moreInfo.forEach((items, i) => {
      items.addEventListener("click", () => {
        const id = items.parentElement.parentElement.parentElement.querySelector('.user_id').defaultValue;
        //console.log(id);
        getMoreUserInfo(id);

      });
    });
  const favoriteBtn = document.querySelectorAll('.fav-icon');
  favoriteBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      //console.log(btn);
      let favorite_id = btn.parentElement.parentElement.querySelector('.user_id').defaultValue;
      console.log(favorite_id);
      favUser(favorite_id);
    });
  });

  const chatBtn = document.querySelectorAll('.chat-icon');
  chatBtn.forEach((item, i) => {
    item.addEventListener("click", () => {
      let id = item.parentElement.parentElement.querySelector('.user_id').defaultValue;
      getSender(id);
      getChat(id);
      homeSection.classList.add("hidden");
      chatPage.classList.remove('hidden');
      homeTab.classList.remove('active');
      chatTab.classList.add('active');
    });
  });

  });

});
}

// function to get user more info
const getMoreUserInfo = async (id)=>{
  const getUsersUrl = `${baseUrl}/getusers`;
  let usersFormData = new FormData();
  usersFormData.append('user_id', user_id);
  usersFormData.append('id', id);
  const response = await postAPI(getUsersUrl, usersFormData, token).then((result) => {
    console.log(result.data);
    displayMoreInfo(result.data);
    const close = moreInfoSection.querySelector('.close-moreinfo');
    close.addEventListener("click", () => {
      moreInfoSection.classList.add('hidden');
    });
    const blockBtn = moreInfoSection.querySelector('.btn-block');
    blockBtn.addEventListener("click", () => {
      blockUser(id);
      moreInfoSection.classList.add('hidden');

    });
  });

}

// function to block users
const blockUser = async (id) => {
  const blockUsersUrl = `${baseUrl}/blockuser`;
  let usersFormData = new FormData();
  usersFormData.append('user_id', user_id);
  usersFormData.append('blocked_id', id);
  const response = await postAPI(blockUsersUrl,usersFormData, token).then((result) => {
    getUsers(userFormData);
});
}

let userFormData = new FormData();
userFormData.append('user_id', user_id);
getUsers(userFormData);


// function to favorite users
const favUser = async (id) => {
  const favUsersUrl = `${baseUrl}/favorite`;
  let favFormData = new FormData();
  favFormData.append('user_id', user_id);
  favFormData.append('favorite_id', id);
  const response = await postAPI(favUsersUrl, favFormData, token).then((result) => {
    console.log(result);
    getFavorites();
  });
}

// Event Listeners
favoriteTab.addEventListener("click", () => {
  homeSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  favoritesSection.classList.remove("hidden");
  chatPage.classList.add('hidden');
  favoriteTab.classList.add('active');
  homeTab.classList.remove('active');
  chatTab.classList.remove('active');

});

homeTab.addEventListener("click", () => {
  favoritesSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  chatPage.classList.add('hidden');
  homeSection.classList.remove("hidden");
  favoriteTab.classList.remove('active');
  homeTab.classList.add('active');
  chatTab.classList.remove('active');

});
profileTab.addEventListener("click", () => {
  favoritesSection.classList.add("hidden");
  homeSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
  chatPage.classList.add('hidden');
  favoriteTab.classList.remove('active');
  homeTab.classList.remove('active');
  chatTab.classList.remove('active');

});

chatTab.addEventListener("click", () => {
  favoritesSection.classList.add("hidden");
  homeSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  chatPage.classList.remove('hidden');
  favoriteTab.classList.remove('active');
  homeTab.classList.remove('active');
  chatTab.classList.add('active');
});

burgerMenu.addEventListener('click', () => {
  mobileNavBar.classList.remove('hidden');
});

mobileHome.addEventListener('click', () => {
  favoritesSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  chatPage.classList.add('hidden');
  homeSection.classList.remove("hidden");
  mobileNavBar.classList.add('hidden');
});

mobileChats.addEventListener('click', () => {
  favoritesSection.classList.add("hidden");
  homeSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  chatPage.classList.remove('hidden');
  mobileNavBar.classList.add('hidden');

});

mobileFavorites.addEventListener('click', () => {
  homeSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  favoritesSection.classList.remove("hidden");
  chatPage.classList.add('hidden');
  mobileNavBar.classList.add('hidden');
});

mobileProfile.addEventListener('click', () => {
  favoritesSection.classList.add("hidden");
  homeSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
  chatPage.classList.add('hidden');
  mobileNavBar.classList.add('hidden');
});
