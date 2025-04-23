<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm">
        <div class="max-w-4xl mx-auto">
            <!-- Profile Photo -->
            <div class="flex justify-center mb-8">
                <div class="w-40 h-40 rounded-full bg-gray-700 mt-10 overflow-hidden">
                    <!-- Replace with your actual image path -->
                    <img src="@/assets/profile.jpg" alt="Profile" class="object-cover w-full h-full" />
                </div>
            </div>

            <!-- Contact Links -->
            <div class="text-center mb-10">
                <h1 class="text-3xl font-bold mb-6">NGOYTRY LYHUOR</h1>
                <div class="text-left">
                    <span class="font-semibold">LinkedIn:</span>
                    <a href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" class="ml-2 text-blue-400 hover:text-blue-300">https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/</a>
                </div>
                <div class="text-left">
                    <span class="font-semibold">GitHub:</span>
                    <a href="https://github.com/NgoytryLyhuor" class="ml-2 text-blue-400 hover:text-blue-300">https://github.com/NgoytryLyhuor</a>
                </div>
            </div>

            <!-- Professional Summary -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Professional Summary</h2>
                <p class="mb-4">
                    A junior web developer with experience in both frontend and backend development. Skilled in HTML,
                    CSS, JavaScript, Vue.js, PHP, and Laravel.
                    Currently focusing on implementing new features based on customer requirements and maintaining
                    restaurant data systems.
                </p>
            </div>

            <!-- Current Positions -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Experience</h2>
                <div class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Junior Web Developer</h3>
                        <span class="text-blue-400">Jan 2024 – Present</span>
                    </div>
                    <h4 class="text-sm font-semibold mb-2">CIJD Co.,ltd.</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Develop and implement new features based on customer requirements, covering both frontend
                            and backend processes to enhance system functionality.</li>
                        <li>Manage and maintain restaurant data, generate reports, and resolve any system-related issues
                            to ensure smooth daily operations.</li>
                        <li>Perform thorough testing and debugging to keep the system stable, reliable, and
                            user-friendly.</li>
                        <li>Oversee website server operations, including monitoring, updates, and performance
                            optimization.</li>
                    </ul>
                </div>

                <div class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Instructor</h3>
                        <span class="text-blue-400">Mar 2022 – Mar 2023</span>
                    </div>
                    <h4 class="text-sm font-semibold mb-2">ETEC Center</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Microsoft Office Training - Comprehensive instruction in Word, Excel, and PowerPoint.</li>
                        <li>Programming Fundamentals - Introduction to C, C++, and object-oriented programming concepts.
                        </li>
                        <li>Web Development Essentials - Complete coverage of both frontend and backend technologies.
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Skills -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Skills</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div v-for="skill in skills" :key="skill" class="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        {{ skill }}
                    </div>
                </div>
            </div>

            <!-- Education -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Education</h2>
                <div class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Bachelor's Degree</h3>
                        <span class="text-blue-400">2021 – 2024</span>
                    </div>
                    <h4 class="text-sm font-semibold">Industrial Technical Institute (ITI)</h4>
                    <p>Major: Information Technology (IT)</p>
                </div>

                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Diploma</h3>
                        <span class="text-blue-400">2017 - 2020</span>
                    </div>
                    <h4 class="text-sm font-semibold">Kompong Chherteal High School</h4>
                    <p>Science Class</p>
                </div>
            </div>

            <!-- Languages -->
            <div class="mb-6">
                <h2 class="text-base font-bold mb-4 pb-2">Languages</h2>
                <div class="flex gap-4">
                    <div v-for="language in languages" :key="language" class="border border-gray-300 dark:border-gray-600 p-2 px-10 text-center">
                        {{ language }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'CVTemplate',
    data() {
        return {
            darkMode: true,
            skills: [
                'HTML', 'CSS', 'JavaScript', 'jQuery',
                'Restful API', 'Vue JS', 'Nuxt JS', 'PHP',
                'Laravel', 'MySQL', 'SQL', 'Github'
            ],
            languages: ['Khmer', 'English']
        }
    }
}
</script>

<style scoped>
/* Base font sizes */
.text-sm {
    font-size: 14px;
}

.text-base {
    font-size: 16px;
}

/* Smooth transition for dark mode */
.transition-colors {
    transition: background-color 0.3s ease, color 0.3s ease;
}
</style>