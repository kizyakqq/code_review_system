import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Привет, {user?.username}! 👋</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                        Выйти
                    </button>
                </div>
                <p className="text-gray-600">Здесь будет список ревью и форма загрузки файлов.</p>
            </div>
        </div>
    );
}