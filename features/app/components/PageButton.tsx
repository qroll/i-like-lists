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
        <Icon fill="#555" />
        {label}
      </CatLink>
    </Link>
  );
};

const Icon = styled(CatIcon)`
  height: 2.5rem;
  width: 2.5rem;
`;

const CatLink = styled.a`
  align-items: center;
  color: #333;
  display: flex;
  flex-direction: row;

  &:focus,
  &:hover {
    font-weight: ${th.fontWeight("semibold")};
    outline: none;
    text-decoration: underline;

    ${Icon} {
      transform: rotate(25deg);
    }
  }
`;
