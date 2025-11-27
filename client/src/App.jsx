import { Route, Routes } from 'react-router';
import Home from './components/home/Home.jsx';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Register from './components/auth/Register/Register.jsx';
import Login from './components/auth/Login/Login.jsx';

function App() {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <Header />

                <main className='flex-grow bg-gradient-to-r from-black via-gray-500 to-black'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
