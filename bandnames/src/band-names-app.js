import { SocketProvider } from './context/socket-context';

import HomePage from './home-page';

export const BandNames = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};