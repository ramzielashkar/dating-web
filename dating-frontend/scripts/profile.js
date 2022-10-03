const profileSection = document.querySelector('.profile-section');
const profilePage = document.querySelector('.profile-page');


const getProfile = () => {
const profile =`<input type="hidden" class = "user_id" value="ramzi">
<div class="profile-pic">
<div class="edit-pic flex">
  <label for="change-pp">
    <i class="fa fa-solid fa-image fa-2x change-img"></i>
  </label>
  <input type="file" name="image" accept="image/*" capture="environment" id="change-pp" multiple hidden>
</div>
<img src="assets/images.jpeg" alt="" width="100%" height="100%">
</div>
<div class="user-info flex column">
<div class="info flex">
  <div class="">Name:</div>
  <div class="data">Jane Doe</div>
</div>
<div class="info flex">
  <div class="">Age:</div>
  <div class="data">25</div>
</div>
<div class="info flex">
  <div class="">Location:</div>
  <div class="data">Beirut</div>
</div>
<div class="info flex">
  <div class="">Interest:</div>
  <div class="data">Females</div>
</div>
<div class="info flex">
  <div class="">Bio:</div>
  <div class="data blur">Jane Doe sdhjdjshdsjdhsjdhsjdhjshd</div>
</div>
</div>

<div class="profile-btns flex">
<button type="button" name="logout" id = "logout" class = "btn btn-profile">Logout</button>
<button type="button" name="edit" id = "edit-profile" class = "btn btn-profile">Edit Profile</button>
</div>`;

profilePage.innerHTML = profile;
};

getProfile();
