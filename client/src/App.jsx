import { Route, Routes } from 'react-router';
import { useState } from 'react';
import Home from './components/home/Home.jsx';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Register from './components/auth/Register/Register.jsx';
import Login from './components/auth/Login/Login.jsx';
import About from './components/about/About.jsx';
import PlaceCreate from './components/place/create/PlaceCreate.jsx';
import PlaceDetails from './components/place/details/PlaceDetails.jsx';
import NotFound from './components/not-found/NotFound.jsx';

function App() {
    const [registerdUser, setRegisterdUser] = useState([]);
    const [user, setUser] = useState(null);

    const registerHandler = ({ email, username, password }) => {
        if (registerdUser.some(user => user.email === email)) {
            throw new Error('Email already exists.');
        }

        if (registerdUser.some(user => user.username === username)) {
            throw new Error('Username already exists.');
        }

        const newUser = { email, username, password };

        setRegisterdUser(regUsers => [...regUsers, newUser]);

        setUser(newUser);
    };

    const loginHandler = (email, password) => {
        const existingUser = registerdUser.find(u => u.email === email);

        if (!existingUser || existingUser.password !== password) {
            throw new Error('Invalid email or password!');
        }

        setUser(existingUser);
    };

    return (
        <>
            <div className='flex flex-col h-screen'>
                <Header user={user} />

                <main className='flex-grow bg-gradient-to-r from-black via-gray-500 to-black'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route
                            path='/register'
                            element={<Register onRegister={registerHandler} />}
                        />
                        <Route
                            path='/login'
                            element={<Login onLogin={loginHandler} />}
                        />
                        <Route path='/about' element={<About />} />
                        <Route path='/create' element={<PlaceCreate />} />
                        <Route
                            path='/places/:placeId/details'
                            element={<PlaceDetails />}
                        />

                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
