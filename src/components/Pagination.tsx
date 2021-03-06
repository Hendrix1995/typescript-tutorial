import styled from "styled-components";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const PageNumber = styled.div`
    font-size: 20px;
    padding: 0 12px;
    cursor: pointer;
    transition: 260ms ease-in-out;
    text-shadow: gray 4px 4px 4px;

    &:hover {
        opacity: 0.4;
    }
`;

const CurrentPageNumber = styled.div`
    font-size: 20px;
    padding: 0 12px;
    cursor: pointer;
    color: #6d6dfd;
`;

function Pagination({ limit, pageChangedHandler, currentPage }: { limit: number; pageChangedHandler: (e: number) => void; currentPage: number }) {
    const pageNumArr = [];
    for (let i = 1; i <= Math.ceil(100 / limit); i++) {
        pageNumArr.push(i);
    }

    return (
        <PaginationContainer>
            {pageNumArr.map((num) => (
                <div key={num}>
                    {num === currentPage ? (
                        <CurrentPageNumber key={num}>{num}</CurrentPageNumber>
                    ) : (
                        <PageNumber key={num} onClick={() => pageChangedHandler(num)}>
                            {num}
                        </PageNumber>
                    )}
                </div>
            ))}
        </PaginationContainer>
    );
}

export default Pagination;
