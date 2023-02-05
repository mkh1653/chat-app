var socket = io();

function scrollToBottom(){
	var messages = jQuery("#messages");
	var newMessage = messages.children("li:last-child");

	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.scrollTop();
	var scrollHeight = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHight >= scrollHeight){
		jQuery(window).scrollTop(scrollHeight);
		console.log(messages);
	}
}

socket.on('connect', function (){
	var params = jQuery.deparam(window.location.search);
	socket.emit("join", params, function(err){
		if(err){
			alert(err);
			window.location.href = "/";
		}else{
			console.log("no error");
		}
	});
});

socket.on('newMessage', (message) =>{
	var formattedTime = moment().format("hh:mm a");
	var template = jQuery("#message__template").html();
	var html = Mustache.render(template,{
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);

	scrollToBottom();
});

socket.on('disconnect', function (){
	console.log("Disconnected form server");
});

socket.on('updateUserList', function(users){
	var ol = jQuery("<ol></ol>");

	users.forEach(function(user){
		ol.append(jQuery("<li></li>").text(user));
	})

	jQuery("#users").html(ol);
	console.log(users);

});

socket.on('newLocationMessage', (message) =>{
	var formattedTime = moment().format("hh:mm a");
	var template = jQuery("#location__message__template").html();
	var html = Mustache.render(template,{
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);

	scrollToBottom();
});

jQuery("#message-form").on("submit", function(e){
	e.preventDefault();

	var messageBox = jQuery("[name=message");

	socket.emit("createMessage",{
		text: messageBox.val()
	}, function(){
		messageBox.val("");
	});

});


var locationButton = jQuery("#send-location");
locationButton.on("click", function(){

	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr("disabled", "disabled").text("Sending location...");

	navigator.geolocation.getCurrentPosition(function (position){

		locationButton.removeAttr("disabled").text("Send location");
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function(){
		locationButton.removeAttr("disabled").text("Send location");
		alert("Unable to fetch location.")
	});
});
