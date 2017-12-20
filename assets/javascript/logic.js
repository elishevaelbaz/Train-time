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

// set initial value
var trainName = "Thomas";

database.ref().on("value", function(snapshot){
  console.log(snapshot.val());
  if(snapshot.val() === null){
  // Save new value to Firebase
    database.ref().set({
      name: trainName
    });
  }
  else{
// if snapshot already has a value
//retrieve and store it in clickCounter variable
    trainName = snapshot.val().name;

    $("#train-name").html(trainName);

    console.log("name: " + trainName);
  }
})


// Whenever a user clicks the submit button
$("#add-train").on("click", function() {

  event.preventDefault();

  //add train name to database and display
  trainName = $("#name-input").val().trim();


  // Push new value to Firebase
  database.ref().push({
    name: trainName
  })

  // Log the value of clickCounter
  console.log("trainName " + trainName);

  $("#train-table").append("<tr><td>" + trainName + "</td><tr>")

  // var newRow = $("<tr>");
  // var newInfo = $("<td>");
  // newInfo.html(trainName);
  // newRow.append(newInfo);


  // $("#train-table").append(newRow)

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase
  database.ref().set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $("#click-value").html(clickCounter);

});