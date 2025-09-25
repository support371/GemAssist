import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  Eye,
  Bot,
  Building,
  Gavel,
  TrendingUp,
  Users,
  CheckCircle
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { href: "/monitoring", label: "Threat Monitoring", icon: Eye },
    { href: "/telegram-bot", label: "Telegram Automation", icon: Bot },
    { href: "/real-estate", label: "Real Estate Services", icon: Building },
    { href: "/legal", label: "Legal Services", icon: Gavel },
    { href: "/portfolio", label: "Investment Portfolio", icon: TrendingUp },
    { href: "/partners", label: "Partnership Services", icon: Users }
  ];

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/news", label: "News & Updates" },
    { href: "/client-portal", label: "Client Portal" },
    { href: "/admin", label: "Admin Panel" },
    { href: "/contact", label: "Contact Support" }
  ];

  const socialLinks = [
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Facebook, label: "Facebook" }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">GEM Enterprise</h3>
                  <p className="text-sm text-muted-foreground">Security & Trust</p>
                </div>
              </div>
            </Link>
            
            <p className="text-muted-foreground">
              Professional cybersecurity monitoring, real estate investment, and trust services. 
              Protecting your digital and physical assets with enterprise-grade security solutions.
            </p>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Secure
              </Badge>
              <Badge variant="outline">
                24/7 Monitoring
              </Badge>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 justify-start text-muted-foreground hover:text-foreground"
                      data-testid={`footer-${service.href.replace("/", "")}`}
                    >
                      <service.icon className="w-4 h-4 mr-2" />
                      {service.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 justify-start text-muted-foreground hover:text-foreground"
                      data-testid={`footer-quick-${link.href.replace("/", "")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">contact@gemassist.com</p>
                  <p className="text-xs text-muted-foreground">General inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">+1 (555) 123-SECURITY</p>
                  <p className="text-xs text-muted-foreground">24/7 emergency hotline</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">123 Security Plaza</p>
                  <p className="text-xs text-muted-foreground">Suite 500, Enterprise District</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Follow Us</h5>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    asChild
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} GEM Cybersecurity & Monitoring Assist. All rights reserved.
              In partnership with Alliance Trust Realty LLC.
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/terms">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                  Terms of Service
                </Button>
              </Link>
              <Link href="/security">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                  Security Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}