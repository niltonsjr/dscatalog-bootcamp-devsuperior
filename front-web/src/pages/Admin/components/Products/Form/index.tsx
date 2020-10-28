import { makeRequest } from "core/utils/request";
import React, { useState } from "react";
import BaseForm from "../../BaseForm";

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
};

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    price: "",
    category: "1",
    description: "",
  });

  const handleOnChange = ( event: FormEvent ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
        ...formData,
        imgUrl: "",
        categories: [{id: formData.category}]
    }

    makeRequest({url: '/products', method: 'POST', data: payload})
  };

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="CADASTRAR UM PRODUTO">
        <div className="row">
          <div className="col-6">
            <input
              value={formData.name}
              name="name"
              type="text"
              className="form-control my-2"
              onChange={handleOnChange}
              placeholder="Nome do produto"
            />
            <input
              value={formData.price}
              name="price"
              type="text"
              className="form-control  my-2"
              onChange={handleOnChange}
              placeholder="Preço do produto"
            />
            <select 
            className="form-control my-2"
            onChange={handleOnChange} 
            name="category">
              <option value="3">Computadores</option>
              <option value="1">Livros</option>
              <option value="2">Eletrônicos</option>
            </select>
          </div>
          <div className="col-6">
              <textarea 
              onChange={handleOnChange}
              name="description"
              value={formData.description}
              id="" 
              cols={30} 
              rows={10} />
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
