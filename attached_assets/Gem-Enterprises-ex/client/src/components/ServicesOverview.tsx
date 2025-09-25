import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Shield, 
  Bot, 
  Building, 
  Gavel, 
  TrendingUp, 
  Users,
  Eye,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export default function ServicesOverview() {
  // Mock services data //todo: remove mock functionality
  const services: Service[] = [
    {
      id: "threat-monitoring",
      title: "Threat Monitoring",
      description: "24/7 digital threat detection and response with real-time alerts and comprehensive security analysis.",
      icon: Shield,
      features: [
        "Real-time threat detection",
        "Automated incident response",
        "Comprehensive analytics",
        "24/7 monitoring"
      ],
      href: "/monitoring",
      badge: "Most Popular",
      badgeVariant: "default"
    },
    {
      id: "telegram-automation",
      title: "Telegram Automation",
      description: "Advanced bot automation services for secure communication, notifications, and workflow management.",
      icon: Bot,
      features: [
        "Custom bot development",
        "Automated notifications",
        "Workflow integration",
        "Secure messaging"
      ],
      href: "/telegram-bot",
      badge: "New",
      badgeVariant: "secondary"
    },
    {
      id: "real-estate",
      title: "Real Estate Services",
      description: "Professional real estate investment, management, and legal services through Alliance Trust Realty LLC.",
      icon: Building,
      features: [
        "Investment analysis",
        "Property management",
        "Asset recovery",
        "Market research"
      ],
      href: "/real-estate"
    },
    {
      id: "legal-services",
      title: "Legal & Trust Services",
      description: "Power of attorney, legal documentation, and trust management services for secure asset protection.",
      icon: Gavel,
      features: [
        "Power of attorney",
        "Trust management",
        "Asset protection",
        "Legal consultation"
      ],
      href: "/legal"
    },
    {
      id: "investment-portfolio",
      title: "Investment Portfolio",
      description: "Strategic investment management and portfolio optimization with comprehensive risk assessment.",
      icon: TrendingUp,
      features: [
        "Portfolio analysis",
        "Risk assessment",
        "Investment strategy",
        "Performance tracking"
      ],
      href: "/portfolio"
    },
    {
      id: "partnership-services",
      title: "Partnership Services",
      description: "Trusted partnerships and trustee services for secure business relationships and asset management.",
      icon: Users,
      features: [
        "Strategic partnerships",
        "Trustee services",
        "Business consulting",
        "Joint ventures"
      ],
      href: "/partners"
    }
  ];

  const stats = [
    { label: "Active Clients", value: "500+", icon: Users },
    { label: "Uptime", value: "99.9%", icon: CheckCircle },
    { label: "Response Time", value: "< 2min", icon: Clock },
    { label: "Satisfaction", value: "4.9/5", icon: Star }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Core Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Security & Trust Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From cybersecurity monitoring to real estate investment, we provide integrated services 
            that protect and grow your digital and physical assets.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-elevate">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover-elevate transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <service.icon className="w-6 h-6" />
                  </div>
                  {service.badge && (
                    <Badge variant={service.badgeVariant || "outline"} className="text-xs">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={service.href}>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    data-testid={`service-${service.id}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-green-500/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6">
                We provide tailored services to meet your specific security and trust requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-contact-custom">
                    <Users className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
                <Link href="/client-portal">
                  <Button variant="outline" size="lg" data-testid="button-client-portal-services">
                    <Shield className="w-5 h-5 mr-2" />
                    Client Portal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}