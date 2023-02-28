import {
  useSession,
  CombinedDataProvider,
  Image,
  LogoutButton,
  Text,
} from "@inrupt/solid-ui-react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

import styles from "./ProfileViewer.module.css";

// This component show the information of the logged in user in inrupt provider
const ProfileViewer = () => {
  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  return (
    <div className={styles.mainContainer}>
      <Container fixed>
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Card style={{ maxWidth: 480 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Text property={FOAF.name.iri.value} />
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Text property={VCARD.role.iri.value} />
              </Typography>
            </CardContent>

            <CardActionArea
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Image property={VCARD.hasPhoto.iri.value} width={480} />
            </CardActionArea>
          </Card>
        </CombinedDataProvider>
        <LogoutButton>
          <Button style={{ marginTop: 20 }} variant="contained" color="primary">
            Logout
          </Button>
        </LogoutButton>
      </Container>
    </div>
  );
};

export default ProfileViewer;
