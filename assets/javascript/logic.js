
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

//make sure the user put in a number
  if (isNaN(parseInt(frequency))){

    $('#myModal2').modal("show");
    return;

  }


  // Code for the push
      database.ref().push({

        name: name,
        destination: destination,
        time:time,
        frequency, frequency
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
    });    


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);


      var tFrequency = childSnapshot.val().frequency;

      var firstTime = childSnapshot.val().time;

      console.log(tFrequency)

      // First Time (pushed back the frequency number of years 
      //to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(tFrequency, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment().format("HH:mm");
      console.log("currentTime: " + currentTime)

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;

      // Next Train
      var calcNextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrain = moment(calcNextTrain).format("HH:mm")
      // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




      // full list of items to the well
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

    





