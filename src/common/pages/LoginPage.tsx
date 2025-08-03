import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("https://localhost:44354/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert("E-posta veya şifre hatalı!");
                return;
            }

            const data = await response.json();
            console.log("Login başarılı:", data);

            // Örn. localStorage'a kaydedebilirsin
            localStorage.setItem("user", JSON.stringify(data));

            navigate('/admin'); // Admin paneline yönlendir
        } catch (error) {
            console.error("Login hatası:", error);
            alert("Sunucuya bağlanılamadı!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
                    Admin Giriş
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">E-posta</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Şifre</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
