const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('Conected client');

      // Emit all clients connected, all bands
      socket.emit('current-bands', this.bandList.getBands());
    });
  }
}

module.exports = Sockets;
