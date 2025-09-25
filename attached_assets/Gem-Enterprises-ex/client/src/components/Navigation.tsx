import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Shield, 
  Home, 
  Eye, 
  Bot, 
  Building, 
  Gavel, 
  TrendingUp, 
  Users, 
  Newspaper,
  Info,
  Settings,
  Sun,
  Moon
} from "lucide-react";

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/monitoring", label: "Threat Monitoring", icon: Eye },
    { href: "/leadership", label: "Leadership", icon: Users },
    { href: "/contact", label: "Contact", icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const NavLink = ({ href, label, icon: Icon, mobile = false }: {
    href: string;
    label: string;
    icon: any;
    mobile?: boolean;
  }) => (
    <Link href={href}>
      <Button
        variant={isActive(href) ? "default" : "ghost"}
        size={mobile ? "default" : "sm"}
        className={`${mobile ? "w-full justify-start" : ""} gap-2`}
        onClick={() => mobile && setMobileOpen(false)}
        data-testid={`nav-${href.replace("/", "") || "home"}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 hover-elevate rounded-lg px-3 py-2" data-testid="logo">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">GEM Enterprise</h1>
                <p className="text-xs text-muted-foreground">Security & Trust</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              data-testid="theme-toggle"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/client-portal">
                <Button variant="outline" size="sm" data-testid="button-client-portal">
                  <Users className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="sm" data-testid="button-contact">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                    <div>
                      <h2 className="font-semibold">GEM Enterprise</h2>
                      <p className="text-sm text-muted-foreground">Security & Trust</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <NavLink key={item.href} {...item} mobile />
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <Link href="/client-portal">
                      <Button variant="outline" className="w-full" data-testid="mobile-client-portal">
                        <Users className="w-4 h-4 mr-2" />
                        Client Portal
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="w-full" data-testid="mobile-contact">
                        Get Started
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        All Systems Operational
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}