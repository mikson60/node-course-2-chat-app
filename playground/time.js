const moment = require('moment');

// Jan 1st 1970 00:00:00 am
// -1000 past, 1000 future. 1 second

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

var someTimeStamp = moment().valueOf(); // time in milliseconds since unix epic
console.log(someTimeStamp);

var createdAt =3237846;
var date = moment(createdAt);
console.log(date.format('H:mm a'));