import React from "react";
import {
  createSolidDataset,
  createThing,
  setThing,
  saveSolidDatasetAt,
  buildThing,
} from "@inrupt/solid-client";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { SCHEMA_INRUPT, RDF } from "@inrupt/vocab-common-rdf";

const WriteToPod = () => {
  const { session } = useSession(); // Hook for providing access to the session in the component
  const { webId } = session.info; // User's webId

  const podUrl = webId.replace("/profile/card#me", "") + "/public/";

  async function insertThing(coords, name, description) {
    // Create a new SolidDataset
    const dataset = createSolidDataset();

    // Create a new Thing
    //const thing = createThing({ name: "myThing" });
    const thing = buildThing(createThing({ name: "Prueba1" }))
      .addStringNoLocale(SCHEMA_INRUPT.name, name)
      .addStringNoLocale(SCHEMA_INRUPT.name, description)
      .addStringNoLocale(SCHEMA_INRUPT.name, "lat: " + coords.latitud)
      .addStringNoLocale(SCHEMA_INRUPT.name, "lon: " + coords.longitud)
      .build();

    // Add the Thing to the SolidDataset
    const newDataset = setThing(dataset, thing);

    // Save the SolidDataset to the user's Pod
    const savedDataset = await saveSolidDatasetAt(
      podUrl + "point.txt",
      newDataset,
      { fetch: session.fetch }
    );

    console.log("Datos guardados");
  }

  return <button onClick={insertThing}>Insert new thing</button>;
};

export default WriteToPod;
