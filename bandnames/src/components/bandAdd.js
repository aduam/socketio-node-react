import { useState, useContext } from 'react';

import { SocketContext } from '../context/socket-context';

export const BandAdd = () => {
  const { socket } = useContext(SocketContext);
  const [addName, setAddName] = useState('');

  const addBand = (name) => {
    socket.emit('add-band', { name });
  };

  const handleAddName = (event) => {
    const { value } = event.target;
    setAddName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (addName.trim().length > 0) {
      addBand(addName);
      setAddName('');
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSubmit}>
        <input
          className='form-control'
          placeholder='Nuvo nombre de banda'
          value={addName}
          onChange={handleAddName}
        />
      </form>
    </>
  );
};