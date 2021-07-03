import React from 'react';

export interface ModalProps {
  setShowModal: Function;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, showModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
          <div className=" modal justify-center m-auto h-3/4 max-w-screen-md items-center flex text-white overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-black text-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b text-white">
                  <button
                    className="p-1 ml-auto border-0 text-white float-right text-2xl"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/558293922?background=1"
                    frameBorder="0"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
