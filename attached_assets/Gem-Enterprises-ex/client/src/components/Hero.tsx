import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Shield, 
  Eye, 
  Users, 
  CheckCircle, 
  Clock, 
  Award,
  Star,
  ShieldCheck,
  Activity,
  TrendingUp
} from "lucide-react";
import cybersecImage from "@assets/generated_images/Cybersecurity_operations_center_22991021.png";

export default function Hero() {
  // Mock data for security dashboard //todo: remove mock functionality
  const securityMetrics = [
    { label: "Threats Blocked", value: "1,247", icon: Shield, color: "text-red-500" },
    { label: "Assets Protected", value: "98.7%", icon: ShieldCheck, color: "text-green-500" },
    { label: "Response Time", value: "< 2min", icon: Clock, color: "text-blue-500" },
    { label: "Uptime", value: "99.9%", icon: Activity, color: "text-purple-500" }
  ];

  const trustIndicators = [
    { icon: Award, label: "Security Excellence", color: "text-yellow-500" },
    { icon: Star, label: "5-Star Service", color: "text-blue-500" },
    { icon: ShieldCheck, label: "Verified Secure", color: "text-green-500" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Shield className="w-4 h-4 mr-2" />
                Enterprise Security Solutions
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Professional{" "}
                <span className="text-primary">Security</span>
                {" "}&{" "}
                <span className="text-green-600">Trust</span>
                {" "}Services
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                GEM Cybersecurity & Monitoring Assist, in partnership with Alliance Trust Realty LLC, 
                provides comprehensive digital threat monitoring, asset recovery, real estate services, 
                and automation solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Eye, label: "24/7 Monitoring" },
                { icon: ShieldCheck, label: "Secure Solutions" },
                { icon: Users, label: "Trusted Partners" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-services">
                  <Shield className="w-5 h-5 mr-2" />
                  Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Security Dashboard */}
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={cybersecImage} 
                alt="Cybersecurity Operations Center" 
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-green-500/90 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  Systems Operational
                </Badge>
              </div>
            </div>

            {/* Security Dashboard */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Security Dashboard</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {securityMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-background/50">
                      <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {trustIndicators.map((indicator, index) => (
                <Card key={index} className="text-center p-4 hover-elevate cursor-pointer">
                  <CardContent className="p-0">
                    <indicator.icon className={`w-8 h-8 mx-auto mb-2 ${indicator.color}`} />
                    <p className="text-sm font-medium">{indicator.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}