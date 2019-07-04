import React from 'react';

//React Context API
const UserContext = React.createContext();

//https://www.taniarascia.com/using-context-api-in-react/
export const Provider = UserContext.Provider
export const Consumer = UserContext.Consumer

export default UserContext;
