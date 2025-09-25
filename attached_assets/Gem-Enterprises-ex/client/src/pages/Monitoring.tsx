import { Badge } from "@/components/ui/badge";
import SecurityDashboard from "@/components/SecurityDashboard";
import { Eye, Shield } from "lucide-react";

export default function Monitoring() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Threat Monitoring
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <Shield className="w-8 h-8 inline mr-3 text-primary" />
            Advanced Threat Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive threat monitoring service provides round-the-clock surveillance 
            and protection against digital threats, ensuring your assets and data remain secure.
          </p>
        </div>

        {/* Security Dashboard */}
        <SecurityDashboard />
      </div>
    </div>
  );
}