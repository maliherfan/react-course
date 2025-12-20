import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // ===== تنظیمات پایه =====
  js.configs.recommended,
  
  // ===== تنظیمات React =====
  {
    ...reactPlugin.configs.flat.recommended,
    files: ['**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // ===== تنظیمات اختصاصی پروژه =====
  {
    files: ['**/*.{js,jsx}'],
    
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
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
      // ===== React Rules =====
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error', // این rule مهم است!
      
      // ===== React Hooks =====
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          'additionalHooks': '(useMemo|useCallback)',
          'enableDangerousAutofixThisMayCauseInfiniteLoops': false,
        }
      ],
      
      // ===== React Refresh =====
      'react-refresh/only-export-components': 'off',
      
      // ===== Import/Export Rules =====
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
        }
      ],
      
      // ===== General Rules =====
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          // 🔴 این تنظیمات مهم هستند:
          varsIgnorePattern: '^(BrowserRouter|Navigate|Route|Routes|Link|Outlet|StrictMode|Cell|Legend|Pie|PieChart|ResponsiveContainer|Tooltip|Bar|BarChart|XAxis|YAxis)$',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      
      'no-console': ['warn', { 
        allow: ['warn', 'error', 'info'] 
      }],
      'no-debugger': 'warn',
      'no-undef': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-alert': 'off',
      'no-eval': 'error',
      'no-unused-expressions': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'warn',
    },
  },
  
  // ===== تنظیمات برای context و hooks =====
  {
    files: [
      'src/context/**/*.jsx',
      'src/hooks/**/*.js',
    ],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  
  // ===== نادیده گرفتن فایل‌ها =====
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      'coverage/**',
      'public/**',
      '.vscode/**',
      '.git/**',
      'db.json',
      '*.log',
      '.env*',
    ],
  },
];