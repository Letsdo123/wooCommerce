import { useState } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      promotionalBoldTitle: "100%",
      promotionalTitle: "Organic Vegetables",
      backgroundColor: " bg-slate-400",
      title: "The best way to stuff your wallet.",
      description:
        "Learn lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem molestias reprehenderit dolores!",
      categories: ["Shopping", "Recipes", "Kitchen", "News", "Food"],
      image: {
        src: "../../src/assets/images/slider1.png",
        position: {
          top: 10,
          bottom: 20,
          left: 30,
          right: 50,
        },
      },
      hasButton: true,
      hasSubscribe: false,
    },
    {
      promotionalBoldTitle: "100%",
      promotionalTitle: "Organic Vegetables",
      backgroundColor: " bg-red-300",
      title: "The best way to stuff your wallet.",
      description:
        "Learn lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem molestias reprehenderit dolores!",
      categories: [],
      image: {
        src: "../../src/assets/images/slider2.png",
        position: {
          top: 10,
          bottom: 20,
          left: 30,
          right: 50,
        },
      },
      hasButton: false,
      hasSubscribe: true,
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className={`${slides[currentSlide]?.backgroundColor} w-full h-full`}>
      <div className="p-2 max-h-full h-full">
        <div className="flex h-full justify-between">
          {/* left container */}
          <div className="flex px-[5rem] items-center">
            {/* left container outer div */}
            <div className="flex flex-col justify-between">
              {/* left container inner div */}
              <div className="flex flex-col justify-around w-[400px] mt-4">
                {/* all texts willbe dispalyed here */}
                <h3 className="text-xl md:text-xl font-bold m-2">
                  <span className="text-red-500 underline">
                    {slides[currentSlide]?.promotionalBoldTitle}{" "}
                  </span>
                  {slides[currentSlide].promotionalTitle}
                </h3>
                <h2 className="text-xl md:text-4xl font-bold m-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-gray-600 m-2">
                  {slides[currentSlide].description}
                </p>
              </div>
              <div>
                {slides[currentSlide]?.hasSubscribe && (
                  <form className="mt-4 flex items-center">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
                    >
                      Subscribe
                    </button>
                  </form>
                )}

                {slides[currentSlide]?.hasButton && (
                  <button className="bg-red-500 text-white my-4 px-2 py-2 rounded-lg hover:bg-red-600 transition-all">
                    Shop Now
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* right container */}
          <div className={`flex flex-col ${slides[currentSlide].categories.length > 0 ? 'justify-between' : 'justify-center'}`}>
            {/* badge container */}
            {
                slides[currentSlide].categories.length > 0 && (
                    <div className="lg:w-[400px] flex justify-between mt-6">
              {/* badge will be displayed here */}
              {slides[currentSlide].categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
                )
            }
            
            {/* image container */}
            <div>
              {/* image will be displayed here */}
              <img
                src={slides[currentSlide].image?.src}
                width = "500px"
                height= "500px"
                alt="Slide"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* slider pointer */}
        <div className="flex items-center w-full px-4 absolute">
            {slides.length && slides.map((slide,index)=>(
                <div onClick={handlePrevSlide} key={index} className={`w-5 h-5 rounded-full border ${index == currentSlide ? 'bg-red-700' : 'bg-white-500'}`}>

                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;