import OptionsMenu from "../../components/layout/OptionsMenu";
import {render} from "../../setupTests";
import {screen} from '@testing-library/react';

//Por defecto es en inglés

describe("OptionsMenu", () => {
    test("The Options Menu is rendered and it is in english by default", async() => {
        const {getByText} = render(<OptionsMenu/>)
        const buttons = screen.getAllByRole('button');

        expect(buttons.length).toBe(4);
    })
})
