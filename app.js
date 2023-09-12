let deck_id;
let z_index = 0;
function shuffleDeck() {
  return axios
    .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((response) => {
      deck_id = response.data.deck_id;
      console.log("Deck ID:", deck_id);
      return deck_id;
    });
}

shuffleDeck();

function getCard() {
  return axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then((response) => {
      console.log(response);

      if (response.data.remaining > 0) {
        let cards = response.data.cards;
        $("#deck_container").append(
          `<img src=${
            cards[0].image
          } style="z-index:${z_index}; position: absolute; top: ${z_index}px; transform:rotate(${
            Math.random() * 90
          }deg)"></img>`
        );
        z_index++;
      } else {
        alert("The deck is out of cards!");
        location.reload();
      }
    });
}

$("button").on("click", getCard);
