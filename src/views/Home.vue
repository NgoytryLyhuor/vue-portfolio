<template>
    <div class="dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-4xl mx-auto">
            <!-- Blog Header -->
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>

            <!-- Blog Posts Table -->
            <div
                class="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="(post, index) in blogPosts" :key="index"
                            class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 w-24">
                                {{ post.year }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                                <a :href="post.link"
                                    class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                    {{ post.title }}
                                </a>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                                {{ post.date }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data() {
        return {
            blogPosts: [
                {
                    year: '2025',
                    title: 'Preliminary Knowledge Statistics Part II - Interactive Notebook',
                    date: '20-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'Preliminary Knowledge Statistics - Interactive Notebook',
                    date: '19-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'Linear Regression Uncertainty Simulation',
                    date: '17-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'A New Year Wish from the Federation of Cambodian Startups',
                    date: '13-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'Our manuscript has been accepted in the CITA 2025',
                    date: '13-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'A New Year Wish from Federation of Cambodian Students Abroad',
                    date: '12-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'Interested in building a Khmer spell-checking software?',
                    date: '10-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'ICDAR 2025 Workshop on Document Analysis of Low-resource Languages',
                    date: '09-Apr',
                    link: '#'
                },
                {
                    year: '',
                    title: 'More Posts Are Coming',
                    date: '01-Jan',
                    link: '#'
                }
            ]
        }
    }
}
</script>

<style>
/* Simple hover effect */
tr {
    transition: background-color 0.2s ease;
}
</style>