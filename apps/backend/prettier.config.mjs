import basePrettierConfig from "@finaki/prettier-config";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @type {PrettierConfig} */
export default {
  ...basePrettierConfig,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<TYPES>", "<THIRD_PARTY_MODULES>", "", "^[../]", "^[./]"],
};
