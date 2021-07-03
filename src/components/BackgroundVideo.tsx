export interface BackgroundVideoProps {
  frameWidth: number;
  frameHeight: number;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ frameHeight, frameWidth }) => {
  return (
    <div className="absolute w-full left-0 top-0">
      <div className="relative flex justify-center">
        <div className="absolute" style={{ width: frameWidth, height: frameHeight }}>
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/558293922?background=1"
            frameBorder="0"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
        <div
          className="absolute z-10 bg-black bg-opacity-50"
          style={{ width: frameWidth, height: frameHeight }}
        ></div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
