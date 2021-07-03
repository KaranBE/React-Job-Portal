import Button from 'components/Button';
import Modal from 'components/Modal';
import Play from 'assets/images/play.png';
import { useState } from 'react';
export interface HomeProps {
  screenHeight: number;
  handleContactUs: () => void;
}

const Home: React.FC<HomeProps> = ({ screenHeight, handleContactUs }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="relative p-9 flex items-end max-w-screen-lg m-auto z-10 pt-22"
      style={{ minHeight: Math.min(screenHeight, 800) }}
    >
      <div className="flex flex-wrap">
        <div className="w-full pb-3">
          <div className="text-custom-color text-sm font-semibold mb-5">
            THE NEXT GENERATION STARTS HERE
          </div>
          <div className="font-bold text-4xl">Join us in creating a</div>
          <div className="font-bold text-4xl mb-5">better future</div>
          <div className="w-full text-left text-sm pb-3">
            <div className="mb-1">
              We are unique, we are different, and we want to work with you.
            </div>
            <div className="mb-1">
              We do not care where you went to school or what you have learned as much as
            </div>
            <div className="mb-1">what you want to learn and be a part of.</div>
            <div className="mb-1">
              You have extraordinary skills which we want to use to spark creation of the
            </div>
            <div className="mb-1">
              software that makes systems that understands, connects with, and drives towards
            </div>
            <div className="mb-1">your emotional satisfaction.</div>
            <div>
              We want to know how you want to change the world through the software you will
            </div>
            <div>be a part of.</div>
          </div>
          <div className="flex align-center justify-content">
            <Button onClick={handleContactUs}>Your Opportunity</Button>
            {''}
            <div className=" inline-flex navbar-button align-center justify-content mx-5 py-3 px-4 max-h-full">
              <input
                className="max-h-10"
                type="image"
                id="playButton"
                alt="Video Play"
                src={Play}
                onClick={() => setShowModal(true)}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
    </div>
  );
};

export default Home;
