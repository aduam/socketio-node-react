import { useEffect, useState, useContext } from 'react';

import { SocketContext } from '../context/socket-context';

export const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState([]);

  const handleChange = (event, id) => {
    const { value } = event.target;

    setBands(bands => bands.map((band) => {
      if (band.id === id) {
        band.name = value;
      }
      return band;
    }));
  }

  const handleChangedName = (id, name) => {
    socket.emit('change-band-name', { id, name });
  };

  const vote = (id) => {
    socket.emit('vote-band', { id });
  };

  const removeBand = (id) => {
    socket.emit('remove-band', { id });
  };

  const createRows = () => {
    return bands.map((band) => {
      return (
        <tr key={band.id}>
          <td>
            <button onClick={() => vote(band.id)} className='btn btn-primary'>+1</button>
          </td>
          <td>
            <input
              className='form-control'
              value={band.name}
              onChange={(event) => handleChange(event, band.id)}
              onBlur={() => handleChangedName(band.id, band.name)}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button onClick={() => removeBand(band.id)} className='btn btn-danger'>Borrar</button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    socket.on('current-bands', (data) => {
      setBands(data)
    });

    return () => socket.off('current-bands');
  }, [socket]);

  return(
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Nombres</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    </>
  );
};