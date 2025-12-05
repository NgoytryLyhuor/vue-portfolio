<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-sm">
        <div class="max-w-4xl mx-auto">

            <h1 class="text-3xl font-bold mb-6 text-center mt-10">NGOYTRY LYHUOR</h1>
            <div class="flex justify-center mb-10">
                <div class="w-40 h-40 rounded-full bg-gray-700 overflow-hidden">
                    <img 
                        src="@/assets/profile.jpg" 
                        alt="Ngoytry Lyhuor profile photo" 
                        class="object-cover w-full h-full"
                        loading="eager"
                        width="160"
                        height="160"
                    />
                </div>
            </div>

            <!-- Contact Links -->
            <div class="text-center mb-10">
                <div class="text-left">
                    <span class="font-semibold">LinkedIn:</span>
                    <a href="https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/" class="ml-2 text-blue-400 hover:text-blue-300">https://www.linkedin.com/in/ngoytry-lyhuor-506a46280/</a>
                </div>
                <!-- <div class="text-left">
                    <span class="font-semibold">GitHub:</span>
                    <a href="https://github.com/NgoytryLyhuor" class="ml-2 text-blue-400 hover:text-blue-300">https://github.com/NgoytryLyhuor</a>
                </div> -->
            </div>

            <!-- Professional Summary -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Professional Summary</h2>
                <p class="mb-4">
                    I am a flexible, reliable, self-motivated, and hardworking individual with a strong academic record, consistently achieving excellent grades since high school. I am eager to take on this opportunity to further develop my skills and contribute effectively to your team.
                </p>
            </div>

            <!-- Current Positions -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Experience</h2>
                
                <!-- New Position -->
                <div class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Junior Java Developer</h3>
                        <span class="text-blue-400">Oct 2025 – Present</span>
                    </div>
                    <h4 class="text-sm font-semibold mb-2">Mobile C&C</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Integrate with enterprise logging systems using MDC, DTO-based payloads, and traceid linkage</li>
                        <li>Collaborate with frontend, QA, and DevOps teams to deliver secure, scalable solutions</li>
                        <li>Optimize performance, memory usage, and thread safety across services</li>
                        <li>Document APIs, workflows, and audit trails for internal and client use</li>
                        <li>Support production deployments and troubleshoot issues across environments</li>
                    </ul>
                </div>

                <div class="mb-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-base font-bold">Junior Web Developer</h3>
                        <span class="text-blue-400">Jan 2024 – Oct 2025</span>
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
                    <div v-for="skill in skills" :key="skill.name" class="border border-gray-300 dark:border-gray-600 p-2 text-center flex flex-col items-center">
                        <i :class="skill.icon" class="text-2xl mb-1"></i>
                        <span>{{ skill.name }}</span>
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
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Languages</h2>
                <div class="flex gap-4">
                    <div v-for="language in languages" :key="language" class="border border-gray-300 dark:border-gray-600 p-2 px-10 text-center">
                        {{ language }}
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="mb-12">
                <h2 class="text-base font-bold mb-4 pb-2">Get In Touch</h2>
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <form @submit.prevent="handleContactSubmit" class="space-y-4">
                        <div>
                            <label for="contact-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name <span class="text-red-500">*</span>
                            </label>
                            <input 
                                id="contact-name"
                                v-model="contactForm.name"
                                type="text" 
                                required
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your name"
                                aria-label="Your name"
                            />
                        </div>
                        <div>
                            <label for="contact-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email <span class="text-red-500">*</span>
                            </label>
                            <input 
                                id="contact-email"
                                v-model="contactForm.email"
                                type="email" 
                                required
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="your.email@example.com"
                                aria-label="Your email"
                            />
                        </div>
                        <div>
                            <label for="contact-subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Subject
                            </label>
                            <input 
                                id="contact-subject"
                                v-model="contactForm.subject"
                                type="text" 
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="What's this about?"
                                aria-label="Message subject"
                            />
                        </div>
                        <div>
                            <label for="contact-message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Message <span class="text-red-500">*</span>
                            </label>
                            <textarea 
                                id="contact-message"
                                v-model="contactForm.message"
                                required
                                rows="5"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Your message..."
                                aria-label="Your message"
                            ></textarea>
                        </div>
                        <div v-if="contactFormStatus.message" 
                            :class="[
                                'p-3 rounded-lg text-sm',
                                contactFormStatus.success ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                            ]">
                            {{ contactFormStatus.message }}
                        </div>
                        <button 
                            type="submit"
                            :disabled="contactFormStatus.loading"
                            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            <span v-if="contactFormStatus.loading">Sending...</span>
                            <span v-else>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// About Page - Professional CV & Resume
export default {
    name: 'CVTemplate',
    data() {
        return {
            darkMode: true,
            contactForm: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            contactFormStatus: {
                loading: false,
                success: false,
                message: ''
            },
            skills: [
                { name: 'HTML', icon: 'devicon-html5-plain colored' },
                { name: 'CSS', icon: 'devicon-css3-plain colored' },
                { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
                { name: 'jQuery', icon: 'devicon-jquery-plain colored' },
                { name: 'Restful API', icon: 'devicon-nodejs-plain colored' },
                { name: 'Vue JS', icon: 'devicon-vuejs-plain colored' },
                { name: 'PHP', icon: 'devicon-php-plain colored' },
                { name: 'Laravel', icon: 'devicon-laravel-plain colored' },
                { name: 'Java', icon: 'devicon-java-plain colored' },
                { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
                { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
                { name: 'Github', icon: 'devicon-github-plain colored' }
            ],
            languages: ['Khmer', 'English']
        }
    },
    methods: {
        async handleContactSubmit() {
            this.contactFormStatus.loading = true
            this.contactFormStatus.message = ''
            this.contactFormStatus.success = false

            try {
                // In a real app, you would send this to your backend API
                // For now, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                // Simulate success
                this.contactFormStatus.success = true
                this.contactFormStatus.message = 'Thank you for your message! I\'ll get back to you soon.'
                
                // Reset form
                this.contactForm = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                }

                // Clear message after 5 seconds
                setTimeout(() => {
                    this.contactFormStatus.message = ''
                }, 5000)
            } catch (error) {
                this.contactFormStatus.success = false
                this.contactFormStatus.message = 'Failed to send message. Please try again or contact me via LinkedIn.'
            } finally {
                this.contactFormStatus.loading = false
            }
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

/* Import Devicons */
@import "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
</style>