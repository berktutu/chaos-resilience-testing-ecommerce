import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/chaos",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },

  reporter: "list",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: [
    // CATALOG DOWN. ONLY THE WEB STARTS
    {
      command: "npm start",
      cwd: "app/web",
      port: 3000,
      reuseExistingServer: true,
    },
  ],
});
