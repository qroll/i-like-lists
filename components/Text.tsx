import styled from "styled-components";

export const H1 = styled.h1``;
export const BaseText = styled.span``;

interface TextProps {
  className?: string;
  bold?: boolean;
  italic?: boolean;
  children?: React.ReactNode;
}

export const Text = (props: TextProps): JSX.Element => {
  const { className, bold, italic, children } = props;
  return (
    <BaseText
      className={className}
      style={{
        fontStyle: italic === true ? "italic" : undefined,
        fontWeight: bold === true ? "bold" : undefined,
      }}
    >
      {children}
    </BaseText>
  );
};
