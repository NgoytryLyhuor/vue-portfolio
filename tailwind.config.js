/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#030816',
                gray: {
                    900: '#030816',
                },
            },
            backgroundColor: {
                'dark-bg': '#030816',
            },
            textColor: {
                'dark-text': '#ffffff',
            }
        },
    },
    plugins: [],
}