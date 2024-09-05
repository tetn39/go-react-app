import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact, { rules } from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";
import { rule } from "postcss";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs["flat/recommended"],
  {rules: {
    "react-hooks/rules-of-hooks": { allow: ["warn", "error"] },
  }}
];