<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p class="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-1">Private Area</p>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Lyhuor Garage</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-1">Locked tools for you only. Session stays active until the tab closes.</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        Unlocked
                    </span>
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to portfolio
                    </router-link>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-6">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Garage tools</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Jump into the two private utilities below.</p>
                        </div>
                        <div class="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2h-2l-2 3-2-3H6a2 2 0 01-2-2V4z" />
                            </svg>
                            Private only
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <router-link
                            to="/crypto-tracker"
                            class="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                        >
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Crypto Price Tracker</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Password-locked real-time prices and market movements.</p>
                            <div class="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                <span class="h-2 w-2 rounded-full bg-green-500"></span> Ready
                            </div>
                        </router-link>

                        <router-link
                            to="/prius-maintenance"
                            class="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5 hover:border-green-500 dark:hover:border-green-400 transition-colors"
                        >
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 13a1 1 0 011-1h1v-1.382a1 1 0 01.553-.894l3-1.5a1 1 0 011.447.894V12h1a1 1 0 011 1v1h1a1 1 0 100-2 1 1 0 100-2h1a1 1 0 000-2H4a1 1 0 000 2h1a1 1 0 100 2 1 1 0 100 2h1v-1z" />
                                        <path d="M6 15a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Prius 2011 Maintenance</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Cambodia-focused reminders for oil, coolant, EGR, and filters.</p>
                            <div class="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400">
                                <span class="h-2 w-2 rounded-full" :class="statusPill.class"></span> {{ statusPill.label }}
                            </div>
                        </router-link>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Quick health glance</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">Pulled from your saved maintenance log.</p>
                        </div>
                        <button
                            @click="reloadSummary"
                            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors"
                            aria-label="Refresh summary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0114-7.5M19 5a9 9 0 00-14 7.5" />
                            </svg>
                        </button>
                    </div>

                    <div class="mt-4 space-y-3">
                        <div v-for="item in maintenanceSnapshot" :key="item.id" class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ item.title }}</p>
                                <span :class="['px-2 py-0.5 rounded-full text-[11px] font-semibold', badgeClass(item.status)]">{{ item.status }}</span>
                            </div>
                            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ item.detail }}</p>
                        </div>

                        <div v-if="maintenanceSnapshot.length === 0" class="p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                            Add your data in <span class="font-semibold">Prius 2011 Maintenance</span> to see quick statuses here.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Private garage landing page
import { computed, onMounted, ref } from 'vue'

const maintenanceSnapshot = ref([])

const statusPill = computed(() => {
    if (!maintenanceSnapshot.value.length) {
        return { class: 'bg-gray-400', label: 'Needs data' }
    }
    const hasOverdue = maintenanceSnapshot.value.some(item => item.status === 'Overdue')
    if (hasOverdue) return { class: 'bg-red-500', label: 'Overdue item' }
    const hasSoon = maintenanceSnapshot.value.some(item => item.status === 'Due soon')
    if (hasSoon) return { class: 'bg-amber-500', label: 'Due soon' }
    return { class: 'bg-green-500', label: 'On track' }
})

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

const parseNumber = (value) => {
    const num = parseInt(value, 10)
    return Number.isFinite(num) ? num : null
}

const kmStatus = (dueKm, currentKm) => {
    if (dueKm == null || currentKm == null) return 'Unknown'
    const remaining = dueKm - currentKm
    if (remaining <= 0) return 'Overdue'
    if (remaining <= 800) return 'Due soon'
    return 'On track'
}

const timeStatus = (dueDate) => {
    if (!dueDate) return 'Unknown'
    const diffDays = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    if (diffDays <= 0) return 'Overdue'
    if (diffDays <= 30) return 'Due soon'
    return 'On track'
}

const pushSnapshot = (title, status, detail) => {
    maintenanceSnapshot.value.push({ id: title, title, status, detail })
}

const reloadSummary = () => {
    maintenanceSnapshot.value = []
    const raw = localStorage.getItem('prius_maintenance_v1')
    if (!raw) return
    let data
    try {
        data = JSON.parse(raw)
    } catch (error) {
        return
    }

    const currentKm = parseNumber(data.currentOdometer)

    // Engine oil
    const oilLastKm = parseNumber(data.engineOil?.lastOdometer)
    const oilDueKm = oilLastKm != null ? oilLastKm + 8000 : null
    const oilStatus = kmStatus(oilDueKm, currentKm)
    if (oilLastKm != null) {
        pushSnapshot('Engine Oil', oilStatus, oilDueKm != null ? `Next at ${oilDueKm.toLocaleString()} km` : 'Add odometer to see next due.')
    }

    // EGR
    const egrLastKm = parseNumber(data.egr?.lastOdometer)
    const egrDueKm = egrLastKm != null ? egrLastKm + 100000 : null
    const egrStatus = kmStatus(egrDueKm, currentKm)
    if (egrLastKm != null) {
        pushSnapshot('EGR Cleaning', egrStatus, egrDueKm != null ? `Next at ${egrDueKm.toLocaleString()} km` : 'Add odometer to see next due.')
    }

    // Coolant
    const coolantLastKm = parseNumber(data.coolant?.lastOdometer)
    const coolantDueKm = coolantLastKm != null ? coolantLastKm + 80000 : null
    const coolantDueDate = data.coolant?.lastDate ? new Date(data.coolant.lastDate) : null
    const coolantTimeState = coolantDueDate ? timeStatus(new Date(coolantDueDate).setFullYear(coolantDueDate.getFullYear() + 5)) : 'Unknown'
    const coolantState = [kmStatus(coolantDueKm, currentKm), coolantTimeState].includes('Overdue')
        ? 'Overdue'
        : [kmStatus(coolantDueKm, currentKm), coolantTimeState].includes('Due soon')
            ? 'Due soon'
            : (coolantDueKm || coolantDueDate ? 'On track' : 'Unknown')
    if (coolantLastKm != null || coolantDueDate) {
        const detailParts = []
        if (coolantDueKm != null) detailParts.push(`Next at ${coolantDueKm.toLocaleString()} km`)
        if (coolantDueDate) detailParts.push(`or by ${new Date(new Date(coolantDueDate).setFullYear(coolantDueDate.getFullYear() + 5)).toLocaleDateString()}`)
        pushSnapshot('Coolant (Engine & Inverter)', coolantState, detailParts.join(' '))
    }

    // Cabin filter
    if (data.cabinFilter?.lastDate) {
        const dueDate = new Date(data.cabinFilter.lastDate)
        dueDate.setMonth(dueDate.getMonth() + 6)
        const status = timeStatus(dueDate)
        pushSnapshot('Cabin Filter', status, `Next by ${dueDate.toLocaleDateString()}`)
    }
}

onMounted(() => {
    reloadSummary()
})
</script>

