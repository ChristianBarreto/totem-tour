import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { getSlides } from "../../../api/slides/api";
import { SlideResp, Slides } from "../../../api/slides/types";
import { analytics } from "../../../firebase";
import { logEvent } from "firebase/analytics";

export default function HeroCarousel() {
  const fallBackImg = "https://firebasestorage.googleapis.com/v0/b/totem-tour.appspot.com/o/slides%2F0-fallback-slide-DO-NOT-DELETE.jpg?alt=media&token=52ef0826-7158-461e-b613-9811e42716a5";
  
  const [carouselItens, setCarouselItems] = useState<Slides>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const carouselRef = useRef(new Array(carouselItens.length));
  const initialized = useRef(false);

  useEffect(() => {
    logEvent(analytics, "init_slides")
    getSlides().then((res) => {
      setCarouselItems(res.filter(((slide: SlideResp) => slide.active)))
      carouselRef.current = carouselItens;
    }).catch(() => {
      setCarouselItems([])
    })
  }, []);

  const defineNextIndex = () => {
    return slideIndex === carouselItens.length-1 ? 0 : slideIndex + 1
  };

  useEffect(() => {
    const interval = carouselItens[slideIndex]?.duration * 1000;
    initialized.current = true
   
    const intervalId = setTimeout(() => {
      if (carouselRef.current[slideIndex]) {
        carouselRef.current[defineNextIndex()].scrollIntoView();
        setSlideIndex(defineNextIndex())
      }
    }, interval)
    return () => {
      clearInterval(intervalId);
    }
  }, [carouselItens, slideIndex]);


  return (
    <div className="h-full w-full overflow-hidden	">
      <Link to="/totem/store">
        <div className="carousel h-full w-full">
          {carouselItens.filter((c) => c.active).length ? (
            <>
              {carouselItens?.sort((a, b) => a.order - b.order).map((item, index) => {
                if (item.active) {
                  return (
                    <div key={item.id} id={`slide${item.id}`} ref={el => carouselRef.current[index] = el} className="carousel-item relative w-full h-full">
                        <img
                          src={item.img !== "" ? item.img : fallBackImg}
                          className="object-center"
                          style={{ marginRight: 'auto'}}
                          alt="slide"
                        />
                    </div>
                )}
                return (
                  <img
                    src={fallBackImg}
                    className="object-center"
                    style={{ marginRight: 'auto'}}
                    alt="slide"
                  />
                )
              })}
            </>
          ) : (
            <img
              src={fallBackImg}
              className="object-center"
              style={{ marginRight: 'auto'}}
              alt="slide"
            />
          )}
        </div>
        <div className="flex flex-col justify-center p-10 items-center opacity-90" style={{marginTop: '-700px'}}>
          <div className="card bg-primary text-primary-content p-10">
            <div className="card-body">
              <p className="text-6xl text-base-100">Os melhores passeios da região</p>
              <div className="card-actions justify-center">
                <button className="btn p-12 mt-8 animate-bounce">
                  <p className="text-5xl text-primary" style={{marginTop: '-25px'}}>Reserve aqui!</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>

  )
}