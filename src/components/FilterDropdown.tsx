import styled from "styled-components";

const DropdownContainer = styled.select`
  margin: 12px;
  padding: 4px 0;
  width: 110px;
  border: solid 3px #8884d8;
  border-radius: 4px;
  box-shadow: gray 2px 2px 2px;
`;

function FilterDropdown({ limitChangeHandler, limit }: { limitChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void; limit: number }) {
  const options = [10, 20, 30];

  return (
    <DropdownContainer onChange={(e) => limitChangeHandler(e)} value={limit}>
      {options.map((option, index) => (
        <option key={index} value={option}>{`${option}개씩 보기`}</option>
      ))}
    </DropdownContainer>
  );
}

export default FilterDropdown;
