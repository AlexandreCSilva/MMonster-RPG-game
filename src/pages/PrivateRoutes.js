import { Link } from "react-router-dom";
import styled from 'styled-components';

function renderError() {
    localStorage.clear();
    
    return (
        <Container>
            <h1>MMonster-RPG</h1>
            
            <h2>Faça login para continuar</h2>

            <Link  to='/'>
                <button>Login</button>
            </Link>
        </Container>
    );
}

export default function PrivatePage({ children }) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    
    if (!auth) {
        return renderError();
    }

    return (<>
        {children}
    </>);
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #0b2d39;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        color: #ffffff;
        font-weight: 400;
        font-size: 32px;
        margin-bottom: 24px;
    }

    h2 {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 15px;
        color: #ffffff;
        margin-top: 20px;
    }

    button {
        height: 46px;
        width: 120px;
        margin-left: 7%;
        margin-top: 40px;
        background: #134b5f;
        border-radius: 5px;
        border: none;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
        cursor: pointer;
    }
`;