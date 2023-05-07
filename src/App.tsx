import Carousel from "./components/Carousel";
export default function App() {
  return (
    <section className="w-full  flex flex-col gap-10 my-6">
      <Carousel />
      <Carousel autoSlide />
      <Carousel autoSlide autoSlideInterval={2000} />
    </section>
  );
}
