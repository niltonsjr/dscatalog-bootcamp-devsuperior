import { makePrivateRequest, makeRequest } from "core/utils/request";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import BaseForm from "../../BaseForm";
import { Category } from "core/types/Product";
import "./styles.scss";
import Imageupload from "../ImageUpload";

type FormState = {
  name: string;
  price: string;
  description: string;
  imgUrl: string;
  categories: Category[];
};

type ParamsType = {
  productId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const [isLoadingCategories, setIsloadingCategories] = useState(false);  
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");

  const isEditing = productId !== "create";
  const formTitle = isEditing ? "Editar produto" : "Cadastrar um produto";

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/products/${productId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("price", response.data.price);
        setValue("description", response.data.description);
        setValue('categories', response.data.categories)

        setProductImgUrl(response.data.imgUrl);
      });
    }
  }, [productId, isEditing, setValue]);

  useEffect(() => {
    setIsloadingCategories(true);
    makeRequest( {url: '/categories' })
    .then(response => setCategories(response.data.content))
    .finally(() => setIsloadingCategories(false));
  }, []);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
      imgUrl: uploadedImgUrl || productImgUrl,
    }

    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : "/products",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.success("Produto salvo com sucesso!");
        history.push("/admin/products");
      })
      .catch(() => {
        toast.error("Erro ao salvar produto!");
      });
  };

  const onUploadSuccess = (imgUrl: string) => {
    setUploadedImgUrl(imgUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                ref={register({
                  required: "Campo obrigatório",
                  minLength: {
                    value: 5,
                    message: "O campo deve ter no mínimo 5 caracteres.",
                  },
                  maxLength: {
                    value: 60,
                    message: "O campo deve ter no máximo 60 caracteres.",
                  },
                })}
                name="name"
                type="text"
                className="form-control  input-base"
                placeholder="Nome do produto"
                data-testid="name"
              />
              {errors.name && (
                <div className="invalid-feedback d-block ml-2">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
            <label htmlFor="categories" className="d-none">Categorias</label>
              <Controller
                as={Select}
                name="categories"
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                classNamePrefix="categories-select"
                placeholder="Categorias"
                inputId="categories"
                defaultValue=""
                isMulti
              />
              {errors.categories && (
                <div className="invalid-feedback d-block ml-2">
                  Campo obrigatório
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="price"
                type="number"
                className="form-control input-base"
                placeholder="Preço do produto"
                data-testid="price"
              />
              {errors.price && (
                <div className="invalid-feedback d-block ml-2">
                  {errors.price.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
             <Imageupload 
              onUploadSuccess={onUploadSuccess}
              productImgUrl={productImgUrl}
            />
            </div>
          </div>
          <div className="col-6">
            <textarea
              ref={register({ required: "Campo obrigatório" })}
              name="description"
              className="form-control input-base"
              placeholder="Descriçao"
              cols={30}
              rows={10}
              data-testid="description"
            />
            {errors.description && (
              <div className="invalid-feedback d-block ml-2">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;