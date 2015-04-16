var app = require('express')();
var http = require ('http').Server(app);
var io = require('socket.io')(http);
var schedule = require('node-schedule');

var Firebase = require("firebase");


var base = new Firebase("https://ditpocbase.firebaseio.com/");


base.child("ticketschedule").on("value", function(snapshot) {
  console.log(snapshot.val());

  if (!snapshot.val().tickets) {
  	io.emit('notification', snapshot.val().description);
  }

});

var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 0);

schedule.scheduleJob('10,20,30,40,50 * * * * *', function() {
	var text = 'schedule working - ' + new Date();

    //console.log('ran at: ' + new Date());
    //io.emit('chat message', text);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('a user conected');

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});