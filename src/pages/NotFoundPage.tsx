import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/MainLayout'

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Large 404 */}
          <div className="text-9xl font-bold text-primary mb-4 tracking-tighter">
            404
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/articles">
                <Search className="mr-2 h-5 w-5" />
                Browse Articles
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>

          {/* Popular Links */}
          <div className="mt-12 p-6 border rounded-lg bg-muted/30">
            <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Popular Pages
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="link" size="sm">
                <Link to="/markets/US">🇺🇸 US Markets</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link to="/markets/EU">🇪🇺 EU Markets</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link to="/markets/ASIA">🌏 Asian Markets</Link>
              </Button>
              <Button asChild variant="link" size="sm">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
