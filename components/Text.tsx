import { SystemProps, x } from "@xstyled/styled-components";

interface TextProps extends SystemProps {
  className?: string;
  children?: React.ReactNode;
  as?: "p" | "span";
}

export const Text = (props: TextProps): JSX.Element => {
  const { className, children, as = "p", ...p } = props;
  const Component = x[as];
  return (
    <Component className={className} {...p}>
      {children}
    </Component>
  );
};

interface HeadingProps extends SystemProps {
  className?: string;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = (props: HeadingProps): JSX.Element => {
  const { className, children, as = "h1", ...p } = props;
  const Component = x[as];
  return (
    <Component className={className} {...p}>
      {children}
    </Component>
  );
};
