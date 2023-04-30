import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer, { Page, Browser } from "puppeteer";

const feature = loadFeature("./features/login.feature");

let page: Page;
let browser: Browser;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		browser = process.env.GITHUB_ACTIONS
			? await puppeteer.launch()
			: await puppeteer.launch({ headless: false, slowMo: 50 });
		page = await browser.newPage();

		await page
			.goto("http://localhost:3000", {
				waitUntil: "networkidle0",
			})
			.catch(() => {});
	});

	test("Display login button when not logged in", ({ given, when, then }) => {
		let username: string;
		let password: string;

		given("I am not logged in", () => {
			username = "lomap5c";
			password = "Lomap_es5c";
		});

		when("I navigate to the page", async () => {
			await delay(1000);
		});

		then("I should see the login button", async () => {
			const text = await page.evaluate(() => document.body.textContent);
			expect(text).toMatch("HOME");
			expect(text).toMatch("ABOUT");
			expect(text).toMatch("LOGIN");
		});
	});

	test("Display logout button when logged in", ({ given, when, then }) => {
		let username: string;
		let password: string;

		given("I am logged in", async () => {
			username = "lomap5c";
			password = "Lomap_es5c";
		});

		when("I navigate to the page", async () => {
			await expect(page).toClick("button", { label: "Toggle navigation" });
			await delay(1000);
			await expect(page).toClick("button", { text: "LOGIN" });
			await delay(1000);
			await expect(page).toClick("div", {
				name: "https://solidcommunity.net/",
			});
			await delay(5000);
			await expect(page).toFillForm(
				'form[class="form-horizontal login-up-form"]',
				{
					username: username,
					password: password,
				}
			);
			await expect(page).toClick("button", { text: "Log In" });
			await delay(3000);
		});

		then("I should see the logout button", async () => {
			const text = await page.evaluate(() => document.body.textContent);
			expect(text).toMatch("LOGOUT");
		});
	});

	afterEach(async () => {
		browser.close();
	});

	function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
});
