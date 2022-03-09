import styled from "styled-components";

const DropdownContainer = styled.select`
    margin: 1em;
    width: 100px;
`;

const Option = styled.option``;

function FilterDropdown() {
    return (
        <DropdownContainer>
            <Option>10개씩 보기</Option>
            <Option>20개씩 보기</Option>
            <Option>30개씩 보기</Option>
        </DropdownContainer>
    );
}

export default FilterDropdown;
