import ErrorIcon from "@material-ui/icons/Error";
import Tooltip from "@material-ui/core/Tooltip";
import React, { InputHTMLAttributes } from "react";

const WarningIcon = React.forwardRef(function MyComponent(props: any, ref: any) {
  return (
    <div {...props} ref={ref}>
      <ErrorIcon className="text-red-500" fontSize="inherit"></ErrorIcon>
    </div>
  );
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string | boolean;
}

const Input: React.FC<InputProps> = ({ className = "", error, ...props }) => {
  const [tooltipOpened, setTooltipOpened] = React.useState(false);
  return (
    <div className={`${className} relative flex items-center`}>
      <input
        className={`px-3 h-10 w-full rounded-md outline-none ${
          error ? "border-red-500" : "border-blue"
        }  border-solid border focus:border-2 bg-transparent`}
        {...props}
        spellCheck={false}
      ></input>
      {error ? (
        <Tooltip
          open={tooltipOpened}
          classes={{ tooltip: "bg-red-500" }}
          title={error}
          placement="top"
        >
          <WarningIcon
            onClick={() => setTooltipOpened((prev) => !prev)}
            onMouseEnter={() => setTooltipOpened(true)}
            onMouseLeave={() => setTooltipOpened(false)}
            className="absolute right-2 my-auto w-auto text-xl"
          ></WarningIcon>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default Input;
