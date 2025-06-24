import { defineConfig } from "cypress";
import dotenv from 'dotenv'

dotenv.config({ path: '.env.development' });

export default defineConfig({
  env: {
    ADMIN_PASSWORD: process.env.ADMIN_SECRET_PASSWORD
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
