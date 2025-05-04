import js from "@eslint/js";
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'semi': ['warn', 'never'], // Disallows semicolons
      'no-extra-semi': 'warn',   // Disallows unnecessary semicolons
      'semi-spacing': ['warn', { 'before': false, 'after': true }] // Enforces spacing around semicolons if they do exist
    }
  }
];