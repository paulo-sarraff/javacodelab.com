import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import ArticlePage from './components/ArticlePage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import TermsPage from './components/TermsPage'
import PrivacyPage from './components/PrivacyPage'
import PremiumPage from './components/PremiumPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artigo/:slug" element={<ArticlePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/termos-uso" element={<TermsPage />} />
          <Route path="/politica-privacidade" element={<PrivacyPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
