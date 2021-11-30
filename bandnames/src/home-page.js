import { useContext } from 'react';

import { SocketContext } from './context/socket-context';
import { BandAdd } from './components/bandAdd';
import { BandList } from './components/bandList';
import { BandChart } from './components/bandChart';

const HomePage = () => {
  const { isOnline } = useContext(SocketContext);

  return (
    <div className="container">
      <div className='alert'>
        <p>
          Services status:
          {isOnline ? <span className='text-success'> Online</span> : <span className='text-danger'> Offline</span>}
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />
      <div className='row'>
        <div className='col'>
          <BandChart />
        </div>
      </div>
      <div className='row'>
        {<div className='col-8'>
          <BandList />
        </div>}
        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
