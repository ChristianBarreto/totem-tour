import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Totem } from "../api/totems/types";
import { getTotemById } from "../api/totems/api";

const TotemContext = createContext({});

export function TotemProvider({
  children
}: {
  children: ReactNode
}) {
  console.log(localStorage.getItem("thisTotem"));
  const savedTotem = localStorage.getItem("thisTotem");
  const [totem, setTotem] = useState();

  useEffect(() => {
    if (savedTotem !== null) {
      getTotemById(savedTotem).then((res) => {
        localStorage.setItem("thisTotem", res.id);
        setTotem(res);
      }).catch((err) => {
        console.log("Err", err)
      });
    } else {
      getTotemById('kYlHD8Z2n0d36AW0MEtS').then((res) => {
        localStorage.setItem("thisTotem", res.id);
        setTotem(res);
      }).catch((err) => {
        console.log("Err", err)
      });
    };
  }, []);

  const handleSetTotem = (totemId: string) => {
    getTotemById(totemId).then((res) => {
      localStorage.setItem("thisTotem", res.id);
      setTotem(res);
    }).catch((err) => {
      console.log("Err", err)
    });
  }

  console.log("Totem", totem);

  return (
    <TotemContext.Provider value={[totem, handleSetTotem]}>
      {children}
    </TotemContext.Provider>
  )
}

export function useTotem() {
  return useContext(TotemContext);
}

