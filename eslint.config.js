import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  // next/core-web-vitals inclui: @next/next, react, react-hooks,
  // import e todas as regras recomendadas para App Router.
  // É o mesmo preset que create-next-app gera por padrão.
  ...compat.extends('next/core-web-vitals'),

  // Ignora pastas geradas — sem isso o ESLint tenta analisar o bundle
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },

  // Overrides locais sem sobrescrever as regras do Next.js
  {
    rules: {
      // Aviso em vez de erro — não bloqueia builds por vars/args não usados
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
]
