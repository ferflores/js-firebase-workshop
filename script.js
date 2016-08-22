var config = {
  apiKey: "AIzaSyAWGWhi2xRvcywEu2wJ5Y6iXylQ_YBoymo",
  authDomain: "workshop-bccd7.firebaseapp.com",
  databaseURL: "https://workshop-bccd7.firebaseio.com",
  storageBucket: "workshop-bccd7.appspot.com",
};

var app = firebase.initializeApp(config);

var ref = app.database().ref();

$('#loadMessage').on('click', function(){
  ref.on('value', function(snapshot){
    $('#message').val(snapshot.val().welcomeMessage);
  })
});

$('#setNewMessage').on('click', function(){
  ref.set({
    welcomeMessage: $('#newMessage').val()
  })
});
