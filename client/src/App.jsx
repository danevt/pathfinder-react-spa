import { Route, Routes } from 'react-router';
import Home from './components/home/Home.jsx';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Register from './components/auth/Register/Register.jsx';
import Login from './components/auth/Login/Login.jsx';
import About from './components/about/About.jsx';
import PlaceCreate from './components/place-create/PlaceCreate.jsx';
import Catalog from './components/catalog/catalog/Catalog.jsx';
import PlaceDetails from './components/place-details/PlaceDetails.jsx';

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
                        <Route path='/about' element={<About />} />
                        <Route path='/create' element={<PlaceCreate />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route
                            path='/place/:placeId'
                            element={<PlaceDetails />}
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
