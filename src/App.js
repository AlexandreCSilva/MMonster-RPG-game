import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Reset from './stylesheet/reset'
import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { UserProfile } from './pages/UserProfile';
import PrivatePage from './pages/PrivateRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { NewChar } from './pages/NewChar';
import { Game } from './pages/Game';

export function App() {
	return (
      <>
        <Reset />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<SignIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' 
                element={
                  <PrivatePage>
                    <UserProfile />
                  </PrivatePage>
                } />
              <Route path='/newchar' 
                element={
                  <PrivatePage>
                    <NewChar />
                  </PrivatePage>
                } />
              <Route path='/game' 
                element={
                  <PrivatePage>
                    <Game />
                  </PrivatePage>
                } />
              <Route index path='*' element={<Navigate to='/' />} />
            </Routes>
          </BrowserRouter>
      </>
	);
};
