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
  .attr("src", "./assets/audio/inCorrect.mp3")
  .get(0);

//! DONE
function renderAllChoices(enabled = true) {
  console.log("PPPPPPPPP");
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
  $("#choices__lines .item").not(".selected").text(item.title);
}

function renderChoicesList(enabled) {
  $("#choices__lines .item").on("click", function () {
    const activeChoice = $(".active", availableChoicesContainer);
    const title = activeChoice.attr("data-title");
    const answer = activeChoice.attr("data-ans") == "true";

    if (answer && $("#choices__lines .item").not(".selected").text != "") {
      console.log(correctAudio);
      correctAudio.play();
      $(this).addClass("selected");
      $(this).off("click");
      activeChoice.removeClass("active").css({ visibility: "hidden" });
      updateText({ title: "" });
      updateSelectedItems(activeChoice);
      return;
    } else if ($("#choices__lines .item").not(".selected").text == "") {
      inCorrectAudio.play();
    }
  });
}
