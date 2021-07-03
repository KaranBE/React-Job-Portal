import { useState, useEffect } from 'react';
import Opportunity from 'assets/images/opportunity.png';
import You from 'assets/images/you.png';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export interface YourOpportunityProps {
  handleContactUs: () => void;
  carouselSlide: number;
}

export interface HistoryProps {
  current: number;
  items: Array<JSX.Element>;
  changeSlide: (curIndex: number, index: number) => void;
}

interface ICarousel {
  items: JSX.Element[];
  current: number | undefined;
  isNext?: boolean;
}

const History: React.FC<HistoryProps> = ({ items, current, changeSlide }) => {
  let list = items.map((el, index) => {
    let name = index === current ? 'active' : '';
    return (
      <li key={index}>
        <button className={name} onClick={() => changeSlide(current, index)}></button>
      </li>
    );
  });

  return <ul className="self-center m-auto">{list}</ul>;
};

const Youropportunity: React.FC<YourOpportunityProps> = ({ handleContactUs, carouselSlide = 0 }) => {
  const items = [
    <div
      className={`transition min-h-70vh p-9 flex items-center text-white max-w-screen-lg m-auto py-6.6vmax`}
    >
      <div className="flex flex-wrap items-center">
        <div className="md:w-6/12 pb-5">
          <div className="font-bold text-4xl leading-none mb-7">Your Opportunity</div>
          <div className="mb-1 text-sm">You will find yourself working in a highly collaborative and</div>
          <div className="mb-1 text-sm">creative team of talented engineers using creativity and</div>
          <div className="mb-1 text-sm">innovation to solve problems in ways that have never been</div>
          <div className="mb-1 text-sm">imagined before; build and architect large-scale, data</div>
          <div className="mb-1 text-sm">driven systems. You will not find a traditional corporate</div>
          <div className="mb-1 text-sm">structure – We don’t go in for medals, badges or</div>
          <div className="mb-1 text-sm"> hierarchy.</div>
          <div className="mb-1 text-sm">We want your work to inspire not service.</div>
        </div>
        <div className="md:w-6/12 pb-5">
          <img src={Opportunity}  alt="Opportunity"/>
        </div>
      </div>
    </div>,
    <div
      className={`transition min-h-70vh p-9 flex items-center text-white max-w-screen-lg m-auto py-6.6vmax`}
    >
      <div className="flex flex-wrap">
        <div className="md:w-6/12 pb-5">
          <div className="font-bold text-4xl leading-none mb-7">You</div>
          <div className="mb-1 text-sm">A highly skilled and disciplined software engineer.</div>
          <div className="mb-1 text-sm">We believe in using the right tool for the job. Be</div>
          <div className="mb-1 text-sm">prepared to work on a wide variety of technologies.</div>
          <div className="mb-1 text-sm">Although most of our hard-core development is in</div>
          <div className="mb-1 text-sm">Java, our development stack is integrated across</div>
          <div className="mb-5">C/C++, Java, Node JS, Oracle, and Amazon Lambda.</div>
          <div className="mb-1 text-sm">This position has no minimum education or</div>
          <div className="mb-1 text-sm">experience requirements. We are looking for</div>
          <div className="mb-1 text-sm">talented engineers and architects who have an</div>
          <div className="mb-1 text-sm">innate passion for creating beautiful and elegant </div>
          <div className="mb-1 text-sm">systems.</div>
        </div>
        <div className="md:w-6/12 pb-5">
          <img src={You} alt="Self"/>
        </div>
      </div>
    </div>,
  ];
  const [carousel, setCarousel] = useState<ICarousel>({
    items: items,
    current: 0,
    isNext: true,
  });

  const goToHistoryClick = (curIndex: number, index: number) => {
    let next = curIndex < index;
    setCarousel({
      current: index,
      isNext: next,
    } as ICarousel);
  };

  useEffect(() => {
    if(carouselSlide !== 0) goToHistoryClick(0, carouselSlide);
    else goToHistoryClick(1, carouselSlide);
  }, [carouselSlide])

  return (
    <div className="app min-h-70vh">
      <div className="carousel p-9 flex items-center text-white max-w-screen-lg m-auto ">
        <CSSTransitionGroup
          transitionName={{
            enter: carousel.isNext ? 'enter-next' : 'enter-prev',
            enterActive: 'enter-active',
            leave: 'leave',
            leaveActive: carousel.isNext ? 'leave-active-next' : 'leave-active-prev',
          }}
        >
          <div className="carousel_slide" key={carousel.current as number}>
            {items && items[carousel.current as number]}
          </div>
        </CSSTransitionGroup>

        <div className="carousel_history self-center">
          <History
            current={carousel.current as number}
            items={items}
            changeSlide={goToHistoryClick}
          />
        </div>
      </div>
    </div>
  );
};
export default Youropportunity;
