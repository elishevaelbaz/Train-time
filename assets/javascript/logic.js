
$("#add-train").on("click", function(event) {

  event.preventDefault();

  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  console.log(name);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  //Replaces the content in the "recent-member" div with the new info
  var newRow = $("<tr>")
  $("#tbody").append(newRow)


  var trains = JSON.parse(localStorage.getItem("trains"));

  if (trains == null){
    trains = [];
  }

  var newTrain = {
    name: name,
    destination: destination, 
    time: time,
    frequency: frequency
  }

  trains.push(newTrain);

  localStorage.setItem("trains", JSON.stringify(trains));

  updatePage();

});


function updatePage(){

  var trains = JSON.parse(localStorage.getItem("trains"));

  

  if (trains == null){
    trains = [];
  }

  
    $("#tbody").empty();

    for (var i = 0; i < trains.length; i++) {


      //calculate the next train time and in how many minutes
      var tFrequency = trains[i].frequency;

      var firstTime = trains[i].time;

      console.log(tFrequency)

      // First Time (pushed back the frequency number of years 
      //to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(tFrequency, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment().format("hh:mm");
      console.log("currentTime: " + currentTime)

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var calcNextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrain = moment(calcNextTrain).format("hh:mm")
      // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var newTrain = $("<tr>");
      newTrain.append("<td>" + trains[i].name + "</td>");
      newTrain.append("<td>" + trains[i].destination + "</td>");
      newTrain.append("<td>" + trains[i].frequency + "</td>");
      newTrain.append("<td>" + nextTrain + "</td>");
      newTrain.append("<td>" + tMinutesTillTrain + "</td>");

      $("#tbody").append(newTrain);
    }
  }


  updatePage();



