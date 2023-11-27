// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  for (var i = 9; i < 18; i++) {
    var timeBlockId = "#hour-" + i;
    var savedUserInput = localStorage.getItem(timeBlockId);
    $(timeBlockId).children(".description").val(savedUserInput);
  }
  // Add code to color-code each time-block based on whether it is in the past,
  // present, or future based on the current time. HINT: How can the current
  // time be compared to the time represented by each time-block?
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY, [at] hh:mm:ss A");
  $("#currentDay").text(currentDate);
});
