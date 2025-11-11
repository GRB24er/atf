// lib/mockUser.ts
// Premium private aviation client data model

export interface Booking {
  id: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  tailNumber: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  invoiceId: string;
  passengers: number;
  distance: number; // nautical miles
  duration: string;
  services: string[];
  crew: {
    captain: string;
    firstOfficer: string;
    flightAttendants: number;
  };
  notes?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  date: string;
  method: string;
  status: 'settled' | 'pending' | 'failed';
  reference: string;
}

const mockUser = {
  username: "patval12",
  password: "Valmont15#",
  
  profile: {
    id: "user_0001",
    fullName: "Patrick Van Jewell",
    title: "Founder & CEO",
    email: "patrick.vj@vanholdingsltd.com",
    phone: "+1 (310) 555-0142",
    company: "Van Jewell Holdings Ltd.",
    avatar: "/patrick.jpg",
    vipLevel: "Platinum Elite",
    memberSince: "2019-03-15",
    preferredAircraft: ["Gulfstream G700", "Bombardier Global 7500"],
    loyaltyPoints: 328450,
    totalFlightHours: 1847,
    carbonOffset: 450, // tons offset
  },

  travelHistory: [
    {
      id: "ATF-2025-001",
      from: "Los Angeles (KLAX)",
      to: "Tokyo (RJTT)",
      date: "2025-03-15",
      departureTime: "14:30 PST",
      arrivalTime: "18:45 JST +1",
      aircraft: "Gulfstream G650ER",
      tailNumber: "N650GV",
      status: "completed",
      price: 245800,
      currency: "USD",
      invoiceId: "INV-2025-0315",
      passengers: 4,
      distance: 5478,
      duration: "11h 15m",
      services: ["Priority Customs", "Ground Transport", "In-flight Connectivity", "Catering by Nobu"],
      crew: {
        captain: "James Mitchell",
        firstOfficer: "Sarah Chen",
        flightAttendants: 2
      },
      notes: "Executive delegation trip. Required secure communications suite."
    },
    {
      id: "ATF-2025-002",
      from: "London (EGLF)",
      to: "Dubai (OMDB)",
      date: "2025-05-02",
      departureTime: "09:15 GMT",
      arrivalTime: "19:30 GST",
      aircraft: "Bombardier Global 7500",
      tailNumber: "N7500B",
      status: "completed",
      price: 178500,
      currency: "USD",
      invoiceId: "INV-2025-0502",
      passengers: 6,
      distance: 3414,
      duration: "6h 15m",
      services: ["VIP Terminal Access", "Aircraft Detailing", "Premium Catering", "Ground Transportation"],
      crew: {
        captain: "David Thompson",
        firstOfficer: "Emma Wilson",
        flightAttendants: 2
      }
    },
    {
      id: "ATF-2025-003",
      from: "Geneva (LSGG)",
      to: "New York (KTEB)",
      date: "2025-07-21",
      departureTime: "16:00 CET",
      arrivalTime: "19:30 EST",
      aircraft: "Dassault Falcon 10X",
      tailNumber: "N10XF",
      status: "completed",
      price: 298750,
      currency: "USD",
      invoiceId: "INV-2025-0721",
      passengers: 3,
      distance: 3638,
      duration: "8h 30m",
      services: ["Michelin Chef Catering", "Wine Sommelier Selection", "Private Terminal", "Overnight Crew"],
      crew: {
        captain: "Robert Martinez",
        firstOfficer: "Lisa Anderson",
        flightAttendants: 2
      },
      notes: "Special request: Château Margaux 2015, fresh sushi preparation."
    },
    {
      id: "ATF-2025-004",
      from: "Miami (KOPF)",
      to: "São Paulo (SBGR)",
      date: "2025-09-18",
      departureTime: "22:00 EST",
      arrivalTime: "08:15 BRT +1",
      aircraft: "Gulfstream G700",
      tailNumber: "N700GJ",
      status: "completed",
      price: 186300,
      currency: "USD",
      invoiceId: "INV-2025-0918",
      passengers: 5,
      distance: 4273,
      duration: "8h 15m",
      services: ["Art Cargo Insurance", "Climate-Controlled Hold", "Customs Broker", "Security Detail"],
      crew: {
        captain: "Michael Foster",
        firstOfficer: "Jennifer Kim",
        flightAttendants: 2
      },
      notes: "Transporting artwork valued at $2.4M. Special insurance and handling protocol."
    },
    {
      id: "ATF-2025-005",
      from: "Miami (KOPF)",
      to: "Paris (LFPB)",
      date: "2025-11-20",
      departureTime: "19:00 EST",
      arrivalTime: "09:30 CET +1",
      aircraft: "Bombardier Global 7500",
      tailNumber: "N7500X",
      status: "pending",
      price: 224950,
      currency: "USD",
      invoiceId: "INV-2025-1120",
      passengers: 4,
      distance: 4415,
      duration: "8h 30m",
      services: ["Premium Catering - TBD", "Ground Transport - TBD", "VIP Terminal", "Pet Transport"],
      crew: {
        captain: "TBD",
        firstOfficer: "TBD",
        flightAttendants: 2
      },
      notes: "Awaiting final catering selections and ground transport preferences. Pet documentation in progress."
    }
  ],

  payments: [
    {
      id: "PAY-2025-0315",
      bookingId: "ATF-2025-001",
      amount: 245800,
      currency: "USD",
      date: "2025-03-10",
      method: "Wire Transfer",
      status: "settled",
      reference: "WT-20250310-001"
    },
    {
      id: "PAY-2025-0502",
      bookingId: "ATF-2025-002",
      amount: 178500,
      currency: "USD",
      date: "2025-04-28",
      method: "Corporate Amex",
      status: "settled",
      reference: "CC-20250428-002"
    },
    {
      id: "PAY-2025-0721",
      bookingId: "ATF-2025-003",
      amount: 298750,
      currency: "USD",
      date: "2025-07-18",
      method: "Wire Transfer",
      status: "settled",
      reference: "WT-20250718-003"
    },
    {
      id: "PAY-2025-0918",
      bookingId: "ATF-2025-004",
      amount: 186300,
      currency: "USD",
      date: "2025-09-15",
      method: "Wire Transfer",
      status: "settled",
      reference: "WT-20250915-004"
    },
    {
      id: "PAY-2025-1120",
      bookingId: "ATF-2025-005",
      amount: 75000,
      currency: "USD",
      date: "2025-11-05",
      method: "Corporate Amex (Deposit)",
      status: "pending",
      reference: "CC-20251105-005"
    }
  ],

  preferences: {
    seating: "Forward-facing club configuration",
    catering: "Contemporary international cuisine",
    dietary: ["Kosher certified", "Organic produce preferred"],
    connectivity: "Starlink required",
    temperature: 21, // Celsius
    entertainment: "Bloomberg Terminal access, 4K streaming",
    pets: false,
    securityClearance: "Enhanced",
    timezone: "America/Los_Angeles"
  },

  upcomingFlights: 1,
  totalSpent: 1134300, // USD lifetime
  avgFlightCost: 226860,
  preferredRoutes: ["LAX-NRT", "LHR-DXB", "MIA-CDG"]
};

export default mockUser;