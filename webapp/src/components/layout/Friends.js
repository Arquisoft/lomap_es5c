import React, { useEffect } from "react";
import { paneRegistry, usePaneRegistry } from "solid-panes";
import { login, currentSession } from "solid-auth-client";

paneRegistry.add((_, { container }) => {
	if (container) {
		container.innerHTML = "Obteniendo lista de amigos...";
	}

	currentSession().then((session) => {
		if (!session) {
			login();
			return;
		}

		session
			.fetch("https://<your_pod>/friends")
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Error al obtener la lista de amigos.");
			})
			.then((friends) => {
				const amigos = friends.map((friend) => (
					<li key={friend.webId}>
						<a href={friend.webId}>{friend.name}</a>
					</li>
				));
				if (container) {
					container.innerHTML = `<ul>${amigos}</ul>`;
				}
			})
			.catch((error) => {
				console.error(error);
				if (container) {
					container.innerHTML = "Error al obtener la lista de amigos.";
				}
			});
	});
});

function Friends() {
	const registry = usePaneRegistry();

	useEffect(() => {
		registry.render("friends", { container: "#amigos-container" });
	}, [registry]);

	return <div id="amigos-container" />;
}

export default Friends;
