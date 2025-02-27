import { getAdjectives } from "./data.js";

let adjectives = "";
let sortDirection = "up";
let data = "";

function init() {
  //TODO: data inladen (adjectives)
  //TODO: JSON CONVERT
  adjectives = getAdjectives();
  data = JSON.parse(adjectives);

  //uitrenderen
  render();
  //TODO: buttons actief
  addSortEvents();
  addVoteEvents();
}

function addSortEvents() {
  //TODO: sort function

  //TODO: click button
  document.getElementById("sort-up").addEventListener("click", function () {
    sortDirection = "up";
    sort();
    render(data);
  });
  document.getElementById("sort-down").addEventListener("click", function () {
    sortDirection = "down";
    sort();
    render(data);
  });
}

function addVoteEvents() {
  //add eventlisteners to all upvote and downvote
  const upVoteButtons = document.querySelectorAll(".upvote-button");
  console.log(upVoteButtons);
  upVoteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      console.log(this.value);
      upVote(this.value);
    });
  });
}

function sort() {
  if (sortDirection == "up") {
    data = data.sort(function (a, b) {
      if (a.score > b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    data = data.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

function render() {
  //TODO:html maken
  //TODO:html sting leeg maken
  let html = "";
  //TODO: add html voor elk
  data.forEach(function (item) {
    html += `<div class="word-item">
            <span class="word-score good">${item.score}</span>
            <span>${item.word}</span>
            <div class="vote-buttons">
                <button value="${item.word}" class="upvote-button">👍</button>
                <button value="${item.word}" class="downvote-button">👎</button>
                </div>
        </div>`;
  });
  //lTODO: bep locatie
  const locatie = document.getElementById("container");
  //TODO: voeg string aan html toe
  locatie.innerHTML = html;
}

function upVote(target) {}

function downVote(target) {}

function updateScore(word, scoreChange) {
  const foundIndex = adjectives.findIndex(function (item, index) {
    if (item.word == word) {
      return true;
    }
  });

  if (foundIndex != null) {
    let newScore = adjectives[foundIndex]["score"] + scoreChange;
    adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
  }
}

init();
