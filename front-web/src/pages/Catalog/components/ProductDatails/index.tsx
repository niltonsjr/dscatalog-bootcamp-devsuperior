import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "core/assets/images/arrow.svg";
import ProductPrice from "core/components/ProductPrice";
import { Product } from "core/types/Product";
import { makeRequest } from "core/utils/request";
import ProductDescriptionLoader from "../Loaders/ProductDescriptionLoader ";
import ProductInfoLoader from "../Loaders/ProductInfoLoader";
import "./styles.scss";
import { Editor } from "react-draft-wysiwyg";
import { stateFromHTML } from "draft-js-import-html";
import { EditorState } from "draft-js";

type ParamsType = {
  productId: string;
};

const ProductDatails = () => {
  const { productId } = useParams<ParamsType>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const contantState = stateFromHTML(product?.description || "");
  const descriptionAsEditorState = EditorState.createWithContent(contantState);

  useEffect(() => {
    setIsLoading(true);
    makeRequest({ url: `/products/${productId}` })
      .then((response) => setProduct(response.data))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="card-base border-radius-20 product-details">
        <Link to="/products" className="product-details-goback">
          <ArrowIcon className="icon-goback" />
          <h1 className="text-goback">Voltar</h1>
        </Link>
        <div className="product-details-info">
          {isLoading ? (
            <ProductInfoLoader />
          ) : (
            <>
              <div className="product-details-card text-center">
                <img
                  src={product?.imgUrl}
                  alt={product?.name}
                  className="product-details-image"
                />
              </div>
              <div className="product-info-fields">
                <h1 className="product-details-name">{product?.name}</h1>
                {product?.price && <ProductPrice price={product?.price} />}
              </div>
            </>
          )}
        </div>
        <div className="product-details-card">
          {isLoading ? (
            <ProductDescriptionLoader />
          ) : (
            <>
              <h1 className="product-description-title">
                Descriçao do produto
              </h1>
              <Editor
                editorClassName="product-description-text"
                editorState={descriptionAsEditorState}
                toolbarHidden
                readOnly
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDatails;
