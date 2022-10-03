const profileSection = document.querySelector('.profile-section');
const profilePage = document.querySelector('.profile-page');
const editProfileSection = document.querySelector('.edit-profile-sec');
const editProfileContainer = document.querySelector('.edit-profile-container');

const getProfile = () => {
const profile =`<input type="hidden" class = "user_id" value="ramzi">
<div class="profile-pic">
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

const editProfilePopup = () => {

  const editProfile = `<div class="profile-image">
    <i class="fa fa-times close-edit" aria-hidden="true"></i>
    <div class="edit-pic flex">
      <label for="change-pp">
        <i class="fa fa-solid fa-image fa-2x change-img"></i>
      </label>
      <input type="file" name="image" accept="image/*" capture="environment" id="change-pp" multiple hidden>
    </div>
    <img src="assets/images.jpeg" alt="" width="100%" height="100%">
  </div>
  <div class="changed-inputs flex column">
  <label class ="label" for="changed-location">Location</label>
  <input type="text" name="Location" id="changed-location" class="form-input" placeholder="Beirut">

  <label class ="label" for="changed-name">Name</label>
  <input type="text" name="name" id="changed-name" class="form-input" placeholder="Name...">

  <label class ="label" for="changed-email">Email</label>
  <input type="email" name="email" id="changed-email" class="form-input" placeholder="example@gmail.com">

  <label class ="label" for="changed-password">Password</label>
  <input type="password" name="password" id="changed-password" class="form-input" placeholder="">

  <label class ="label" for="changed-interest">Interest</label>
  <select class="select" id = "changed-interest" name="">
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Both">Both</option>
  </select>

  <div class="button flex">
    <button type="button" name="button" class="btn btn-save" id="save-edit">Save</button>
  </div>
</div>`;

editProfileContainer.innerHTML = editProfile;
editProfileSection.classList.remove('hidden');
};

getProfile();
const editProfileBtn = document.getElementById('edit-profile');


editProfileBtn.addEventListener('click', () => {
  editProfilePopup();
  const closeEdit = document.querySelector('.close-edit');
  closeEdit.addEventListener('click', () => {
    editProfileSection.classList.add('hidden');
  });
});
