import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { TrendingUp } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Foreign Stock Blog</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your source for international stock market analysis and insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h3 className="font-semibold mb-4">Markets</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/markets/US" className="text-muted-foreground hover:text-foreground transition-colors">
                  United States
                </Link>
              </li>
              <li>
                <Link to="/markets/EU" className="text-muted-foreground hover:text-foreground transition-colors">
                  Europe
                </Link>
              </li>
              <li>
                <Link to="/markets/ASIA" className="text-muted-foreground hover:text-foreground transition-colors">
                  Asia
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-muted-foreground">Disclaimer</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Foreign Stock Blog. All rights reserved.</p>
          <p className="text-xs text-center sm:text-right">
            <strong>Disclaimer:</strong> Not financial advice. Do your own research.
          </p>
        </div>
      </div>
    </footer>
  )
}
