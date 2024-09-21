import { useEffect, useRef } from "react"
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
  const initialized = useRef(false);

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
  }, []);

 return (
  <div className="h-full w-full">
    <Link to="/store">
      <div className="carousel h-full w-full">
        {carouselItens.map((item, index) => (
          <div key={item.id} id={`slide${item.id}`} ref={el => carouselRef.current[index] = el} className="carousel-item relative w-full">
              <img
                src={require('./slide1.jpg')}
                className="h-full object-center"
                style={{ marginRight: 'auto'}}
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