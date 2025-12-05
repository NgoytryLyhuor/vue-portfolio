<template>
    <div class="min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div class="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-10">
            <!-- Header -->
            <div class="text-center mb-8 sm:mb-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    រឿងខ្មែរ
                </h1>
                <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    Khmer Stories Library - Traditional Tales for Children
                </p>
            </div>

            <!-- Story List View -->
            <div v-if="!selectedStory" class="space-y-6 sm:space-y-8">
                <!-- Category Filter -->
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <button
                        @click="selectedCategory = 'all'"
                        :class="[
                            'px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200',
                            selectedCategory === 'all'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                    >
                        All Stories
                    </button>
                    <button
                        v-for="category in categories"
                        :key="category"
                        @click="selectedCategory = category"
                        :class="[
                            'px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200',
                            selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        ]"
                    >
                        {{ category }}
                    </button>
                </div>

                <!-- Search -->
                <div class="max-w-md mx-auto">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search stories..."
                        class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <!-- Stories Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div
                        v-for="story in filteredStories"
                        :key="story.id"
                        @click="selectStory(story)"
                        class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500"
                    >
                        <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span class="text-6xl sm:text-7xl">{{ story.emoji }}</span>
                        </div>
                        <div class="p-4 sm:p-6">
                            <div class="flex items-center justify-between mb-2">
                                <span class="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                    {{ story.category }}
                                </span>
                                <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {{ story.readingTime }} min
                                </span>
                            </div>
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {{ story.title }}
                            </h3>
                            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                                {{ story.description }}
                            </p>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1 text-yellow-500">
                                    <svg v-for="i in story.rating" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <button
                                    @click.stop="toggleFavorite(story.id)"
                                    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        :class="[
                                            'h-5 w-5',
                                            favorites.includes(story.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                                        ]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredStories.length === 0" class="text-center py-12">
                    <div class="text-6xl mb-4">📚</div>
                    <p class="text-xl text-gray-600 dark:text-gray-400">No stories found matching your search.</p>
                </div>
            </div>

            <!-- Story Reading View -->
            <div v-else class="space-y-6 sm:space-y-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                    <!-- Story Header -->
                    <div class="mb-6 sm:mb-8">
                        <button
                            @click="selectedStory = null"
                            class="mb-4 sm:mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Stories
                        </button>
                        <div class="text-center">
                            <div class="text-6xl sm:text-7xl mb-4">{{ selectedStory.emoji }}</div>
                            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                                {{ selectedStory.title }}
                            </h1>
                            <div class="flex items-center justify-center gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                <span>{{ selectedStory.category }}</span>
                                <span>•</span>
                                <span>{{ selectedStory.readingTime }} min read</span>
                                <span>•</span>
                                <span>Age: {{ selectedStory.ageGroup }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Story Content -->
                    <div class="prose prose-lg dark:prose-invert max-w-none mb-6 sm:mb-8">
                        <div
                            v-for="(paragraph, index) in selectedStory.content"
                            :key="index"
                            class="mb-4 sm:mb-6 text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed"
                        >
                            <p class="mb-4">{{ paragraph }}</p>
                        </div>
                    </div>

                    <!-- Story Footer -->
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <button
                                    @click="toggleFavorite(selectedStory.id)"
                                    class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        :class="[
                                            'h-5 w-5',
                                            favorites.includes(selectedStory.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                                        ]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-sm sm:text-base">{{ favorites.includes(selectedStory.id) ? 'Saved' : 'Save' }}</span>
                                </button>
                                <button
                                    @click="markAsRead(selectedStory.id)"
                                    class="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm sm:text-base"
                                >
                                    {{ readStories.includes(selectedStory.id) ? '✓ Read' : 'Mark as Read' }}
                                </button>
                            </div>
                            <div class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                Moral: {{ selectedStory.moral }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedStory = ref(null)
const favorites = ref([])
const readStories = ref([])

const categories = ['Folktales', 'Moral Stories', 'Adventure', 'Cultural']

const stories = [
    {
        id: 1,
        title: 'Preah Ko Preah Keo',
        description: 'A famous Khmer folktale about two brothers and their adventures.',
        category: 'Folktales',
        emoji: '👑',
        readingTime: 10,
        ageGroup: '6+',
        rating: 5,
        moral: 'Brotherhood and loyalty are important values.',
        content: [
            'Once upon a time, there were two brothers named Preah Ko and Preah Keo. They were very close and loved each other dearly.',
            'Preah Ko was the older brother, wise and responsible. Preah Keo was the younger brother, brave and adventurous.',
            'One day, Preah Keo decided to explore the deep forest. Preah Ko warned him about the dangers, but Preah Keo was determined.',
            'In the forest, Preah Keo encountered many challenges. He met wild animals, crossed dangerous rivers, and climbed tall mountains.',
            'When Preah Ko realized his brother was in trouble, he immediately went to help him. Together, they overcame all obstacles.',
            'The two brothers learned that working together and supporting each other made them stronger than they could ever be alone.',
            'From that day forward, they always helped each other and became known throughout the kingdom for their strong bond.'
        ]
    },
    {
        id: 2,
        title: 'The Wise Rabbit',
        description: 'A clever rabbit outsmarts a hungry tiger using wisdom.',
        category: 'Moral Stories',
        emoji: '🐰',
        readingTime: 5,
        ageGroup: '4+',
        rating: 4,
        moral: 'Wisdom is more powerful than strength.',
        content: [
            'In a beautiful forest in Cambodia, there lived a clever rabbit named Chhna.',
            'One day, a hungry tiger came to the forest looking for food. All the animals were scared and hid.',
            'The tiger found Chhna and said, "I will eat you, little rabbit!"',
            'But Chhna was not afraid. He said, "Wait, great tiger! Before you eat me, let me show you something amazing."',
            'Chhna led the tiger to a well and said, "Look, there is another tiger in the water who wants to fight you!"',
            'The tiger looked into the well and saw his own reflection. He thought it was another tiger and jumped in to fight.',
            'The tiger fell into the well and could not get out. Chhna had saved himself and all the other animals using his wisdom.',
            'From that day, all the animals learned that being clever and thinking before acting is very important.'
        ]
    },
    {
        id: 3,
        title: 'The Magic Rice Pot',
        description: 'A poor family discovers a magical rice pot that teaches them about sharing.',
        category: 'Moral Stories',
        emoji: '🍚',
        readingTime: 7,
        ageGroup: '5+',
        rating: 5,
        moral: 'Sharing with others brings happiness and blessings.',
        content: [
            'Long ago, there was a poor family living in a small village in Cambodia.',
            'The family had very little food, but they always shared what they had with their neighbors.',
            'One day, an old woman came to their house asking for food. Even though they had little, they gave her their last bowl of rice.',
            'The old woman was actually a fairy in disguise. She was touched by their kindness.',
            'She gave them a magic rice pot that would always be full of rice, but only if they continued to share with others.',
            'The family was overjoyed and immediately shared the rice with all their neighbors.',
            'As they shared, the pot never emptied. The more they gave, the more rice appeared.',
            'The family learned that true happiness comes from sharing and helping others, not from keeping everything for themselves.'
        ]
    },
    {
        id: 4,
        title: 'The Water Festival',
        description: 'A story about the origins of the Khmer Water Festival (Bon Om Touk).',
        category: 'Cultural',
        emoji: '🚣',
        readingTime: 8,
        ageGroup: '7+',
        rating: 5,
        moral: 'Celebrating traditions brings communities together.',
        content: [
            'Every year in November, Cambodia celebrates the Water Festival, one of the most important festivals in Khmer culture.',
            'The festival celebrates the reversal of the flow of the Tonle Sap River, which is a natural wonder.',
            'Long ago, the Khmer people depended on the river for fishing and farming. When the river changed direction, it brought fish and fertile soil.',
            'The people were so grateful that they started celebrating with boat races on the river.',
            'Families would gather along the riverbanks to watch the races and celebrate together.',
            'The festival became a time for families to reunite, share food, and enjoy traditional music and dance.',
            'Today, the Water Festival is still celebrated with great joy, bringing together people from all over Cambodia.',
            'It reminds us of the importance of nature, community, and our rich Khmer traditions.'
        ]
    },
    {
        id: 5,
        title: 'The Lost Elephant',
        description: 'A young elephant gets lost and learns the importance of family.',
        category: 'Adventure',
        emoji: '🐘',
        readingTime: 6,
        ageGroup: '5+',
        rating: 4,
        moral: 'Family is the most important thing in life.',
        content: [
            'In the forests of Cambodia, there lived a young elephant named Champa.',
            'Champa was curious and loved to explore, but sometimes he wandered too far from his family.',
            'One day, while exploring, Champa got lost. He could not find his way back to his herd.',
            'Champa was scared and lonely. He called out for his mother, but she was too far away to hear.',
            'As night fell, Champa met other animals who helped him. A wise monkey showed him how to find his way.',
            'The monkey taught Champa to remember landmarks and follow the sounds of his family.',
            'After a long journey, Champa finally found his family. His mother was so happy to see him!',
            'Champa learned that while exploring is fun, staying close to family and listening to their advice is very important.'
        ]
    },
    {
        id: 6,
        title: 'The Golden Fish',
        description: 'A fisherman catches a magical fish that grants wishes.',
        category: 'Folktales',
        emoji: '🐟',
        readingTime: 9,
        ageGroup: '6+',
        rating: 5,
        moral: 'Greed leads to unhappiness; contentment brings peace.',
        content: [
            'There once was a kind fisherman who lived by the Mekong River in Cambodia.',
            'One day, he caught a beautiful golden fish. The fish spoke to him and said, "Please let me go, and I will grant you three wishes."',
            'The fisherman was surprised but kind-hearted. He released the fish and said, "I only wish for enough food for my family."',
            'The fish granted his wish, and the fisherman\'s family had enough food every day.',
            'But the fisherman\'s wife was greedy. She made him ask for more and more.',
            'First, she wanted a bigger house. Then, she wanted to be rich. Finally, she wanted to be queen.',
            'The golden fish granted each wish, but the fisherman and his wife became unhappy. They had everything but lost their peace.',
            'Finally, the fisherman realized his mistake. He asked the fish to take everything back and return them to their simple life.',
            'The fish agreed, and the fisherman learned that happiness comes from being content with what you have, not from wanting more.'
        ]
    }
]

const filteredStories = computed(() => {
    let filtered = stories

    // Filter by category
    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(story => story.category === selectedCategory.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(story =>
            story.title.toLowerCase().includes(query) ||
            story.description.toLowerCase().includes(query) ||
            story.category.toLowerCase().includes(query)
        )
    }

    return filtered
})

const selectStory = (story) => {
    selectedStory.value = story
    // Mark as read if not already
    if (!readStories.value.includes(story.id)) {
        markAsRead(story.id)
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleFavorite = (storyId) => {
    const index = favorites.value.indexOf(storyId)
    if (index > -1) {
        favorites.value.splice(index, 1)
    } else {
        favorites.value.push(storyId)
    }
    // Save to localStorage
    localStorage.setItem('khmerStoriesFavorites', JSON.stringify(favorites.value))
}

const markAsRead = (storyId) => {
    if (!readStories.value.includes(storyId)) {
        readStories.value.push(storyId)
        localStorage.setItem('khmerStoriesRead', JSON.stringify(readStories.value))
    }
}

onMounted(() => {
    // Load favorites and read stories from localStorage
    const savedFavorites = localStorage.getItem('khmerStoriesFavorites')
    if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites)
    }

    const savedRead = localStorage.getItem('khmerStoriesRead')
    if (savedRead) {
        readStories.value = JSON.parse(savedRead)
    }
})
</script>

<style scoped>
/* Khmer font support */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&display=swap');

* {
    font-family: 'Noto Sans Khmer', 'Kantumruy Pro', sans-serif;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.prose p {
    margin-bottom: 1rem;
    line-height: 1.8;
}
</style>

