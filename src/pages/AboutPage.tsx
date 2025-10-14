import { Link } from 'react-router-dom'
import { AlertTriangle, Target, Users, BookOpen, Globe2, Mail } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Globe2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Foreign Stock Blog</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted source for international stock market analysis and insights
          </p>
        </div>

        {/* Important Disclaimer Alert */}
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Important Disclaimer</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="font-semibold mb-2">
              This blog is for educational and informational purposes only. Nothing on this site constitutes financial advice, investment recommendations, or professional consulting.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Always do your own research (DYOR)</li>
              <li>Consult with a licensed financial advisor before making investment decisions</li>
              <li>Past performance does not guarantee future results</li>
              <li>Investing in stocks carries inherent risks, including loss of principal</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
            <CardDescription>Empowering investors with global market insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Foreign Stock Blog was created to bridge the knowledge gap for investors interested in international markets. We believe that diversification across geographical regions is crucial for long-term investment success, yet many investors lack access to quality analysis of foreign stocks.
            </p>
            <p>
              Our mission is to provide:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Comprehensive Coverage:</strong> In-depth analysis of US, European, and Asian stocks</li>
              <li><strong>Educational Content:</strong> Resources to help investors understand different markets and investment concepts</li>
              <li><strong>Timely Insights:</strong> News and earnings coverage to keep you informed</li>
              <li><strong>Diverse Perspectives:</strong> Analysis across multiple sectors and market caps</li>
            </ul>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* What Makes Us Unique */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-primary" />
            What Makes Us Unique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Perspective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We cover stocks from major markets worldwide, helping you discover opportunities beyond your home market.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beginner-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Content is labeled by reading level, making it accessible whether you're a novice or experienced investor.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From technology and healthcare to energy and finance, we provide specialized analysis across all major sectors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>No Paywall</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our content is free and accessible. Quality investment education should be available to everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Target Audience */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Who We Serve</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p><strong>Individual Investors:</strong> Looking to diversify their portfolios internationally</p>
            <p><strong>Students & Learners:</strong> Seeking to understand global markets and investment principles</p>
            <p><strong>Analysts & Researchers:</strong> Needing insights into specific foreign companies or sectors</p>
            <p><strong>Expatriates:</strong> Investing in markets from their home or host countries</p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Disclaimer Section */}
        <Card className="mb-8 border-yellow-500 dark:border-yellow-700">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <CardTitle className="text-2xl">Full Disclaimer</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Not Financial Advice</h3>
              <p className="text-muted-foreground">
                All content on this blog is for educational and informational purposes only. It does not constitute financial, investment, tax, or legal advice. We are not licensed financial advisors.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do Your Own Research (DYOR)</h3>
              <p className="text-muted-foreground">
                Always conduct your own thorough research and due diligence before making any investment decisions. Consult with licensed professionals who understand your specific financial situation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Investment Risks</h3>
              <p className="text-muted-foreground">
                All investments carry risk, including the potential loss of principal. International investing involves additional risks such as currency fluctuations, political instability, and different accounting standards. Past performance is not indicative of future results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">No Guarantees</h3>
              <p className="text-muted-foreground">
                We make no guarantees or promises about the accuracy, completeness, or timeliness of information provided. Market conditions change rapidly, and information may become outdated.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">No Liability</h3>
              <p className="text-muted-foreground">
                We are not liable for any losses, damages, or adverse outcomes resulting from use of information on this blog. You use this information at your own risk.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Personal Responsibility</h3>
              <p className="text-muted-foreground">
                You are solely responsible for your investment decisions and their outcomes. Invest only what you can afford to lose.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Contact Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Get In Touch</CardTitle>
            </div>
            <CardDescription>
              We welcome feedback, suggestions, and questions from our readers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Have questions about our content? Found an error? Want to suggest a stock or topic for coverage?
            </p>
            <p className="text-muted-foreground text-sm">
              <strong>Note:</strong> We cannot and will not provide personalized investment advice or recommendations for individual situations.
            </p>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Contact: contact@foreignstockblog.com</p>
              <p className="text-sm text-muted-foreground">Follow us: @foreignstockblog</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore Global Markets?</h2>
          <p className="text-muted-foreground mb-6">
            Dive into our articles and start your international investing journey today
          </p>
          <Button asChild size="lg">
            <Link to="/articles">Browse All Articles</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
