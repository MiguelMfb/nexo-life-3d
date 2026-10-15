import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config({ignores:['dist/**','node_modules/**','playwright-report/**','test-results/**']},eslint.configs.recommended,...tseslint.configs.recommended,{files:['**/*.{ts,tsx,js,mjs}'],languageOptions:{globals:{self:'readonly',caches:'readonly',fetch:'readonly',URL:'readonly',location:'readonly',console:'readonly',setTimeout:'readonly',window:'readonly',document:'readonly'}},rules:{'@typescript-eslint/no-explicit-any':'error'}});

