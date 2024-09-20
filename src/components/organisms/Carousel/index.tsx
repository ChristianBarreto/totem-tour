import React, { MutableRefObject, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

const carouselItens = [
  {
    id: 1,
    img: './slide1.jpg',
    description: "Service 1"
  },
  {
    id: 2,
    img: 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
    description: "Service 2"
  },
  {
    id: 3,
    img: 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
    description: "Service 3"
  },
  {
    id: 4,
    img: 'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp',
    description: "Service 4"
  },
]

export default function HeroCarousel() {
  const carouselRef = useRef(new Array(carouselItens.length));
  const initialized = useRef(false)

  let index = 0;
  const scrollCarousel = () => {
    index++;

    if (index > carouselItens.length-1) {
      index = 0;
    }
    carouselRef.current[index].scrollIntoView()
  };

  useEffect(() => {
    initialized.current = true
    const intervalId = setInterval(() => {
      scrollCarousel();
    }, 5000)
    return () => {
      clearInterval(intervalId);
    }
  }, [])

 return (
    <>
      <div className="carousel h-full">
        {carouselItens.map((item, index) => (
          <div key={item.id} id={`slide${item.id}`} ref={el => carouselRef.current[index] = el} className="carousel-item relative w-full">
            <Link to="/store">
              <img
                src={require('./slide1.jpg')}
                className="h-full"
              />
              <div className="bg-red" >
                <p>ASdas</p>
              </div>
            </Link>
          </div>
        ))}
  
      </div>
    </>
  )
}