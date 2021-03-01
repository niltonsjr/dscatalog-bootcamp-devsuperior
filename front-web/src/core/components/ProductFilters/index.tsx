import React from 'react';
import './styles.scss'
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg'

const ProductFilters = () => {
    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="Pesquisar produto"
                />
                <SearchIcon/>
            </div>
        </div>
    )
}

export default ProductFilters;