module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
		"eslint:recommended",
    'plugin:react/recommended',
    'standard-with-typescript',
		"plugin:@typescript-eslint/recommended",
		'prettier'
  ],
  overrides: [
  ],
	parser: "@typescript-eslint/parser",
  parserOptions: {
		ecmaFeatures: {
            jsx: true
        },
    ecmaVersion: 'latest',
		project: 'tsconfig.json',
    sourceType: 'module',
		tsconfigRootDir: __dirname,
  },
  plugins: [
		'strict-null-checks',
    'react',
		'react-hooks',
		"@typescript-eslint",
		'prettier'
  ],
    rules: {
    "@typescript-eslint/strict-boolean-expressions": "warn"
  },
		settings: {
    "import/resolver": {
      typescript: {}
    }
  }
}
