import { NavLink } from 'react-router-dom';
import image from '../../assets/banners/AppleBanner4.jpg';
import image2 from '../../assets/banners/AppleBanner5.png';
import person_mac from '../../assets/edu.png';
import person2 from '../../assets/Person2.png';
import headphone from '../../assets/headphone.png';
import iPhone from '../../assets/iPhone.jpg';
import iPad from '../../assets/iPad.png';
import MacBook from '../../assets/MacBook.jpg';
import Card from '../../components/Card';

function HomePage() {
  return (
    <div>
      <img src={image} alt="img" className="w-full" />
      <div className="flex justify-center my-16 px-8">
        <Card className="w-1/3  p-0 relative">
          <img src={person_mac} alt="img" className="w-full rounded-lg" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center">
            <h1 className="font-bold mb-2 sm:text-xl md:text-5xl lg:text-7xl">
              College Students
            </h1>
            <h2 className=" font-bold sm:text-lg md:text-lg lg:text-xl">
              Mac and iPad. Go further
            </h2>
          </div>
        </Card>

        <Card className="w-1/3  p-0 relative">
          <img src={person2} alt="img" className="w-full rounded-lg" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center">
            <h1 className="font-bold mb-2 sm:text-xl md:text-5xl lg:text-7xl">
              Explore <br /> Limited <br /> Editions
            </h1>
          </div>
        </Card>

        <Card className="w-1/3  p-0 relative">
          <img src={headphone} alt="img" className="w-full rounded-lg" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center">
            <h1 className="font-bold mb-2 sm:text-xl md:text-5xl lg:text-7xl">
              Shop <br /> Triple <br /> Threat
            </h1>
          </div>
        </Card>
      </div>

      <img src={image2} alt="img" className="w-full" />
      <div className="text-center">
        <span className="text-6xl">Shop Now!</span>
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center my-8 px-8">
          <Card className="w-1/3 h-96 p-0 relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={iPhone} alt="img" className="w-full rounded-lg" />
            <NavLink to="/iphone">
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center hover:opacity-90 cursor-pointer">
                <h1 className="font-bold mb-2 sm:text-3xl md:text-3xl lg:text-5xl">
                  iPhone
                </h1>
              </div>
            </NavLink>
          </Card>

          <Card className="w-1/3 h-96 p-0 relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={iPad} alt="img" className="w-full h-auto rounded-lg" />
            <NavLink to="/ipad">
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center hover:opacity-90 cursor-pointer">
                <h1 className="font-bold mb-2 sm:text-3xl md:text-3xl lg:text-5xl">
                  iPad
                </h1>
              </div>
            </NavLink>
          </Card>

          <Card className="w-1/3 h-96 p-0 relative overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img src={MacBook} alt="img" className="w-full rounded-lg" />
            <NavLink to="/mac">
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center hover:opacity-90 cursor-pointer">
                <h1 className="font-bold mb-2 sm:text-3xl md:text-3xl lg:text-5xl">
                  MacBook
                </h1>
              </div>
            </NavLink>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
