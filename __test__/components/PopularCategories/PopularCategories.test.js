import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import PopularCategories from "../../../components/PopularCategories/PopularCategories";


    it('render in  the button "Популярные категории"', async ()=> {
        render(<PopularCategories/>);
        const headingElement = screen.getByTitle("PopularCategories");
        expect(headingElement).toBeInTheDocument();
    });





