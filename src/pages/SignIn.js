import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import { useState, useEffect } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { postLogin } from '../Services/api';

export function SignIn() {
	const navigate = useNavigate();
	const [ canLogin, setCanLogin ] = useState(false);
	const [ isAble, setIsAble ] = useState(true);
	const [ form, setForm ] = useState({
		email: '',
		password: '',
	});
        
	function handleForm (e) {
		setForm({
		...form,
		[e.target.name]: e.target.value,
		})
	};

	useEffect(() => {
		if (form.email !== '' && form.password !== '') {
			setCanLogin(true);
		} else {
			setCanLogin(false);
		}
	}, [form]);

	const makeLogin = (event) => {
		canLogin ? (
			postLogin(form)
				.then(setIsAble(false))
				.catch(function () {
						alert('Ocorreu um erro no login, tente novamente!');
						setIsAble(true);
				}).then(function (response) {
						if (response) {
								localStorage.clear();
								localStorage.setItem( 'auth', JSON.stringify({ authorization: response.data.token, email: response.data.email}));
								navigate('/profile');
						}
				}).finally(function(){
						setIsAble(true);
				})
		) : alert('Preencha todos os campos!');

		event.preventDefault();
	};
    
	return (
		<>
			<Image>
				VOU COLOCAR UMA IMAGEM AQUI
			</Image>

			<Container>
				<Title>MMOnster-RPG</Title>
				<Form>
					<form onSubmit={makeLogin}>
						<input type="email" name='email' value={form.email} onChange={handleForm} placeholder='E-mail' disabled={!isAble ? true : false} />
						<input type="password" name='password' value={form.password} onChange={handleForm} placeholder='Senha' disabled={!isAble ? true : false} />
						<button type="submit">
							{isAble ? 'Entrar' : <ThreeDots 
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
				
				<Bottom>
					<h2>Primeira vez?</h2>
					<Link to='/register'>
						Cadastre-se!
					</Link>
				</Bottom>
			</Container>
		</>
	);
};

const Container = styled.div`
	height: 100vh;
	background-color: #0b2d39;
	display: flex;
	position: fixed;
	width: 30%;
	margin-left: auto;
	margin-right: auto;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Image = styled.div`
	position: fixed;
	left: 30%;
	width: 70%;
	height: 100vh;
	background-color: grey;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
`;

const Title = styled.div`
	font-family: 'Saira Stencil One', cursive;
	color: #ffffff;
	font-weight: 400;
	font-size: 32px;
	margin-bottom: 24px;
`;

const Form = styled.div`
	margin-left: 20%;

	input {
		width: 80%;
		height: 58px;
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
    width: 80%;
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

const Bottom = styled.div`
	display: flex;
	
	h2, a {
		margin-top: 36px;
		font-family: 'Raleway';
		font-weight: 700;
		font-size: 15px;
		color: #ffffff;
	}

	a {
		text-decoration: none;
		cursor: pointer;
		color: #2fb4e2;
		margin-left: 4px;
	}
`;
