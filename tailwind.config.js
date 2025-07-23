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
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Primary colors
                'normaldark': '#111827',
                'lightnormal': '#F9FAFB',
                'primary': '#000000',
                'primary-hover': '#374151',
                'primary-focus': '#1f2937',
                
                // Secondary colors
                'secondary': '#ffffff',
                'secondary-border': '#d1d5db',
                'secondary-hover': '#f9fafb',
                
                // Neutral colors
                'neutral': {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    500: '#6b7280',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827'
                },
                
                // Status colors
                'success': {
                    100: '#dcfce7',
                    800: '#166534'
                },
                'warning': {
                    100: '#fef3c7',
                    800: '#92400e'
                },
                'danger': {
                    100: '#fee2e2',
                    800: '#991b1b'
                },
                'info': {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    800: '#1e40af'
                },
                
                // Brand colors
                'brand': {
                    500: '#8b5cf6'
                },

                // Custom colors
                'primaryText': '#f3f4f6',      // for text-gray-100
                'darkBg': '#191919',           // for bg-[#191919]
                'secondaryText': '#9ca3af',    // for text-gray-400
                'tertiaryText': '#374151',     // for text-gray-700
                'lightBg': '#ffffff',          // for bg-white
                'darkbg': '#252729',
                'lightbg':'#f0f1f7'
            }
        },
    },

    plugins: [forms],
};
