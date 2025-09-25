import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Clock,
  TrendingUp,
  Users,
  Server,
  Wifi,
  Database,
  Lock
} from "lucide-react";

export default function SecurityDashboard() {
  // Mock security data //todo: remove mock functionality
  const securityStatus = {
    overall: "operational",
    threatsBlocked: 1247,
    systemsMonitored: 156,
    responseTime: "1.8min",
    uptime: 99.9
  };

  const threatMetrics = [
    { 
      type: "Malware Detected", 
      count: 45, 
      trend: "+12%", 
      severity: "medium",
      icon: AlertTriangle 
    },
    { 
      type: "Intrusion Attempts", 
      count: 23, 
      trend: "-8%", 
      severity: "high",
      icon: Shield 
    },
    { 
      type: "Data Breaches Prevented", 
      count: 7, 
      trend: "+3%", 
      severity: "critical",
      icon: Lock 
    },
    { 
      type: "Network Anomalies", 
      count: 12, 
      trend: "-15%", 
      severity: "low",
      icon: Wifi 
    }
  ];

  const systemHealth = [
    { name: "Firewall", status: "operational", uptime: 99.8 },
    { name: "Intrusion Detection", status: "operational", uptime: 99.9 },
    { name: "Data Protection", status: "maintenance", uptime: 98.5 },
    { name: "Network Monitoring", status: "operational", uptime: 99.7 },
    { name: "Endpoint Security", status: "operational", uptime: 99.6 },
    { name: "Threat Intelligence", status: "operational", uptime: 99.9 }
  ];

  const recentAlerts = [
    {
      id: 1,
      title: "Suspicious Login Attempt",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      time: "2 minutes ago",
      severity: "medium",
      status: "investigating"
    },
    {
      id: 2,
      title: "Malware Quarantined",
      description: "Trojan.GenKrypt detected and quarantined on workstation-005",
      time: "15 minutes ago",
      severity: "high",
      status: "resolved"
    },
    {
      id: 3,
      title: "Network Anomaly",
      description: "Unusual traffic pattern detected on subnet 10.0.1.0/24",
      time: "1 hour ago",
      severity: "low",
      status: "monitoring"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-50 border-red-200";
      case "high": return "text-orange-500 bg-orange-50 border-orange-200";
      case "medium": return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case "low": return "text-blue-500 bg-blue-50 border-blue-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-500";
      case "maintenance": return "text-yellow-500";
      case "offline": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
          <p className="text-muted-foreground">Real-time threat monitoring and system status</p>
        </div>
        <Badge 
          variant="outline" 
          className={securityStatus.overall === "operational" ? "bg-green-50 text-green-700 border-green-200" : ""}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          All Systems Operational
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
                <p className="text-2xl font-bold text-red-500">{securityStatus.threatsBlocked.toLocaleString()}</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Systems Monitored</p>
                <p className="text-2xl font-bold text-blue-500">{securityStatus.systemsMonitored}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-500">{securityStatus.responseTime}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-purple-500">{securityStatus.uptime}%</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Threat Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Threat Analysis (Last 24h)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {threatMetrics.map((threat, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <threat.icon className={`w-5 h-5 ${getSeverityColor(threat.severity).split(' ')[0]}`} />
                  <div>
                    <p className="font-medium">{threat.type}</p>
                    <p className="text-sm text-muted-foreground">{threat.count} incidents</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${threat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}
                >
                  {threat.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((system, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{system.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{system.uptime}%</span>
                    <CheckCircle className={`w-4 h-4 ${getStatusColor(system.status)}`} />
                  </div>
                </div>
                <Progress value={system.uptime} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Recent Security Alerts
            </CardTitle>
            <Button variant="outline" size="sm" data-testid="button-view-all-alerts">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border hover-elevate">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${getSeverityColor(alert.severity).split(' ')[0]}`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm" data-testid={`alert-${alert.id}`}>
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}