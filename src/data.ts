// ============================================================
// BIPPY — Mock Data & Types
// ============================================================

export interface BippyUser {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  city: string;
  verified: boolean;
  verificationMethod: 'email' | 'document' | 'pending';
  status: 'active' | 'pending' | 'banned';
  premium: boolean;
  hobbies: string[];
  budgetTier: 'budget' | 'mid-range' | 'comfort';
  joinedDate: string;
  bio: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  image: string;
  studentCount: number;
  cheatCodes: CheatCode[];
}

export interface CheatCode {
  id: string;
  title: string;
  content: string;
  category: 'accommodation' | 'transport' | 'social' | 'freetime';
  pinned: boolean;
}

export interface Discount {
  id: string;
  merchantName: string;
  title: string;
  description: string;
  discount: string;
  category: string;
  city: string;
  validUntil: string;
  qrData: string;
  premiumOnly: boolean;
}

export interface BippyEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: number;
  description: string;
  attendees: number;
  maxAttendees: number;
  sponsored: boolean;
  image: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userFlag: string;
  channel: string;
  message: string;
  timestamp: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  city: string;
  plan: 'free' | 'pro' | 'enterprise';
  offersActive: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  joinedDate: string;
}

export interface Ambassador {
  id: string;
  name: string;
  city: string;
  tipsCreated: number;
  activeStudents: number;
  satisfaction: number;
  contentScore: number;
  avatar: string;
}

export interface RevenueStream {
  name: string;
  source: string;
  mtd: number;
  target: number;
  growth: number;
}

export interface ReportedContent {
  id: string;
  reporterName: string;
  targetName: string;
  reason: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

// ============================================================
// MOCK DATA
// ============================================================

export const cities: City[] = [
  {
    id: 'ljubljana',
    name: 'Ljubljana',
    country: 'Slovenia',
    flag: '🇸🇮',
    image: '🏰',
    studentCount: 342,
    cheatCodes: [
      { id: 'c1', title: 'Urbana Card Essentials', content: 'Get the Urbana city card immediately — it works on all buses and you can top up at any newsstand. A single ride is €1.20. Monthly student pass is €25.', category: 'transport', pinned: true },
      { id: 'c2', title: 'Student Dormitory Hack', content: 'Apply for ŠD Ljubljana dorms through your faculty coordinator. Private shared flats in Šiška district average €250-350/month.', category: 'accommodation', pinned: true },
      { id: 'c3', title: 'Thursday Night at Kino Šiška', content: 'Free exhibitions every Thursday. Check their programme — student tickets for concerts are half price.', category: 'freetime', pinned: true },
      { id: 'c4', title: 'Ziferblat Concept', content: 'Pay per minute, not per item. 5 cents/min. Free coffee, snacks, WiFi, and great for meeting people.', category: 'social', pinned: false },
      { id: 'c5', title: 'Ljubljana Market Saturdays', content: 'Open-air market near Dragon Bridge every Saturday. Fresh produce at student-friendly prices from 6AM-2PM.', category: 'freetime', pinned: false },
    ]
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    flag: '🇨🇿',
    image: '🌉',
    studentCount: 891,
    cheatCodes: [
      { id: 'c6', title: 'ISIC Card is King', content: 'Your ISIC card doubles as a transport pass in Prague. Activate it at any DP Prague office for €13/month unlimited metro/tram/bus.', category: 'transport', pinned: true },
      { id: 'c7', title: 'Avoid Tourist Trap Flats', content: 'Skip Flora and Vinohrady unless you have budget. Žižkov and Karlín are the student sweet spots at €300-400/month for a room.', category: 'accommodation', pinned: true },
      { id: 'c8', title: 'Cross Club Community', content: 'The legendary alternative culture hub in Holešovice. Free entry most weeknights, cheap beer, and the best international crowd.', category: 'social', pinned: true },
      { id: 'c9', title: 'Letná Beer Garden', content: 'The view is free, the beer is €2. Best sunset spot in Prague. Weekday afternoons are quiet.', category: 'freetime', pinned: false },
    ]
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    flag: '🇪🇸',
    image: '🏛️',
    studentCount: 1204,
    cheatCodes: [
      { id: 'c10', title: 'T-Casual Card', content: 'Buy the T-Casual (10 trips) for €11.35. Don\'t get the tourist pass — it\'s triple the price. Metro runs until midnight.', category: 'transport', pinned: true },
      { id: 'c11', title: 'Room in Gràcia', content: 'Gràcia is the student neighbourhood. €400-550/month for a room. Avoid Barceloneta — it\'s humid and overpriced.', category: 'accommodation', pinned: true },
      { id: 'c12', title: 'Erasmus Exchange Dinners', content: 'Every Wednesday at 8PM in Raval. €12 for three courses + wine. Book through the Bippy app.', category: 'social', pinned: true },
      { id: 'c13', title: 'Free Museum Sundays', content: 'First Sunday of every month — MNAC, Picasso Museum, and CCCB are all free. Go early to avoid queues.', category: 'freetime', pinned: false },
    ]
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    image: '🗽',
    studentCount: 756,
    cheatCodes: [
      { id: 'c14', title: 'Semesterticket Power', content: 'Your enrollment includes a semester ticket valid for all ABC zones. It even covers Potsdam and the S-Bahn ring.', category: 'transport', pinned: true },
      { id: 'c15', title: 'WG-Gesucht is Your Bible', content: 'Find flatshares (WGs) on WG-Gesucht.de. Neukölln and Friedrichshain are €350-450. Start searching 6 weeks before arrival.', category: 'accommodation', pinned: true },
      { id: 'c16', title: 'Späti Culture', content: 'Spätkauf (late-night shops) sell beer for €1. Buy a Berliner Pilsner, head to Görlitzer Park. That\'s the social starter kit.', category: 'social', pinned: true },
      { id: 'c17', title: 'Free Berlin Walking Tours', content: 'Tip-based walking tours leave from Brandenburg Gate daily at 10AM and 2PM. Standard tip is €5-10.', category: 'freetime', pinned: false },
    ]
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    flag: '🇳🇱',
    image: '🚲',
    studentCount: 523,
    cheatCodes: [
      { id: 'c18', title: 'Buy a Bike on Day One', content: 'Get a second-hand bike at Waterlooplein market (€50-80). It\'s not optional in Amsterdam — it\'s survival.', category: 'transport', pinned: true },
      { id: 'c19', title: 'Student Housing via ROOM', content: 'Register on ROOM.nl immediately. Waitlists are long. In the meantime, check Kamernet.nl for temporary sublets in De Pijp or Oud-West.', category: 'accommodation', pinned: true },
      { id: 'c20', title: 'Borrel at CREA', content: 'Thursday student borrels (drinks) at CREA cultural centre are free entry and €2 beer. Best way to meet Dutch students.', category: 'social', pinned: true },
      { id: 'c21', title: 'Vondelpark Open-Air Theatre', content: 'Free performances all summer. Bring a blanket and picnic. Check the schedule on vondelpark.nl', category: 'freetime', pinned: false },
    ]
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    flag: '🇵🇹',
    image: '🌅',
    studentCount: 467,
    cheatCodes: [
      { id: 'c22', title: 'Navegante Card', content: 'Get the monthly pass for €30. Covers metro, buses, trams, and trains to Cascais/Sintra. Pure gold.', category: 'transport', pinned: true },
      { id: 'c23', title: 'Areeiro / Alvalade Housing', content: 'These residential neighborhoods have rooms for €300-400/month. Close to both ULISBOA and ISCTE campuses.', category: 'accommodation', pinned: true },
      { id: 'c24', title: 'Erasmus Corner Bairro Alto', content: 'Friday nights in Bairro Alto are spontaneous street parties. Start at the viewpoint of São Pedro de Alcântara.', category: 'social', pinned: true },
      { id: 'c25', title: 'Free Fado in Alfama', content: 'Many tiny tascas in Alfama offer free live fado with dinner. Avoid the tourist-trap restaurants on the main squares.', category: 'freetime', pinned: false },
    ]
  },
];

export const users: BippyUser[] = [
  { id: 'u1', name: 'Emma Johansson', email: 'emma.j@student.lu.se', country: 'Sweden', flag: '🇸🇪', city: 'Ljubljana', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Photography', 'Hiking', 'Cooking'], budgetTier: 'mid-range', joinedDate: '2025-09-01', bio: 'Exchange student from Lund University. Love exploring new cities through food and photography.' },
  { id: 'u2', name: 'Marco Rossi', email: 'm.rossi@unibo.it', country: 'Italy', flag: '🇮🇹', city: 'Prague', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Football', 'Music', 'Cycling'], budgetTier: 'budget', joinedDate: '2025-09-03', bio: 'Erasmus student from Bologna. Looking for pickup football games and live music venues.' },
  { id: 'u3', name: 'Sofia Martinez', email: 'sofia.m@ucm.es', country: 'Spain', flag: '🇪🇸', city: 'Berlin', verified: true, verificationMethod: 'document', status: 'active', premium: true, hobbies: ['Art', 'Yoga', 'Writing'], budgetTier: 'comfort', joinedDate: '2025-08-28', bio: 'Art history major from Madrid. Here to document Berlin\'s incredible gallery scene.' },
  { id: 'u4', name: 'Lars Müller', email: 'l.mueller@tu-berlin.de', country: 'Germany', flag: '🇩🇪', city: 'Barcelona', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Surfing', 'Coding', 'Craft Beer'], budgetTier: 'mid-range', joinedDate: '2025-09-05', bio: 'Computer science student from Berlin. Ready for sun, waves, and tapas.' },
  { id: 'u5', name: 'Anna Kowalski', email: 'a.kowalski@student.uw.edu.pl', country: 'Poland', flag: '🇵🇱', city: 'Amsterdam', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Dancing', 'Reading', 'Baking'], budgetTier: 'budget', joinedDate: '2025-09-02', bio: 'Literature student from Warsaw. Excited to explore Dutch culture and improve my English.' },
  { id: 'u6', name: 'Thomas Dupont', email: 't.dupont@sorbonne.fr', country: 'France', flag: '🇫🇷', city: 'Lisbon', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Photography', 'Surfing', 'Guitar'], budgetTier: 'mid-range', joinedDate: '2025-08-30', bio: 'From Paris to Lisbon — chasing waves and good light for photography.' },
  { id: 'u7', name: 'Yuki Tanaka', email: 'yuki.t@keio.jp', country: 'Japan', flag: '🇯🇵', city: 'Prague', verified: true, verificationMethod: 'document', status: 'active', premium: false, hobbies: ['Music', 'Film', 'Tea Ceremony'], budgetTier: 'comfort', joinedDate: '2025-09-04', bio: 'Film studies major from Tokyo. Fascinated by European cinema history.' },
  { id: 'u8', name: 'Isabella Santos', email: 'isa.santos@usp.br', country: 'Brazil', flag: '🇧🇷', city: 'Barcelona', verified: false, verificationMethod: 'pending', status: 'pending', premium: false, hobbies: ['Dance', 'Volleyball', 'Music'], budgetTier: 'budget', joinedDate: '2025-09-08', bio: 'Communications student from São Paulo. First time in Europe!' },
  { id: 'u9', name: 'Oliver Smith', email: 'o.smith@ed.ac.uk', country: 'UK', flag: '🇬🇧', city: 'Berlin', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Philosophy', 'Chess', 'Brewing'], budgetTier: 'mid-range', joinedDate: '2025-09-01', bio: 'Philosophy student from Edinburgh. Seeking deep conversations and good beer.' },
  { id: 'u10', name: 'Priya Sharma', email: 'p.sharma@iitb.ac.in', country: 'India', flag: '🇮🇳', city: 'Amsterdam', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Data Science', 'Cycling', 'Photography'], budgetTier: 'comfort', joinedDate: '2025-08-25', bio: 'Engineering student from Mumbai. Bippy ambassador for Amsterdam.' },
  { id: 'u11', name: 'Carlos Ruiz', email: 'c.ruiz@unam.mx', country: 'Mexico', flag: '🇲🇽', city: 'Lisbon', verified: false, verificationMethod: 'pending', status: 'pending', premium: false, hobbies: ['Architecture', 'Football', 'Cooking'], budgetTier: 'budget', joinedDate: '2025-09-10', bio: 'Architecture student from Mexico City. Here to study Portuguese colonial architecture.' },
  { id: 'u12', name: 'Hana Kim', email: 'hana.k@snu.ac.kr', country: 'South Korea', flag: '🇰🇷', city: 'Ljubljana', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Illustration', 'Running', 'Coffee'], budgetTier: 'mid-range', joinedDate: '2025-09-06', bio: 'Design student from Seoul. Looking for inspiring European landscapes.' },
  { id: 'u13', name: 'Lucas Weber', email: 'l.weber@student.ethz.ch', country: 'Switzerland', flag: '🇨🇭', city: 'Prague', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Robotics', 'Skiing', 'Cooking'], budgetTier: 'comfort', joinedDate: '2025-08-20', bio: 'Robotics engineer from ETH Zürich. Prague\'s tech scene is calling.' },
  { id: 'u14', name: 'Maria Costa', email: 'm.costa@up.pt', country: 'Portugal', flag: '🇵🇹', city: 'Barcelona', verified: true, verificationMethod: 'email', status: 'active', premium: false, hobbies: ['Marketing', 'Yoga', 'Beach Volleyball'], budgetTier: 'mid-range', joinedDate: '2025-09-07', bio: 'Marketing student from Porto. Barcelona feels like home but sunnier!' },
  { id: 'u15', name: 'Jakub Novak', email: 'j.novak@cuni.cz', country: 'Czech Republic', flag: '🇨🇿', city: 'Berlin', verified: false, verificationMethod: 'pending', status: 'pending', premium: false, hobbies: ['Music Production', 'Skateboarding', 'Art'], budgetTier: 'budget', joinedDate: '2025-09-12', bio: 'Music production student from Prague. Berlin\'s techno scene is my classroom.' },
  { id: 'u16', name: 'Elena Popescu', email: 'e.popescu@unibuc.ro', country: 'Romania', flag: '🇷🇴', city: 'Amsterdam', verified: true, verificationMethod: 'document', status: 'active', premium: false, hobbies: ['Psychology', 'Painting', 'Hiking'], budgetTier: 'budget', joinedDate: '2025-09-03', bio: 'Psychology student from Bucharest. The Netherlands\' art scene is incredible.' },
  { id: 'u17', name: 'Alex Thompson', email: 'a.thompson@unimelb.edu.au', country: 'Australia', flag: '🇦🇺', city: 'Lisbon', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Surfing', 'Photography', 'Travel'], budgetTier: 'comfort', joinedDate: '2025-08-22', bio: 'From Melbourne to the world. Lisbon is my current base camp.' },
  { id: 'u18', name: 'Sara Al-Hassan', email: 's.alhassan@aub.edu.lb', country: 'Lebanon', flag: '🇱🇧', city: 'Ljubljana', verified: true, verificationMethod: 'document', status: 'active', premium: false, hobbies: ['Journalism', 'Cooking', 'Languages'], budgetTier: 'mid-range', joinedDate: '2025-09-01', bio: 'Journalism student from Beirut. Collecting stories across Europe.' },
  { id: 'u19', name: 'Piotr Nowak', email: 'p.nowak@student.put.poznan.pl', country: 'Poland', flag: '🇵🇱', city: 'Berlin', verified: true, verificationMethod: 'email', status: 'banned', premium: false, hobbies: ['Engineering', 'Gaming', 'Football'], budgetTier: 'budget', joinedDate: '2025-08-15', bio: 'Mechanical engineering student. Violated community guidelines.' },
  { id: 'u20', name: 'Nina Bergström', email: 'nina.b@uu.se', country: 'Sweden', flag: '🇸🇪', city: 'Barcelona', verified: true, verificationMethod: 'email', status: 'active', premium: true, hobbies: ['Sustainability', 'Yoga', 'Wine'], budgetTier: 'comfort', joinedDate: '2025-08-28', bio: 'Environmental science student from Uppsala. Barcelona\'s sustainability scene is thriving.' },
];

export const discounts: Discount[] = [
  { id: 'd1', merchantName: 'Ziferblat Ljubljana', title: 'First Visit Free (30 min)', description: 'Your first 30 minutes are on us! Come experience the pay-per-minute concept.', discount: '100%', category: 'Social', city: 'Ljubljana', validUntil: '2025-12-31', qrData: 'ZIFERBLAT-LJU-2025', premiumOnly: false },
  { id: 'd2', merchantName: 'Šiška hostel', title: '10% Off First Week', description: 'Book your first week through Bippy and save 10% on dorm beds.', discount: '10%', category: 'Accommodation', city: 'Ljubljana', validUntil: '2025-11-30', qrData: 'SISKA-HOSTEL-10PCT', premiumOnly: false },
  { id: 'd3', merchantName: 'Ljubljana Bikes', title: 'Student Day Rate €5', description: 'Full day bike rental for students. Just show your student ID.', discount: '€5/day', category: 'Transport', city: 'Ljubljana', validUntil: '2025-12-15', qrData: 'LJU-BIKES-STD5', premiumOnly: false },
  { id: 'd4', merchantName: 'Prague Pub Tour', title: 'Free Shot + €2 Off', description: 'Join any walking pub tour and get a welcome shot plus €2 off the ticket price.', discount: '€2 + shot', category: 'Social', city: 'Prague', validUntil: '2025-12-31', qrData: 'PUBTOUR-PRG-SHOT', premiumOnly: false },
  { id: 'd5', merchantName: 'Cross Club', title: 'Free Entry Before 9PM', description: 'Show this QR code at the door for free entry to any event before 9PM.', discount: 'Free Entry', category: 'Nightlife', city: 'Prague', validUntil: '2026-01-15', qrData: 'CROSS-CLUB-BIPPY', premiumOnly: true },
  { id: 'd6', merchantName: 'Barcelona Cooking Class', title: '15% Off Paella Class', description: 'Learn to make authentic Spanish paella with a local chef.', discount: '15%', category: 'Free Time', city: 'Barcelona', validUntil: '2025-12-20', qrData: 'BCN-COOK-15PCT', premiumOnly: true },
  { id: 'd7', merchantName: 'Gràcia Flat Agency', title: 'No Agency Fee for Bippy Users', description: 'Skip the €150 agency fee when renting through our partnership.', discount: '€150 off', category: 'Accommodation', city: 'Barcelona', validUntil: '2026-03-01', qrData: 'GRACIA-NOFEE', premiumOnly: false },
  { id: 'd8', merchantName: 'Berlin Späti Tour', title: 'Guided Späti Tour €8', description: 'Visit 5 legendary Spätis with beer tastings. Normally €15.', discount: '47%', category: 'Social', city: 'Berlin', validUntil: '2025-12-31', qrData: 'BERLIN-SPATI-8', premiumOnly: false },
  { id: 'd9', merchantName: 'Badeschiff Berlin', title: 'Free Towel Rental', description: 'Enjoy the river pool and save €5 on towel rental.', discount: '€5 off', category: 'Free Time', city: 'Berlin', validUntil: '2025-11-30', qrData: 'BADESCHIFF-TOWEL', premiumOnly: false },
  { id: 'd10', merchantName: 'Amsterdam Canal Tours', title: 'Student Sunset Tour €15', description: '90-minute canal tour at sunset. Regular price €35.', discount: '57%', category: 'Free Time', city: 'Amsterdam', validUntil: '2025-12-31', qrData: 'AMS-CANAL-SUNSET', premiumOnly: true },
  { id: 'd11', merchantName: 'Mac Bike Amsterdam', title: '€3 Off Weekly Rental', description: 'Rent a bike for a week and save €3 with this code.', discount: '€3 off', category: 'Transport', city: 'Amsterdam', validUntil: '2026-02-28', qrData: 'MACBIKE-3OFF', premiumOnly: false },
  { id: 'd12', merchantName: 'Lisbon Food Tour', title: 'Lunch Tour €20', description: '4-hour walking food tour through Alfama and Baixa. Normally €35.', discount: '43%', category: 'Free Time', city: 'Lisbon', validUntil: '2025-12-15', qrData: 'LIS-FOOD-20', premiumOnly: false },
  { id: 'd13', merchantName: 'Time Out Market Lisbon', title: 'Free Drink with Meal', description: 'Show the QR code when ordering any main dish for a free beverage.', discount: 'Free Drink', category: 'Food', city: 'Lisbon', validUntil: '2026-01-31', qrData: 'TIMEOUT-FREEDRINK', premiumOnly: false },
  { id: 'd14', merchantName: 'European Hostels Network', title: '5% Off Any Booking', description: 'Exclusive Bippy rate across 200+ partner hostels in Europe.', discount: '5%', category: 'Accommodation', city: 'All Cities', validUntil: '2026-06-30', qrData: 'HOSTELNET-5PCT', premiumOnly: true },
];

export const events: BippyEvent[] = [
  { id: 'e1', title: 'Erasmus Welcome Night Ljubljana', date: '2025-10-05', time: '20:00', location: 'Kino Šiška', city: 'Ljubljana', price: 0, description: 'Official welcome party for all incoming exchange students. Free drinks, live music, and a chance to meet your cohort.', attendees: 187, maxAttendees: 300, sponsored: true, image: '🎵' },
  { id: 'e2', title: 'Prague Pub Crawl', date: '2025-10-12', time: '19:30', location: 'Old Town Square', city: 'Prague', price: 15, description: '5 bars, 5 shots, 1 unforgettable night. Guided by local students who know every hidden gem.', attendees: 64, maxAttendees: 80, sponsored: true, image: '🍺' },
  { id: 'e3', title: 'Barcelona Beach Volleyball Tournament', date: '2025-10-19', time: '10:00', location: 'Barceloneta Beach', city: 'Barcelona', price: 5, description: 'Teams of 4. Beginners welcome! All equipment provided. Prizes for best team name.', attendees: 48, maxAttendees: 64, sponsored: false, image: '🏐' },
  { id: 'e4', title: 'Berlin Techno Night at Berghain', date: '2025-10-25', time: '23:59', location: 'Berghain/Panorama Bar', city: 'Berlin', price: 20, description: 'Group entry with Bippy ambassadors. We\'ll help you get past the door. No photos allowed!', attendees: 30, maxAttendees: 40, sponsored: true, image: '🎧' },
  { id: 'e5', title: 'Amsterdam Museum Night', date: '2025-11-02', time: '19:00', location: 'Museumplein', city: 'Amsterdam', price: 12, description: 'Access to Rijksmuseum, Van Gogh Museum, and Stedelijk after hours. Live DJs and drinks.', attendees: 120, maxAttendees: 200, sponsored: false, image: '🎨' },
  { id: 'e6', title: 'Lisbon Sunset Sailing', date: '2025-11-08', time: '16:00', location: 'Belém Tower Dock', city: 'Lisbon', price: 25, description: '2-hour sunset sail on the Tagus River. Wine and snacks included. Limited spots!', attendees: 22, maxAttendees: 30, sponsored: true, image: '⛵' },
  { id: 'e7', title: 'European Student Quiz Night', date: '2025-11-15', time: '20:00', location: 'Online (All Cities)', city: 'All Cities', price: 0, description: 'Test your knowledge of European culture, geography, and student life. Prizes for top 3 teams!', attendees: 340, maxAttendees: 500, sponsored: true, image: '🧠' },
  { id: 'e8', title: 'Ljubljana Hiking Day: Triglav', date: '2025-11-22', time: '07:00', location: 'Prešernov trg', city: 'Ljubljana', price: 10, description: 'Day trip to Julian Alps. Transport and guide included. Moderate difficulty. Bring snacks!', attendees: 28, maxAttendees: 35, sponsored: false, image: '🏔️' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', userId: 'u1', userName: 'Emma Johansson', userFlag: '🇸🇪', channel: 'Ljubljana General', message: 'Just arrived! Any tips for getting a SIM card? 📱', timestamp: '2 min ago' },
  { id: 'm2', userId: 'u12', userName: 'Hana Kim', userFlag: '🇰🇷', channel: 'Ljubljana General', message: 'Welcome! Get a Telekom Slovenia prepaid at any Petrol station. €10 for 20GB.', timestamp: '1 min ago' },
  { id: 'm3', userId: 'u18', userName: 'Sara Al-Hassan', userFlag: '🇱🇧', channel: 'Ljubljana General', message: 'The Žemljice bakery near the Triple Bridge has the best burek. Trust me! 🥐', timestamp: 'Just now' },
  { id: 'm4', userId: 'u2', userName: 'Marco Rossi', userFlag: '🇮🇹', channel: 'Prague Social', message: 'Anyone up for a football match this weekend? Found a pitch in Letná 🤾', timestamp: '5 min ago' },
  { id: 'm5', userId: 'u7', userName: 'Yuki Tanaka', userFlag: '🇯🇵', channel: 'Prague Social', message: 'I\'m in! What time? Also, has anyone been to that ramen place near Wenceslas Square?', timestamp: '3 min ago' },
  { id: 'm6', userId: 'u13', userName: 'Lucas Weber', userFlag: '🇨🇭', channel: 'Prague Social', message: 'Saturday 3PM works. Let\'s meet at the Letná park entrance. I\'ll bring a ball.', timestamp: '1 min ago' },
  { id: 'm7', userId: 'u3', userName: 'Sofia Martinez', userFlag: '🇪🇸', channel: 'Berlin Art & Culture', message: 'The East Side Gallery is having a restoration event this Thursday. Free participation!', timestamp: '10 min ago' },
  { id: 'm8', userId: 'u9', userName: 'Oliver Smith', userFlag: '🇬🇧', channel: 'Berlin Art & Culture', message: 'Count me in! I\'ve been meaning to learn about the history behind those murals.', timestamp: '7 min ago' },
  { id: 'm9', userId: 'u6', userName: 'Thomas Dupont', userFlag: '🇫🇷', channel: 'Lisbon Surf Crew', message: 'Waves looking good at Cascais this weekend 🏄 Who\'s down?', timestamp: '15 min ago' },
  { id: 'm10', userId: 'u17', userName: 'Alex Thompson', userFlag: '🇦🇺', channel: 'Lisbon Surf Crew', message: 'Always! Let\'s take the train from Cais do Sodré at 8AM?', timestamp: '12 min ago' },
  { id: 'm11', userId: 'u5', userName: 'Anna Kowalski', userFlag: '🇵🇱', channel: 'Amsterdam General', message: 'Found the best stamppot recipe. Cooking for 6 tonight at my place if anyone wants to join! 🍲', timestamp: '20 min ago' },
  { id: 'm12', userId: 'u10', userName: 'Priya Sharma', userFlag: '🇮🇳', channel: 'Amsterdam General', message: 'I\'ll be there! What can I bring?', timestamp: '18 min ago' },
  { id: 'm13', userId: 'u4', userName: 'Lars Müller', userFlag: '🇩🇪', channel: 'Barcelona Tech', message: 'Anyone interested in a coding meetup? Thinking of starting a weekly hacknight at a café in Gràcia.', timestamp: '30 min ago' },
  { id: 'm14', userId: 'u14', userName: 'Maria Costa', userFlag: '🇵🇹', channel: 'Barcelona Tech', message: 'Yes! I\'m learning React. Would love to join. My flat has good WiFi too.', timestamp: '25 min ago' },
];

export const merchants: Merchant[] = [
  { id: 'b1', name: 'Ziferblat Ljubljana', category: 'Café', city: 'Ljubljana', plan: 'pro', offersActive: 2, impressions: 1450, clicks: 320, conversions: 89, revenue: 445, joinedDate: '2025-07-15' },
  { id: 'b2', name: 'Prague Pub Tours', category: 'Tours', city: 'Prague', plan: 'enterprise', offersActive: 4, impressions: 3200, clicks: 890, conversions: 234, revenue: 3510, joinedDate: '2025-06-20' },
  { id: 'b3', name: 'Barcelona Cooking School', category: 'Experience', city: 'Barcelona', plan: 'pro', offersActive: 2, impressions: 2100, clicks: 456, conversions: 123, revenue: 1845, joinedDate: '2025-07-01' },
  { id: 'b4', name: 'Berlin Späti Tours', category: 'Tours', city: 'Berlin', plan: 'free', offersActive: 1, impressions: 890, clicks: 190, conversions: 56, revenue: 448, joinedDate: '2025-08-10' },
  { id: 'b5', name: 'Amsterdam Canal Cruises', category: 'Tours', city: 'Amsterdam', plan: 'enterprise', offersActive: 3, impressions: 4500, clicks: 1200, conversions: 380, revenue: 5700, joinedDate: '2025-05-15' },
  { id: 'b6', name: 'Lisbon Food Tours', category: 'Food', city: 'Lisbon', plan: 'pro', offersActive: 2, impressions: 1890, clicks: 540, conversions: 167, revenue: 3340, joinedDate: '2025-06-30' },
  { id: 'b7', name: 'European Hostels Network', category: 'Accommodation', city: 'All Cities', plan: 'enterprise', offersActive: 5, impressions: 8900, clicks: 2340, conversions: 890, revenue: 4450, joinedDate: '2025-04-01' },
  { id: 'b8', name: 'Mac Bike Amsterdam', category: 'Transport', city: 'Amsterdam', plan: 'free', offersActive: 1, impressions: 670, clicks: 145, conversions: 78, revenue: 390, joinedDate: '2025-08-20' },
];

export const ambassadors: Ambassador[] = [
  { id: 'a1', name: 'Emma Johansson', city: 'Ljubljana', tipsCreated: 12, activeStudents: 342, satisfaction: 4.8, contentScore: 95, avatar: '🇸🇪' },
  { id: 'a2', name: 'Lucas Weber', city: 'Prague', tipsCreated: 18, activeStudents: 891, satisfaction: 4.6, contentScore: 91, avatar: '🇨🇭' },
  { id: 'a3', name: 'Nina Bergström', city: 'Barcelona', tipsCreated: 15, activeStudents: 1204, satisfaction: 4.9, contentScore: 97, avatar: '🇸🇪' },
  { id: 'a4', name: 'Oliver Smith', city: 'Berlin', tipsCreated: 20, activeStudents: 756, satisfaction: 4.7, contentScore: 93, avatar: '🇬🇧' },
  { id: 'a5', name: 'Priya Sharma', city: 'Amsterdam', tipsCreated: 14, activeStudents: 523, satisfaction: 4.5, contentScore: 88, avatar: '🇮🇳' },
  { id: 'a6', name: 'Alex Thompson', city: 'Lisbon', tipsCreated: 16, activeStudents: 467, satisfaction: 4.8, contentScore: 94, avatar: '🇦🇺' },
];

export const revenueStreams: RevenueStream[] = [
  { name: 'B2B Lead Gen', source: 'Monthly Merchant Subscriptions', mtd: 4250, target: 5000, growth: 12.5 },
  { name: 'Premium Members', source: 'Active Student "Insider" Tiers', mtd: 2840, target: 3500, growth: 8.3 },
  { name: 'Partner Badges', source: 'Promoted Visibility Slots', mtd: 1560, target: 2000, growth: 22.1 },
  { name: 'Booking Commissions', source: 'Referral Link Conversions', mtd: 3890, target: 4000, growth: 5.7 },
  { name: 'Sponsored Events', source: 'Direct Ticket Sales', mtd: 6720, target: 7500, growth: 15.4 },
];

export const reportedContent: ReportedContent[] = [
  { id: 'r1', reporterName: 'Emma Johansson', targetName: 'Unknown User', reason: 'Spam', message: 'User sending promotional DMs about crypto exchange to multiple students', timestamp: '10 min ago', status: 'pending' },
  { id: 'r2', reporterName: 'Marco Rossi', targetName: 'Piotr Nowak', reason: 'Harassment', message: 'Repeated aggressive messages in Prague Social channel after being asked to stop', timestamp: '2 hours ago', status: 'pending' },
  { id: 'r3', reporterName: 'Sofia Martinez', targetName: 'Unknown User', reason: 'Fake Profile', message: 'Profile claims to be a student but has no .edu email and sends suspicious links', timestamp: '5 hours ago', status: 'pending' },
  { id: 'r4', reporterName: 'System Auto', targetName: 'Jakub Novak', reason: 'Inappropriate Content', message: 'Shared explicit content in Berlin Social channel', timestamp: '1 day ago', status: 'resolved' },
  { id: 'r5', reporterName: 'Anna Kowalski', targetName: 'Unknown User', reason: 'Scam', message: 'Offering fake apartment listings and asking for deposit transfers via Western Union', timestamp: '2 days ago', status: 'resolved' },
];

export const channelList = [
  { name: 'Ljubljana General', city: 'Ljubljana', members: 342, unread: 3 },
  { name: 'Prague Social', city: 'Prague', members: 891, unread: 5 },
  { name: 'Berlin Art & Culture', city: 'Berlin', members: 312, unread: 2 },
  { name: 'Lisbon Surf Crew', city: 'Lisbon', members: 89, unread: 2 },
  { name: 'Amsterdam General', city: 'Amsterdam', members: 523, unread: 2 },
  { name: 'Barcelona Tech', city: 'Barcelona', members: 234, unread: 2 },
  { name: 'European Foodies', city: 'All Cities', members: 1200, unread: 0 },
  { name: 'Budget Travel Tips', city: 'All Cities', members: 2100, unread: 0 },
];

export const hobbyOptions = [
  'Photography', 'Hiking', 'Cooking', 'Football', 'Music', 'Cycling',
  'Art', 'Yoga', 'Writing', 'Surfing', 'Coding', 'Craft Beer',
  'Dancing', 'Reading', 'Baking', 'Guitar', 'Film', 'Running',
  'Coffee', 'Skiing', 'Gaming', 'Painting', 'Travel', 'Languages',
  'Theatre', 'Chess', 'Skateboarding', 'Volleyball', 'Robotics',
];

export const budgetTiers = [
  { id: 'budget', label: 'Budget', range: '€200-350/mo', icon: '💰', description: 'Dorms, shared flats, street food, free events' },
  { id: 'mid-range', label: 'Mid-Range', range: '€350-550/mo', icon: '💎', description: 'Private room, occasional dining, paid events' },
  { id: 'comfort', label: 'Comfort', range: '€550+/mo', icon: '👑', description: 'Studio apartment, dining out, premium experiences' },
];
