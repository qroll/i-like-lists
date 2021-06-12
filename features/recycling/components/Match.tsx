import styled from "styled-components";
import { CrossIcon, TickIcon } from "../../../components/icons";
import { Data } from "../data/database";

interface MatchProps {
  matchedItem: Data;
}

const mapRecyclableToIcon = (status: Data["isRecyclable"]) => {
  switch (status) {
    case "YES":
      return <RecyclableLabel as={TickIcon} fill="#70AE6E" />;
    case "NO":
      return <RecyclableLabel as={CrossIcon} fill="#BD1E1E" />;
    case "DEPENDS":
      return <RecyclableLabel as={CrossIcon} fill="#483C46" />;
  }
};

export const Match = (props: MatchProps): JSX.Element => {
  const { matchedItem } = props;
  const icon = mapRecyclableToIcon(matchedItem.isRecyclable);

  return (
    <MatchContainer>
      {icon}
      <div>
        <Name>{matchedItem.displayLabel}</Name>
        {matchedItem.description && <Description>{matchedItem.description}</Description>}
      </div>
    </MatchContainer>
  );
};

const MatchContainer = styled.div`
  background-color: #ffffff;
  border-radius: 0.3em;
  box-shadow: 0 0 3px #ccc;
  padding: 1rem;
  display: flex;
  width: 80%;
  margin: 1rem;
  align-items: flex-start;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

const Description = styled.div`
  margin-top: 1rem;
`;

const RecyclableLabel = styled.svg`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
`;
