import styled from "styled-components";
import { getSystemProps, SystemProps } from "./Theme";

interface TextProps extends SystemProps {
  className?: string;
  children?: React.ReactNode;
  as?: "p" | "span";
}

const BaseText = styled.p<SystemProps>`
  ${getSystemProps()}
`;

export const Text = (props: TextProps): JSX.Element => {
  const { className, children, as = "p", ...textProps } = props;
  return (
    <BaseText className={className} as={as} {...textProps}>
      {children}
    </BaseText>
  );
};

interface HeadingProps extends SystemProps {
  className?: string;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const BaseHeading = styled.h1<SystemProps>`
  ${getSystemProps()}
`;

export const Heading = (props: HeadingProps): JSX.Element => {
  const { className, children, as = "h1", ...textProps } = props;
  return (
    <BaseHeading className={className} as={as} {...textProps}>
      {children}
    </BaseHeading>
  );
};
