import React, { Suspense } from 'react';
import Navbar from 'components/Navbar';
// import BackgroundVideo from 'components/BackgroundVideo';
import useWindowSize from 'hooks/useWindowSize';
import Home from 'sections/Home';
import AboutUs from 'sections/AboutUs';
import Youropportunity from 'sections/YourOpportunity';
import FadeInOnView from 'components/FadeInOnView';
import Measure from 'react-measure';
import { useEffect } from 'react';

const Apply = React.lazy(() => import('sections/Apply'));
const BackgroundVideo = React.lazy(() => import('components/BackgroundVideo'));

function App() {
  const [homeSectionHeight, setHomeSectionHeight] = React.useState(0);
  const [carouselSlide, setCarouselSlide] = React.useState(0);
  const [width, height] = useWindowSize();
  const screenAspectRatio = width / height;
  let frameHeight = screenAspectRatio < 1.77 ? height : width / 1.77;
  frameHeight = Math.max(frameHeight, homeSectionHeight);

  const homeRef = React.useRef(null as any);
  const aboutUsRef = React.useRef(null as any);
  const yourOpportunityRef = React.useRef(null as any);
  // const youRef = React.useRef(null as any);
  const applyRef = React.useRef(null as any);

  const scroll = (refEl: any) => {
    window.scrollTo({
      top: refEl.current.getBoundingClientRect().top + window.pageYOffset - 40,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scroll(homeRef);
  }, []);

  const menuItems = [
    {
      title: 'Home',
      action: () => scroll(homeRef),
    },
    { title: 'About Us', action: () => scroll(aboutUsRef) },
    {
      title: 'Opportunities',
      action: () => scroll(yourOpportunityRef),
    },
    { title: 'Your Time', action: () => scroll(yourOpportunityRef) },
  ];

  return (
    <>
      <Suspense fallback={<div></div>}>
        <div className="text-white bg-black">
          <Navbar
            menuItems={menuItems}
            handleClick={(target) => {
              const text = (target as Element).innerHTML;
              
              if(text.indexOf('Your Time') > -1) {
                setCarouselSlide(1);
              } else if(text.indexOf('Opportunities') > -1) {
                setCarouselSlide(0);
              }
            }}
            handleContactUs={() => scroll(applyRef)}
          ></Navbar>
          <div className="relative" ref={homeRef} style={{ minHeight: frameHeight }}>
            <BackgroundVideo
              frameHeight={frameHeight}
              frameWidth={frameHeight * 1.77}
            ></BackgroundVideo>
            <Measure
              bounds
              onResize={(r: any) => {
                setHomeSectionHeight(r.bounds.bottom - r.bounds.top);
              }}
            >
              {({ measureRef }: any) => (
                <div ref={measureRef}>
                  <Home handleContactUs={() => scroll(applyRef)} screenHeight={height}></Home>
                </div>
              )}
            </Measure>
          </div>

          <div className="bg-center bg-fixed bg-cover px-9 sm:px-16">
            <div ref={aboutUsRef}>
              <FadeInOnView>
                <AboutUs handleContactUs={() => scroll(applyRef)}></AboutUs>
              </FadeInOnView>
            </div>
            <div ref={yourOpportunityRef}>
              <FadeInOnView>
                <Youropportunity
                  handleContactUs={() => scroll(yourOpportunityRef)}
                  carouselSlide={carouselSlide}
                ></Youropportunity>
              </FadeInOnView>
            </div>
            {/* <div ref={youRef}>
              <FadeInOnView>
                <Youropportunity
                  handleContactUs={() => scroll(yourOpportunityRef)}
                  carouselSlide={1}
                ></Youropportunity>
              </FadeInOnView>
            </div> */}
            <div className="w-full flex justify-center py-20">
              <video
                src="https://swmc-landingpages.s3.amazonaws.com/common/videos/Celligence+V6.mp4"
                controls
              ></video>
            </div>
            <div ref={applyRef}>
              <React.Suspense fallback="loading...">
                <Apply></Apply>
              </React.Suspense>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default App;
