export default [
  {
    parser: '@typescript-eslint/parser',
    extends: [
      'next/core-web-vitals',
      '@finaki/eslint-config/base',
      "@finaki/eslint-config/nextjs",
      "@finaki/eslint-config/react",
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
]
