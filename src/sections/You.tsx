export interface YouProps {
  handleContactUs: () => void;
}

const You: React.FC<YouProps> = ({ handleContactUs }) => {
  return (
    <div
      className={`transition min-h-66vh flex items-center text-white max-w-1600px mx-auto py-6.6vmax`}
    >
      <div className="flex flex-wrap">
        <div className="md:w-/12 w-full pb-5">
          <div className="font-bold text-5xl leading-none mb-7">You</div>
          <div className="mb-2">
            A highly skilled and disciplined software engineer. We believe in using the right tool
            for the job. Be prepared to work on a wide variety of technologies. Although most of our
            hard-core development is in Java, our development stack is integrated across C/C++,
            Java, Node JS, Oracle, and Amazon Lambda.
          </div>
          <div>
            This position has no minimum education or experience requirements. We are looking for
            talented engineers and architects who have an innate passion for creating beautiful and
            elegant systems.
          </div>
        </div>
        <div className="md:w-/12 w-full text-lg md:pl-7 pb-5">
        </div>
      </div>
    </div>
  );
};

export default You;
