import { useInView } from "react-intersection-observer";

export interface FadeInOnViewProps {}

const FadeInOnView: React.FC<FadeInOnViewProps> = (props: any) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  return (
    <div
      {...props}
      ref={ref}
      className={`${inView ? "opacity-100" : "opacity-0"} transition duration-500`}
    ></div>
  );
};

export default FadeInOnView;
