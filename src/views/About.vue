<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto space-y-10">

            <!-- Profile HUD Card (Architectural Tech Minimalist) -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 relative overflow-hidden">
                <!-- Top Status Header -->
                <div class="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-emerald-500 animate-pulse"></span>
                        <span class="font-bold text-slate-700 dark:text-slate-200">
                            {{ isKhmer ? 'ប្រវត្តិរូបអាជីព • រួចរាល់សម្រាប់ការងារ' : 'PROFESSIONAL CV • AVAILABLE FOR WORK' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span>{{ isKhmer ? 'ទីតាំង៖ រាជធានីភ្នំពេញ' : 'LOCATION: PHNOM PENH, KH' }}</span>
                        <span class="hidden sm:inline">|</span>
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">EXP: 3+ YEARS</span>
                    </div>
                </div>

                <!-- Main Identity Row -->
                <div class="pt-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <!-- Architectural Framed Portrait (Strict 0px with offset shadow) -->
                    <div class="relative shrink-0">
                        <div class="w-40 h-40 sm:w-48 sm:h-48 border-2 border-slate-900 dark:border-white shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] dark:shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <img 
                                src="@/assets/profile.jpg" 
                                alt="Ngoytry Lyhuor portrait" 
                                class="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                                loading="eager"
                                width="192"
                                height="192"
                            />
                        </div>
                        <div class="mt-2 text-center text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                            ID: NL-DEV-2026
                        </div>
                    </div>

                    <!-- Identity & Bio -->
                    <div class="flex-1 space-y-4 text-center md:text-left">
                        <div class="inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            {{ isKhmer ? 'អ្នកអភិវឌ្ឍន៍ JAVA & FULL-STACK' : 'JUNIOR JAVA & FULL-STACK DEVELOPER' }}
                        </div>

                        <div>
                            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                NGOYTRY LYHUOR
                            </h1>
                            <p class="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ង៉យទ្រី លីហួរ • ជំនាញអភិវឌ្ឍន៍ប្រព័ន្ធ Backend, Web & APIs' : 'Backend Services, Web Applications & Distributed Systems' }}
                            </p>
                        </div>

                        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {{ isKhmer 
                                ? 'ខ្ញុំជាបុគ្គលដែលមានភាពបត់បែន ទំនួលខុសត្រូវ ស្វាហាប់ និងឧស្សាហ៍ព្យាយាម ជាមួយកំណត់ត្រាសិក្សាដ៏ល្អប្រសើរជាប់លាប់តាំងពីថ្នាក់វិទ្យាល័យ។ ខ្ញុំមានការប្តេជ្ញាចិត្តខ្ពស់ក្នុងការអភិវឌ្ឍជំនាញបច្ចេកវិទ្យា និងចូលរួមចំណែកយ៉ាងសកម្មក្នុងការកសាងប្រព័ន្ធកម្មវិធីដែលមានប្រសិទ្ធភាព និងសុវត្ថិភាពខ្ពស់។'
                                : 'I am a flexible, reliable, self-motivated, and hardworking individual with a strong academic record. Passionate about building enterprise-grade Java services, clean REST APIs, and modern Vue web architectures.'
                            }}
                        </p>

                        <!-- Contact & Social Links (Sharp Buttons) -->
                        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                            <a 
                                href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold uppercase tracking-wider border border-blue-600 inline-flex items-center gap-2 transition-all">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                <span>LinkedIn</span>
                            </a>
                            <a 
                                href="https://github.com/NgoytryLyhuor" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider border border-slate-900 dark:border-white hover:bg-slate-800 transition-all inline-flex items-center gap-2">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                                <span>GitHub</span>
                            </a>
                            <router-link 
                                to="/projects"
                                class="px-4 py-2 bg-transparent text-slate-800 dark:text-slate-200 text-xs font-mono font-bold uppercase tracking-wider border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                {{ isKhmer ? 'គម្រោងការងារ →' : 'View Projects →' }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Experience Timeline Section -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
                <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-8">
                    <div class="flex items-center gap-3">
                        <span class="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400"></span>
                        <h2 class="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            {{ isKhmer ? 'បទពិសោធន៍ការងារ' : 'Work Experience' }}
                        </h2>
                    </div>
                    <span class="text-xs font-mono text-slate-400 uppercase">TIMELINE // 2022 - PRESENT</span>
                </div>

                <div class="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                    <!-- Position 1: Mobile C&C -->
                    <div class="relative pl-8 sm:pl-10">
                        <div class="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 bg-blue-600 border-2 border-white dark:border-slate-900"></div>
                        
                        <div class="border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-950/40 hover:border-blue-500 transition-colors">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'អ្នកអភិវឌ្ឍន៍ Java កម្រិតដំបូង (Junior Java Developer)' : 'Junior Java Developer' }}
                                </h3>
                                <span class="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                                    {{ isKhmer ? 'តុលា ២០២៥ – បច្ចុប្បន្ន' : 'Oct 2025 – Present' }}
                                </span>
                            </div>
                            <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-3">
                                Mobile C&C • Phnom Penh
                            </div>
                            <ul class="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 leading-relaxed">
                                <li>
                                    {{ isKhmer 
                                        ? 'តភ្ជាប់ប្រព័ន្ធ Enterprise Logging ដោយប្រើប្រាស់ MDC, DTO payloads និង traceid linkage សម្រាប់ត្រួតពិនិត្យដំណើរការប្រព័ន្ធ' 
                                        : 'Integrate enterprise logging systems using MDC, DTO-based payloads, and traceid linkage for distributed tracing' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'សហការយ៉ាងជិតស្និទ្ធជាមួយក្រុម Frontend, QA និង DevOps ដើម្បីផ្តល់ជូននូវដំណោះស្រាយប្រកបដោយសុវត្ថិភាព និងភាពធន់' 
                                        : 'Collaborate with frontend, QA, and DevOps teams to deliver secure, highly scalable solutions' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'បង្កើនប្រសិទ្ធភាព Performance, Memory usage និង Thread safety លើគ្រប់ Microservices' 
                                        : 'Optimize performance, memory allocation, and thread safety across enterprise services' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'ចងក្រងឯកសារបច្ចេកទេស APIs, ដំណើរការ Workflows និង Audit Trails សម្រាប់ប្រើប្រាស់ផ្ទៃក្នុង និងអតិថិជន' 
                                        : 'Document REST APIs, workflow architectures, and audit trails for team and client use' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'គាំទ្រការដាក់ឱ្យដំណើរការ Production Deployment និងដោះស្រាយបញ្ហាបច្ចេកទេសឆ្លងកាត់ Environments' 
                                        : 'Support production deployments and troubleshoot mission-critical issues across environments' }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Position 2: CIJD Co.,ltd. -->
                    <div class="relative pl-8 sm:pl-10">
                        <div class="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 bg-slate-400 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
                        
                        <div class="border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-950/40 hover:border-blue-500 transition-colors">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'អ្នកអភិវឌ្ឍន៍គេហទំព័រ (Junior Web Developer)' : 'Junior Web Developer' }}
                                </h3>
                                <span class="px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                                    {{ isKhmer ? 'មករា ២០២៤ – តុលា ២០២៥' : 'Jan 2024 – Oct 2025' }}
                                </span>
                            </div>
                            <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-3">
                                CIJD Co.,ltd. • Phnom Penh
                            </div>
                            <ul class="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 leading-relaxed">
                                <li>
                                    {{ isKhmer 
                                        ? 'បង្កើត និងអភិវឌ្ឍមុខងារថ្មីៗតាមតម្រូវការអតិថិជន គ្របដណ្តប់ទាំងផ្នែក Frontend និង Backend ដើម្បីពង្រឹងសមត្ថភាពប្រព័ន្ធ' 
                                        : 'Develop and implement features based on client specifications across frontend and backend stacks' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'គ្រប់គ្រង និងថែទាំទិន្នន័យភោជនីយដ្ឋាន បង្កើតរបាយការណ៍ និងដោះស្រាយបញ្ហាប្រព័ន្ធធានាប្រតិបត្តិការប្រចាំថ្ងៃរលូន' 
                                        : 'Manage restaurant operational data, generate automated reports, and resolve system anomalies' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'អនុវត្តការធ្វើតេស្តសាកល្បងយ៉ាងម៉ត់ចត់ និងដោះស្រាយកំហុស (Debugging) ដើម្បីរក្សាស្ថិរភាព និងភាពងាយស្រួលប្រើប្រាស់' 
                                        : 'Perform thorough debugging and testing to maintain rock-solid system stability' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'ត្រួតពិនិត្យប្រតិបត្តិការម៉ាស៊ីនមេគេហទំព័រ រួមទាំងការតាមដាន Server, Updates និងការបង្កើនល្បឿន' 
                                        : 'Oversee web server operations, monitoring infrastructure health, and performance tuning' }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Position 3: ETEC Center -->
                    <div class="relative pl-8 sm:pl-10">
                        <div class="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 bg-slate-400 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
                        
                        <div class="border border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-950/40 hover:border-blue-500 transition-colors">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h3 class="text-base font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'សាស្ត្រាចារ្យបណ្តុះបណ្តាល (Instructor)' : 'IT Instructor' }}
                                </h3>
                                <span class="px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                                    {{ isKhmer ? 'មីនា ២០២២ – មីនា ២០២៣' : 'Mar 2022 – Mar 2023' }}
                                </span>
                            </div>
                            <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-3">
                                ETEC Center • Phnom Penh
                            </div>
                            <ul class="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 leading-relaxed">
                                <li>
                                    {{ isKhmer 
                                        ? 'បណ្តុះបណ្តាលកម្មវិធី Microsoft Office – ការបង្រៀនស៊ីជម្រៅលើ Word, Excel និង PowerPoint សម្រាប់ការងារការិយាល័យ' 
                                        : 'Microsoft Office Training - Comprehensive instruction in Word, advanced Excel, and PowerPoint' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'មូលដ្ឋានគ្រឹះសរសេរកូដ – បង្រៀនភាសា C, C++ និងគោលគំនិត Object-Oriented Programming (OOP)' 
                                        : 'Programming Fundamentals - Hands-on teaching in C, C++, and Object-Oriented Programming (OOP)' }}
                                </li>
                                <li>
                                    {{ isKhmer 
                                        ? 'សារៈសំខាន់នៃការអភិវឌ្ឍគេហទំព័រ – គ្របដណ្តប់មូលដ្ឋានគ្រឹះបច្ចេកវិទ្យាទាំង Frontend និង Backend' 
                                        : 'Web Development Essentials - Instruction in HTML5, CSS3, JavaScript, and backend integration' }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Technical Skills Matrix -->
            <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
                <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div class="flex items-center gap-3">
                        <span class="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400"></span>
                        <h2 class="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            {{ isKhmer ? 'ជំនាញបច្ចេកវិទ្យា & ឧបករណ៍' : 'Technical Skills & Stack' }}
                        </h2>
                    </div>
                    <span class="text-xs font-mono text-slate-400 uppercase">12 CORE TECHNOLOGIES</span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <div 
                        v-for="skill in skills" 
                        :key="skill.name" 
                        class="p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col items-center justify-center text-center group">
                        <i :class="skill.icon" class="text-3xl mb-2 group-hover:scale-110 transition-transform"></i>
                        <span class="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">{{ skill.name }}</span>
                        <span class="text-[10px] font-mono text-slate-400 mt-1 uppercase">{{ skill.category }}</span>
                    </div>
                </div>
            </section>

            <!-- Education & Languages Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Education (2 cols) -->
                <section class="md:col-span-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                        <div class="flex items-center gap-3">
                            <span class="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400"></span>
                            <h2 class="text-base font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                {{ isKhmer ? 'ការអប់រំ & សញ្ញាបត្រ' : 'Education & Credentials' }}
                            </h2>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <!-- Degree 1 -->
                        <div class="border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-950/40">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'សញ្ញាបត្របរិញ្ញាបត្រ (Bachelor\'s Degree)' : 'Bachelor\'s Degree in Information Technology' }}
                                </h3>
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                                    2021 – 2024
                                </span>
                            </div>
                            <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'វិទ្យាស្ថានជាតិពហុបច្ចេកវិទ្យាកម្ពុជា (ITI)' : 'Industrial Technical Institute (ITI)' }}
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ឯកទេស៖ បច្ចេកវិទ្យាព័ត៌មាន (Information Technology)' : 'Major: Information Technology (IT)' }}
                            </p>
                        </div>

                        <!-- Degree 2 -->
                        <div class="border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-950/40">
                            <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ (High School Diploma)' : 'High School Diploma' }}
                                </h3>
                                <span class="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                                    2017 – 2020
                                </span>
                            </div>
                            <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {{ isKhmer ? 'វិទ្យាល័យកំពង់ឈើទាល' : 'Kompong Chherteal High School' }}
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {{ isKhmer ? 'ថ្នាក់វិទ្យាសាស្ត្រ (Science Class)' : 'Science Class Curriculum' }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Languages (1 col) -->
                <section class="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                            <div class="flex items-center gap-3">
                                <span class="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400"></span>
                                <h2 class="text-base font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                    {{ isKhmer ? 'ភាសា' : 'Languages' }}
                                </h2>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <!-- Khmer -->
                            <div class="border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-950/40">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="font-bold text-xs text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'ភាសាខ្មែរ (Khmer)' : 'Khmer' }}
                                    </span>
                                    <span class="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                        {{ isKhmer ? 'ភាសាកំណើត' : 'Native' }}
                                    </span>
                                </div>
                                <div class="w-full bg-slate-200 dark:bg-slate-800 h-1 mt-2">
                                    <div class="bg-emerald-500 h-1 w-full"></div>
                                </div>
                            </div>

                            <!-- English -->
                            <div class="border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-950/40">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="font-bold text-xs text-slate-900 dark:text-white">
                                        {{ isKhmer ? 'ភាសាអង់គ្លេស (English)' : 'English' }}
                                    </span>
                                    <span class="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                                        {{ isKhmer ? 'កម្រិតការងារ' : 'Working' }}
                                    </span>
                                </div>
                                <div class="w-full bg-slate-200 dark:bg-slate-800 h-1 mt-2">
                                    <div class="bg-blue-500 h-1 w-4/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Direct Connect Box -->
                    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div class="text-[11px] font-mono text-slate-500 uppercase mb-2">
                            {{ isKhmer ? 'ទំនាក់ទំនងផ្ទាល់' : 'Quick Contact' }}
                        </div>
                        <a 
                            href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/"
                            target="_blank"
                            class="block w-full py-2.5 text-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all">
                            {{ isKhmer ? 'ផ្ញើសារតាម LinkedIn →' : 'Connect on LinkedIn →' }}
                        </a>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>

<script setup>
// Professional CV & Resume View with modern architectural sharp aesthetic
import { useLanguage } from '@/composables/useLanguage';

const { isKhmer } = useLanguage();

const skills = [
    { name: 'Java', icon: 'devicon-java-plain colored', category: 'Backend' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain colored', category: 'Backend' },
    { name: 'PHP', icon: 'devicon-php-plain colored', category: 'Backend' },
    { name: 'Laravel', icon: 'devicon-laravel-plain colored', category: 'Backend' },
    { name: 'Vue.js 3', icon: 'devicon-vuejs-plain colored', category: 'Frontend' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', category: 'Frontend' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored', category: 'Frontend' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored', category: 'Frontend' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored', category: 'Database' },
    { name: 'REST APIs', icon: 'devicon-nodejs-plain colored', category: 'Architecture' },
    { name: 'GitHub', icon: 'devicon-github-plain colored', category: 'DevOps' },
    { name: 'jQuery', icon: 'devicon-jquery-plain colored', category: 'Frontend' }
];
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
</style>