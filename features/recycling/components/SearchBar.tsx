import { ChangeEvent, useCallback } from "react";
import styled from "styled-components";
import { MarginProps } from "system-props";
import { SearchIcon } from "../../../components/icons";
import { getSystemProps } from "../../../components/Theme";

interface SearchBarProps {
  containerStyle?: MarginProps;
  searchInput: string;
  searchPrompt?: string;
  onChange: (searchInput: string) => void;
}

export const SearchBar = (props: SearchBarProps): JSX.Element => {
  const { searchInput, searchPrompt, onChange, containerStyle } = props;

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
  }, []);

  return (
    <SearchBarContainer {...containerStyle}>
      <SearchIcon />
      <SearchInput
        type="text"
        value={searchInput}
        onChange={handleOnChange}
        placeholder={searchPrompt}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.label<MarginProps>`
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${getSystemProps()}
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  color: #333;
  outline: none;
  box-shadow: none;
  margin-left: 1rem;
  font-size: 1.2rem;

  &::placeholder {
    color: #bbb;
  }
`;
