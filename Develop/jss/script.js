$(function () {
  if (typeof Storage === "undefined") {
    alert(
      "Local storage is not supported by this browser. Your data cannot be saved."
    );
    $(".saveBtn").prop("disabled", true);
    return;
  }

  function saveToLocalStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      alert("Error saving to local storage. Your data might not be saved.");
      console.error("Local Storage write error: ", e.message);
    }
  }

  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var userInput = $(this).siblings(".description").val();
    saveToLocalStorage(timeBlockId, userInput);
  });

  for (var i = 9; i < 18; i++) {
    var timeBlockId = "hour-" + i;
    try {
      var savedUserInput = localStorage.getItem(timeBlockId);
      if (savedUserInput) {
        $("#" + timeBlockId)
          .children(".description")
          .val(savedUserInput);
      }
    } catch (e) {
      console.error("Error reading from local storage: ", e.message);
    }
  }

  if (typeof dayjs === "undefined") {
    alert("Day.js library is not loaded. Time-based features will not work.");
    console.error("Day.js library is not loaded.");
    return;
  }

  try {
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
  } catch (e) {
    console.error("Error with time-based color coding: ", e.message);
  }

  try {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY, [at] hh:mm:ss A");
    $("#currentDay").text(currentDate);
  } catch (e) {
    console.error("Error displaying current date: ", e.message);
  }
});
