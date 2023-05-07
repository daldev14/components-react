import { useState, useEffect, useCallback } from "react";

interface CarouselProps {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=921&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1549778399-f94fd24d4697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, nextSlide]);

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full h-[780px] mx-auto px-4">
      <div className="w-full h-full relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          className="w-full h-full rounded-md bg-center bg-cover transition-all duration-500"
        ></div>
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded py-2 px-0 bg-black/20 text-white cursor-pointer"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
            ></path>
          </svg>
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded py-2 px-0 bg-black/20 text-white cursor-pointer"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
            />
          </svg>
        </button>
        {/*  */}
        <div className="absolute inset-x-0 bottom-4">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`bg-neutral-300 px-4 h-2 w-10 rounded-md cursor-pointer transition-all duration-500 ${
                    currentSlide === index ? "bg-white" : ""
                  }`}
                >
                  <span className="sr-only">{index}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
