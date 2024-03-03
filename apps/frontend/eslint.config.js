export default [
  {
    parser: '@typescript-eslint/parser',
    extends: [
      'next/core-web-vitals',
      '@finali/eslint-config'
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
]
