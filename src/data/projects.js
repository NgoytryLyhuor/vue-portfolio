// Static Projects Catalog (Client Production & Full-Stack Utilities)
export const projectsData = [
  {
    id: 1,
    title: 'CONSA Tech Cambodia — Food & Cosmetics Incubation Center',
    titleKm: 'CONSA Tech Cambodia — មជ្ឈមណ្ឌលបណ្តុះបណ្តាល & នវានុវត្តន៍បច្ចេកទេស',
    description:
      'Full-stack production platform built for CONSA Tech Cambodia (Food & Cosmetics Technical Incubation & Innovation Center). Powered by a responsive Vue.js 3 frontend, Laravel REST API backend, and Sanctum Protected Studio (/admin/login) for managing services, R&D lab updates, announcements, and client consultations.',
    descriptionKm:
      'គេហទំព័រផ្លូវការសម្រាប់អតិថិជន CONSA Tech Cambodia (មជ្ឈមណ្ឌលបណ្តុះបណ្តាល និងនវានុវត្តន៍បច្ចេកទេសម្ហូបអាហារ និងគ្រឿងសម្អាង)។ អភិវឌ្ឍដោយប្រើប្រាស់ Vue.js 3 នៅផ្នែក Frontend និង Laravel Backend ភ្ជាប់ជាមួយប្រព័ន្ធគ្រប់គ្រងសុវត្ថិភាព Sanctum Protected Studio។',
    category: 'Client Production',
    status: 'Live Production',
    featured: true,
    image: '/images/projects/consatech-home.png',
    icon: '🧪',
    accent: 'from-emerald-800 via-teal-900 to-slate-900',
    technologies: ['Vue.js 3', 'Laravel', 'Sanctum Studio', 'Tailwind CSS', 'MySQL', 'REST API'],
    demo_url: 'https://www.consatech-cambodia.com/',
    admin_url: 'https://consatech-cambodia.com/admin/login',
    github: '#'
  },
  {
    id: 2,
    title: 'Cambodia Digital Utilities & Developer Portfolio',
    titleKm: 'គេហទំព័រផ្ទាល់ខ្លួន & បណ្តុំឧបករណ៍ឌីជីថលកម្ពុជា',
    description:
      'Bilingual (Khmer & English) PWA-ready web application featuring 14+ interactive civic, financial, and emergency utilities tailored for Cambodia, built with modern Vue 3 Composition API and Tailwind CSS.',
    descriptionKm:
      'គេហទំព័រ PWA ពីរភាសា (ខ្មែរ និងអង់គ្លេស) ដែលប្រមូលផ្តុំឧបករណ៍ឌីជីថលជាក់ស្តែងជាង ១៤ មុខងារសម្រាប់ពលរដ្ឋកម្ពុជា ជាមួយការរចនាទំនើបរលូនលើទូរស័ព្ទ និងកុំព្យូទ័រ។',
    category: 'Full-Stack Web',
    status: 'Live Production',
    featured: true,
    image: '/seo-img.jpg',
    icon: '🚀',
    accent: 'from-blue-600 via-indigo-700 to-slate-900',
    technologies: ['Vue.js 3', 'Tailwind CSS', 'PWA / SW', 'JavaScript'],
    demo_url: 'https://ngoytry-lyhuor.vercel.app/',
    github: 'https://github.com/NgoytryLyhuor/vue-portfolio'
  },
  {
    id: 3,
    title: 'Cambodia 25 Provinces Emergency Hospitals & 119',
    titleKm: 'បញ្ជីមន្ទីរពេទ្យសង្គ្រោះបន្ទាន់ ២៥ ខេត្ត-ក្រុង & ១១៩',
    description:
      '24/7 trauma & emergency hospital directory covering all 25 provinces and Phnom Penh with direct 1-tap ambulance calling (119 SAMU), first-aid protocols, and Google Maps coordinates.',
    descriptionKm:
      'មគ្គុទ្ទេសក៍ស្វែងរកមន្ទីរពេទ្យសង្គ្រោះបន្ទាន់ទូទាំង ២៥ រាជធានី-ខេត្ត ជាមួយលេខទូរស័ព្ទហៅឡានពេទ្យ ១១៩ ភ្លាមៗ វិធីសង្គ្រោះបឋម និងទីតាំង Google Maps។',
    category: 'Civic Utility',
    status: 'Live App',
    icon: '🏥',
    accent: 'from-rose-600 via-red-700 to-slate-900',
    technologies: ['Vue 3', 'Geolocation', 'Bilingual UI', 'Mobile First'],
    route: '/cambodia-hospitals',
    github: '#'
  },
  {
    id: 4,
    title: 'Cambodia Vehicle Tax & Inspection Calculator',
    titleKm: 'ម៉ាស៊ីនគណនាពន្ធផ្លូវយានយន្ត & ឆៀក',
    description:
      'Comprehensive road tax and technical inspection calculator with a 75+ vehicle database (Toyota Prius, EVs, Lexus, pickups, and motorcycles) aligned with Cambodian GDT tariffs.',
    descriptionKm:
      'កម្មវិធីគណនាពន្ធផ្លូវប្រចាំឆ្នាំ និងតម្លៃឆៀកឡាន ដែលមានទិន្នន័យរថយន្តពេញនិយមជាង ៧៥ ម៉ូដែលនៅកម្ពុជា ដូចជា Prius, EV និងរថយន្តទំនើបៗ។',
    category: 'Civic Utility',
    status: 'Live App',
    icon: '🚗',
    accent: 'from-sky-600 via-blue-700 to-slate-900',
    technologies: ['Vue 3', 'Tax Engine', 'GDT Rules', 'Tailwind CSS'],
    route: '/vehicle-tax',
    github: '#'
  },
  {
    id: 5,
    title: 'Salary Tax (GDT) & NSSF Pension Calculator',
    titleKm: 'ម៉ាស៊ីនគណនាពន្ធលើប្រាក់បៀវត្ស (GDT) & ប.ស.ស',
    description:
      'Official General Department of Taxation progressive salary tax calculator (0%–20%), NSSF 2% pension contribution, family dependent relief, and instant salary slip export.',
    descriptionKm:
      'គណនាប្រាក់ខែសុទ្ធក្នុងដៃតាមកាំពន្ធផ្លូវការរបស់អគ្គនាយកដ្ឋានពន្ធដារ វិភាគទានសោធន ប.ស.ស ២% និងការកាត់បន្ថយបន្ទុកគ្រួសារ។',
    category: 'FinTech',
    status: 'Live App',
    icon: '💼',
    accent: 'from-emerald-600 via-teal-700 to-slate-900',
    technologies: ['Vue 3', 'GDT Brackets', 'NSSF', 'Financial Math'],
    route: '/salary-tax-calculator',
    github: '#'
  },
  {
    id: 6,
    title: 'Bank Loan & Mortgage Amortization Engine',
    titleKm: 'ម៉ាស៊ីនគណនាប្រាក់កម្ចីទិញផ្ទះ & រំលស់ឡាន',
    description:
      'Compare Declining Balance vs. Flat Rate loans in USD or KHR with full monthly amortization schedules and one-click CSV/Excel schedule export.',
    descriptionKm:
      'ប្រៀបធៀបការគិតការប្រាក់ថយ និងការប្រាក់ស្មើ ជាប្រាក់ដុល្លារ ឬរៀល ព្រមទាំងតារាងកាលវិភាគបង់រំលស់ប្រចាំខែ និងទាញយកជា Excel/CSV។',
    category: 'FinTech',
    status: 'Live App',
    icon: '🏦',
    accent: 'from-indigo-600 via-blue-800 to-slate-900',
    technologies: ['Vue 3', 'Amortization', 'CSV Export', 'USD/KHR'],
    route: '/bank-loan-calculator',
    github: '#'
  },
  {
    id: 7,
    title: 'Cambodia EV Charging Hubs & Cost Saver',
    titleKm: 'ស្ថានីយ៍សាកឡានអគ្គិសនី EV & គណនាការសន្សំប្រាក់',
    description:
      'Nationwide DC Fast Charger directory (EDC, TotalEnergies, Expressway Km 63 & Km 109, Aeon) paired with an interactive EV vs. gasoline fuel savings calculator.',
    descriptionKm:
      'បញ្ជីស្ថានីយ៍សាកឡាន EV ល្បឿនលឿនទូទាំងប្រទេស និងផ្លូវល្បឿនលឿន ភ្ជាប់ជាមួយម៉ាស៊ីនគណនាប្រាក់សន្សំប្រចាំខែធៀបនឹងឡានចាក់សាំង។',
    category: 'Green Tech',
    status: 'Live App',
    icon: '⚡',
    accent: 'from-teal-600 via-emerald-700 to-slate-900',
    technologies: ['Vue 3', 'EV Directory', 'Cost Modeling', 'Google Maps'],
    route: '/ev-charging',
    github: '#'
  },
  {
    id: 8,
    title: 'Inter-Province Transit, Railway & Island Ferries',
    titleKm: 'កាលវិភាគរថភ្លើង ឡានក្រុង ២៥ ខេត្ត & ទូកកោះ',
    description:
      'Royal Railway Southern & Northern line timetables, express bus fares from Phnom Penh to major provinces, and Sihanoukville to Koh Rong speedboat operators.',
    descriptionKm:
      'កាលវិភាគ និងតម្លៃសំបុត្ររថភ្លើង Royal Railway ឡានក្រុង VIP ទៅតាមបណ្តាខេត្ត និងទូកល្បឿនលឿនទៅកោះរ៉ុង ព្រមទាំងលេខកក់សំបុត្រ។',
    category: 'Civic Utility',
    status: 'Live App',
    icon: '🚆',
    accent: 'from-cyan-600 via-blue-700 to-slate-900',
    technologies: ['Vue 3', 'Transit Data', 'Mobile Cards', 'Direct Booking'],
    route: '/transit-guide',
    github: '#'
  },
  {
    id: 9,
    title: 'Crypto Price Tracker & Technical Analysis',
    titleKm: 'កម្មវិធីតាមដានតម្លៃគ្រីបតូ & វិភាគបច្ចេកទេស',
    description:
      'Real-time market tracker for 250+ cryptocurrencies with interactive Chart.js price history, RSI (14), Moving Averages, and trend forecasting.',
    descriptionKm:
      'តាមដានតម្លៃកាក់គ្រីបតូជាង ២៥០+ ផ្ទាល់ពីទីផ្សារ ជាមួយតារាងវិភាគបច្ចេកទេស RSI, Moving Averages និងការព្យាករណ៍និន្នាការ។',
    category: 'FinTech',
    status: 'Live App',
    icon: '📈',
    accent: 'from-violet-600 via-purple-700 to-slate-900',
    technologies: ['Vue 3', 'Chart.js', 'CoinGecko API', 'Technical Indicators'],
    route: '/crypto-tracker',
    github: '#'
  },
  {
    id: 10,
    title: 'Traffic Fines Lookup (Sub-Decree 39)',
    titleKm: 'តារាងផាកពិន័យចរាចរណ៍ផ្លូវគោក (អនុក្រឹត្យលេខ ៣៩)',
    description:
      'Searchable database of Cambodian road traffic penalties and driver license demerit points across motorcycles, cars, and heavy vehicles.',
    descriptionKm:
      'ស្វែងរកកម្រិតផាកពិន័យចរាចរណ៍ និងការដកពិន្ទុប័ណ្ណបើកបរតាមអនុក្រឹត្យលេខ ៣៩ សម្រាប់ម៉ូតូ រថយន្ត និងយានយន្តធុនធ្ងន់។',
    category: 'Civic Utility',
    status: 'Live App',
    icon: '🚦',
    accent: 'from-amber-600 via-orange-700 to-slate-900',
    technologies: ['Vue 3', 'Legal Lookup', 'Instant Filter', 'Bilingual UI'],
    route: '/traffic-fines',
    github: '#'
  }
];
