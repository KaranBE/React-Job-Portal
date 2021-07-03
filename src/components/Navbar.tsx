import Logo from 'assets/images/logo.png';
import React from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import Button from 'components/Button';

export interface NavbarProps {
  handleContactUs: () => void;
  menuItems: { title: string; action: Function }[];
  handleClick: (target: EventTarget) => void;
}

const Navbar: React.FC<NavbarProps> = ({ menuItems, handleContactUs, handleClick }) => {
  const [isNavbarAtTop, setIsNavbarAtTop] = React.useState(true);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('scroll', (e) => {
      setIsNavbarAtTop(window.scrollY === 0);
    });
  }, []);

  return (
    <div
      id="navbar"
      className={`${
        isNavbarAtTop ? 'bg-transparent' : 'bg-blue-400'
      }px-7 fixed z-20 top-0 left-0 right-0 h-60px xl:h-83px md:text-white transition-all flex justify-evenly items-center m-auto max-w-screen-lg`}
    >
      <img className="xl:w-52 w-40" src={Logo} alt="logo"></img>
      <div className="block md:hidden">
        <Hamburger toggled={isMenuOpened} toggle={setIsMenuOpened} />
      </div>

      <div className="md:flex items-center hidden">
        {menuItems.map((x, i) => (
          <div
            onClick={(e) => {
              x.action();
              handleClick(e.target);
            }}
            key={`menu-item-${i}`}
            className="px-3 cursor-pointer"
          >
            {x.title}
          </div>
        ))}
      </div>
      <Button onClick={handleContactUs}>Contact Us</Button>
      <div
        className={`transition transform ${
          isMenuOpened ? 'translate-x-0' : 'translate-x-full'
        }  fixed left-0 top-60px xl:top-83px w-full h-full overflow-auto z-50 bg-white`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow flex">
            <div className="m-auto text-center text-black text-4xl">
              {menuItems.map((x, i) => (
                <div
                  onClick={() => {
                    x.action();
                    setIsMenuOpened(false);
                  }}
                  key={`menu-item-${i}`}
                  className="mb-3 cursor-pointer"
                >
                  {x.title}
                </div>
              ))}
            </div>
          </div>
          <div className="h-60px xl:h-83px"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
