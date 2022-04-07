// list of available choices
const choices = [
  { title: "scissors", isCorrect: false, selected: false },
  { title: "eraser", isCorrect: true, selected: false },
  { title: "ruler", isCorrect: true, selected: true },
  { title: "bag", isCorrect: false, selected: false },
  { title: "pencil pen", isCorrect: false, selected: true },
  { title: "pencil", isCorrect: true, selected: false },
  { title: "book", isCorrect: true, selected: false },
  { title: "pen", isCorrect: true, selected: false },
];
const selectedItems = [];
const imgMarkSettings = { width: "50px", height: "auto", marginLeft: "auto" };
function updateSelectedItems(item) {
  selectedItems.push(item);
}
const availableChoicesContainer = $("#components__container ul");
$(document).ready(() => {
  // hide the preloader
  $(".preloader__container").fadeOut();
  renderPage();
});

function renderPage(enabled = true) {
  renderAllChoices(enabled);
  renderChoicesList(enabled);
}
// prepare the audio files
const correctAudio = $("<audio id=`correctAudio`>")
  .attr("src", "./assets/audio/correct.mp3")
  .get(0);
const inCorrectAudio = $("<audio>")
  .attr("src", "./assets/audio/incorrect.mp3")
  .get(0);

//! DONE
function renderAllChoices(enabled = true) {
  const chElements = choices.map((item) => {
    const choiceElement = $("<li>").first();
    choiceElement
      .addClass("item")
      .text(item.title)
      .attr("data-title", item.title)
      .attr("data-ans", item.isCorrect)
      .on("click", (e) => {
        const currentItem = $(e.target);
        currentItem.addClass("active");
        $("#components__container li").not(currentItem).removeClass("active");
        updateText(item);
      });
    choiceElement.removeClass("deactive");
    if (!enabled) {
      choiceElement.addClass("deactive");
      choiceElement.off("click");
    }
    return choiceElement;
  });
  availableChoicesContainer.html(chElements);
}

function updateText(item) {
  $("#choices__lines .item")
    .not(".selected")
    .text(item.title)
    .css({ position: "relative" });
}

function renderChoicesList(enabled) {
  $("#choices__lines .item").on("click", function () {
    const activeChoice = $(".active", availableChoicesContainer);
    const answer = activeChoice.attr("data-ans") == "true";

    if (answer && $("#choices__lines .item").not(".selected").text != "") {
      handleCorrectAnswer($(this), activeChoice);
    } else if ($("#choices__lines .item").not(".selected").text().length < 1) {
      return;
    } else {
      console.log($("#choices__lines .item").not(".selected").text == "");
      handleWrongAnswer($(this));
    }
  });
}

function handleCorrectAnswer(item, activeChoice) {
  const markImage = $("<img>")
    .attr("src", "./assets/images/tikMark-small.png")
    .fadeOut();
  // .css(imgMarkSettings);
  console.log(markImage);
  correctAudio.play();
  item.addClass("selected");
  item.append(markImage);
  markImage.fadeIn(500);
  item.off("click");
  activeChoice.removeClass("active").css({ visibility: "hidden" });
  updateText({ title: "" });
  updateSelectedItems(activeChoice);
  return;
}

function handleWrongAnswer(item) {
  inCorrectAudio.play();
  const img = $("<img>")
    .attr("src", "./assets/images/crossMark-small.png")
    // .css(imgMarkSettings)
    .fadeIn(200)
    .fadeOut(300)
    .fadeIn(250)
    .fadeOut(500);
  item.append(img);
  setTimeout(() => {
    img.remove();
  }, 1000);
}
