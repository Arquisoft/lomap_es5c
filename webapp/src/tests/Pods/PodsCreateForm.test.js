import PodCreateForm from "../../components/Pods/PodCreateForm";
import { render, screen, fireEvent } from "@testing-library/react";
import i18n from "i18next";
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

	test("The form to create a new point in the map in default, english", () => {
		i18n.changeLanguage("en");
		render(
			<PodCreateForm
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


	test('disables submit button if title and/or description are invalid', () => {
		const { getByRole, getByLabelText } = render(<PodCreateForm />);
		const titleInput = getByLabelText('Title');
		const descriptionInput = getByLabelText('Description');
		const submitButton = getByRole('button', { name: 'Create' });
	
		fireEvent.change(titleInput, { target: { value: '' } });
		fireEvent.change(descriptionInput, { target: { value: '' } });
		expect(submitButton).toBeDisabled();

		fireEvent.change(titleInput, { target: { value: 'someTitle' } });
		fireEvent.change(descriptionInput, { target: { value: '' } });
		expect(submitButton).toBeDisabled();

		fireEvent.change(titleInput, { target: { value: '' } });
		fireEvent.change(descriptionInput, { target: { value: 'someDescription' } });
		expect(submitButton).toBeDisabled();
	  });

	  test('enables submit button if title and description are valid', () => {
		const { getByRole, getByLabelText } = render(<PodCreateForm />);
		const titleInput = getByLabelText('Title');
		const descriptionInput = getByLabelText('Description');
		const submitButton = getByRole('button', { name: 'Create' });
	
		fireEvent.change(titleInput, { target: { value: 'someTitle' } });
		fireEvent.change(descriptionInput, { target: { value: 'someDescription' } });
	
		expect(submitButton).not.toBeDisabled();

		fireEvent.click(submitButton);
		expect(submitButton).toBeDisabled();

	  });
	  

	  test('renders close button with label', () => {
		const closeMock = jest.fn();

		render(<PodCreateForm close={closeMock} />);
		const closeButton = screen.getByLabelText("Close");
		
		expect(closeButton).toBeInTheDocument();

		fireEvent.click(closeButton); 
		expect(closeMock).toHaveBeenCalledTimes(1);
	  });

	  /*
	  test('resets input fields and closes form when point creation is successful', async () => {

		//const createPointMock = jest.fn().mockResolvedValue({ status: 200 });
		const coords = [1, 2];
		const needsUpdate = jest.fn();
		const { getByRole, getByLabelText } = render(
		  <PodCreateForm coords={coords} needsUpdate={needsUpdate}/>
		);
		const titleInput = getByLabelText('Title');
		const descriptionInput = getByLabelText('Description');
		const categoryInput = getByLabelText('Category');
		const submitButton = getByRole('button', { name: 'Create' });

		fireEvent.change(titleInput, { target: { value: 'someTitle' } });
		fireEvent.change(descriptionInput, { target: { value: 'someDescription' } });
		fireEvent.change(categoryInput, { target: { value: 'Shop' } });
		

		//const mockCreatePoint = jest.fn();
		//mockCreatePoint.mockResolvedValueOnce({ data: { id: 123 } });

		fireEvent.click(submitButton);

		await waitFor(() => expect(screen.getByText("No markers found")).toBeInTheDocument());
		//await waitFor(() => expect(needsUpdate).toHaveBeenCalledTimes(1));

		expect(titleInput.value).toBe('');
		expect(descriptionInput.value).toBe('');
		expect(needsUpdate).toHaveBeenCalled();
		expect(needsUpdate).toHaveBeenCalledTimes(1);
	  });
*/
/*
	  test('calls insertNewMarker function when form is submitted with valid data', () => {
		const coords = [1, 2];
		const { getByRole, getByLabelText } = render(<PodCreateForm coords={coords} />);
		const titleInput = getByLabelText('Title');
		const descriptionInput = getByLabelText('Description');
		const categoryInput = getByLabelText('Category');
		const submitButton = getByRole('button', { name: 'Create' });
	
		fireEvent.change(titleInput, { target: { value: 'someTitle' } });
		fireEvent.change(descriptionInput, { target: { value: 'someDescription' } });
		fireEvent.change(categoryInput, { target: { value: 'Shop' } });
		fireEvent.click(submitButton);
	

		expect(insertNewMarker).toHaveBeenCalledWith(
			coords,
			'someTitle',
			'someDescription',
			'https://example.com/lomap/locations.json',
			{ info: { webId: 'https://uo277938.inrupt.net/profile/card#me' } },
			'https://example.com',
			'Shop'
		);
	  });

*/

	  test("The form to create a new point in the map in spanish", async () => {
		i18n.changeLanguage("es");
		render(
			<PodCreateForm
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
});
