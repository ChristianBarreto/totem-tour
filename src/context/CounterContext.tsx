import { createContext, ReactNode, Reducer, useContext, useEffect, useReducer } from "react";
import { websiteUrl } from "../api/api";
import { pageCountDown } from "../helpers";

const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);

type ACTIONTYPE =
  | { type: "reinit" }
  | { type: "decrease" }


const initialCounter = 300;

const CounterContext = createContext({});

export function CounterProvider({
  children
}: {
  children: ReactNode
}) {
  const [counter, dispatch] = useReducer<Reducer<number, ACTIONTYPE>>(counterReducer, initialCounter);

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        if (pageCountDown(window.location.href)){
          dispatch({type: 'decrease'})
        } 
      } else {
        redirectToInitial();
      }
    }, 1000)

    return (() => {
      clearInterval(timer)
    })
  }, [counter])

  useEffect(() => {
    if ((window.location.href === ('http://localhost:3000/totem' || 'https://totem-tour.web.app/totem'))){
      dispatch({type: 'reinit'})
    }
  }, [])

  return (
    <CounterContext.Provider value={[counter, dispatch]}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  return useContext(CounterContext);
}

function counterReducer(counter: number, action: ACTIONTYPE): number {
  switch(action.type) {
    case 'decrease': {
      return counter -1;
    }
    case 'reinit': {
      return initialCounter;
    }
    default: {
      return counter;
    }
  }
}