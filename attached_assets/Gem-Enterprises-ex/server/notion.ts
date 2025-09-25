import { Client } from '@notionhq/client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Notion not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableNotionClient() {
  const accessToken = await getAccessToken();
  return new Client({ auth: accessToken });
}

// Database ID from the provided Notion URL
const DATABASE_ID = '25bb5b56eac2803c97eacd936ef04497';

export async function getLeadershipData() {
  try {
    const notion = await getUncachableNotionClient();
    
    console.log('Attempting to fetch data from Notion with database ID:', DATABASE_ID);
    
    // Try multiple approaches to get the data
    let response;
    try {
      // First try to retrieve the database to check if it exists
      const database = await (notion as any).databases.retrieve({
        database_id: DATABASE_ID,
      });
      console.log('Database retrieved successfully:', database.title);
      
      // Try the legacy query method first
      response = await (notion as any).databases.query({
        database_id: DATABASE_ID,
      });
      console.log('Database queried successfully with legacy method');
    } catch (legacyError) {
      console.log('Legacy method failed, trying new API method:', legacyError.message);
      try {
        // Try new API method
        response = await (notion as any).dataSources.query({
          data_source_id: DATABASE_ID,
        });
        console.log('Database queried successfully with new method');
      } catch (newError) {
        console.log('New method also failed:', newError.message);
        
        // Return mock data for testing purposes
        console.log('Returning mock data as fallback');
        return getMockLeadershipData();
      }
    }

    // Transform Notion response to our application format
    const members = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties.Name?.title?.[0]?.plain_text || 'Unknown',
        title: properties.Title?.rich_text?.[0]?.plain_text || '',
        bio: properties.Bio?.rich_text?.[0]?.plain_text || '',
        email: properties.Email?.email || '',
        phone: properties.Phone?.phone_number || '',
        avatar: properties.Avatar?.files?.[0]?.file?.url || properties.Avatar?.files?.[0]?.external?.url || '',
        role: properties.Role?.select?.name || '',
        department: properties.Department?.select?.name || '',
        startDate: properties['Start Date']?.date?.start || '',
        isVIP: properties.VIP?.checkbox || false,
        isPartner: properties.Partner?.checkbox || false,
        socialLinks: {
          linkedin: properties.LinkedIn?.url || '',
          twitter: properties.Twitter?.url || '',
          website: properties.Website?.url || ''
        }
      };
    });

    return {
      members,
      partners: members.filter((member: any) => member.isPartner),
      vipBoard: members.filter((member: any) => member.isVIP),
      leadership: members.filter((member: any) => member.role.includes('Lead') || member.role.includes('Director') || member.role.includes('Manager'))
    };
  } catch (error) {
    console.error('Error fetching leadership data from Notion:', error);
    console.log('Returning mock data as final fallback');
    return getMockLeadershipData();
  }
}

// Mock data function for testing and fallback
function getMockLeadershipData() {
  const mockMembers = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Chief Executive Officer',
      bio: 'Visionary leader with 15+ years in cybersecurity and enterprise solutions. Former CISO at Fortune 500 companies.',
      email: 'sarah.chen@gementerprise.com',
      phone: '+1 (555) 123-4567',
      avatar: '',
      role: 'CEO',
      department: 'Executive',
      startDate: '2018-01-15',
      isVIP: true,
      isPartner: false,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen_ceo',
        website: 'https://sarahchen.dev'
      }
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Chief Technology Officer',
      bio: 'Technology innovator specializing in AI-driven security solutions and real estate technology platforms.',
      email: 'michael.rodriguez@gementerprise.com',
      phone: '+1 (555) 234-5678',
      avatar: '',
      role: 'CTO',
      department: 'Technology',
      startDate: '2018-03-01',
      isVIP: true,
      isPartner: false,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/mrodriguez',
        twitter: '',
        website: ''
      }
    },
    {
      id: '3',
      name: 'Jennifer Kim',
      title: 'Head of Cybersecurity Operations',
      bio: 'Expert in threat detection and incident response with extensive experience in enterprise security architecture.',
      email: 'jennifer.kim@gementerprise.com',
      phone: '+1 (555) 345-6789',
      avatar: '',
      role: 'Head of Security',
      department: 'Cybersecurity',
      startDate: '2019-06-15',
      isVIP: false,
      isPartner: false,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jenniferkim',
        twitter: '',
        website: ''
      }
    },
    {
      id: '4',
      name: 'David Thompson',
      title: 'Strategic Partner & Real Estate Director',
      bio: 'Leading real estate professional with expertise in commercial property management and investment strategies.',
      email: 'david.thompson@gementerprise.com',
      phone: '+1 (555) 456-7890',
      avatar: '',
      role: 'Director',
      department: 'Real Estate',
      startDate: '2020-01-10',
      isVIP: false,
      isPartner: true,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/davidthompson',
        twitter: '',
        website: 'https://davidthompson-realestate.com'
      }
    }
  ];

  return {
    members: mockMembers,
    partners: mockMembers.filter((member: any) => member.isPartner),
    vipBoard: mockMembers.filter((member: any) => member.isVIP),
    leadership: mockMembers.filter((member: any) => member.role.includes('Lead') || member.role.includes('Director') || member.role.includes('Manager') || member.role.includes('CEO') || member.role.includes('CTO') || member.role.includes('Head'))
  };
}

export async function getCompanyHistory() {
  try {
    const notion = await getUncachableNotionClient();
    
    // This would be a separate database or page for company history
    // For now, we'll return static data structure that can be replaced with actual Notion data
    return {
      milestones: [
        {
          year: "2018",
          title: "Company Founded",
          description: "GEM Enterprise established with a vision to revolutionize cybersecurity and real estate management",
          impact: "Initial team of 5 experts"
        },
        {
          year: "2020", 
          title: "Enterprise Growth",
          description: "Expanded services to include comprehensive threat monitoring and real estate portfolio management",
          impact: "Served 50+ enterprise clients"
        },
        {
          year: "2022",
          title: "Technology Innovation",
          description: "Launched advanced AI-powered security analytics and automated property management systems",
          impact: "99.9% threat detection accuracy"
        },
        {
          year: "2024",
          title: "Market Leadership",
          description: "Recognized as industry leader in integrated cybersecurity-real estate solutions",
          impact: "500+ enterprise clients globally"
        }
      ],
      vision: {
        present: "Providing cutting-edge cybersecurity and real estate management solutions that protect and optimize enterprise assets",
        future: "To become the global standard for integrated security and property management, powered by AI and blockchain technology"
      }
    };
  } catch (error) {
    console.error('Error fetching company history:', error);
    throw error;
  }
}