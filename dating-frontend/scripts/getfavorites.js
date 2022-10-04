const favoritesSection = document.querySelector('.favorites-section');
const favoritesCards = document.getElementById('favorites-cards');

const displayFavorites = (data) => {

const favoriteCard = `<div class="user-card flex column">
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
      <div class="data">${data.name}</div>
    </div>
    <div class="info flex">
      <div class="">Location:</div>
      <div class="data">${data.location}</div>
    </div>
  </div>
  <div class="actions flex">
    <i class="far fa-comment-alt chat-icon"></i>
    <i class="fa fa-solid fa-bookmark fav-icon selected"></i>

  </div>
</div>`;
favoritesCards.innerHTML+= favoriteCard;
};

// function to fetch Post API
const getAPI = async (api_url, api_token = null,) => {
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
// function to get favorites
const getFavorites = async () => {
  favoritesCards.innerHTML="";
  const favUsersUrl = `${baseUrl}/getfavorites/${user_id}`;
  const response = await getAPI(favUsersUrl, token).then((result) => {
    result.data.forEach((item, i) => {
      displayFavorites(item);
      const favoriteBtn = document.querySelectorAll('.fav-icon');
      favoriteBtn.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          let favorite_id = btn.parentElement.parentElement.querySelector('.user_id').defaultValue;
          removeFav(favorite_id);
        });
      });
    });

  });
}

// function to remove favorites
const removeFav = async (id) => {
  const removeFavURl = `${baseUrl}/removefavorite`;
  let favFormData = new FormData();
  favFormData.append('user_id', user_id);
  favFormData.append('favorite_id', id);
  const response = await postAPI(removeFavURl, favFormData, token).then((result) => {
    getFavorites();
  });
}

  getFavorites();
