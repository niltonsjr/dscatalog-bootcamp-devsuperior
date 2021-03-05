import React from "react";
import './styles.scss';
import {ReactComponent as UploadPlaceholder} from 'core/assets/images/upload-placeholder.svg'

const Imageupload = () => {
  return (
    <div className="row">
      <div className="col-6">
        <div className="upload-button-container">
          <input 
            type="file" 
            id="upload" 
            hidden 
           />
          <label htmlFor="upload">ADICIONAR IMAGEM</label>
        </div>
        <small className="upload-text-helper text-primary">
            As imagens deven ser JPG ou PNG e nao deven ultrapassar <strong>5MB</strong>.
        </small>
      </div>
      <div className="col-6">
          <UploadPlaceholder />
      </div>
    </div>
  );
};

export default Imageupload;
