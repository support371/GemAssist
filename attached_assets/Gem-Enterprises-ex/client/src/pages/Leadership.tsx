import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Users, Building2, Crown, History, Mail, Phone, Linkedin, Globe, Twitter } from "lucide-react";

interface Member {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  startDate: string;
  isVIP: boolean;
  isPartner: boolean;
  socialLinks: {
    linkedin: string;
    twitter: string;
    website: string;
  };
}

interface LeadershipData {
  members: Member[];
  partners: Member[];
  vipBoard: Member[];
  leadership: Member[];
}

interface CompanyHistory {
  milestones: Array<{
    year: string;
    title: string;
    description: string;
    impact: string;
  }>;
  vision: {
    present: string;
    future: string;
  };
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-member-${member.id}`}>
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-lg font-semibold">
            {member.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl" data-testid={`text-member-name-${member.id}`}>
          {member.name}
        </CardTitle>
        <CardDescription className="text-lg font-medium text-primary">
          {member.title}
        </CardDescription>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary" data-testid={`badge-role-${member.id}`}>
            {member.role}
          </Badge>
          {member.department && (
            <Badge variant="outline" data-testid={`badge-department-${member.id}`}>
              {member.department}
            </Badge>
          )}
          {member.isVIP && (
            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600" data-testid={`badge-vip-${member.id}`}>
              <Crown className="w-3 h-3 mr-1" />
              VIP
            </Badge>
          )}
          {member.isPartner && (
            <Badge variant="default" className="bg-purple-500 hover:bg-purple-600" data-testid={`badge-partner-${member.id}`}>
              Partner
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {member.bio && (
          <p className="text-muted-foreground mb-4 text-center" data-testid={`text-bio-${member.id}`}>
            {member.bio}
          </p>
        )}
        
        <div className="space-y-2">
          {member.email && (
            <div className="flex items-center gap-2 text-sm" data-testid={`contact-email-${member.id}`}>
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{member.email}</span>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center gap-2 text-sm" data-testid={`contact-phone-${member.id}`}>
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{member.phone}</span>
            </div>
          )}
          
          {(member.socialLinks.linkedin || member.socialLinks.twitter || member.socialLinks.website) && (
            <>
              <Separator className="my-3" />
              <div className="flex justify-center gap-2">
                {member.socialLinks.linkedin && (
                  <Button variant="ghost" size="icon" asChild data-testid={`link-linkedin-${member.id}`}>
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {member.socialLinks.twitter && (
                  <Button variant="ghost" size="icon" asChild data-testid={`link-twitter-${member.id}`}>
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {member.socialLinks.website && (
                  <Button variant="ghost" size="icon" asChild data-testid={`link-website-${member.id}`}>
                    <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, icon: Icon, children, testId }: { title: string; icon: any; children: React.ReactNode; testId: string }) {
  return (
    <section className="mb-12" data-testid={testId}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Leadership() {
  const { data: leadershipData, isLoading: leadershipLoading } = useQuery<LeadershipData>({
    queryKey: ['/api/leadership'],
  });

  const { data: historyData, isLoading: historyLoading } = useQuery<CompanyHistory>({
    queryKey: ['/api/company-history'],
  });

  if (leadershipLoading || historyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-state">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leadership information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="page-badge">
            <Users className="w-4 h-4 mr-2" />
            Leadership Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="page-title">
            <Building2 className="w-8 h-8 inline mr-3 text-primary" />
            Our Leadership Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="page-description">
            Meet the visionary leaders driving GEM Enterprise's success in cybersecurity and real estate innovation. 
            Our team combines decades of expertise with cutting-edge technology solutions.
          </p>
        </div>

        {/* VIP Board Dashboard */}
        {leadershipData?.vipBoard && leadershipData.vipBoard.length > 0 && (
          <Section title="VIP Executive Board" icon={Crown} testId="section-vip-board">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipData.vipBoard.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </Section>
        )}

        {/* Leadership Team */}
        {leadershipData?.leadership && leadershipData.leadership.length > 0 && (
          <Section title="Leadership Team" icon={Users} testId="section-leadership">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipData.leadership.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </Section>
        )}

        {/* Partners */}
        {leadershipData?.partners && leadershipData.partners.length > 0 && (
          <Section title="Strategic Partners" icon={Building2} testId="section-partners">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipData.partners.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </Section>
        )}

        {/* All Team Members */}
        {leadershipData?.members && leadershipData.members.length > 0 && (
          <Section title="Complete Team Directory" icon={Users} testId="section-all-members">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipData.members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </Section>
        )}

        {/* Company History */}
        {historyData && (
          <Section title="Our Revolutionary Growth" icon={History} testId="section-company-history">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Timeline */}
              <Card className="p-6" data-testid="card-company-timeline">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Company Milestones
                </h3>
                <div className="space-y-6">
                  {historyData.milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-primary/20 last:border-l-0" data-testid={`milestone-${index}`}>
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                      <div className="mb-2">
                        <Badge variant="outline" className="mb-2" data-testid={`milestone-year-${index}`}>
                          {milestone.year}
                        </Badge>
                        <h4 className="font-semibold text-lg" data-testid={`milestone-title-${index}`}>
                          {milestone.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground mb-2" data-testid={`milestone-description-${index}`}>
                        {milestone.description}
                      </p>
                      <p className="text-sm font-medium text-primary" data-testid={`milestone-impact-${index}`}>
                        Impact: {milestone.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Vision */}
              <Card className="p-6" data-testid="card-company-vision">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Our Vision
                </h3>
                <div className="space-y-6">
                  <div data-testid="vision-present">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Present Mission</h4>
                    <p className="text-muted-foreground">
                      {historyData.vision.present}
                    </p>
                  </div>
                  <Separator />
                  <div data-testid="vision-future">
                    <h4 className="font-semibold text-lg mb-2 text-primary">Future Goals</h4>
                    <p className="text-muted-foreground">
                      {historyData.vision.future}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Section>
        )}

        {/* Notion Dashboard Embed */}
        <Section title="Live Leadership Dashboard" icon={Users} testId="section-notion-embed">
          <Card className="p-6" data-testid="card-notion-embed">
            <div className="mb-4">
              <p className="text-muted-foreground text-center">
                View and manage leadership profiles in real-time through our integrated Notion dashboard.
              </p>
            </div>
            <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <iframe 
                src="https://caramel-mallet-6dc.notion.site/ebd/25bb5b56eac2803c97eacd936ef04497?v=25bb5b56eac28172ad7d000c55661d2e"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                data-testid="iframe-notion-dashboard"
                title="Leadership Dashboard"
              />
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}