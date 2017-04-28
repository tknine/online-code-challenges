/*
Tracking different objects with a char id.
*/

var clientId = 'A';

function Client() {
    this.clientId = clientId;
    clientId = String.fromCharCode(clientId.charCodeAt(0) + 1);

}

Client.prototype.someMethod = function (data) {

    console.log(this.clientId + '-send: ' + JSON.stringify(data));
    console.log(' ');
};