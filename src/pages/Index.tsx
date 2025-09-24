import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, BarChart3, Users, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Navigation Header */}
      <nav className="border-b border-primary/10 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">OMESH RABHA</h1>
                <p className="text-sm text-muted-foreground">Farmer Data Collection</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link to="/survey">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 text-sm">
                  New Survey
                </Button>
              </Link>
              <Link to="/responses">
                <Button className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-sm">
                  View Responses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Farmer Survey Platform
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            This is about collecting farmer data under the <strong>BTR (Basic Tribal Record)</strong> system in <strong>VCDC (Village Council Development Committee)</strong> regions. 
            Gather vital agricultural information to shape effective rural development policies.
          </p>
        </div> */}

        {/* Feature Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <Card className="border border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-foreground text-lg">Easy Survey Collection</CardTitle>
              <CardDescription>
                Streamlined form to capture all essential farmer information including demographics, practices, and resources.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-foreground text-lg">Data Analytics</CardTitle>
              <CardDescription>
                View and analyze collected responses with detailed insights into farming patterns and practices.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-foreground text-lg">CSV Export</CardTitle>
              <CardDescription>
                Export all survey data to CSV format for further analysis, reporting, and integration with other tools.
              </CardDescription>
            </CardHeader>
          </Card>
        </div> */}

        {/* Action Section */}
        <div className="bg-gradient-to-r from-primary to-success rounded-2xl mx-2 px-6 sm:px-12 py-10 sm:py-14 text-center text-primary-foreground shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Collecting Data</h2>
          <p className="text-justify sm:text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto ">
            Gather insights about agricultural practices in rural communities in BTR regions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/survey">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-0 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold"
              >
                <ClipboardList className="h-5 w-5 mr-2" />
                Start New Survey
              </Button>
            </Link>
            <Link to="/responses">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-0 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold"
              >
                <Users className="h-5 w-5 mr-2" />
                View All Responses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Index;
