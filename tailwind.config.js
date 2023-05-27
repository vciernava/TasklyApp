import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                darkSlate: {
                    50: "#404447",
                    100: "#3f4246",
                    200: "#32363c",
                    400: "#2b2f33",
                    500: "#212529",
                },
            },
            transitionProperty: {
                "border-rd": 'border-radius'
            },
        },
    },

    plugins: [forms],
};
