/*
You are given the outline of a network client. The network client as it is assumes that the network will never corrupt any data, will never lose any data, will never duplicate any data, and will always deliver data in the order it was sent.

For the purposes of this Kata, assume that the network will never corrupt any data, will never lose any data, but that it may not deliver data in the order it was sent, and that it may send duplicate data. Ensure that the callback function is invoked with the data in-order and without duplicates. Note: there will be two instances of the network client. You should not try to coordinate order between the clients. You should only guarantee that client B invokes its callback in the same order that client A sends and vice-versa.

The data sent into the network client's send() method will always be a string. The data sent into the sendFunction must also be a string. That data eventually will be received by the peer one or more times in this Kata.

Here is an example of a perfect network that would use your network class:

function PerfectNetwork(callbackA, callbackB) {
    var network = this;
    this.clientA = new NetworkClient(
        function (data) { network.clientB.recv(data); }, callbackA);
    this.clientB = new NetworkClient(
        function (data) { network.clientA.recv(data); }, callbackB);
};

var network = new PerfectNetwork(
    function (data) { console.log("CLIENT-A Got: " + data); },
    function (data) { console.log("CLIENT-B Got: " + data); }
);

network.clientA.send("abcd");
network.clientA.send("wxyz");
network.clientB.send("1234");
network.clientA.send("EOF");

This would output:

CLIENT-B Got: abcd
CLIENT-B Got: wxyz
CLIENT-A Got: 1234
CLIENT-B Got: EOF

In this Kata, the naive client outline could very well produce the following output with a less-than-perfect network for that same sequence of send calls:

CLIENT-B Got: abcd
CLIENT-A Got: 1234
CLIENT-A Got: 1234
CLIENT-B Got: EOF
CLIENT-B Got: wxyz
CLIENT-B Got: EOF

*/

var clientId = 'A';

function NetworkClient (sendFunction, callback) {
    this.clientId = clientId;
    clientId = String.fromCharCode(clientId.charCodeAt(0) + 1);
    
    this.sendFunction = sendFunction;
    this.callback = callback;
    
    this.recvQueue = {};
    this.sendId = 1;
    this.recvId = 1;
}

NetworkClient.prototype.send = function (data) {
    // Could wrap data with extra information to send
    var packet = {
      'id': this.sendId, 
      'data': data
    }
    console.log(this.clientId + '-send: ' + JSON.stringify(packet));
    console.log(' ');
    
    this.sendFunction(JSON.stringify(packet));
    this.sendId++;
};

NetworkClient.prototype.recv = function (data) {
    console.log(this.clientId + '-recv: ' + data);
    console.log(' ');
    
    var packet = JSON.parse(data);
    
    if (!this.recvQueue.hasOwnProperty(packet.id)) { 
      this.recvQueue[packet.id.toString()] = packet.data;
    }
    

    
    while (this.recvQueue.hasOwnProperty(this.recvId)) {
      
      if (this.recvQueue[this.recvId] != null) {
        console.log(this.clientId + '-recvQueue0: ' + JSON.stringify(this.recvQueue));
        console.log(this.clientId + '-recvQueue1: ' + JSON.stringify(this.recvQueue[this.recvId]));
        this.callback(this.recvQueue[this.recvId]);
        this.recvQueue[this.recvId] = null;
      }

      this.recvId++;      
    }
    
   console.log(this.clientId + '-recvQueue2: ' + JSON.stringify(this.recvQueue));
};
