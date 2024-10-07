import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { getSlides } from "../../../api";

const someItems = [
  {
    id: '1',
    img: 'https://firebasestorage.googleapis.com/v0/b/totem-tour.appspot.com/o/slide1.jpg?alt=media&token=f87ebc89-439c-47f8-a19c-345f48f4c6cc',
    description: "Service 1"
  },
]

export default function HeroCarousel() {
  const [carouselItens, setCarouselItems] = useState(someItems);

  const carouselRef = useRef(new Array(carouselItens.length));
  const initialized = useRef(false);

  useEffect(() => {
    getSlides().then((res) => {
      setCarouselItems(res)
      carouselRef.current = carouselItens;
    }).catch(() => {
      setCarouselItems(someItems)
    })
  }, [])

  let index = 0;
  const scrollCarousel = () => {
    index++;

    if (index > carouselItens.length-1) {
      index = 0;
    }
    if (carouselRef.current[index]) {
      carouselRef.current[index].scrollIntoView()
    }
    
  };

  useEffect(() => {
    initialized.current = true
    const intervalId = setInterval(() => {
      scrollCarousel();
    }, 5000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);

 return (
  <div className="h-full w-full">
    <Link to="/totem/store">
      <div className="carousel h-full w-full">
        {carouselItens.map((item, index) => (
          <div key={item.id} id={`slide${item.id}`} ref={el => carouselRef.current[index] = el} className="carousel-item relative w-full">
              <img
                src={item.img}
                className="h-full object-center"
                style={{ marginRight: 'auto'}}
                alt="slide"
              />
          </div>
        ))}
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