import { getAdjectives } from "./data.js";

let adjectives;
let sortDirection = "up";
let data;

function init() {
  //TODO: data inladen (adjectives)
  //TODO: JSON CONVERT
  adjectives = getAdjectives();
  data = JSON.parse(adjectives);

  //uitrenderen
  render();
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
    document.querySelector("#sort-down").classList.add("active");
    document.querySelector("#sort-up").classList.remove("active");
    render(data);
  });
}

function addVoteEvents() {
  //add eventlisteners to all upvote and downvote
  const upVoteButtons = document.querySelectorAll(".upvote-button");
  upVoteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      upVote(this.value);
    });
  });
  const downVoteButtons = document.querySelectorAll(".downvote-button");
  downVoteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      downVote(this.value);
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

  let stat;

  //TODO: add html voor elk
  data.forEach(function (item) {
    if (item.score >= 6) {
      stat = "good";
    } else {
      stat = "bad";
    }
    html += `<div class="word-item">
            <span class="word-score ${stat}">${item.score}</span>
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
  addVoteEvents();
  addSortEvents();
}

function upVote(target) {
  updateScore(target, 0.1);
}

function downVote(target) {
  updateScore(target, -0.1);
}

function updateScore(word, scoreChange) {
  const foundIndex = data.findIndex(function (item, index) {
    if (item.word == word) {
      return true;
    }
  });

  if (foundIndex != -1) {
    let newScore = data[foundIndex]["score"] + scoreChange;
    data[foundIndex]["score"] = Math.round(newScore * 100) / 100;
  }
  render();
}

init();
