<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-12">
        <div class="max-w-6xl mx-auto space-y-10">
            <!-- Header -->
            <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm uppercase tracking-wide text-green-600 dark:text-green-400 font-semibold">Prius Care (Private)</p>
                    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Toyota Prius 2011 • Option 3</h1>
                    <p class="text-gray-600 dark:text-gray-300">Personal maintenance log & reminders tuned for Cambodia’s heat and dust.</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
                        Private
                    </span>
                    <button @click="resetData" class="text-sm text-gray-500 hover:text-red-500 transition-colors" aria-label="Reset Prius care data">
                        Reset data
                    </button>
                </div>
            </header>

            <!-- Current odometer -->
            <section class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Current Odometer</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">All reminders calculate from this number.</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <input
                            v-model.number="form.currentOdometer"
                            type="number"
                            min="0"
                            class="w-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="km"
                            aria-label="Current odometer in kilometers"
                        />
                        <button
                            @click="saveNow"
                            class="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </section>

            <!-- Reminder cards -->
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ReminderCard title="Engine Oil (0W-20)" :summary="oilSummary" />
                <ReminderCard title="EGR Cleaning" :summary="egrSummary" />
                <ReminderCard title="Coolant Flush (Engine)" :summary="coolantEngineSummary" />
                <ReminderCard title="Coolant Flush (Inverter)" :summary="coolantInverterSummary" />
                <ReminderCard title="Cabin Air Filter" :summary="cabinFilterSummary" />
                <ReminderCard title="Specs Sheet" :summary="specSummary" />
            </section>

            <!-- Maintenance forms -->
            <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormCard title="Engine Oil Service" description="Change every 8,000 km. Use 0W-20 full synthetic.">
                    <TwoFieldRow
                        label1="Last service date"
                        type1="date"
                        v-model1="form.oil.lastDate"
                        label2="Odometer at service (km)"
                        type2="number"
                        min2="0"
                        v-model2.number="form.oil.lastOdo"
                    />
                </FormCard>

                <FormCard title="EGR System Cleaning" description="Critical to prevent head gasket failure. Clean every 100,000 km.">
                    <TwoFieldRow
                        label1="Last cleaning date"
                        type1="date"
                        v-model1="form.egr.lastDate"
                        label2="Odometer at cleaning (km)"
                        type2="number"
                        min2="0"
                        v-model2.number="form.egr.lastOdo"
                    />
                </FormCard>

                <FormCard title="Coolant Flush - Engine" description="Toyota SLLC pink/red. Every 80,000 km or 5 years.">
                    <TwoFieldRow
                        label1="Last flush date"
                        type1="date"
                        v-model1="form.coolantEngine.lastDate"
                        label2="Odometer at flush (km)"
                        type2="number"
                        min2="0"
                        v-model2.number="form.coolantEngine.lastOdo"
                    />
                </FormCard>

                <FormCard title="Coolant Flush - Inverter" description="Same interval as engine loop.">
                    <TwoFieldRow
                        label1="Last flush date"
                        type1="date"
                        v-model1="form.coolantInverter.lastDate"
                        label2="Odometer at flush (km)"
                        type2="number"
                        min2="0"
                        v-model2.number="form.coolantInverter.lastOdo"
                    />
                </FormCard>

                <FormCard title="Cabin Air Filter" description="Every 6 months in dusty conditions.">
                    <div class="space-y-3">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last replacement date</label>
                        <input
                            v-model="form.cabinFilter.lastDate"
                            type="date"
                            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </FormCard>

                <FormCard title="Notes" description="Anything special: parts brand, shop, noises, tire rotations, etc.">
                    <textarea
                        v-model="form.notes"
                        rows="4"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Example: Used Mobil 1 0W-20, filter Toyota 90915-YZZF2, shop: Phnom Penh Toyota, torque 27 Nm."
                    ></textarea>
                </FormCard>
            </section>

            <!-- Specs -->
            <section class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8c-1.11 0-2.08.402-2.599 1M12 8V7m0 1v8m0 0v1m0-1c1.11 0 2.08-.402 2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Fluids & Specs</h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <SpecItem label="Engine oil" value="0W-20 Full Synthetic (3.9L with filter)" />
                    <SpecItem label="Oil filter" value="Toyota 90915-YZZF2 (or equivalent)" />
                    <SpecItem label="Coolant" value="Toyota SLLC Pink/Red (Engine & Inverter)" />
                    <SpecItem label="Coolant interval" value="Every 80,000 km or 5 years" />
                    <SpecItem label="Tire pressure" value="Front 35 psi / Rear 33 psi (cold)" />
                    <SpecItem label="Spark plugs" value="Denso/NGK IFR5A11 every 160,000 km" />
                    <SpecItem label="12V battery" value="AGM type; monitor yearly in hot climate" />
                    <SpecItem label="Air filter" value="Inspect every 10,000 km; replace ~20,000 km" />
                    <SpecItem label="Brake fluid" value="DOT 3/4, replace every 3 years" />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
// Prius Maintenance Tracker - Private feature
import { computed, reactive, watch, defineComponent, defineOptions } from 'vue'

defineOptions({ name: 'PriusMaintenance' })

const STORAGE_KEY = 'prius-care-data'
const emptyForm = () => ({
    currentOdometer: 0,
    oil: { lastDate: '', lastOdo: 0 },
    egr: { lastDate: '', lastOdo: 0 },
    coolantEngine: { lastDate: '', lastOdo: 0 },
    coolantInverter: { lastDate: '', lastOdo: 0 },
    cabinFilter: { lastDate: '' },
    notes: ''
})

const form = reactive(loadFromStorage())

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            return { ...emptyForm(), ...JSON.parse(saved) }
        }
    } catch (err) {
        console.error('Failed to load Prius care data', err)
    }
    return emptyForm()
}

const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
}

const saveNow = () => {
    saveToStorage()
}

const resetData = () => {
    Object.assign(form, emptyForm())
    saveToStorage()
}

// Debounce-like immediate save
watch(form, saveToStorage, { deep: true })

const today = () => new Date()
const toDate = (value) => (value ? new Date(value) : null)
const addKm = (odo, km) => (odo || 0) + km
const addYears = (date, years) => {
    if (!date) return null
    const d = new Date(date)
    d.setFullYear(d.getFullYear() + years)
    return d
}
const addMonths = (date, months) => {
    if (!date) return null
    const d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
}

const daysUntil = (date) => {
    if (!date) return null
    const diff = date.getTime() - today().getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const statusFrom = (nextOdo, nextDate) => {
    const odo = Number(form.currentOdometer) || 0
    const dueByOdo = nextOdo && odo >= nextOdo
    const days = daysUntil(nextDate)
    const dueByDate = nextDate && days !== null && days <= 0

    if (dueByOdo || dueByDate) {
        return { tone: 'danger', text: 'Due now' }
    }
    if (days !== null && days <= 30) {
        return { tone: 'warn', text: `Due in ${days} days` }
    }
    if (nextOdo && nextOdo - odo <= 500) {
        return { tone: 'warn', text: `Due in ${nextOdo - odo} km` }
    }
    return { tone: 'ok', text: 'All good' }
}

const buildSummary = ({ title, lastDate, lastOdo, intervalKm, intervalMonths, intervalYears }) => {
    const nextOdo = intervalKm ? addKm(lastOdo, intervalKm) : null
    const baseDate = toDate(lastDate)
    let nextDate = null
    if (intervalMonths) nextDate = addMonths(baseDate, intervalMonths)
    if (intervalYears) nextDate = addYears(baseDate, intervalYears)

    const status = statusFrom(nextOdo, nextDate)
    return {
        title,
        nextOdo,
        nextDate,
        status,
        lastOdo,
        lastDate: baseDate
    }
}

const oilSummary = computed(() =>
    buildSummary({
        title: 'Engine Oil',
        lastDate: form.oil.lastDate,
        lastOdo: form.oil.lastOdo,
        intervalKm: 8000
    })
)

const egrSummary = computed(() =>
    buildSummary({
        title: 'EGR Cleaning',
        lastDate: form.egr.lastDate,
        lastOdo: form.egr.lastOdo,
        intervalKm: 100000
    })
)

const coolantEngineSummary = computed(() =>
    buildSummary({
        title: 'Coolant Flush (Engine)',
        lastDate: form.coolantEngine.lastDate,
        lastOdo: form.coolantEngine.lastOdo,
        intervalKm: 80000,
        intervalYears: 5
    })
)

const coolantInverterSummary = computed(() =>
    buildSummary({
        title: 'Coolant Flush (Inverter)',
        lastDate: form.coolantInverter.lastDate,
        lastOdo: form.coolantInverter.lastOdo,
        intervalKm: 80000,
        intervalYears: 5
    })
)

const cabinFilterSummary = computed(() => {
    const base = toDate(form.cabinFilter.lastDate)
    const nextDate = addMonths(base, 6)
    return {
        title: 'Cabin Filter',
        nextOdo: null,
        nextDate,
        status: statusFrom(null, nextDate),
        lastOdo: null,
        lastDate: base
    }
})

const specSummary = computed(() => ({
    title: 'Fluids & Specs',
    status: { tone: 'ok', text: 'Reference ready' },
    nextOdo: null,
    nextDate: null
}))

// Local components
const toneClasses = {
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
    warn: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
    ok: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200'
}

const ReminderCard = defineComponent({
    name: 'ReminderCard',
    props: {
        title: String,
        summary: Object
    },
    setup() {
        return { toneClasses }
    },
    template: `
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-col gap-2">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ summary.title || title }}</h3>
                <span v-if="summary.status" :class="['px-2.5 py-1 rounded-full text-xs font-semibold', toneClasses[summary.status.tone]]">
                    {{ summary.status.text }}
                </span>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div v-if="summary.nextOdo">Next at <strong>{{ summary.nextOdo.toLocaleString() }}</strong> km</div>
                <div v-if="summary.nextDate">Next by <strong>{{ new Date(summary.nextDate).toLocaleDateString() }}</strong></div>
                <div v-if="summary.lastOdo">Last at {{ summary.lastOdo.toLocaleString() }} km</div>
                <div v-if="summary.lastDate">Last on {{ new Date(summary.lastDate).toLocaleDateString() }}</div>
                <div v-if="!summary.nextOdo && !summary.nextDate">Reference only</div>
            </div>
        </div>
    `
})

const FormCard = defineComponent({
    name: 'FormCard',
    props: {
        title: String,
        description: String
    },
    template: `
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm space-y-3">
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
            </div>
            <slot></slot>
        </div>
    `
})

const TwoFieldRow = defineComponent({
    name: 'TwoFieldRow',
    props: {
        label1: String,
        label2: String,
        type1: { type: String, default: 'text' },
        type2: { type: String, default: 'text' },
        min2: { type: [Number, String], default: null },
        modelValue1: [String, Number],
        modelValue2: [String, Number]
    },
    emits: ['update:modelValue1', 'update:modelValue2'],
    template: `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ label1 }}</label>
                <input
                    :type="type1"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    :value="modelValue1"
                    @input="$emit('update:modelValue1', $event.target.value)"
                />
            </div>
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ label2 }}</label>
                <input
                    :type="type2"
                    :min="min2"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    :value="modelValue2"
                    @input="$emit('update:modelValue2', $event.target.value)"
                />
            </div>
        </div>
    `
})

const SpecItem = defineComponent({
    name: 'SpecItem',
    props: { label: String, value: String },
    template: `
        <div class="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
                <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">{{ label }}</p>
                <p class="text-sm text-gray-900 dark:text-gray-100">{{ value }}</p>
            </div>
        </div>
    `
})
</script>

