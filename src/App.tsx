import './index.css'
import './App.css'
import Header from './common/components/Header'
import Footer from './common/components/Footer'
import RouteSection from './Routes'

function App() {
  return (
    <div className="scrollbar-hide">
      <Header />

        <RouteSection />

      <Footer />
    </div>
  )
}

export default App
