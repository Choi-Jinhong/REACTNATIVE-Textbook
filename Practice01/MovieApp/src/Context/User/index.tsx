import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultContext: IUserContext = {
  isLoading: false,
  userInfo: undefined,
  login: (email: string, password: string) => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}: Props) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (email: string, password: string): void => {
    AsyncStorage.setItem('token', 'save your token').then(() => {
      setUserInfo({
        name: 'dev-gnong',
        email: 'jinhongdev@gmail.com',
      });
      setIsLoading(true);
    });
  };

  const getUserInfo = (): void => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value) {
          setUserInfo({
            name: 'dev-gnong',
            email: 'jinhongdev@gmail.com',
          });
        }
        setIsLoading(true);
      })
      .catch(() => {
        setUserInfo(undefined);
        setIsLoading(true);
      });
  };

  const logout = (): void => {
    AsyncStorage.removeItem('token');
    setUserInfo(undefined);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userInfo,
        login,
        getUserInfo,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContextProvider, UserContext};
