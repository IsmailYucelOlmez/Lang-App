import TranslationProvider from "../components/TranslationProvider";
const TranslationDemoPage = () => {
  return (
    <TranslationProvider>
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <div className="text-center mb-10 p-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Metin Çeviri Demo</h1>
        <p className="text-lg opacity-90">Metni seçmek için fare ile sürükleyin. Çeviri otomatik olarak gösterilecektir.</p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-100">Çevrilecek İngilizce Metinler</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Basit Cümleler</h3>
            <p className="text-gray-800 leading-relaxed text-justify select-text cursor-text hover:bg-gray-50 hover:rounded p-2 -m-2 transition-colors">
              Hello, how are you today? I hope you are doing well. 
              This is a simple English text that you can select and translate.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Teknik Metin</h3>
            <p className="text-gray-800 leading-relaxed text-justify select-text cursor-text hover:bg-gray-50 hover:rounded p-2 -m-2 transition-colors">
              React is a JavaScript library for building user interfaces. 
              It was developed by Facebook and is widely used in modern web development. 
              The library allows developers to create reusable UI components.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Günlük Konuşma</h3>
            <p className="text-gray-800 leading-relaxed text-justify select-text cursor-text hover:bg-gray-50 hover:rounded p-2 -m-2 transition-colors">
              What time is it? I need to catch the bus. 
              The weather is nice today, isn't it? 
              Would you like to go for a walk in the park?
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-100">Uzun Metin</h2>
          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed text-justify select-text cursor-text hover:bg-gray-50 hover:rounded p-2 -m-2 transition-colors">
              The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. 
              Pangrams are often used to display font samples and test keyboards. 
              They are also useful for practicing typing and calligraphy.
            </p>
            <p className="text-gray-800 leading-relaxed text-justify select-text cursor-text hover:bg-gray-50 hover:rounded p-2 -m-2 transition-colors">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-100">Talimatlar</h2>
          <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-blue-500">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>İngilizce metni fare ile seçin</li>
              <li>Türkçe çeviri otomatik olarak tooltip'te görünecek</li>
              <li>Tooltip'i kapatmak için X butonuna tıklayın</li>
              <li>Başka bir yere tıklayarak da tooltip'i kapatabilirsiniz</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
    </TranslationProvider>
  );
};

export default TranslationDemoPage; 