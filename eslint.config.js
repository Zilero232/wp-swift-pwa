import antfu from '@antfu/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';

export default antfu(
	{
		// Settings for base  configuration.
		gitignore: true,
		typescript: {
			tsconfigPath: 'tsconfig.json',
		},
		formatters: {
			markdown: false,
		},
		stylistic: {
			indent: 'tab',
			semi: true,
			jsx: false,
			arrowParens: 'avoid',
		},

		// Ignored files and folders.
		ignores: ['node_modules', '**/build/**', '**/dist/**', '**/coverage/**', '**/*.md'],
	},
	{
		name: 'zilero/react',
		plugins: {
			'zilero-react': pluginReact,
		},
		rules: {
			...Object.entries(pluginReact.configs.recommended.rules).reduce((acc, [key, value]) => {
				acc[key.replace('react', 'zilero-react')] = value;

				return acc;
			}, {}),
			'zilero-react/function-component-definition': [
				'error',
				{
					namedComponents: ['arrow-function'],
					unnamedComponents: 'arrow-function',
				},
			],
			'zilero-react/prop-types': 'off',
			'zilero-react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		name: '@zilero/rewrite',
		rules: {
			'antfu/top-level-function': 'off',
			'antfu/if-newline': 'off',
			'antfu/curly': 'off',
			'antfu/brace-style': 'off',

			'no-console': 'warn',

			'test/prefer-lowercase-title': 'off',

			'style/brace-style': 'off',
			'style/arrow-parens': 'off',
			'style/quote-props': 'off',

			'ts/strict-boolean-expressions': 'off',
			'ts/switch-exhaustiveness-check': 'off',
		},
	},
	{
		// Overriding for imports.
		name: '@zilero/imports',
		rules: {
			'sort-imports': 'off',
			'import/order': 'off',
			'import/extensions': 'off',
			'perfectionist/sort-imports': 'off',
		},
	},
	{
		// Connecting Prettier for formatting.
		name: '@zilero/prettier',
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			...eslintConfigPrettier.rules,
			...eslintPluginPrettierRecommended.rules,
			'prettier/prettier': [
				'error',
				{
					printWidth: 120,
					singleQuote: true,
					trailingComma: 'all',
					semi: true,
					tabWidth: 2,
					useTabs: true,
					endOfLine: 'lf',
					arrowParens: 'avoid',
				},
			],
		},
	},
	{
		name: 'zilero/sort',
		rules: {
			'perfectionist/sort-array-includes': [
				'error',
				{
					order: 'asc', // По возрастанию
					type: 'alphabetical', // Алфавитный порядок
				},
			],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'type', // Импорты типов
						['builtin', 'external'], // Встроенные и внешние модули
						'internal-type', // Внутренние типы
						['internal'], // Внутренние импорты
						['parent-type', 'sibling-type', 'index-type'], // Типы из родительских/соседних/индексных файлов
						['parent', 'sibling', 'index'], // Импорты из родительских/соседних/индексных файлов
						'object', // Объектные импорты
						'style', // Стили
						'side-effect-style', // Стили с побочными эффектами
						'unknown', // Неизвестные импорты
					],
					internalPattern: ['^~/.*', '^@/.*'], // Шаблоны для внутренних импортов
					newlinesBetween: 'always', // Всегда добавлять пустую строку между группами
					order: 'asc', // По возрастанию
					type: 'natural',
				},
			],
			'perfectionist/sort-interfaces': [
				'error',
				{
					groups: ['unknown', 'method', 'multiline'], // Группировка свойств интерфейса
					order: 'asc', // По возрастанию
					type: 'alphabetical', // Алфавитный порядок
				},
			],
			'perfectionist/sort-jsx-props': [
				'error',
				{
					customGroups: {
						callback: 'on*', // Пропсы начинающиеся с 'on'
						reserved: ['key', 'ref'], // Зарезервированные пропсы
					},
					groups: [
						'shorthand', // Сокращенные пропсы
						'reserved', // Зарезервированные
						'multiline', // Многострочные
						'unknown', // Неизвестные
						'callback', // Колбэки
					],
					order: 'asc', // По возрастанию
					type: 'alphabetical', // Алфавитный порядок
				},
			],
			'perfectionist/sort-union-types': [
				'error',
				{
					groups: [
						'conditional', // Условные типы
						'function', // Функциональные типы
						'import', // Импортированные типы
						'intersection', // Пересечения типов
						'keyword', // Ключевые слова
						'literal', // Литералы
						'named', // Именованные типы
						'object', // Объектные типы
						'operator', // Операторы
						'tuple', // Кортежи
						'union', // Объединения
						'nullish', // Null/undefined
					],
					order: 'asc', // По возрастанию
					specialCharacters: 'keep', // Сохранять специальные символы
					type: 'alphabetical',
				},
			],
		},
	},
);
