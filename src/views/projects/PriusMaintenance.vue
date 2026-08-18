<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
            <!-- Header -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8 flex flex-col gap-4">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-1">Private Garage</p>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Prius 2011 Option 3 Maintenance</h1>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Built for Cambodia's heat and dust. Track oil, coolant, EGR, and cabin filter with both km and time-based reminders. Data saves locally in this browser.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2">
                        <button
                            @click="resetAll"
                            class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 4a1 1 0 011-1h4a1 1 0 110 2H6v10h3a1 1 0 110 2H5a1 1 0 01-1-1V4zm7.293 1.293a1 1 0 011.414 0L16 8.586l-3.293 3.293a1 1 0 01-1.414-1.414L12.586 9H9a1 1 0 110-2h3.586l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                            Reset data
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span class="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-semibold">
                        Autosaves locally
                    </span>
                    <span>Odometer drives all km-based reminders.</span>
                </div>
            </div>

            <!-- Summary -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div
                    v-for="item in summaryCards"
                    :key="item.title"
                    class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
                >
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.title }}</p>
                        <span :class="['px-2 py-1 rounded-full text-[11px] font-semibold', badgeClass(item.status)]">{{ item.status }}</span>
                    </div>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ item.detail }}</p>
                    <p class="text-sm text-gray-800 dark:text-gray-200 mt-2 font-semibold" v-if="item.next">Next: {{ item.next }}</p>
                </div>
            </div>

            <!-- Current Odometer -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Current Odometer</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">All reminders use this number. Enter km only.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kilometers</label>
                        <input
                            v-model="form.currentOdometer"
                            type="number"
                            min="0"
                            inputmode="numeric"
                            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                            placeholder="e.g., 165000"
                        />
                    </div>
                    <div class="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/40 text-sm text-gray-600 dark:text-gray-400">
                        <p class="font-semibold text-gray-900 dark:text-white mb-1">Reminder logic</p>
                        <ul class="list-disc list-inside space-y-1">
                            <li>Oil: every 8,000 km</li>
                            <li>EGR: every 100,000 km</li>
                            <li>Coolant: 80,000 km or 5 years (engine & inverter)</li>
                            <li>Cabin filter: every 6 months (dusty roads)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Maintenance sections -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Engine Oil -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Engine Oil (0W-20 Full Synthetic)</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Interval: every 8,000 km</p>
                        </div>
                        <span :class="['px-2 py-1 rounded-full text-[11px] font-semibold', badgeClass(engineOilStatus.status)]">{{ engineOilStatus.status }}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of last change</label>
                            <input v-model="form.engineOil.lastDate" type="date" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Odometer at change (km)</label>
                            <input v-model="form.engineOil.lastOdometer" type="number" min="0" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="e.g., 160000" />
                        </div>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-700 dark:text-gray-300">
                        <p class="font-semibold text-gray-900 dark:text-white">Next change</p>
                        <p>{{ engineOilStatus.detail }}</p>
                    </div>
                </div>

                <!-- EGR -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">EGR + Intake Cleaning</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Interval: every 100,000 km (prevents head gasket failure)</p>
                        </div>
                        <span :class="['px-2 py-1 rounded-full text-[11px] font-semibold', badgeClass(egrStatus.status)]">{{ egrStatus.status }}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of last cleaning</label>
                            <input v-model="form.egr.lastDate" type="date" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Odometer at cleaning (km)</label>
                            <input v-model="form.egr.lastOdometer" type="number" min="0" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="e.g., 120000" />
                        </div>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-700 dark:text-gray-300">
                        <p class="font-semibold text-gray-900 dark:text-white">Next cleaning</p>
                        <p>{{ egrStatus.detail }}</p>
                    </div>
                </div>

                <!-- Coolant -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Coolant (Engine + Inverter)</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Interval: every 80,000 km or 5 years (Toyota SLLC Pink/Red)</p>
                        </div>
                        <span :class="['px-2 py-1 rounded-full text-[11px] font-semibold', badgeClass(coolantStatus.status)]">{{ coolantStatus.status }}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of last flush</label>
                            <input v-model="form.coolant.lastDate" type="date" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Odometer at flush (km)</label>
                            <input v-model="form.coolant.lastOdometer" type="number" min="0" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" placeholder="e.g., 130000" />
                        </div>
                    </div>
                    <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-700 dark:text-gray-300">
                        <p class="font-semibold text-gray-900 dark:text-white">Next flush</p>
                        <p>{{ coolantStatus.detail }}</p>
                    </div>
                </div>

                <!-- Cabin Filter -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cabin Air Filter</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Interval: every 6 months (dusty roads)</p>
                        </div>
                        <span :class="['px-2 py-1 rounded-full text-[11px] font-semibold', badgeClass(cabinFilterStatus.status)]">{{ cabinFilterStatus.status }}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of last replacement</label>
                            <input v-model="form.cabinFilter.lastDate" type="date" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" />
                        </div>
                        <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-700 dark:text-gray-300">
                            <p class="font-semibold text-gray-900 dark:text-white">Next change</p>
                            <p>{{ cabinFilterStatus.detail }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specs -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Fluids & Specs Quick Sheet</h3>
                    <span class="text-xs text-gray-500 dark:text-gray-400">Prius 2011 Option 3</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                        <p class="font-semibold text-gray-900 dark:text-white">Engine Oil</p>
                        <p>0W-20 full synthetic</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Change every 8,000 km</p>
                    </div>
                    <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                        <p class="font-semibold text-gray-900 dark:text-white">Coolant</p>
                        <p>Toyota SLLC Pink/Red (Engine & Inverter)</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Flush every 80,000 km or 5 years</p>
                    </div>
                    <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                        <p class="font-semibold text-gray-900 dark:text-white">Tire Pressure</p>
                        <p>Front 35 psi / Rear 33 psi</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Check monthly in hot season</p>
                    </div>
                    <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                        <p class="font-semibold text-gray-900 dark:text-white">Air Filters</p>
                        <p>Cabin: every 6 months; Engine: inspect with oil change</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Dust-heavy Phnom Penh use</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Prius maintenance tracker tailored for Lyhuor
import { computed, onMounted, reactive, watch } from 'vue'

const STORAGE_KEY = 'prius_maintenance_v1'

const defaultForm = () => ({
    currentOdometer: '',
    engineOil: { lastDate: '', lastOdometer: '' },
    egr: { lastDate: '', lastOdometer: '' },
    coolant: { lastDate: '', lastOdometer: '' },
    cabinFilter: { lastDate: '' }
})

const form = reactive(defaultForm())

const parseNumber = (value) => {
    const num = parseInt(value, 10)
    return Number.isFinite(num) ? num : null
}

const formatKm = (value) => (value == null ? '—' : `${value.toLocaleString()} km`)

const formatDate = (value) => {
    if (!value) return '—'
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString()
}

const addMonths = (value, months) => {
    if (!value) return null
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return null
    d.setMonth(d.getMonth() + months)
    return d
}

const addYears = (value, years) => {
    if (!value) return null
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return null
    d.setFullYear(d.getFullYear() + years)
    return d
}

const badgeClass = (status) => {
    switch (status) {
        case 'Overdue':
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
        case 'Due soon':
            return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        case 'On track':
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        default:
            return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
}

const evaluateStatus = ({ dueKm, dueDate, intervalLabel }) => {
    const now = new Date()
    const currentKm = parseNumber(form.currentOdometer)
    let severity = 'none' // none -> ok -> soon -> overdue
    const messages = []

    if (dueKm != null && currentKm != null) {
        const remainingKm = dueKm - currentKm
        if (remainingKm <= 0) severity = 'overdue'
        else if (remainingKm <= 800) severity = severity === 'overdue' ? 'overdue' : 'soon'
        else severity = severity === 'overdue' || severity === 'soon' ? severity : 'ok'
        const kmMsg = remainingKm <= 0
            ? `Past due at ${formatKm(dueKm)}`
            : `${formatKm(dueKm)} (${remainingKm.toLocaleString()} km left)`
        messages.push(kmMsg)
    }

    if (dueDate) {
        const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))
        if (diffDays <= 0) severity = 'overdue'
        else if (diffDays <= 30) severity = severity === 'overdue' ? 'overdue' : 'soon'
        else severity = severity === 'overdue' || severity === 'soon' ? severity : 'ok'
        const dateMsg = diffDays <= 0
            ? `Past due by ${formatDate(dueDate)}`
            : `By ${formatDate(dueDate)} (${diffDays} days left)`
        messages.push(dateMsg)
    }

    if (dueKm == null && !dueDate) {
        return { status: 'Add data', detail: `Log the last service to start reminders (${intervalLabel})` }
    }

    if (messages.length === 0) {
        return { status: 'Add data', detail: `Add odometer and dates to start reminders (${intervalLabel})` }
    }

    const status = severity === 'overdue' ? 'Overdue' : severity === 'soon' ? 'Due soon' : 'On track'
    return { status, detail: messages.join(' • ') }
}

const engineOilStatus = computed(() => {
    const lastKm = parseNumber(form.engineOil.lastOdometer)
    const dueKm = lastKm != null ? lastKm + 8000 : null
    const base = evaluateStatus({ dueKm, intervalLabel: 'every 8,000 km' })
    return { ...base, next: dueKm != null ? formatKm(dueKm) : null }
})

const egrStatus = computed(() => {
    const lastKm = parseNumber(form.egr.lastOdometer)
    const dueKm = lastKm != null ? lastKm + 100000 : null
    const base = evaluateStatus({ dueKm, intervalLabel: 'every 100,000 km' })
    return { ...base, next: dueKm != null ? formatKm(dueKm) : null }
})

const coolantStatus = computed(() => {
    const lastKm = parseNumber(form.coolant.lastOdometer)
    const dueKm = lastKm != null ? lastKm + 80000 : null
    const dueDate = addYears(form.coolant.lastDate, 5)
    const base = evaluateStatus({ dueKm, dueDate, intervalLabel: '80,000 km or 5 years' })
    const next = []
    if (dueKm != null) next.push(`at ${formatKm(dueKm)}`)
    if (dueDate) next.push(`by ${formatDate(dueDate)}`)
    return { ...base, next: next.join(' or ') || null }
})

const cabinFilterStatus = computed(() => {
    const dueDate = addMonths(form.cabinFilter.lastDate, 6)
    const base = evaluateStatus({ dueDate, intervalLabel: 'every 6 months' })
    return { ...base, next: dueDate ? formatDate(dueDate) : null }
})

const summaryCards = computed(() => ([
    { title: 'Engine Oil', status: engineOilStatus.value.status, detail: engineOilStatus.value.detail, next: engineOilStatus.value.next },
    { title: 'EGR System', status: egrStatus.value.status, detail: egrStatus.value.detail, next: egrStatus.value.next },
    { title: 'Coolant (Engine + Inverter)', status: coolantStatus.value.status, detail: coolantStatus.value.detail, next: coolantStatus.value.next },
    { title: 'Cabin Filter', status: cabinFilterStatus.value.status, detail: cabinFilterStatus.value.detail, next: cabinFilterStatus.value.next }
]))

const loadForm = () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
        const data = JSON.parse(raw)
        Object.assign(form, defaultForm(), data)
    } catch (error) {
        // If parsing fails, fall back to defaults
        Object.assign(form, defaultForm())
    }
}

const resetAll = () => {
    if (!window.confirm('Reset all maintenance data? This cannot be undone.')) return
    Object.assign(form, defaultForm())
    localStorage.removeItem(STORAGE_KEY)
}

watch(
    form,
    (val) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
)

onMounted(() => {
    loadForm()
})
</script>

