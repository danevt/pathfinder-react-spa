import { Route, Routes } from 'react-router';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Home from './components/home/Home.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import PlaceDetails from './components/place/details/PlaceDetails.jsx';
import PlaceCreate from './components/place/create/PlaceCreate.jsx';
import Register from './components/auth/Register/Register.jsx';
import PlaceEdit from './components/place/edit/PlaceEdit.jsx';
import Login from './components/auth/Login/Login.jsx';
import Logout from './components/auth/Logout/Logout.jsx';
import About from './components/about/About.jsx';
import NotFound from './components/not-found/NotFound.jsx';
import ProfileDetails from './components/profile/profile-details/ProfileDetails.jsx';
import { useUserContext } from './contexts/UserContext.jsx';

function App() {
    const { user } = useUserContext();

    return (
        <>
            <div className='flex flex-col h-screen'>
                <Header />
                    <main className='flex-grow bg-gradient-to-r from-black via-gray-500 to-black'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/create' element={<PlaceCreate />} />
                            <Route path='/places/:placeId/details' element={<PlaceDetails />} />
                            <Route path='/places/:placeId/edit' element={<PlaceEdit />} />
                            <Route path='/users/:userId/profile' element={<ProfileDetails />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='*' element={<NotFound />} />   
                        </Routes>
                    </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
