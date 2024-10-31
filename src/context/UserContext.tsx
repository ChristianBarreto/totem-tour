import { createContext, ReactNode, useContext, useState } from "react";



const initUser = {
  id: '',

};

const UserContext = createContext({});

export function CartProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState(initUser)

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}

