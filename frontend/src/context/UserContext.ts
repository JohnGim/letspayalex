import React from 'react';

type UserContextType = {
username: string | null;
setUsername: (username: string) => void;
  onLogout: () => void;
};

const UserContext = React.createContext<UserContextType>({
  username: null,
  setUsername: () => {
    console.error('No setUsername function provided');
  },
  onLogout: () => {
    console.error('No onLogout function provided');
  },
});

export default UserContext;
