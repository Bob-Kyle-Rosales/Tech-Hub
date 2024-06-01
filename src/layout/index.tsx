import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

function MainLayout() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(1); // Set to a value greater than 0
  const [navbarHeight, setNavbarHeight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (scrollContainerRef.current) {
        const navbar = scrollContainerRef.current.querySelector('.navbar');
        if (navbar) {
          setNavbarHeight(navbar.getBoundingClientRect().height);
        }
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const currentScrollY = scrollContainerRef.current.scrollTop;
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <div className="flex flex-col h-screen">
      <div
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}
      >
        <div
          className={`transition-transform duration-300 ${
            showNavbar ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <NavBar />
        </div>
      </div>
      <div
        className="flex-grow overflow-auto"
        ref={scrollContainerRef}
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
