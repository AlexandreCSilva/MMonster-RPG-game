import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { getChar } from "../Services/api";
import styled from "styled-components";

export function Game() {
  const [searchParams] = useSearchParams();
  const [ charData, setCharData ] = useState({});
  const user = searchParams.get('name');
  const auth = JSON.parse(localStorage.getItem('auth'));
  const config = { headers: { authorization: 'Bearer '+ auth.authorization, name: user }};
  const ref = useRef();
  
  useEffect(() => {
    getChar(config)
      .catch(function() {
        alert('Ocorreu um erro ao carregar os personagens!');
      })
      .then(function(response) {
        setCharData(response.data);
      })
	}, []);

  return (
      <Content>
        <canvas ref={ref} id='game-canvas'></canvas>
      </Content>
    );
};

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  canvas {
    width: 100%;
    height: 100%;
    background-color: #212121;
  }
`;