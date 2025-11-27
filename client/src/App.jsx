import { Route, Routes } from 'react-router';
import Home from './components/home/Home.jsx';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/Footer.jsx';

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
