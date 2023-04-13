import PodCreateForm from "../../components/Pods/PodCreateForm";
import {render, screen, fireEvent} from "@testing-library/react";
import i18n from "i18next";
import React from 'react';
//import * as markers from "../../components/Pods/PodsFunctions";

//needed to load the podcreateform
jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
      session: {
        info: {
          webId: "https://uo277938.inrupt.net/profile/card#me",
        },
      },
    }),
  }));

describe("PodCreateForm", () => {
    const needsUpdate = jest.fn();
    //const insertNewMarker = jest.spyOn(markers, "insertNewMarker")

    test("The form to create a new point in the map in default, english", async () => {
        i18n.changeLanguage("en");
        render(<PodCreateForm 
            coords={{ lat: 0, lng: 0 }}
            close={() => {}}
            needsUpdate={needsUpdate}
            />
        );
        
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
        expect(screen.getByLabelText("Category")).toBeInTheDocument();
        expect(screen.getByText("Create")).toBeInTheDocument();
    });

    test("The form to create a new point in the map in spanish", async () => {
        i18n.changeLanguage("es");
        render(<PodCreateForm 
            coords={{ lat: 0, lng: 0 }}
            close={() => {}}
            needsUpdate={needsUpdate}
            />
        );
        
        expect(screen.getByLabelText("Título")).toBeInTheDocument();
        expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
        expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
        expect(screen.getByText("Crear")).toBeInTheDocument();
    });

    /*
    test("Form create a point is called with correct data", async () => {
      i18n.changeLanguage("en");
      // Mock necessary functions
      
      const needsUpdate = jest.fn();
  
      // Render the component
      render(
        <PodCreateForm
          coords={{ lat: 0, lng: 0 }}
          close={() => {}}
          needsUpdate={needsUpdate}
        />
      );

      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Test title" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Test description" },
      });
      fireEvent.change(screen.getByLabelText("Category"), {
        target: { value: "Test category" },
      });
  
      // submit the form
      fireEvent.click(screen.getByText("Create"));
  
      expect(insertNewMarker).toHaveBeenCalledWith(
        { lat: 0, lng: 0 },
        "Test title",
        "Test description",
        "https://uo277938.inrupt.net/justforfriends/locations.json",
        expect.anything(),
        "https://uo277938.inrupt.net/profile/card#me",
        "Test category"
      );

      // Check that needsUpdate is called
      expect(needsUpdate).toHaveBeenCalled();
    });*/

});