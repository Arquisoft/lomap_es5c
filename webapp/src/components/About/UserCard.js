import React from "react";
import github from "../../images/github.png";
import twitter from "../../images/twitter.png";
import linkedin from "../../images/linkedin.png";

import styles from "./About.module.css";

const UserCard = (props) => {
	return (
		<>
			<div className={styles.column}>
				<div className={styles.card}>
					<img
						src={require(`../../images/${props.user.alt}.png`)}
						alt={props.user.alt}
						className={styles.img}
					/>

					<div className={styles.container}>
						<h2 className={styles.h2}>{props.user.username}</h2>
						<p className={styles.title}>{props.user.userTitle}</p>
						<p className={styles.p}>{props.user.description}</p>
						<p className={styles.p}>{props.user.mail}</p>
						<p>
							<a href={props.user.githubLink}>
								<img
									src={github}
									alt="GitHub profile"
									className={styles.button}
								/>
							</a>
							<a href={props.user.twitterLink}>
								<img
									src={twitter}
									width="2%"
									height="2%"
									alt="Twitter profile"
									className={styles.button}
								/>
							</a>
							<a href={props.user.linkedinLink}>
								<img
									src={linkedin}
									width="2%"
									height="2%"
									alt="Linkedin profile"
									className={styles.button}
								/>
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserCard;
