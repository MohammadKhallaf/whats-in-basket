/* <== Elements ==> */
//  Header Buttons
const helpBtn = $("#help__Btn").first();
const imgBtn = $("#img__Btn").first();
const closeHelpBtn = $("#close__popup").first();

//  Popup
const popup = $(".popup__container").first();
const popupContent = $("#popup__content");

//  Footer Buttons
const viewAllBtn = $("#viewAll").first();
const resetAllBtn = $("#resetAll").first();

/* <== Functions ==> */
function showHelp(e, content = "help") {
  popup.addClass("active");
  if (content == "help") {
    popupContent.html("<span> Some helping content is written here</span>");
  } else {
    popupContent.html(
      `<div class="body"><img  src="./assets/images/dummy.jpg"></div>`
    );
  }
}
function hideHelp() {
  if (!popup.hasClass("active")) return;
  popup.removeClass("active");
}

function resetAll() {
  const lineItem = $("#choices__lines .item");
  lineItem.each(function () {
    $(this).removeClass("selected");
    $(this).text("");
  });
  $("#components__container li").removeClass("active");
}

function viewAll() {
  let count = 0;
  choices.forEach((item, index, array) => {
    if (item.isCorrect) {
      const lineItem = document.querySelectorAll("#choices__lines .item");
      lineItem[count].textContent = item.title;
      lineItem[count].classList.add("selected");
      count++;
    }
  });
}

/* <== Events ==> */
// header
helpBtn.on("click", showHelp);
imgBtn.on("click", showHelp.bind(this, "image"));
closeHelpBtn.on("click", hideHelp);

// footer
viewAllBtn.on("click", viewAll);
resetAllBtn.on("click", resetAll);
