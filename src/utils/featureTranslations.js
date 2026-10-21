// Centralized feature translations for Weather, Air Quality, Khmer Calendar, and Currency Converter
// Defaults to Khmer ('km') with full English ('en') support.

export const translations = {
    common: {
        language: { km: 'ភាសា', en: 'Language' },
        theme: { km: 'រចនាប័ទ្ម', en: 'Theme' },
        light: { km: 'ពន្លឺ', en: 'Light' },
        dark: { km: 'ងងឹត', en: 'Dark' },
        auto: { km: 'ស្វ័យប្រវត្តិ', en: 'Auto' },
        refresh: { km: 'ផ្ទុកទិន្នន័យឡើងវិញ', en: 'Refresh' },
        loading: { km: 'កំពុងទាញយក...', en: 'Loading...' },
        today: { km: 'ថ្ងៃនេះ', en: 'Today' },
        offline: { km: 'គ្មានអ៊ីនធឺណិត', en: 'Offline' }
    },

    weather: {
        badge: { km: 'ឧតុនិយម និងរដូវកាលកម្ពុជា', en: 'Cambodia Weather & Seasons' },
        title: { km: 'ព្យាករណ៍ធាតុអាកាសកម្ពុជា', en: 'Atmospheric Forecast' },
        searchPlaceholder: { km: 'ស្វែងរកទីក្រុង ឬខេត្ត...', en: 'Search any city or province...' },
        searchBtn: { km: 'ស្វែងរក', en: 'Search' },
        gpsBtn: { km: 'ទីតាំងខ្ញុំ', en: 'My Location' },
        locating: { km: 'កំពុងកំណត់ទីតាំង...', en: 'Locating...' },
        refreshBtn: { km: 'ផ្ទុកឡើងវិញ', en: 'Refresh' },
        keyCities: { km: 'ខេត្ត-ក្រុងសំខាន់ៗនៅកម្ពុជា', en: 'Key Cambodia Cities' },
        feelsLike: { km: 'មានអារម្មណ៍ដូច', en: 'Feels like' },
        highLow: { km: 'កម្តៅខ្ពស់បំផុត / ទាបបំផុត', en: 'High / Low Temp' },
        humidity: { km: 'សំណើមបរិយាកាស', en: 'Humidity' },
        windSpeed: { km: 'ល្បឿនខ្យល់', en: 'Wind Speed' },
        uvIndex: { km: 'កម្រិតកាំរស្មី UV', en: 'UV Index' },
        pressure: { km: 'សម្ពាធបរិយាកាស', en: 'Pressure' },
        visibility: { km: 'ចម្ងាយមើលឃើញ', en: 'Visibility' },
        rainChance: { km: 'ឱកាសភ្លៀងធ្លាក់', en: 'Precipitation' },
        sunrise: { km: 'ថ្ងៃរះ', en: 'Sunrise' },
        sunset: { km: 'ថ្ងៃលិច', en: 'Sunset' },
        hourlyTitle: { km: 'ការព្យាករណ៍ ២៤ ម៉ោងខាងមុខ', en: 'Next 24-Hour Forecast' },
        dailyTitle: { km: 'ការព្យាករណ៍ ៧ ថ្ងៃខាងមុខ', en: '7-Day Detailed Forecast' },
        seasonalAdvisor: { km: 'ការណែនាំតាមរដូវកាលកម្ពុជា', en: 'Cambodia Seasonal & Agricultural Guidance' },
        rainySeason: { km: 'រដូវវស្សា (ឧសភា - តុលា)', en: 'Rainy Season (May - Oct)' },
        drySeason: { km: 'រដូវប្រាំង (វិច្ឆិកា - មេសា)', en: 'Dry Season (Nov - Apr)' },
        seasonTips: {
            km: 'សូមប្រយ័ត្នភ្លៀងធ្លាក់ខ្លាំង ផ្គររន្ទះ និងខ្យល់កន្ត្រាក់។ ត្រូវត្រួតពិនិត្យដំបូលផ្ទះ និងប្រព័ន្ធបង្ហូរទឹក។',
            en: 'Be cautious of heavy rains, lightning, and squalls. Inspect roofs and drainage systems.'
        }
    },

    airQuality: {
        badge: { km: 'គុណភាពខ្យល់កម្ពុជា', en: 'Cambodia Air Quality Monitor' },
        title: { km: 'ការតាមដានគុណភាពខ្យល់កម្ពុជា', en: 'Air Quality Intelligence' },
        nearestStation: { km: 'ស្ថានីយជិតបំផុត', en: 'Nearest Station' },
        locating: { km: 'កំពុងស្វែងរក...', en: 'Locating...' },
        standardUS: { km: 'ស្តង់ដារ US AQI', en: 'US AQI' },
        standardCN: { km: 'ស្តង់ដារ CN AQI', en: 'CN AQI' },
        alerts: { km: 'ការជូនដំណឹង', en: 'Alerts' },
        refresh: { km: 'ផ្ទុកទិន្នន័យថ្មី', en: 'Refresh' },
        hubsTitle: { km: 'បណ្តាញស្ថានីយវាស់កម្រិតខ្យល់នៅកម្ពុជា', en: 'Cambodia Monitoring Stations' },
        mainPollutant: { km: 'សារធាតុបំពុលចម្បង', en: 'Main Pollutant' },
        healthAdviceTitle: { km: 'វិធានការការពារ និងការណែនាំសុខភាព', en: 'Health Protection & Recommendations' },
        maskAdvice: { km: 'ពាក់ម៉ាស់ការពារ PM2.5 / N95 នៅពេលចេញក្រៅ', en: 'Wear a PM2.5 / N95 mask outdoors' },
        windowAdvice: { km: 'បិទទ្វារ និងបង្អួចដើម្បីកាត់បន្ថយខ្យល់កខ្វក់ចូលផ្ទះ', en: 'Close windows to prevent outdoor pollution' },
        purifierAdvice: { km: 'បើកម៉ាស៊ីនចម្រោះខ្យល់ក្នុងផ្ទះ ឬការិយាល័យ', en: 'Run an indoor air purifier' },
        exerciseAdvice: { km: 'កាត់បន្ថយការហាត់ប្រាណ ឬការងារធ្ងន់ៗក្រៅផ្ទះ', en: 'Avoid intense outdoor exercise' },
        levelGood: { km: 'ល្អប្រសើរ (ខ្យល់បរិសុទ្ធ គ្មានហានិភ័យ)', en: 'Good (Clean Air, No Risk)' },
        levelModerate: { km: 'មធ្យម (គុណភាពខ្យល់អាចទទួលយកបាន)', en: 'Moderate (Acceptable Quality)' },
        levelSensitive: { km: 'មិនល្អសម្រាប់ក្រុមងាយរងគ្រោះ (កុមារ មនុស្សចាស់)', en: 'Unhealthy for Sensitive Groups' },
        levelUnhealthy: { km: 'មិនល្អចំពោះសុខភាព (មនុស្សទូទៅអាចប៉ះពាល់)', en: 'Unhealthy for Public' },
        levelVeryUnhealthy: { km: 'គ្រោះថ្នាក់ខ្លាំង (កម្រិតប្រកាសអាសន្ន)', en: 'Very Unhealthy (Health Alert)' },
        levelHazardous: { km: 'គ្រោះថ្នាក់ធ្ងន់ធ្ងរបំផុត (ហានិភ័យសុខភាពកម្រិតខ្ពស់)', en: 'Hazardous (Emergency Warning)' }
    },

    calendar: {
        badge: { km: 'ប្រតិទិនច័ន្ទគតិ-សុរិយគតិខ្មែរ', en: 'Official Khmer Lunar-Solar Calendar' },
        title: { km: 'ប្រតិទិនខ្មែរ', en: 'Khmer Calendar' },
        todayPrefix: { km: 'ថ្ងៃនេះ៖ ', en: 'Today: ' },
        todayStatus: { km: 'ស្ថានភាពថ្ងៃនេះ', en: 'Today\'s Status' },
        holidayNext: { km: 'ថ្ងៃឈប់សម្រាកបន្ទាប់', en: 'Next Holiday' },
        totalDays: { km: 'ថ្ងៃសរុបក្នុងខែ', en: 'Days in Month' },
        workingDays: { km: 'ថ្ងៃធ្វើការ', en: 'Working Days' },
        publicHolidays: { km: 'ថ្ងៃបុណ្យជាតិ', en: 'Public Holidays' },
        holyDays: { km: 'ថ្ងៃឧបោសថសីល', en: 'Holy Days (Seil)' },
        prevMonth: { km: 'ខែមុន', en: 'Prev Month' },
        nextMonth: { km: 'ខែបន្ទាប់', en: 'Next Month' },
        todayBtn: { km: 'ថ្ងៃនេះ', en: 'Today' },
        filterAll: { km: 'ទាំងអស់', en: 'All' },
        filterWorkday: { km: 'ថ្ងៃធ្វើការ', en: 'Workdays' },
        filterHoliday: { km: 'ថ្ងៃបុណ្យ', en: 'Holidays' },
        filterHolyday: { km: 'ថ្ងៃសីល', en: 'Holy Days' },
        selectedDetails: { km: 'ព័ត៌មានលម្អិតប្រចាំថ្ងៃ', en: 'Daily Details' },
        lunarDay: { km: 'ថ្ងៃច័ន្ទគតិ', en: 'Lunar Day' },
        lunarMonth: { km: 'ខែច័ន្ទគតិ', en: 'Lunar Month' },
        zodiacEra: { km: 'ឆ្នាំសត្វ និងស័ក', en: 'Zodiac & Sak' },
        buddhistEra: { km: 'ពុទ្ធសករាជ', en: 'Buddhist Era' }
    },

    currency: {
        badge: { km: 'អត្រាប្តូរប្រាក់ និងរូបិយប័ណ្ណ', en: 'Cambodia & Global FX' },
        title: { km: 'ស្ថានីយប្តូរប្រាក់ និងគណនាលុយអាប់ទ្វេ (USD/KHR)', en: 'Currency & Dual-Cash Terminal' },
        modeNbc: { km: 'ធនាគារជាតិ (NBC)', en: 'NBC Rate' },
        modeMarket: { km: 'អត្រាទីផ្សារ', en: 'Market Rate' },
        modeCustom: { km: 'កំណត់ផ្ទាល់ខ្លួន', en: 'Custom Rate' },
        refreshBtn: { km: 'ផ្ទុកអត្រាថ្មី', en: 'Refresh Rates' },
        quickCorridors: { km: 'គូរូបិយប័ណ្ណនិយមប្រើ៖', en: 'Quick Corridors:' },
        amount: { km: 'ចំនួនទឹកប្រាក់', en: 'Amount' },
        from: { km: 'ពីប្រាក់', en: 'From' },
        to: { km: 'ទៅប្រាក់', en: 'To' },
        convertBtn: { km: 'គណនាប្តូរប្រាក់ភ្លាមៗ', en: 'Convert Now' },
        dualCashTitle: { km: 'គណនាលុយអាប់ទ្វេប្រព័ន្ធ ដុល្លារ និងរៀល', en: 'Dual-Cash Return Calculator (USD/KHR)' },
        dualCashDesc: {
            km: 'ងាយស្រួលសម្រាប់អាជីវកម្ម និងការទិញទំនិញ៖ គណនាលុយអាប់ត្រូវសងជារៀល និងដុល្លារបានត្រឹមត្រូវ ១០០%',
            en: 'Perfect for retail: Calculates exact change to return in both KHR and USD simultaneously.'
        },
        billAmount: { km: 'តម្លៃវិក្កយបត្រសរុប (Bill)', en: 'Total Bill Amount' },
        customerPaidUsd: { km: 'អតិថិជនឲ្យជាប្រាក់ដុល្លារ ($)', en: 'Customer Paid in USD ($)' },
        customerPaidKhr: { km: 'អតិថិជនឲ្យជាប្រាក់រៀល (៛)', en: 'Customer Paid in KHR (៛)' },
        changeToReturnKhr: { km: 'លុយអាប់ត្រូវសងជារៀល (KHR)', en: 'Change to Return in KHR (៛)' },
        changeToReturnUsd: { km: 'លុយអាប់ត្រូវសងជាដុល្លារ (USD)', en: 'Change to Return in USD ($)' },
        lastUpdated: { km: 'ធ្វើបច្ចុប្បន្នភាព៖ ', en: 'Updated: ' }
    }
};

export default translations;
