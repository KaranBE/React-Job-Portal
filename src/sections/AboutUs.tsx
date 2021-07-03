import Button from 'components/Button';
import About from 'assets/images/about.png';

export interface AboutUsProps {
  handleContactUs: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ handleContactUs }) => {
  return (
    <div className="min-h-66vh p-9 flex items-center text-white max-w-screen-lg m-auto py-6.6vmax">
      <div className="flex flex-wrap">
        <div className="md:w-1/2 w-full pb-5">
          <img src={About} alt="About Us"></img>
        </div>
        <div className="md:w-1/2 text-left w-full text-sm md:pl-7 pb-5">
          <div className="font-bold text-4xl mb-2">About Us</div>
          <div className="mb-1">
            Celligence is an affiliate of Sun West Mortgage Company, Inc., one
          </div>
          <div className="mb-1">of the largest independent, privately owned financial services</div>
          <div className="mb-1">
            companies. As one of the fastest growing fin-tech companies, we
          </div>
          <div className="mb-1">
            provide exceptional service, technology, and product innovation.
          </div>
          <div className="mb-1">
            Our team of brilliant engineers are continuously filing new patents
          </div>
          <div className="mb-1">
            and expanding the boundaries of the financial services industry
          </div>
          <div className="mb-1">
            through innovations in mobile applications, customer acquisition
          </div>
          <div className="mb-1">and retention algorithms, and AI based process automation. We</div>
          <div className="mb-1">
            need people like you to join in our mission to lower the cost of{' '}
          </div>
          <div className="mb-2">
            {' '}
            financial services so that we can reach new and underserved markets.
          </div>
          <Button onClick={handleContactUs}>Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
