import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import HomePage from './pages/HomePage'
import ArticleListPage from './pages/ArticleListPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import MarketPage from './pages/MarketPage'
import SectorPage from './pages/SectorPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/markets/:market" element={<MarketPage />} />
        <Route path="/sectors/:sector" element={<SectorPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
