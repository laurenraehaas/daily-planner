let update = () => {
  let date = moment(new Date())
  $("#currentDay").text(date.format("dddd, MMMM Do YYYY, h:mm:ss a"))
}

$(document).ready(function() {
  update()
  setInterval(update, 1000)
});

//create array that houses all of the work hour ID's
var workHoursIdArr = ["#nine", "#ten", "#eleven", "#twelve", "#one", "#two", "#three", "#four", "#five"];
//create array that houses all of the work hour classes
var workHoursClassArr = [".nine", ".ten", ".eleven", ".twelve", ".one", ".two", ".three", ".four", ".five"];
//create array to store saved event id'z
var savedEvents = 
["nine",
 "ten",
  "eleven",
   "twelve",
    "one",
     "two",
      "three",
       "four",
        "five"];

let createMoments = () => {
  for(let i = 0; i < workHoursIdArr.length; i++) {
    let hoursId = workHoursIdArr[i]
    let hoursClass = workHoursClassArr[i]

    if($("hoursId")) {
      let time = $(workHoursClass.text())

      if(time.length === 4) {
        let hourNUMA = $(hoursClass).text().charAt(0)
        let hourNUMB = $(hoursClass).text().charAt(1)
        let hour = hourNUMA + hourNUMB
      } else {
        let hour = $(hoursClass).text().charAt(0)
      }
      let aOrPIndex = time.length - 2
      let aOrP = time.charAt(aOrPIndex)
      let blockTimeHour;
      if(hour + aOrP + "M" === "12PM") {
        let blockTimeHour = parseInt(hour)
      } else if (aOrP === "A") {
        let blockTimeHour = parseInt(hour)
      } else {
        blockTimeHour = (parseInt(hour)) + 12
      } 

      checkTime(blockTimeHour, hoursId)
    }
  }
}

let checkTime = (hour, id => {
  let parsedHour = parseInt(moment(new Date()).format("H:mm:ss a"))

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
})



createMoments()