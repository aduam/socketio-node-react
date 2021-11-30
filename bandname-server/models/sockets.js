const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('client connected!', socket.id);

      // Emit all clients connected, all bands
      socket.emit('current-bands', this.bandList.getBands());

      // lisent vote-band
      socket.on('vote-band', ({ id }) => {
        this.bandList.increaseVotes(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('remove-band', ({ id }) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('change-band-name', ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('add-band', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
