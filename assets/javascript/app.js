$(document).ready(function(){
    firebaseConfig = {
        apiKey: "AIzaSyDsly4MdH01oXBsGNP0zA1qUZRPXzeO9vo",
        authDomain: "test-project-d6bf9.firebaseapp.com",
        databaseURL: "https://test-project-d6bf9.firebaseio.com",
        projectId: "test-project-d6bf9",
        storageBucket: "test-project-d6bf9.appspot.com",
        messagingSenderId: "269170898265",
        appId: "1:269170898265:web:b66e2247db68a6ffbd4848",
        measurementId: "G-WYLNWK9EYG"
    };
    firebase.initializeApp(firebaseConfig);
    // A variable to reference the database.
    var database = firebase.database();
    // Variables for the onClick event
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;
    $('#add-train').on('click', function() {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrain = $('#first-train').val().trim();
        frequency = $('#frequency').val().trim();
        // Pushing to database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $('form')[0].reset();
    });
    database.ref().on('child_added', function(childSnapshot) {
        var nextArr;
        var minAway;
        var firstTrainNew = moment(childSnapshot.val().firstTrain, 'HH:mm');
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), 'minutes');
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, 'minutes');
        nextTrain = moment(nextTrain).format('HH:mm');
        $('#add-row').append('<tr><td>' + childSnapshot.val().name +
                '</td><td>' + childSnapshot.val().destination +
                '</td><td>' + childSnapshot.val().frequency +
                '</td><td>' + nextTrain +
                '</td><td>' + minAway + '</td></tr>');
    });
});


