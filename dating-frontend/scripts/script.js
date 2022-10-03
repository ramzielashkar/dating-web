const homeSection = document.getElementById('users-section');
const usersCards = document.querySelector('.users-cards');
const moreInfoSection = document.querySelector('.users-more-info');
const favoriteTab = document.getElementById('favorites');
const homeTab = document.getElementById('home');
const chatTab = document.getElementById('chats');
const profileTab = document.querySelector('.profile');


// functions
const getUsers = () => {
  const userCard = `<div class="user-card flex column">
  <input type="hidden" name="" value="ramzi" class="user_id">
    <div class="user-img">
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

const getMoreInfo = () => {
const userMore = `<div class="user-more flex column">
<input type="hidden" name="" value="ramzi" class="user_id">
  <div class="user-profile">
    <i class="fa fa-times close-moreinfo" aria-hidden="true"></i>
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
      <div class="">Bio:</div>
      <div class="data">Jane Doe sdhjdjshdsjdhsjdhsjdhjshd</div>
    </div>
    <div class="info flex">
      <div class="">Interest:</div>
      <div class="data">Females</div>
    </div>
  </div>
  <div class="block-user flex">
    <button type="button" name="button" class="btn btn-block">Block</button>
  </div>
</div>`;
moreInfoSection.innerHTML = userMore;
moreInfoSection.classList.remove('hidden');
};

for(let i=0; i<7; i++){
  getUsers();
}

const moreInfo = document.querySelectorAll('.more-info');
moreInfo.forEach((item, i) => {
  item.addEventListener("click", () => {
    getMoreInfo();
    const close = document.querySelector('.close-moreinfo');
    close.addEventListener("click", () => {
      moreInfoSection.classList.add('hidden');
    });
  });
});

favoriteTab.addEventListener("click", () => {
  homeSection.classList.add("hidden");
  favoritesSection.classList.remove("hidden");
  favoriteTab.classList.add('active');
  homeTab.classList.remove('active');

});

homeTab.addEventListener("click", () => {
  favoritesSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
  favoriteTab.classList.remove('active');
  homeTab.classList.add('active');
});
