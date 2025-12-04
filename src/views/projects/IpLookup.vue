<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-10 mt-10">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-4 shadow-lg">
                    <GlobeAltIcon class="h-8 w-8 text-white" />
                </div>
                <h1 class="text-3xl font-bold mb-2">IP Address Lookup</h1>
                <p class="text-gray-600 dark:text-gray-400">Discover your digital footprint</p>
            </div>

            <!-- Search Box -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1 relative">
                        <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            v-model="searchIp" 
                            type="text" 
                            placeholder="Enter IP address (leave empty for your IP)"
                            @keyup.enter="lookupIp"
                            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <button 
                        @click="lookupIp"
                        :disabled="loading"
                        class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                        <span v-if="loading" class="flex items-center">
                            <ArrowPathIcon class="h-5 w-5 mr-2 animate-spin" />
                            Looking up...
                        </span>
                        <span v-else class="flex items-center">
                            <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
                            Lookup
                        </span>
                    </button>
                </div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
                <div class="flex items-center">
                    <ExclamationCircleIcon class="h-6 w-6 text-red-500 mr-3" />
                    <p class="text-red-700 dark:text-red-300">{{ error }}</p>
                </div>
            </div>

            <!-- Results -->
            <div v-if="ipData && !loading" class="space-y-6 animate-fade-in">
                <!-- Main IP Card -->
                <div class="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                    <!-- Background Pattern -->
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    
                    <div class="relative">
                        <p class="text-cyan-100 text-sm font-medium mb-2">Your IP Address</p>
                        <h2 class="text-4xl sm:text-5xl font-bold mb-4 font-mono tracking-wider">{{ ipData.ip }}</h2>
                        <div class="flex flex-wrap items-center gap-4 text-cyan-100">
                            <span class="flex items-center">
                                <MapPinIcon class="h-5 w-5 mr-2" />
                                {{ ipData.city }}, {{ ipData.country_name }}
                            </span>
                            <span class="flex items-center">
                                <FlagIcon class="h-5 w-5 mr-2" />
                                {{ ipData.country_code }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Location Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                                <MapPinIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Location</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">City</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.city || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Region</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.region || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Country</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.country_name || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Postal</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.postal || 'N/A' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Network Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                                <SignalIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Network</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">ISP</span>
                                <span class="font-medium text-gray-900 dark:text-white text-right max-w-[150px] truncate" :title="ipData.org">{{ ipData.org || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">ASN</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.asn || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Type</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.version || 'IPv4' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Timezone Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                                <ClockIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Timezone</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Timezone</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.timezone || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">UTC Offset</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.utc_offset || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Local Time</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ localTime }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Coordinates Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
                                <GlobeAsiaAustraliaIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Coordinates</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Latitude</span>
                                <span class="font-medium text-gray-900 dark:text-white font-mono">{{ ipData.latitude || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Longitude</span>
                                <span class="font-medium text-gray-900 dark:text-white font-mono">{{ ipData.longitude || 'N/A' }}</span>
                            </div>
                            <a 
                                v-if="ipData.latitude && ipData.longitude"
                                :href="`https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`"
                                target="_blank"
                                class="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline mt-2">
                                <MapIcon class="h-4 w-4 mr-1" />
                                View on Map
                            </a>
                        </div>
                    </div>

                    <!-- Currency Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3">
                                <CurrencyDollarIcon class="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Currency</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Currency</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.currency_name || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Code</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.currency || 'N/A' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Languages Card -->
                    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                        <div class="flex items-center mb-3">
                            <div class="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg mr-3">
                                <LanguageIcon class="h-5 w-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h3 class="font-semibold text-gray-900 dark:text-white">Languages</h3>
                        </div>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Languages</span>
                                <span class="font-medium text-gray-900 dark:text-white">{{ ipData.languages || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500 dark:text-gray-400">Calling Code</span>
                                <span class="font-medium text-gray-900 dark:text-white">+{{ ipData.country_calling_code || 'N/A' }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Preview -->
                <div v-if="ipData.latitude && ipData.longitude" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 class="font-semibold text-gray-900 dark:text-white flex items-center">
                            <MapIcon class="h-5 w-5 mr-2 text-cyan-500" />
                            Location Map
                        </h3>
                    </div>
                    <div class="relative h-64 sm:h-80">
                        <iframe 
                            :src="`https://www.openstreetmap.org/export/embed.html?bbox=${ipData.longitude - 0.1},${ipData.latitude - 0.1},${ipData.longitude + 0.1},${ipData.latitude + 0.1}&layer=mapnik&marker=${ipData.latitude},${ipData.longitude}`"
                            class="w-full h-full border-0"
                            loading="lazy"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-cyan-200 dark:border-cyan-900 rounded-full"></div>
                    <div class="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Looking up IP address...</p>
            </div>

            <!-- Initial State -->
            <div v-if="!ipData && !loading && !error" class="text-center py-16">
                <GlobeAltIcon class="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">Ready to lookup</h3>
                <p class="text-gray-500 dark:text-gray-500">Click the Lookup button to see your IP information</p>
            </div>

            <!-- Footer -->
            <footer class="text-center text-xs text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p>Powered by ipapi.co • Data is approximate based on IP geolocation</p>
            </footer>
        </div>
    </div>
</template>

<script>
// IP Address Lookup - Discover your digital footprint
import {
    GlobeAltIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    ClockIcon,
    SignalIcon,
    FlagIcon,
    MapIcon,
    CurrencyDollarIcon,
    LanguageIcon,
    GlobeAsiaAustraliaIcon,
    ExclamationCircleIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline'

export default {
    name: 'IpLookup',
    components: {
        GlobeAltIcon,
        MagnifyingGlassIcon,
        MapPinIcon,
        ClockIcon,
        SignalIcon,
        FlagIcon,
        MapIcon,
        CurrencyDollarIcon,
        LanguageIcon,
        GlobeAsiaAustraliaIcon,
        ExclamationCircleIcon,
        ArrowPathIcon
    },
    data() {
        return {
            searchIp: '',
            ipData: null,
            loading: false,
            error: null,
            localTime: ''
        }
    },
    mounted() {
        this.lookupIp()
    },
    methods: {
        async lookupIp() {
            this.loading = true
            this.error = null
            this.ipData = null

            try {
                const ip = this.searchIp.trim() || ''
                const url = ip 
                    ? `https://ipapi.co/${ip}/json/`
                    : 'https://ipapi.co/json/'

                const response = await fetch(url)
                const data = await response.json()

                if (data.error) {
                    throw new Error(data.reason || 'Failed to lookup IP address')
                }

                this.ipData = data
                this.updateLocalTime()
                
                // Update local time every second
                setInterval(() => {
                    this.updateLocalTime()
                }, 1000)

            } catch (err) {
                console.error('IP Lookup error:', err)
                this.error = err.message || 'Failed to lookup IP address. Please try again.'
            } finally {
                this.loading = false
            }
        },
        updateLocalTime() {
            if (this.ipData?.timezone) {
                try {
                    const options = {
                        timeZone: this.ipData.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    }
                    this.localTime = new Date().toLocaleTimeString('en-US', options)
                } catch {
                    this.localTime = 'N/A'
                }
            }
        }
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

