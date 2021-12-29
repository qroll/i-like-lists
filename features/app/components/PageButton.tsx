import Link from "next/link";
import styled from "styled-components";
import { CatIcon } from "../../../components/icons";
import { th } from "../../../components/Theme";

interface PageButtonProps {
  href: string;
  label: string;
}
export const PageButton = (props: PageButtonProps): JSX.Element => {
  const { href, label } = props;

  return (
    <Link href={href} passHref>
      <CatLink>
        <Icon />
        {label}
      </CatLink>
    </Link>
  );
};

const Icon = styled(CatIcon)`
  height: 2.2rem;
  width: 2.2rem;
  margin-right: ${th.space("s")};

  path {
    fill: ${th.color("gray-500")};
  }
`;

const CatLink = styled.a`
  align-items: center;
  color: ${th.color("gray-600")};
  display: flex;
  flex-direction: row;
  font-size: ${th.fontSize("lg")};
  border: 2px solid ${th.color("gray-600")};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  width: 10rem;

  &:focus,
  &:hover {
    color: ${th.color("gray-800")};
    font-weight: ${th.fontWeight("semibold")};
    outline: none;
    text-decoration: underline;

    ${Icon} {
      transform: rotate(25deg);

      path {
        fill: #eb7b59;
      }
    }
  }
`;
