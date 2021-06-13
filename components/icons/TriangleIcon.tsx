import { IconProps } from "./IconProps";

export const TriangleIcon = (props: IconProps) => {
  const { fill = "#000000", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={fill}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z" />
    </svg>
  );
};
