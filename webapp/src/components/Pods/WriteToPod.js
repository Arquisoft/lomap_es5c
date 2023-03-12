import React, { useState } from "react";
import auth from "solid-auth-client";
import { NamedNode, Literal, DataFactory } from "n3";
import { default as rdf } from "rdflib";

const WriteToPod = () => {
	const [data, setData] = useState("");

	const handleInputChange = (event) => {
		setData(event.target.value);
	};

	const writeToPod = async () => {
		// Authenticate the user
		const session = await auth.currentSession();
		if (!session) {
			await auth.popupLogin();
		}

		// Create an RDF graph and add data to it
		const store = rdf.graph();
		const subject = new NamedNode("https://example.com/data#entry");
		const predicate = new NamedNode("https://example.com/data#content");
		const object = new Literal(data);
		const triple = DataFactory.quad(subject, predicate, object);
		store.add(triple);

		// Write the graph to the user's POD
		const webId = session.webId;
		console.log(webId);
		const resource = new NamedNode(`${webId}private/data.ttl`);
		const response = await auth.fetch(resource.value, {
			method: "PUT",
			body: rdf.serialize(undefined, store, resource.value, "text/turtle"),
			headers: { "Content-Type": "text/turtle" },
		});
		if (response.ok) {
			console.log("Data written to POD");
		} else {
			console.error("Error writing data to POD");
		}
	};

	return (
		<div>
			<input type="text" value={data} onChange={handleInputChange} />
			<button onClick={writeToPod}>Write to POD</button>
		</div>
	);
};

export default WriteToPod;
