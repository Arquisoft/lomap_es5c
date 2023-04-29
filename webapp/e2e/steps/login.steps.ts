import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer, { Page, Browser } from "puppeteer";
import LogInButton from "../../src/components/LogInButton";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

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

	test("The user is not logged in the site", ({ given, when, then }) => {
		let username: string;
		let password: string;

		given("A not logged user", () => {
			username = "lomap5c";
			password = "Lomap_es5c";
		});

		when("Enters the app", async () => {
			await delay(1000);
		});

		then("The login button is shown on the page", async () => {
			const text = await page.evaluate(() => document.body.textContent);
			expect(text).toMatch("HOME");
			expect(text).toMatch("ABOUT");
			expect(text).toMatch("LOGIN");
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
