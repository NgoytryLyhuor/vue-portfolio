<!-- views/About.vue -->
<template>
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">About Me</h1>

        <div class="bg-white rounded-lg shadow-md p-8 mb-12">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img src="https://via.placeholder.com/300" alt="Profile" class="w-48 h-48 rounded-full object-cover">

                <div>
                    <h2 class="text-2xl font-bold mb-4">Your Name</h2>
                    <p class="text-gray-700 mb-4">
                        I'm a passionate frontend developer with expertise in creating responsive and user-friendly web
                        applications.
                        With a strong foundation in JavaScript and modern frameworks like Vue.js, I love bringing
                        designs to life with clean code.
                    </p>
                    <p class="text-gray-700 mb-4">
                        I'm constantly learning and exploring new technologies to stay up-to-date with the latest trends
                        in web development.
                    </p>
                    <div class="flex space-x-4 mt-6">
                        <a href="#" class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded">Download
                            Resume</a>
                        <a href="mailto:your.email@example.com"
                            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Contact Me</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                        </path>
                    </svg>
                    Experience
                </h3>
                <div class="mb-4 pb-4 border-b border-gray-200">
                    <h4 class="font-semibold">Frontend Developer at Company Name</h4>
                    <p class="text-gray-600 text-sm">January 2022 - Present</p>
                    <p class="mt-2 text-gray-700">Developing responsive web applications using Vue.js and modern CSS
                        frameworks.</p>
                </div>
                <div>
                    <h4 class="font-semibold">Web Developer Intern at Another Company</h4>
                    <p class="text-gray-600 text-sm">June 2021 - December 2021</p>
                    <p class="mt-2 text-gray-700">Assisted in building and maintaining client websites using HTML, CSS,
                        and JavaScript.</p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                        </path>
                    </svg>
                    Education
                </h3>
                <div class="mb-4 pb-4 border-b border-gray-200">
                    <h4 class="font-semibold">Bachelor's in Computer Science</h4>
                    <p class="text-gray-600 text-sm">University Name, 2018 - 2022</p>
                    <p class="mt-2 text-gray-700">Focused on web development and software engineering fundamentals.</p>
                </div>
                <div>
                    <h4 class="font-semibold">Relevant Certifications</h4>
                    <ul class="mt-2 text-gray-700 list-disc list-inside">
                        <li>Advanced JavaScript - Platform Name</li>
                        <li>Vue.js Masterclass - Platform Name</li>
                        <li>Responsive Web Design - Platform Name</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z">
                    </path>
                </svg>
                Skills
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold mb-2">Frontend</h4>
                    <div class="space-y-2">
                        <div v-for="(skill, index) in frontendSkills" :key="'f' + index">
                            <div class="flex justify-between mb-1">
                                <span>{{ skill.name }}</span>
                                <span>{{ skill.level }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" :style="{ width: skill.level + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-semibold mb-2">Other Skills</h4>
                    <div class="space-y-2">
                        <div v-for="(skill, index) in otherSkills" :key="'o' + index">
                            <div class="flex justify-between mb-1">
                                <span>{{ skill.name }}</span>
                                <span>{{ skill.level }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" :style="{ width: skill.level + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
    data() {
        return {
            frontendSkills: [
                { name: 'HTML & CSS', level: 95 },
                { name: 'JavaScript', level: 90 },
                { name: 'Vue.js', level: 85 },
                { name: 'Tailwind CSS', level: 80 }
            ],
            otherSkills: [
                { name: 'Git & GitHub', level: 85 },
                { name: 'Responsive Design', level: 90 },
                { name: 'API Integration', level: 80 },
                { name: 'UI/UX Principles', level: 75 }
            ]
        }
    }
}
</script>