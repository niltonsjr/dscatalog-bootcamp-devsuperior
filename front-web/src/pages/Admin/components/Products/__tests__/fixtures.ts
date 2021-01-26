import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const categoriesResponse = {
    "content": [
        { "id": 3, "name": "Computadores" },
        { "id": 2, "name": "Eletrônicos" },
        { "id": 1, "name": "Livros" }
    ]
};

export const productResponse = {
    "id": 3,
    "name": "Macbook Pro",
    "description": ":)",
    "price": 1250,
    "imgUrl": "image.jpg",
    "date": "2020-07-14T10:00:00Z",
    "categories": [
        { "id": 1, "name": "Computadores" },
        { "id": 2, "name": "Eletrônicos" }
    ]
};

export const fillFormData = () => {
    const nameImput = screen.getByTestId("name");
    const priceImput = screen.getByTestId("price");
    const descriptionImput = screen.getByTestId("description");
    const imgUrlImput = screen.getByTestId("imgUrl");

    userEvent.type(nameImput, "Computador");
    userEvent.type(priceImput, "5000");
    userEvent.type(descriptionImput, "Ótimo computador");
    userEvent.type(imgUrlImput, "image.jpg");
};


