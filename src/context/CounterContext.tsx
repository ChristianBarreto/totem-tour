import { createContext, ReactNode, Reducer, useContext, useEffect, useReducer, useState } from "react";
import { websiteUrl } from "../api/api";
import { allowCountersCountDown } from "../helpers";
import dayjs from "dayjs";
import { setTotemPingById } from "../api/totemPings/api";
import { useTotem } from "./TotemContext";

type Counters = {
  redirectToInit: number
}

const redirectToInitial = () => window.location.replace(`${websiteUrl}/totem`);

const isSlidesPage = (ref: string): boolean => (
  ref === 'http://localhost:3000/totem'
  || ref === 'https://totem-tour.web.app/totem')

type ACTIONTYPE =
  | { type: "res_redirectToInit" }
  | { type: "dec_redirectToInit" }

const timeToPing = 5; // minutes

const initialCounters: Counters = {
  redirectToInit: 300,
};

const CounterContext = createContext({});

export function CounterProvider({
  children
}: {
  children: ReactNode
}) {
  const [counters, dispatch] = useReducer<Reducer<Counters, ACTIONTYPE>>(counterReducer, initialCounters);
  // @ts-expect-error: TODO: fix type of context
  const [totem] = useTotem();

  let lastPing = 0;
  const moreThen5Minutes = (lastPing: number): boolean => {
    if (!lastPing) {
      return true;
    }
    return dayjs().diff(dayjs(lastPing), 'minute') >= timeToPing;
  }

  useEffect(() => {
    lastPing = totem?.lastPing;
    const timer = setInterval(() => {

      if (allowCountersCountDown(window.location.href)) {

        if (counters.redirectToInit > 0) {         
          if (!isSlidesPage(window.location.href)) {
            dispatch({type: 'dec_redirectToInit'})
          }
        } else {
          redirectToInitial();
        }

        console.log(dayjs(lastPing).format('DD/MM/YYYY HH:mm'), moreThen5Minutes(lastPing))

        if (moreThen5Minutes(lastPing)) {
          totem?.id && setTotemPingById({
            totemId: totem?.id,
            lastPing: dayjs().valueOf()
          })
          lastPing = dayjs().valueOf();
          console.log("PING", dayjs(lastPing).format('DD/MM/YYYY HH:mm'))
        }
      }
    }, 1000)

    return (() => {
      clearInterval(timer)
    })

  }, [counters, totem])

  useEffect(() => {
    if (isSlidesPage(window.location.href)){
      dispatch({type: 'res_redirectToInit'})
    }
  }, [])

  return (
    <CounterContext.Provider value={[counters, dispatch]}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  return useContext(CounterContext);
}

function counterReducer(counters: Counters, action: ACTIONTYPE): Counters {
  switch(action.type) {
    case 'dec_redirectToInit': {
      return {...counters, redirectToInit: counters.redirectToInit -1}
    }
    case 'res_redirectToInit': {
      return {...counters, redirectToInit: initialCounters.redirectToInit}
    }
    default: {
      return counters;
    }
  }
}