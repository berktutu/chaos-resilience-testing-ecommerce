import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
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
    {
      command: "npm start",
      cwd: "app/catalog",
      port: 4000,
      reuseExistingServer: true,
    },
    {
      command: "npm start",
      cwd: "app/web",
      port: 3000,
      reuseExistingServer: true,
    },
  ],
});
