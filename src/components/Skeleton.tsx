import styled, { keyframes } from "styled-components";

const loading = keyframes`
   0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
`;

const ItemContainer = styled.div`
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 7px;
    width: 200px;
    height: 250px;
    border-radius: 15px;
`;

const Wave = styled.div`
    animation: ${loading} 0.8s ease-in-out 0.5s infinite;
`;

const ItemImg = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 4px;
    background-color: rgba(207, 207, 207, 0.6);
    position: relative;
    overflow: hidden;
`;

const ItemInfoContainer = styled.div`
    display: flex;
    margin: 8px 0;
    position: relative;
    overflow: hidden;
`;

const ItemIdBox = styled.div`
    background-color: rgba(207, 207, 207, 0.6);
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
`;

const ItemNameBox = styled.div`
    width: 110px;
    height: 20px;
    background-color: rgba(207, 207, 207, 0.6);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
`;

const ItemPriceBox = styled.div`
    width: 140px;
    height: 50px;
    background-color: rgba(207, 207, 207, 0.6);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
`;

function Skeleton() {
    return (
        <ItemContainer>
            <Wave>
                <ItemImg />
                <ItemInfoContainer>
                    <ItemIdBox />
                    <ItemNameBox />
                </ItemInfoContainer>
                <ItemPriceBox />
            </Wave>
        </ItemContainer>
    );
}

export default Skeleton;
