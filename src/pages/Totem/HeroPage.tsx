import { useEffect } from "react";
import HeroCarousel from "../../components/organisms/Carousel";
import { useCounter } from "../../context/CounterContext";
import { useSearchParams } from "react-router-dom";
import { useTotem } from "../../context/TotemContext";

export default function HeroPage() {
  // @ts-expect-error: TODO: fix type of context
  const [, dispatch] = useCounter();
    // @ts-expect-error: TODO: fix type of context
  const [, handleSetTotem] = useTotem();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch({type: 'res_redirectToInit'})
    if (searchParams.get('totemId')){
      handleSetTotem(searchParams.get('totemId'));
    }
  }, []);

  return (
    <>
      <HeroCarousel />
    </>
  )
}