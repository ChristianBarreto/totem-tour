import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Totem } from "../api/totems/types";
import { getTotemById } from "../api/totems/api";

const TotemContext = createContext({});

export function TotemProvider({
  children
}: {
  children: ReactNode
}) {
  const [totem, setTotem] = useState<Totem>();
  const [updateTotem, setUpdateTotem] = useState(0);

  const updateCurrentTotemState = () => {
    const savedTotem = localStorage.getItem("thisTotem");

    if ((savedTotem === null) || savedTotem === 'undefined') {
      getTotemById('kYlHD8Z2n0d36AW0MEtS').then((res) => {
        localStorage.setItem("thisTotem", res.id);
        setTotem(res);
        console.log("Totem:", res?.nickName);
      }).catch((err) => {
        console.log("Err", err);
      });

    } else {
      getTotemById(savedTotem).then((res) => {
        localStorage.setItem("thisTotem", res.id);
        setTotem(res);
        console.log("Totem:", res?.nickName);
      }).catch((err) => {
        console.log("Err", err)
      });
    };
  }

  const handleSetTotem = (totemId: string) => {
    localStorage.setItem("thisTotem", totemId);
    getTotemById(totemId).then((res) => {
      setTotem(res);
    }).catch((err) => {
      console.log("ERROR:", `query param totem id not found: ${err}`)
    });
  }

  useEffect(() => {
    updateCurrentTotemState()
  }, []);



  return (
    <TotemContext.Provider value={[totem, handleSetTotem, updateTotem, setUpdateTotem]}>
      {children}
    </TotemContext.Provider>
  )
}

export function useTotem() {
  return useContext(TotemContext);
}

