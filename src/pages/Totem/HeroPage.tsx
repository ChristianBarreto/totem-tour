import { useEffect } from "react";
import HeroCarousel from "../../components/organisms/Carousel";
import { useCounter } from "../../context/CounterContext";

export default function HeroPage() {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
  useEffect(() => {
    dispatch({type: 'reinit'})

  }, [])

  return (
    <>
      <HeroCarousel />
    </>
  )
}