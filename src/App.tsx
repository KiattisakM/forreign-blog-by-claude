import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { PageLoader } from './components/PageLoader'

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ArticleListPage = lazy(() => import('./pages/ArticleListPage'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'))
const MarketPage = lazy(() => import('./pages/MarketPage'))
const SectorPage = lazy(() => import('./pages/SectorPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/markets/:market" element={<MarketPage />} />
          <Route path="/sectors/:sector" element={<SectorPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
