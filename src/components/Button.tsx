const Button = ({
  className = "",
  isBlue = true,
  ...rest
}: {
  className?: string;
  isBlue?: boolean;
  [x: string]: any;
}) => {
  return (
    <button
      {...rest}
      className={`${
        isBlue
          ? "text-white navbar-button hover:bg-blue-600 hover:text-white"
          : "border-white text-white hover:bg-white hover:text-blue-600"
      } border-2 transitino border-solid focus:outline-none font-bold rounded-md h-57px px-5 cursor-pointer select-none`}
    ></button>
  );
};

export default Button;
