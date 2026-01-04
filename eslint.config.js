import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  
  {
    files: ['**/*.{js,jsx}'],
    
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      
      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          'additionalHooks': '(useMemo|useCallback)',
          'enableDangerousAutofixThisMayCauseInfiniteLoops': false,
        }
      ],
      
      // Refresh
      'react-refresh/only-export-components': 'off',
      
      // Import
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        }
      ],
      
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^[A-Z]'
        },
      ],
      
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-undef': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-alert': 'off',
      'no-eval': 'error',
      'no-unused-expressions': 'error',
    },
  },
  
  {
    files: ['src/context/**/*.jsx', 'src/hooks/**/*.js'],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      'public/**',
      '.git/**',
      'db.json',
      '*.log',
      '.env*',
    ],
  },
];