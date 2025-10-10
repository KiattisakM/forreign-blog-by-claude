import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export default function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showSidebar ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                {children}
              </div>
              <Sidebar />
            </div>
          ) : (
            children
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
