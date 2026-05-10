import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ReviewDetailPage from "./pages/ReviewDetailPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={
                        <PrivateRoute>
                            <MainPage/>
                        </PrivateRoute>
                    }/>
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <ProfilePage/>
                        </PrivateRoute>
                    }/>
                    <Route path='/reviews/:id' element={
                        <PrivateRoute>
                            <ReviewDetailPage/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}