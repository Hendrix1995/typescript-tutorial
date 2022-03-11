import styled from "styled-components";

interface Props {
    limitChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    limit: number;
}

const DropdownContainer = styled.select`
    margin: 12px;
    padding: 4px 0;
    width: 110px;
    border: solid 3px #6d6dfd;
    border-radius: 4px;
`;

function FilterDropdown({ limitChangeHandler, limit }: Props) {
    const options = [10, 20, 30];

    return (
        <DropdownContainer onChange={(e) => limitChangeHandler(e)}>
            <option selected disabled>{`${limit}개씩 보기`}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{`${option}개씩 보기`}</option>
            ))}
        </DropdownContainer>
    );
}

export default FilterDropdown;
