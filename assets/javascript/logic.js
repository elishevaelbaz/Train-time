
$(document).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPJcdNtadAvEHx-S9rJrDpzIi0Sue74aI",
  authDomain: "train-time-db250.firebaseapp.com",
  databaseURL: "https://train-time-db250.firebaseio.com",
  projectId: "train-time-db250",
  storageBucket: "train-time-db250.appspot.com",
  messagingSenderId: "1828143593"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {

  event.preventDefault();

  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // requires all the fields except name
  if ((!destination)||(!time)||(!frequency)){

    $('#myModal').modal("show");
    return;
  }

  // Code for the push
  database.ref().push({

    name: name,
    destination: destination,
    time:time,
    frequency, frequency
  });
});    


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

  var tFrequency = childSnapshot.val().frequency;

  var firstTime = childSnapshot.val().time;

  // First Time (pushed back the frequency number of years 
  //to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(tFrequency, "years");

  // Current Time
  var currentTime = moment().format("HH:mm");

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var calcNextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrain = moment(calcNextTrain).format("HH:mm")

  // full list of items to the schedule board
  var newTrain = $("<tr>");
  newTrain.append("<td>" + childSnapshot.val().name + "</td>");
  newTrain.append("<td>" + childSnapshot.val().destination + "</td>");
  newTrain.append("<td>" + childSnapshot.val().frequency + "</td>");
  newTrain.append("<td>" + nextTrain + "</td>");
  newTrain.append("<td>" + tMinutesTillTrain + "</td>");

  $("#tbody").append(newTrain);

  //clear the textboxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});






