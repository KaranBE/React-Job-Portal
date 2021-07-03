import Input from 'components/Input';
import { useFormik } from 'formik';
import Select from 'react-select';
import React from 'react';
import NumberFormat from 'react-number-format';
import Line from 'assets/images/line.png';

export interface ApplyProps {}

const Apply: React.FC<ApplyProps> = () => {
  const [resume, setResume] = React.useState<File | null>(null);
  const [completed, setCompleted] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [fileError, setFileError] = React.useState('');
  const contacts = [
    'info@celligence.com',
    'alice@celligence.com',
    'boban.m@celligence.com',
    'steve@celligence.com',
  ];

  const { values, errors, submitCount, isSubmitting, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      onSubmit: async (vals) => {
        const formData = new FormData();
        Object.entries(vals).forEach((x) => {
          formData.append(x[0], x[1]);
        });
        formData.append('leadSource', 'www.celligence.com');
        formData.append('resume', resume as Blob);
        formData.append('phone', phone);
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
          phone &&
          values.email
        ) {
          errors.email = 'Invalid email address';
          setPhoneError(true);
        }
        if (
          !phoneError &&
          !fileError &&
          values.firstName &&
          (values.email || phone) &&
          !errors.email
        ) {
          const res = await fetch(process.env.REACT_APP_CAREER_SERVICE as RequestInfo, {
            method: 'POST',
            headers: {},
            body: formData,
          })
            .then((x) => x.json())
            .catch((error) => ({ error }));
          setCompleted(true);
        } else {
          if (!values.firstName) {
            errors.firstName = 'You must provide your full name.';
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && !phone) {
            errors.email = 'Invalid email address';
            setPhoneError(true);
          }
          if (!values.email && !phone) {
            errors.email = 'You must provide your email address or telephone.';
            setPhoneError(true);
          }
        }
      },
      initialValues: {
        firstName: '',
        email: '',
        notes: '',
        source: 'referral',
        reference_name: '',
        reference_code: '',
      },
    });

  const uploadRef = React.useRef<any>(null);
  const topRef = React.useRef<any>(null);

  const scroll = React.useCallback((refEl: any) => {
    window.scrollTo({
      top: refEl.current.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth',
    });
  }, []);

  const TelephoneInput = () => {
    return (
      <div className="relative flex items-center">
        {(!values.email || errors.email) && !phone && phoneError && (
          <>
            <div
              className="absolute right-2 my-auto text-xl"
              style={{ width: '15px' }}
              onMouseOver={(e) => {
                setShowTooltip(true);
              }}
              onMouseLeave={(e) => {
                setShowTooltip(false);
              }}
            >
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                style={{ color: '#ef4444' }}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="#ef4444"
                ></path>
              </svg>
            </div>
            {showTooltip && (
              <div className="MuiTooltip-tooltip bg-red-500 MuiTooltip-tooltipPlacementTop tooltipRequired">
                {'You must provide your email address or telephone.'}
              </div>
            )}
          </>
        )}
        <NumberFormat
          name="phone"
          type="text"
          placeholder="Phone Number"
          format="(###) ###-####"
          value={phone}
          onClick={(e) => {
            setPhoneError(false);
          }}
          onBlur={(e) => setPhone(e.target.value)}
          className={`phoneNumber px-3 h-10 w-full rounded-md outline-none  border-solid border focus:border-2 bg-transparent ${
            phoneError && !phone ? 'border-red-500' : 'border-blue'
          }`}
        />
      </div>
    );
  };

  React.useEffect(() => {
    if (Object.keys(errors).length) {
      scroll(topRef);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);

  return (
    <>
      <form
        onSubmit={(e) => {
          if ((phone.length > 0 && phone.trim().length === 14) || values.email) {
            setPhoneError(false);
            if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
              setPhoneError(true);
            } else {
              delete errors.email;
            }
          } else {
            setPhoneError(true);
            errors.email = 'You must provide your email address or telephone';
          }
          if (!values.firstName) {
            errors.firstName = 'You must provide your full name';
          }
          handleSubmit(e);
        }}
        className="max-w-screen-lg w-full m-auto py-8 flex flex-wrap p-9"
      >
        <div className="w-full mb-10 flex  items-center">
          <div className="w-full self-center text-center mb-3" style={{ color: '#707CD2' }}>
            <div className="text-3xl">
              IF YOU ARE LOOKING TO MAKE A DIFFERENCE, THIS IS THE PLACE TO BE
            </div>
            <div className="text-xm self-center" style={{ color: '#707CD2' }}>
              If you are looking for a fun, challenging and cutting edge environment to grow with
              passion, then tell
            </div>
            <div className="text-xm self-center" style={{ color: '#707CD2' }}>
              us your story and apply here.
              <div className="pt-5">
                <img
                  className="w-full"
                  src={Line}
                  alt="line"
                  style={{ paddingLeft: '48%', paddingRight: '48%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full"></div>

        <div ref={topRef}></div>
        <div className="md:w-4/12 w-full flex">
          <div className="text-center self-center sm:text-left sm:w-auto w-full my-4">
            <div className="text-2xl font-light" style={{ color: 'rgb(106,113,169)' }}>
              Primary Contacts
            </div>
            <div className="mt-7 ml-3 font-bold" style={{ color: 'rgb(112,124,210)' }}>
              <div>101 San Patricio Ave.</div>
              <div>Maramar Plaza Suite 1310</div>
              <div>Guaynabo, Puerto Rico 00968</div>
            </div>
            <div className="sm:text-left text-center sm:w-auto w-full my-4 ml-3">
              {contacts.map((x, i) => (
                <a
                  href={`mailto:${x}`}
                  key={`contact-${i}`}
                  className="block cursor-pointer mb-1 no-underline font-bold"
                  style={{ color: 'rgb(112,124,210)' }}
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
        </div>
        {!completed ? (
          <>
            {' '}
            <div className="md:w-8/12 w-full mb-5 px-2">
              <div className="md:w-1/2 w-full inline-block">
                <Input
                  error={submitCount > 0 && errors.firstName ? errors.firstName : ''}
                  placeholder="Full Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="md:w-1/2 w-full pt-5 md:pt-0 md:pl-3 inline-block mb-5">
                <Input
                  error={submitCount > 0 && errors.email && phoneError ? errors.email : ''}
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={(e) => {
                    if (values.email) setPhoneError(false);
                    handleChange(e);
                  }}
                  onBlur={() => {
                    if (values.email) setPhoneError(false);
                  }}
                ></Input>
              </div>
              <div className="md:w-1/2 w-full md:pt-0 inline-block">
                <TelephoneInput />
              </div>
              <div className="md:w-1/2 w-full md:pt-0 pt-5 inline-block md:pl-3 mb-5 select-input">
                <Select
                  styles={{
                    placeholder: () => ({
                      color: '#3a68b8',
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      paddingLeft: '0.75rem',
                    }),
                    singleValue: () => ({
                      color: '#3a68b8',
                      fontWeight: 'bold',
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: '#3a68b8',
                    }),
                    input: (provided) => ({ color: 'white' }),
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: 'transparent',
                      height: 40,
                      cursor: 'pointer',
                      width: '100%',
                      color: '#3a68b8',
                      borderRadius: 6,
                      borderWidth: state.isFocused ? 2 : 1,
                      borderColor: '#3b82f680',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: '3b82f680',
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? 'white' : 'black',
                      backgroundColor: state.isSelected ? 'rgb(37, 99, 235)' : 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgb(37, 99, 235)',
                      },
                    }),
                  }}
                  defaultValue={{
                    value: 'How did you hear about us?',
                    label: 'How did you hear about us?',
                  }}
                  options={[
                    { value: '', label: 'How did you hear about us?' },
                    { value: 'referral', label: 'Referral' },
                    { value: 'social media', label: 'Social Media' },
                    { value: 'job portals', label: 'Job Portals' },
                    { value: 'google', label: 'Google' },
                    { value: 'other', label: 'Other' },
                  ]}
                  onChange={(val) =>
                    setFieldValue('source', val ? val.value : 'How did you hear about us?')
                  }
                ></Select>
              </div>
              <div className="w-full-width mb-5">
                <textarea
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  style={{
                    height: '200px',
                    width: '100%',
                    borderRadius: '5px',
                    backgroundColor: 'transparent',
                  }}
                  className="border-blue notes"
                  placeholder="Additional Notes"
                ></textarea>
              </div>
              <input
                ref={uploadRef}
                className="hidden"
                type="file"
                onChange={(e) => {
                  const types = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text',
                  ];
                  const maxFileSize = 2000000;
                  const files = e.target.files;
                  if (files && files.length) {
                    for (let x = 0; x < files.length; x++) {
                      if (types.every((type) => files[x].type !== type)) {
                        setFileError('Not a supported format.');
                      } else if (files[x].size > maxFileSize) {
                        setFileError(files[x].type + 'is too large, please pick a smaller file.');
                      } else {
                        setResume(files[0]);
                        setFileError('');
                      }
                    }
                  }
                }}
              ></input>

              <div className="flex flex-row items-center w-full">
                <div className="mr-3 md:w-1/2 w-full">
                  <button
                    className="rounded-full p-3 border-2 border-blue font-bold"
                    style={{ color: '#3a68b8', backgroundColor: 'rgb(18,22,36)' }}
                    onClick={() => uploadRef.current.click()}
                  >
                    Upload Resume
                  </button>
                </div>
                {resume ? resume.name : ''}
                {fileError ? <div className="text-red-300">{fileError}</div> : ''}
                <div className="flex justify-end md:w-1/2 w-full send">
                  <button
                    className="rounded-full p-3 text-bold-500"
                    style={{ color: '#3a68b8', fontWeight: 'bold' }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Ready. Send!'}
                  </button>
                </div>
              </div>
              <div className="hidden pt-5 flex-row items-center w-full sendMobile">
                <div className="self-center w-full">
                  <button>{isSubmitting ? 'Submitting...' : 'Ready. Send!'}</button>
                </div>
              </div>
            </div>
            <div className="sm:w-1/2 w-full px-2" style={{ display: 'none' }}>
              <div className="mb-2">Reference name</div>
              <Input type="text" name="reference_name" value={values.reference_name}></Input>
            </div>
            <div className="sm:w-1/2 w-full px-2" style={{ display: 'none' }}>
              <div className="mb-2">Reference code</div>
              <Input type="text" name="reference_code" value={values.reference_code}></Input>
            </div>
          </>
        ) : (
          <div className="text-center text-4xl py-12 sm:w-8/12">Thank you!</div>
        )}
      </form>
      <div className="max-w-screen-lg text-xs text-center m-auto" style={{ color: '#474748' }}>
        Celligence, an affiliate of Sun West Mortgage Company, Inc., is an Equal Opportunity
        Employer. The company and its affiliates recruit and hire qualified candidates without
        regard to
      </div>
      <div
        className="max-w-screen-lg text-xs text-center m-auto pb-10"
        style={{ color: '#474748' }}
      >
        race, religion, color, sex, sexual orientation, gender, gender identity, age, national
        origin, ancestry, citizenship, veteran or disability status, medical condition, marital
        status, or any other factor prohibited by federal, state, provincial, and municipal laws.
      </div>
    </>
  );
};

export default Apply;
