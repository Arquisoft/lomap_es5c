import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer, { Page, Browser } from "puppeteer";

const feature = loadFeature("./features/add-marker.feature");

let page: Page;
let browser: Browser;

defineFeature(feature, (test) => {

    const location = {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 100,
      };

    beforeEach(async () => {
		browser = process.env.GITHUB_ACTIONS
			? await puppeteer.launch()
			: await puppeteer.launch({ headless: false, slowMo: 50 });
		page = await browser.newPage();

        await page.setGeolocation(location);
        
		await page
			.goto("http://localhost:3000", {
				waitUntil: "networkidle0",
			})
			.catch(() => {});
	});

    test("Add a marker", ({given, when, then}) => {
        let username: string;
		let password: string;

        given("A registered user", async () => {
			username = "lomap5c";
			password = "Lomap_es5c";

		});

        when("Add a marker in a concrete spot", async () => {
            //Primero se inicia sesion
            await expect(page).toClick("button", { label: "Toggle navigation" });
			await delay(1000);
			await expect(page).toClick("button", { text: "LOGIN" });
			await delay(1000);
			await expect(page).toClick("div", {
				name: "https://solidcommunity.net/",
			});
			await delay(8000);
			
            //Inicio de sesión
            await expect(page).toFillForm(
				'form[class="form-horizontal login-up-form"]',
				{
					username: username,
					password: password,
				}
			);
			await expect(page).toClick("button", { text: "Log In" });
			await delay(5000);

            //Ahora añadimos el marcador
            //Simulamos click en cualquier punto del mapa
            await page.setGeolocation(location);
            await delay(5000);
            await expect(page).toClick("div", { name: "map leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag lealfet-touch-zoom" });
            await delay(8000);
            await expect(page).toFillForm(
				'div[class="control-group"]',
				{
                    title: "Prueba 1",
					description: "Esto es una prueba jaja",
					category: "Other",
				}
			);
            await delay(5000);
            await expect(page).toClick("button", { text: "CREATE" }); 
        })

        then("The marker should appear in this markers", async() => {
            const text = await page.evaluate(() => document.body.textContent);
            expect(text).toMatch("LOGOUT");

        })
    })

    afterEach(async () => {
		browser.close();
	});

    function delay(time: number) {
		return new Promise(function (resolve) {
			setTimeout(resolve, time);
		});
	}
})


