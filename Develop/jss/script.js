// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the id of the containing time-block
    var timeBlockId = $(this).parent().attr("id");

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var currentHour = dayjs().format("H");

    if (timeBlockId < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockId === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Get the user input from local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY, [at] hh:mm:ss A"));
});
