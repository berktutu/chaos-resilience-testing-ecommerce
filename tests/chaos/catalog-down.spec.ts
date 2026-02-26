// Test when catalog is down

import { test, expect } from "@playwright/test";

test.describe("Chaos: Catalog Down", () => {
  test("should show graceful error when catalog is unavailable", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Load products" }).click();

    await expect(page.locator("#status")).toContainText("Failed");

    await expect(page.locator("#catalog-status-value")).toHaveText("down");
  });
});
