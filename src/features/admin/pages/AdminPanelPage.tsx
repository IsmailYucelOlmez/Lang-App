import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState<"books" | "passages" | "pending">("books");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-blue-600">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("books")}
            className={`block w-full text-left p-2 rounded hover:bg-blue-700 ${activeTab === "books" ? "bg-blue-700" : ""
              }`}
          >
            📚 Kitap Yönetimi
          </button>
          <button
            onClick={() => setActiveTab("passages")}
            className={`block w-full text-left p-2 rounded hover:bg-blue-700 ${activeTab === "passages" ? "bg-blue-700" : ""
              }`}
          >
            📝 Pasaj Yönetimi
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`block w-full text-left p-2 rounded hover:bg-blue-700 ${activeTab === "pending" ? "bg-blue-700" : ""
              }`}
          >
            ✅ Onay Bekleyenler
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Hoş Geldin, Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Çıkış
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {activeTab === "books" && (
            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Yeni Kitap Ekle</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Kitap Adı"
                  className="w-full p-2 border rounded"
                />
                <select className="w-full p-2 border rounded">
                  <option>Kategori Seç</option>
                  <option>Hikaye</option>
                  <option>Bilim</option>
                  <option>Çocuk</option>
                </select>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full p-2 border rounded"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Yükle
                </button>
              </form>
            </div>
          )}

          {activeTab === "passages" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Pasaj Yönetimi</h2>
              <p>Eklenen kitaplardan çıkarılan paragrafları buradan yönetebilirsiniz.</p>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Onay Bekleyenler</h2>
              <p>Gemini tarafından etiketlenmiş paragrafları buradan onaylayabilir veya reddedebilirsiniz.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanelPage;
