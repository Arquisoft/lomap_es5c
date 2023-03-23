const auth = require("solid-auth-client");
const SolidFileClient = require("solid-file-client");

// Set your Solid Pod URL and authentication provider
const POD_URL = "https://uo285176.inrupt.net/profile/card";
const AUTH_PROVIDER = "https://inrupt.net";

// Set the data to be inserted
const subject = "https://example.com/resource1";
const predicate = "http://example.com/ns#hasName";
const object = "John Doe";

async function main() {
	try {
		// Authenticate with your Solid Pod
		const session = await auth.currentSession();
		if (!session) {
			await auth.login({
				oidcIssuer: AUTH_PROVIDER,
				redirectUrl: window.location.href,
			});
		}

		// Create a new SolidFileClient instance
		const fileClient = new SolidFileClient(auth, { enableLogging: true });

		// Construct the triple as JSON-LD
		const data = {
			"@context": {
				ns: "http://example.com/ns#",
			},
			"@id": subject,
			"ns:hasName": object,
		};

		// Save the data to the Solid Pod
		await fileClient.putFileContents(
			`${POD_URL}/public/data.ttl`,
			JSON.stringify(data),
			"application/ld+json"
		);

		console.log("Data saved successfully");
	} catch (error) {
		console.error("Error saving data:", error);
	}
}

main();
