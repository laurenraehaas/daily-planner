let update = () => {
  let date = moment(new Date())
  $("#currentDay").text(date.format("dddd, MMMM Do YYYY, h:mm:ss a"))
}

$(document).ready(function() {
  update()
  setInterval(update, 1000)
});

//create array that houses all of the work hour ID's
var workHoursIdArr = [
  "#nine",
  "#ten",
  "#eleven",
  "#twelve",
  "#one",
  "#two",
  "#three",
  "#four",
  "#five"
];
//create array that houses all of the work hour classes
var workHoursClassArr = [
  ".nine",
  ".ten",
  ".eleven",
  ".twelve",
  ".one",
  ".two",
  ".three",
  ".four",
  ".five"
];
//create array to store saved event id'z
var savedEvents = 
[
  "nine",
  "ten",
  "eleven",
  "twelve",
  "one",
  "two",
  "three",
  "four",
  "five"
];

let createMoments = () => {
  for(let i = 0; i < workHoursIdArr.length; i++) {
    let hoursId = workHoursIdArr[i]
    let hoursClass = workHoursClassArr[i]
    console.log(hoursId, hoursClass)

    if($("hoursId")) {
      let time = $(hoursClass).text().trim()
      console.log("Time: " + time)

      if(time.length === 4) {
        let hourNUMA = $(hoursClass).text().trim().charAt(0)
        let hourNUMB = $(hoursClass).text().trim().charAt(1)
        console.log("HOURNUMBS: " + hourNUMA, hourNUMB)
        hour = hourNUMA + hourNUMB
        console.log("HOUR1: " + hour)
      } else {
        hour = $(hoursClass).text().trim().charAt(0)
        console.log("HOUR2: " + hour)
      }
      let aOrPIndex = time.length - 2
      let aOrP = time.charAt(aOrPIndex)
      let blockTimeHour;
      if((hour + aOrP + "M") === "12PM") {
        let blockTimeHour = parseInt(hour)
      } else if (aOrP === "A") {
        let blockTimeHour = parseInt(hour)
      } else {
        blockTimeHour = (parseInt(hour)) + 12
      } 
      console.log("BLOCK TIME HOUR")
      console.log(blockTimeHour)
      checkTime(blockTimeHour, hoursId)
    }
  }
}

let checkTime = (hour, id) => {
  let parsedHour = parseInt(moment(new Date()).format("H:mm:ss a"))
  console.log("CHECKTIME")
  if(parsedHour === hour) {
    $(id).removeClass("future")
    $(id).addClass("present")
  } else if (parsedHour > hour) {
    $(id).removeClass("present")
    $(id).addClass("past")
  } else if (parsedHour < hour) {
    $(id).removeClass("present")
    $(id).addClass("future")
  }
}

$(".row").on("click", ".time-block", function() {
  let text = $(this).text().trim()
  console.log(text)

  let divId = $(this)
    .attr("id")

  let textInput = $("<textarea>")
    .addClass("form-control")
    .addClass("col-8")
    .addClass("col-lg-10")
    .val(text)

  $(this).replaceWith(textInput)
  textInput.trigger("focus")
})

$(".saveBtn").on("click", function() {
  let rowId = $(this)
    .parent(".row")
    .attr("id")

  let divId = $(this)
    .parent(".row")
    .attr("id")
    .replace("row-", "")

  if($("#" + rowId).children().eq(1).is("div")) {
    let text = $("#" + divId)
      .text()
      .trim()

    localStorage.setItem("event: " + divId, JSON.stringify(text))
    (createMoments)
  } else {
    $("textarea").trigger("blur")

    let text = $(".form-control")
      .val()
      .trim()

    let taskDiv = $("<div>")
      .addClass("col-8")
      .addClass("col-lg-10")
      .addClass("time-block")
      .attr("id", divId)
      .text(text)

    $(".form-control").replaceWith(taskDiv)

    localStorage.setItem("event: ", + divId, JSON.stringify(text))

    createMoments()
  }
})

let loadSaves = function() {
  for(let i = 0; i < savedEvents.length; i++) {
    events = JSON.parse(localStorage.getItem("event: ", + savedEvents[i]))

    $("#" + savedEvents[i]).text(events)
  }
}

createMoments();
loadSaves()

setInterval(function () {
  createMoments()
}, 1000)