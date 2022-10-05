const profileSection = document.querySelector('.profile-section');
const profilePage = document.querySelector('.profile-page');
const editProfileSection = document.querySelector('.edit-profile-sec');
const editProfileContainer = document.querySelector('.edit-profile-container');
const navImg = document.getElementById('nav-img');

const displayProfile = (data) => {
  let interest = "";
if(data.interest_id == 1){
  interest="Male";
}else if(data.interest_id == 2){
  interest ="Female";
}else{
  interest = "Both";
}
const profile =`<input type="hidden" class = "user_id" value="${data.user_id}">
<div class="profile-pic">
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
  <div class="">Interest:</div>
  <div class="data">${interest}</div>
</div>
<div class="info flex">
  <div class="">Bio:</div>
  <div class="data blur">${data.bio}</div>
</div>
</div>

<div class="profile-btns flex">
<button type="button" name="logout" id = "logout" class = "btn btn-profile">Logout</button>
<button type="button" name="edit" id = "edit-profile" class = "btn btn-profile">Edit Profile</button>
</div>`;
navImg.src = `../dating-server/storage/${data.profile_picture}`;
profilePage.innerHTML = profile;
};

const editProfilePopup = (data) => {

  const editProfile = `<div class="profile-image">
    <i class="fa fa-times close-edit" aria-hidden="true"></i>
    <div class="edit-pic flex">
      <label for="change-pp">
        <i class="fa fa-solid fa-image fa-2x change-img"></i>
      </label>
      <input type="file" name="image" accept="image/*" capture="environment" id="change-pp" multiple hidden>
    </div>
    <img src="../dating-server/storage/${data.profile_picture}" id ="changed-profile-picture" alt="" width="100%" height="100%">
  </div>
  <div class="changed-inputs flex column">
  <label class ="label" for="changed-bio">Bio</label>
  <textarea id = "changed-bio" name="bio" class="form-input" rows="8" cols="80" placeholder="What about you..."></textarea>

  <div class="button flex">
    <button type="button" name="button" class="btn btn-save" id="save-edit">Save</button>
  </div>
</div>`;
editProfileContainer.innerHTML = editProfile;
editProfileSection.classList.remove('hidden');
};



// function to fetch get API
const getAPIs = async (api_url, api_token = null,) => {
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
// function to fetch Post API
const postAPIs = async (api_url, api_data, api_token = null, ) => {
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


// function to get user profile
const getProfile = async () => {
const getProfileUrl = `${baseUrl}/getprofile/${user_id}`;
const response = await getAPIs(getProfileUrl, token).then((result) => {
displayProfile(result.data);
const editProfileBtn = document.getElementById('edit-profile');
editProfileBtn.addEventListener('click', () => {
displayPopup(result.data);
});
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', () => {
  localStorage.setItem('token', '');
  location.replace('index.html');
});

});
};

const editProfile = async (data) => {
const editProfileUrl = `${baseUrl}/profile`;
data.append('user_id', user_id);
const response = await postAPIs(editProfileUrl, data, token).then((result) => {
  getProfile();

});
};


const displayPopup = (data) => {
  editProfilePopup(data);
  const changeProfilePic = document.getElementById('change-pp');
  const changedBioInput = document.getElementById('changed-bio');
  const changedProfilePic = document.getElementById('changed-profile-picture');

  changeProfilePic.addEventListener('change', () => {
    changedProfilePic.src = URL.createObjectURL(event.target.files[0]);
  });
  const closeEdit = document.querySelector('.close-edit');
  closeEdit.addEventListener('click', () => {
    editProfileSection.classList.add('hidden');
  });

  const saveEditedBtn = document.getElementById('save-edit');
  saveEditedBtn.addEventListener('click', () => {
    const changedBio = changedBioInput.value;
    if(changeProfilePic.files.length>0){
      let profilePic = changeProfilePic.files[0];
      let fileReader = new FileReader();
          // Convert to base64 after load
          fileReader.onload = function (fileLoadedEvent) {
              let fileInputBase64 = fileLoadedEvent.target.result;
              let changedData = new FormData();
              changedData.append("bio", changedBio);
              changedData.append("profile_picture", fileInputBase64);
              editProfile(changedData);
            }
          fileReader.readAsDataURL(profilePic, changedBio);
    }
    editProfileSection.classList.add('hidden');

  });
};
getProfile();
