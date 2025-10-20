import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { TrendingUp } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-foreground">Foreign Stock Blog</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your source for international stock market analysis and insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Markets</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/markets/US" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  United States
                </Link>
              </li>
              <li>
                <Link to="/markets/EU" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Europe
                </Link>
              </li>
              <li>
                <Link to="/markets/ASIA" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Asia
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button className="text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-not-allowed" disabled>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-not-allowed" disabled>
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-not-allowed" disabled>
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            &copy; {currentYear} Foreign Stock Blog. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            <strong className="font-semibold text-foreground">Disclaimer:</strong> Not financial advice. Do your own research.
          </p>
        </div>
      </div>
    </footer>
  )
}
