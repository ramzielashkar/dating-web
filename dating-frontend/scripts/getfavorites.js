const favoritesSection = document.querySelector('.favorites-section');
const favoritesCards = document.getElementById('favorites-cards');


const getFavorites = () => {

const favoriteCard = `<div class="user-card flex column">
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
    <i class="fa fa-solid fa-bookmark fav-icon selected"></i>
    <div class="end flex">
      <a class="more-info">more info</a>
    </div>
  </div>
</div>`;
favoritesCards.innerHTML+= favoriteCard;
};

for(let i=0; i<4; i++){
  getFavorites();
}
