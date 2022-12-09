import styled from 'styled-components';


export const DashboardContainer = styled.div`
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Dashboard = styled.div`
    width: 70vw;
    height: 80vh;
    border-radius: 20px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
export const DashboardItem = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 2px solid silver;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1A1A1B;
    font-size: 18px;
`;