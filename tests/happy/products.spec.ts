import { test, expect } from "@playwright/test";

test.describe("Products List", () => {
  test("Load Products Successfully", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Load products" }).click();

    await expect(page.locator("#status")).toContainText("Loaded");

    const products = page.locator(".product-item");
    await expect(products).toHaveCount(4); // Because products are hard coded
  });

  test("Load Product Details Successfully", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Load products" }).click();

    const firstProduct = page.locator(".product-item").first();
    await firstProduct.click();

    const productDetails = page.locator("#product-details-content");
    await expect(productDetails).not.toHaveText("ID:");
    await expect(productDetails).toContainText("Name:");
    await expect(productDetails).toContainText("Price:");
  });
});
