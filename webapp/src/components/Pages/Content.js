import React, { useState } from "react";
import { useSession } from "@inrupt/solid-ui-react/dist";
import { SessionProvider } from "@inrupt/solid-ui-react";
import NotLoggedText from "../UI/NotLoggedText";
//import ProfileViewer from "../ProfileViewer"; esto estaba antes para leer datos del pod
import WriteToPod from "../Pods/WriteToPod";

const Content = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { session } = useSession();

	//We have logged in
	session.onLogin(() => {
		setIsLoggedIn(true);
	});

	//We have logged out
	session.onLogout(() => {
		setIsLoggedIn(false);
	});

	return (
		<SessionProvider sessionId="log-in-example">
			{!isLoggedIn ? <NotLoggedText /> : <WriteToPod />}
		</SessionProvider>
	);
};

export default Content;
