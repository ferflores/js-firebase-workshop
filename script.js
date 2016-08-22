var config = {
  apiKey: "AIzaSyAWGWhi2xRvcywEu2wJ5Y6iXylQ_YBoymo",
  authDomain: "workshop-bccd7.firebaseapp.com",
  databaseURL: "https://workshop-bccd7.firebaseio.com",
  storageBucket: "workshop-bccd7.appspot.com",
};

var app = firebase.initializeApp(config);

var ref = app.database().ref('/chatMessages');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#loginDiv').remove();
  }
});

$('#login').on('click', function(){
  var email = $('#email').val();
  var password = $('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
  });
})

$('#connect').on('click', function(){
  ref.on('value', function(snapshot){
    $('#chatMessages').empty();

    var chatMessages = snapshot.forEach(function(message){
      var value = message.val();
      var html = "<tr><td class='col-sm-1'>" + value.user + ":</td><td> " + value.message + "</td>";
      $('#chatMessages').prepend(html);
    });
  })
});

$('#sendMessage').on('click', function(){
  var message = $('#newMessage').val();

  if(message.length > 0){
    ref.push({
      user:firebase.auth().currentUser.email,
      message:message
    })
  }

  $('#newMessage').val('');
});
