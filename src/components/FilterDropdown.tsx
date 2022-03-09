import styled from "styled-components";

interface Props {
    limitChangeHandler: any;
}

const DropdownContainer = styled.select`
    margin: 12px;
    padding: 4px 0;
    width: 110px;
    border: solid 3px #6d6dfd;
    border-radius: 4px;
`;

function FilterDropdown({ limitChangeHandler }: Props) {
    return (
        <DropdownContainer onChange={(e) => limitChangeHandler(e)}>
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
        </DropdownContainer>
    );
}

export default FilterDropdown;
