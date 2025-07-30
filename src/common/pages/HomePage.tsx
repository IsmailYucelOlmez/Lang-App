import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => navigate('/login')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg"
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default HomePage;
