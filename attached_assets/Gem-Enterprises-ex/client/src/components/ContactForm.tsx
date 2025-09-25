import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle,
  Send,
  Users,
  Building,
  Gavel
} from "lucide-react";

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    { value: "threat-monitoring", label: "Threat Monitoring" },
    { value: "telegram-automation", label: "Telegram Automation" },
    { value: "real-estate", label: "Real Estate Services" },
    { value: "legal-services", label: "Legal & Trust Services" },
    { value: "investment-portfolio", label: "Investment Portfolio" },
    { value: "partnership", label: "Partnership Services" },
    { value: "consultation", label: "General Consultation" }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@gemassist.com",
      description: "For general inquiries"
    },
    {
      icon: Phone,
      title: "Emergency Hotline",
      value: "+1 (555) 123-SECURITY",
      description: "24/7 security incidents"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      value: "123 Security Plaza, Suite 500",
      description: "Enterprise District"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "24/7 Monitoring",
      description: "9 AM - 6 PM Consultations"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission //todo: remove mock functionality
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours. For urgent security matters, please call our emergency hotline.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        priority: "medium"
      });
      
      console.log('Form submitted:', formData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Expert Security Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to protect your digital assets? Contact our security experts for a personalized consultation 
            and learn how we can safeguard your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{info.title}</h4>
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-green-500/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold">Security Guarantee</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  All communications are encrypted and handled with the highest security standards. 
                  Your information is protected by our enterprise-grade security protocols.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Encrypted
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@company.com"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Acme Corporation"
                        data-testid="input-company"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">Service of Interest</Label>
                      <Select 
                        value={formData.service} 
                        onValueChange={(value) => handleInputChange("service", value)}
                      >
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value) => handleInputChange("priority", value)}
                      >
                        <SelectTrigger data-testid="select-priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General Inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Business Discussion</SelectItem>
                          <SelectItem value="high">High - Urgent Security Matter</SelectItem>
                          <SelectItem value="critical">Critical - Security Incident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your security needs, concerns, or questions in detail..."
                      rows={5}
                      required
                      data-testid="textarea-message"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1"
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          service: "",
                          message: "",
                          priority: "medium"
                        });
                        console.log('Form cleared');
                      }}
                      data-testid="button-clear-form"
                    >
                      Clear Form
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    * Required fields. By submitting this form, you agree to our privacy policy and 
                    terms of service. We'll respond within 24 hours for standard inquiries.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}