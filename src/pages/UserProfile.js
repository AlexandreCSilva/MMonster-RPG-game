import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getChars } from '../Services/api';
import { ThreeDots } from 'react-loader-spinner';

export function UserProfile() {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ charsData, setCharsData ] = useState([]);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const config = { headers: { authorization: 'Bearer '+ auth.authorization, email: auth.email }};

  useEffect(() => {
    getChars(config)
      .then(setIsLoading(true))
      .catch(function() {
        alert('Ocorreu um erro ao carregar os personagens!');
        setIsLoading(false)
      })
      .then(function(response) {
        console.log(response.data)
        setCharsData(response.data);
      })
      .finally(setIsLoading(false));
  }, []);

  return (
    <Container>
      <Upper>
        <h1>Olá, {auth.name}</h1>
      </Upper>

      <div className='content'>
        {!isLoading ? 
          (charsData.length === 0 ?
            <Link to='/newchar'>
             Criar novo personagem
            </Link> :   
            <Content> 
              {charsData.map(char => {return (
                  <Link to={'/game?name='+char.name} >
                    <div>
                      {char.name}
                      <span>
                        <h2>{'Level: '+char.level}</h2>
                        <h3>{'Mapa: '+char.map}</h3>
                        <ion-icon name="play"></ion-icon>
                      </span>
                    </div>
                  </Link>
              )})}

              <Link to='/newchar'>
                <ion-icon name="add-outline"></ion-icon>
              </Link>
            </Content>) : 
          <ThreeDots 
            height='10' 
            width='80'
            radius='9'
            color='#FFFFFF' 
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
          />
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0b2d39;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    height: 90%;
    align-items: center;
    justify-content: center;

    a {
      font-family: 'Raleway';
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      cursor: pointer;
      color: #2fb4e2;
    }
  }
`;

const Upper = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-top: 22px;
  margin-bottom: 22px;
  display: flex;
  justify-content: space-between;

  h1 {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 25px;
    color: #ffffff;
  }

  ion-icon {
    color: #ffffff;
    font-size: 25px;
    --ionicon-stroke-width: 50px;
  }
`;

const Content = styled.div`
  background-color: #2fb4e2;
  width: 30%;
  height: max-content;
  border-radius: 8px;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  flex-direction: column;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    div {
      width: 100%;
      background-color: #0b2d39;
      border-radius: 8px;
      font-family: 'Raleway';
      font-weight: 700;
      padding: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      color: white;
    }

    span {
      margin-top: 10px;

      h3 {
        position: absolute;
        left: 140px;
        bottom: 10px;
      }

      ion-icon {
        font-size: 30px;
        color: white;
        --ionicon-stroke-width: 36px;
        cursor: pointer;
        margin-top: 30px;
        position: absolute;
        right: 10px;
        bottom: 15px;
      }
    }
  }

  ion-icon {
    font-size: 40px;
    color: white;
    --ionicon-stroke-width: 36px;
    cursor: pointer;
    margin-top: 30px;
  }
`;

