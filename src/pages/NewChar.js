import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postChar } from '../Services/api';

export function NewChar() {
  const [ canCreate, setCanCreate ] = useState(false);
  const navigate = useNavigate();
  const [ isAble, setIsAble ] = useState(true);
  const [ form, setForm ] = useState({
    name: '',
  });
  const auth = JSON.parse(localStorage.getItem('auth'));
  const config = { headers: { authorization: 'Bearer '+ auth.authorization, email: auth.email }};

  function handleForm (e) {
    setForm({
    ...form,
    [e.target.name]: e.target.value,
    })
  };

  useEffect(() => {
    if (form.name !== '') {
      setCanCreate(true);
    } else {
      setCanCreate(false);
    }
  }, [form]);

  const makeChar = (event) => {
    canCreate ? (
      postChar(form, config)
        .then(setIsAble(false))
        .catch(function () {
          alert('Ocorreu um erro ao criar o personagem, tente novamente!');
          setIsAble(true);
        }).then(function (response) {
          if (response) {
            alert('Criado com sucesso!');
            navigate('/profile');
          }
        }).finally(function(){
          setIsAble(true);
        })
      ) : alert('Preencha todos os campos!');

    event.preventDefault();
  };
    
  return (
    <Container>
      <h2>Novo personagem</h2>
      <Form>
        <form onSubmit={makeChar}>
          <input type="name" name='name' value={form.name} onChange={handleForm} placeholder='Nome do personagem' disabled={!isAble ? true : false} />
          <button type="submit">
            {isAble ? 'Criar' : <ThreeDots 
              height="10" 
              width="80" 
              radius="9"
              color="#FFFFFF" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />}
          </button>
        </form>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0b2d39;
  display: flex;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    margin-top: 36px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 25px;
    color: #ffffff;
    margin-bottom: 30px;
  }
`;

const Form = styled.div`
  form {
    width: 100%;
  }

	input {
		height: 58px;
    width: 100%;
		border-radius: 5px;
		border: solid 3px #134b5f;
		margin-bottom: 13px;
		font-family: 'Raleway';
		font-weight: 400;
		font-size: 20px;
		color: white;
		background-color: #0b2d39;
		padding: 15px;
		box-sizing: border-box; 
	}

	input:focus{
    outline: solid 3px #2fb4e2;
	}

	input::placeholder {
		color: white;
	}

	button {
    width: 100%;
    height: 58px;
    background: #134b5f;
    border-radius: 5px;
    border: none;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
		padding: 15px;
  }
`;
