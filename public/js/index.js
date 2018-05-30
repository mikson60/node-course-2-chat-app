var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} (${formattedTime}): ${message.text}`);

    var messages = jQuery('#messages');
    messages.append(li); 

    /*
    var messagesElements = jQuery('#messages li');

    if (messagesElements.length > 10000) {
        messagesElements.first().remove();
    }
    */
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Badass coords</a>');

    li.text(`${message.from} (${formattedTime}): `);
    //a.attr('target') // returns target
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    if (messageTextbox.val().length <= 0) {return;}

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});