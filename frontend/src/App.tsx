import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
/*import PrivateRoute from './components/PrivateRoute';*/
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage.tsx";
import MainPage from "./pages/MainPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/"
                        element={
                            /*<PrivateRoute>
                                <DashboardPage/>
                            </PrivateRoute>*/
                            <MainPage/>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}