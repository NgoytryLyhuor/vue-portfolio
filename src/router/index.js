// Router Configuration - Portfolio Navigation
import { createRouter, createWebHistory } from 'vue-router'
import api from '@/service/api'

// Lazy load components for better performance
const Home = () => import('../views/Home.vue')
const Projects = () => import('../views/ProjectView.vue')
const About = () => import('../views/About.vue')
const NotFound = () => import('../views/NotFound.vue')
const BlogDetail = () => import('@/views/BlogDetail.vue')
const WeatherApp = () => import('@/views/projects/WeatherApp.vue')
const AirQuality = () => import('@/views/projects/AirQuality.vue')
const KhmerCalendar = () => import('@/views/projects/KhmerCalendar.vue')
const CurrencyConverter = () => import('@/views/projects/CurrencyConverter.vue')
const VehicleTaxGuide = () => import('@/views/projects/VehicleTaxGuide.vue')
const FuelPriceTracker = () => import('@/views/projects/FuelPriceTracker.vue')
const TrafficFines = () => import('@/views/projects/TrafficFines.vue')
const PublicServices = () => import('@/views/projects/PublicServices.vue')
const UtilityTariffCalculator = () => import('@/views/projects/UtilityTariffCalculator.vue')
const CryptoPassword = () => import('@/views/projects/CryptoPassword.vue')
const CryptoPriceTracker = () => import('@/views/projects/CryptoPriceTracker.vue')
const GarageAccess = () => import('@/views/projects/GarageAccess.vue')
const PrivateGarage = () => import('@/views/projects/PrivateGarage.vue')
const PriusMaintenance = () => import('@/views/projects/PriusMaintenance.vue')
const SalaryTaxCalculator = () => import('@/views/projects/SalaryTaxCalculator.vue')
const BankLoanCalculator = () => import('@/views/projects/BankLoanCalculator.vue')
const PostalCodesDirectory = () => import('@/views/projects/PostalCodesDirectory.vue')
const CambodiaHospitals = () => import('@/views/projects/CambodiaHospitals.vue')
const InterProvinceTransit = () => import('@/views/projects/InterProvinceTransit.vue')
const EvChargingDirectory = () => import('@/views/projects/EvChargingDirectory.vue')
const HolidayAccess = () => import('@/views/projects/HolidayAccess.vue')
const HolidayPlanner = () => import('@/views/projects/HolidayPlanner.vue')
const SpaceEvents = () => import('@/views/space/SpaceEvents.vue')
const SpaceEventDetail = () => import('@/views/space/SpaceEventDetail.vue')
const Login = () => import('@/views/auth/LoginView.vue')
const Dashboard = () => import('@/views/auth/DashboardView.vue')

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            showNavBar: true,
            title: '404 Not Found'
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            showNavBar: true,
            title: 'Ngoytry Lyhuor - Web Developer Portfolio',
            description: 'Blog articles about data science, technology, and web development. Explore tutorials, insights, and discoveries from a professional web developer based in Cambodia.',
            robots: 'index, follow'
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: BlogDetail,
        meta: {
            showNavBar: true,
            title: 'Article - Ngoytry Lyhuor',
            description: 'Read the full article',
            robots: 'index, follow'
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
            showNavBar: true,
            title: 'Projects - Ngoytry Lyhuor',
            description: 'Explore my portfolio of web development projects including Vue.js applications, weather apps, and interactive tools built with modern technologies.',
            robots: 'index, follow'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            showNavBar: true,
            title: 'About Me - Ngoytry Lyhuor',
            description: 'Professional web developer based in Cambodia. Specialized in frontend development, JavaScript, Vue.js, PHP, Laravel, Java, and Spring Boot.',
            robots: 'index, follow'
        }
    },
    {
        path: '/weather-app',
        name: 'weather-app',
        component: WeatherApp,
        meta: {
            showNavBar: true,
            title: 'Weather App - Phnom Penh Weather Forecast',
            description: 'Real-time weather forecast for Phnom Penh, Cambodia. Get current conditions, hourly and daily forecasts with detailed weather information.',
            robots: 'index, follow'
        }
    },
    {
        path: '/air-quality',
        name: 'air-quality',
        component: AirQuality,
        meta: {
            showNavBar: true,
            title: 'Air Quality Monitor - Phnom Penh AQI',
            description: 'Real-time air quality monitoring for Phnom Penh, Cambodia. Check current AQI, pollution levels, and health recommendations.',
            robots: 'index, follow'
        }
    },
    {
        path: '/khmer-calendar',
        name: 'khmer-calendar',
        component: KhmerCalendar,
        meta: {
            showNavBar: true,
            title: 'Khmer Calendar - Traditional Cambodian Calendar',
            description: 'Traditional Khmer calendar converter and calendar tool for Cambodian dates and holidays.',
            robots: 'index, follow'
        }
    },
    {
        path: '/currency-converter',
        name: 'currency-converter',
        component: CurrencyConverter,
        meta: {
            showNavBar: true,
            title: 'Currency Converter - Real-time Exchange Rates',
            description: 'Convert between currencies with real-time exchange rates. Support for USD, KHR, CNY, and VND.',
            robots: 'index, follow'
        }
    },
    {
        path: '/vehicle-tax',
        name: 'vehicle-tax',
        component: VehicleTaxGuide,
        meta: {
            showNavBar: true,
            title: 'Cambodia Vehicle Tax & Technical Inspection Guide - ពន្ធយានយន្ត និងឆៀក',
            description: 'Comprehensive guide to Cambodian vehicle road tax, MPWT technical inspection deadlines, payment channels, and traffic fines.',
            robots: 'index, follow'
        }
    },
    {
        path: '/cambodia-tax',
        redirect: '/vehicle-tax'
    },
    {
        path: '/fuel-prices',
        name: 'fuel-prices',
        component: FuelPriceTracker,
        meta: {
            showNavBar: true,
            title: 'Cambodia Fuel Price Tracker & Road Trip Cost Calculator - តម្លៃប្រេងឥន្ធនៈផ្លូវការ',
            description: 'Ministry of Commerce official fuel prices in Cambodia, historical price trends, station network comparisons, and road trip fuel cost calculator.',
            robots: 'index, follow'
        }
    },
    {
        path: '/cambodia-fuel',
        redirect: '/fuel-prices'
    },
    {
        path: '/traffic-fines',
        name: 'traffic-fines',
        component: TrafficFines,
        meta: {
            showNavBar: true,
            title: 'Cambodia Traffic Fines & Violations Lookup - ផាកពិន័យចរាចរណ៍ផ្លូវគោក (អនុក្រឹត្យ ៣៩)',
            description: 'Comprehensive Cambodia traffic violations and fine lookup based on Sub-Decree 39 for passenger cars, motorcycles, and heavy trucks with driver license demerit points.',
            robots: 'index, follow'
        }
    },
    {
        path: '/public-services',
        name: 'public-services',
        component: PublicServices,
        meta: {
            showNavBar: true,
            title: 'Cambodia Public Services Guide: Passport, Driver License & ID Card - សេវាសាធារណៈកម្ពុជា',
            description: 'Official fees, processing days, required documents, and locations for Cambodian passports, driver license renewals, and national ID cards.',
            robots: 'index, follow'
        }
    },
    {
        path: '/citizen-services',
        redirect: '/public-services'
    },
    {
        path: '/utility-calculator',
        name: 'utility-calculator',
        component: UtilityTariffCalculator,
        meta: {
            showNavBar: true,
            title: 'Cambodia EDC Electricity & PPWSA Water Bill Calculator - គណនាថ្លៃទឹក-ភ្លើង',
            description: 'Official Electricité du Cambodge (EDC) & PPWSA tiered rates calculator, tenant rental overcharge verification, and home appliance energy estimator.',
            robots: 'index, follow'
        }
    },
    {
        path: '/edc-calculator',
        redirect: '/utility-calculator'
    },
    {
        path: '/cambodia-electricity',
        redirect: '/utility-calculator'
    },
    {
        path: '/salary-tax-calculator',
        name: 'salary-tax-calculator',
        component: SalaryTaxCalculator,
        meta: {
            showNavBar: true,
            title: 'Cambodia Salary Tax & NSSF Calculator (GDT Rates)',
            description: 'Calculate monthly Cambodia Salary Tax (TOS) according to General Department of Taxation (GDT) progressive brackets, NSSF employee pension deductions, and dependent relief allowances.',
            robots: 'index, follow'
        }
    },
    {
        path: '/salary-calculator',
        redirect: '/salary-tax-calculator'
    },
    {
        path: '/bank-loan-calculator',
        name: 'bank-loan-calculator',
        component: BankLoanCalculator,
        meta: {
            showNavBar: true,
            title: 'Cambodia Bank Loan & Housing Mortgage Calculator',
            description: 'Calculate monthly bank installments, compare declining balance (ការប្រាក់ថយ) vs flat rate (ការប្រាក់ស្មើ), and generate full amortization tables for borey homes and car financing.',
            robots: 'index, follow'
        }
    },
    {
        path: '/loan-calculator',
        redirect: '/bank-loan-calculator'
    },
    {
        path: '/postal-codes',
        name: 'postal-codes',
        component: PostalCodesDirectory,
        meta: {
            showNavBar: true,
            title: 'Cambodia 25 Provinces Postal Codes & Emergency Hotlines',
            description: 'Directory of official Cambodia 5-digit postal codes across 25 provinces and districts for international delivery, plus nationwide emergency hotlines (117, 118, 119).',
            robots: 'index, follow'
        }
    },
    {
        path: '/emergency-directory',
        redirect: '/postal-codes'
    },
    {
        path: '/cambodia-hospitals',
        name: 'cambodia-hospitals',
        component: CambodiaHospitals,
        meta: {
            showNavBar: true,
            title: 'Cambodia 25 Provinces Emergency Hospitals & Ambulance Directory',
            description: '24/7 nationwide emergency referral hospitals, ambulance hotlines (SAMU 119), pediatric trauma centers, and blood bank directory across all 25 provinces in Cambodia.',
            robots: 'index, follow'
        }
    },
    {
        path: '/hospitals',
        redirect: '/cambodia-hospitals'
    },
    {
        path: '/emergency-hospitals',
        redirect: '/cambodia-hospitals'
    },
    {
        path: '/transit-guide',
        name: 'transit-guide',
        component: InterProvinceTransit,
        meta: {
            showNavBar: true,
            title: 'Cambodia Inter-Province Transit, Railway & Island Ferry Guide',
            description: 'Royal Railway train schedules, inter-province express bus and VIP van fares across all 25 provinces, and high-speed island ferries to Koh Rong.',
            robots: 'index, follow'
        }
    },
    {
        path: '/inter-province-transit',
        redirect: '/transit-guide'
    },
    {
        path: '/bus-train-schedule',
        redirect: '/transit-guide'
    },
    {
        path: '/ev-charging',
        name: 'ev-charging',
        component: EvChargingDirectory,
        meta: {
            showNavBar: true,
            title: 'Cambodia EV Charging Stations & Fuel Savings Calculator',
            description: 'Find public DC fast and AC EV charging stations across Cambodia (EDC, TotalEnergies, Caltex, PTT, Expressway) and calculate exact monthly/annual financial savings.',
            robots: 'index, follow'
        }
    },
    {
        path: '/cambodia-ev',
        redirect: '/ev-charging'
    },
    {
        path: '/holiday-access',
        name: 'holiday-access',
        component: HolidayAccess,
        meta: {
            showNavBar: false,
            title: 'Cambodia Holiday Planner - Password Protected',
            description: 'Password protected access to Cambodia public holiday planner',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/holiday-planner',
        name: 'holiday-planner',
        component: HolidayPlanner,
        meta: {
            showNavBar: true,
            title: 'Cambodia Public Holidays 2026 & Long Weekend Planner',
            description: 'Official Kingdom of Cambodia public holiday calendar with real-time holiday countdowns and the Bridge Day vacation hack.',
            robots: 'noindex, nofollow',
            requiresHolidayAuth: true
        }
    },
    {
        path: '/crypto-tracker-password',
        name: 'crypto-tracker-password',
        component: CryptoPassword,
        meta: {
            showNavBar: false,
            title: 'Crypto Tracker - Password Protected',
            description: 'Password protected access to cryptocurrency price tracker',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/crypto-tracker',
        name: 'crypto-tracker',
        component: CryptoPriceTracker,
        meta: {
            showNavBar: true,
            title: 'Crypto Price Tracker - Real-time Cryptocurrency Prices',
            description: 'Real-time cryptocurrency prices, market data, and tracking for Bitcoin, Ethereum, and 250+ cryptocurrencies.',
            robots: 'noindex, nofollow',
            requiresCryptoAuth: true
        }
    },
    {
        path: '/garage-access',
        name: 'garage-access',
        component: GarageAccess,
        meta: {
            showNavBar: true,
            title: 'Lyhuor Garage - Private Access',
            description: 'Password protected area for Lyhuor-only tools including crypto tracker and Prius maintenance.',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/garage',
        name: 'garage',
        component: PrivateGarage,
        meta: {
            showNavBar: true,
            title: 'Lyhuor Garage',
            description: 'Private toolbox for crypto tracking and Toyota Prius 2011 maintenance.',
            robots: 'noindex, nofollow',
            requiresGarageAuth: true
        }
    },
    {
        path: '/prius-maintenance',
        name: 'prius-maintenance',
        component: PriusMaintenance,
        meta: {
            showNavBar: true,
            title: 'Prius 2011 Maintenance - Lyhuor Garage',
            description: 'Personal maintenance planner for Toyota Prius 2011 Option 3 with reminders tuned for Cambodia conditions.',
            robots: 'noindex, nofollow',
            requiresGarageAuth: true
        }
    },
    {
        path: '/space-events',
        name: 'space-events',
        component: SpaceEvents,
        meta: {
            showNavBar: true,
            title: 'Space Events Calendar - Meteor Showers, Eclipses & More',
            description: 'Upcoming space events including meteor showers, eclipses, planetary alignments, rocket launches, and astronomical phenomena.',
            robots: 'index, follow'
        }
    },
    {
        path: '/space-events/:id',
        name: 'space-event-detail',
        component: SpaceEventDetail,
        meta: {
            showNavBar: true,
            title: 'Space Event Details',
            description: 'Detailed information about space events',
            robots: 'index, follow'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            showNavBar: true,
            title: 'Login',
            description: 'Login to access the admin dashboard',
            robots: 'noindex, nofollow'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            showNavBar: false,
            title: 'Dashboard',
            description: 'Admin dashboard',
            robots: 'noindex, nofollow',
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
        // Always scroll to top on page navigation
        return { top: 0, left: 0 }
    }
})

// Function to validate token
const validateToken = async () => {
    try {
        // Make a request to verify token validity using your /me endpoint
        const response = await api.get('/me')
        return response.data.status === true
    } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem('token')
        return false
    }
}

// Function to check crypto tracker authentication
const checkCryptoAuth = () => {
    return sessionStorage.getItem('crypto_tracker_auth') === 'true'
}

// Function to check garage/private tools authentication
const checkGarageAuth = () => {
    return sessionStorage.getItem('garage_auth') === 'true'
}

// Function to check holiday planner authentication
const checkHolidayAuth = () => {
    return sessionStorage.getItem('holiday_auth') === 'true'
}

// Navigation guard for authentication and title updates
router.beforeEach(async (to, from, next) => {
    // Update page title
    document.title = to.meta.title || 'Ngoytry Lyhuor'
    
    // Check garage/private access authentication
    if (to.meta.requiresGarageAuth) {
        const isGarageAuthenticated = checkGarageAuth()
        if (!isGarageAuthenticated) {
            next({ name: 'garage-access', query: { redirect: to.fullPath } })
            return
        }
    }

    // Check crypto tracker authentication
    if (to.meta.requiresCryptoAuth) {
        const isCryptoAuthenticated = checkCryptoAuth() || checkGarageAuth()
        if (!isCryptoAuthenticated) {
            // Not authenticated, redirect to garage access page (unlocks crypto + garage)
            next({ name: 'garage-access', query: { redirect: to.fullPath } })
            return
        }
    }

    // Check holiday planner authentication
    if (to.meta.requiresHolidayAuth) {
        const isHolidayAuthenticated = checkHolidayAuth() || checkGarageAuth()
        if (!isHolidayAuthenticated) {
            next({ name: 'holiday-access', query: { redirect: to.fullPath } })
            return
        }
    }
    
    // Check authentication
    const token = localStorage.getItem('token')
    
    if (to.meta.requiresAuth) {
        if (!token) {
            // No token, redirect to login
            next({ name: 'Login' })
        } else {
            // Token exists, validate it
            const isValid = await validateToken()
            if (isValid) {
                next()
            } else {
                // Token is invalid, redirect to login
                next({ name: 'Login' })
            }
        }
    } else if (to.name === 'Login' && token) {
        // Check if token is still valid before redirecting to dashboard
        const isValid = await validateToken()
        if (isValid) {
            next({ name: 'Dashboard' })
        } else {
            next()
        }
    } else {
        next()
    }
})

// Ensure window scrolls to top on every route completion
router.afterEach(() => {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
});

export default router