import React, {useState} from "react";

import Button from '@material-ui/core/Button';

const Card = ({title, content}) => {
    const [isHidden, setIsHidden] = useState(false);


const handleClose = () => {
    setIsHidden(true);
}

const [showOptions, setShowOptions] = useState(false);
const filterOptions = ['Other', 'Landscape', 'Monument', 'Shop', 'Bar'];

const [info, setInfo] = useState('');

if(isHidden) {
    return null;
}

const filter = () => {
    setShowOptions(!showOptions);
    setInfo("Que pasa aqui");
}

return (
    <div className="card">
        <div className="card-header"> 
            {title}
        </div>
        <div className="card-body">
        <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick="listFriends()">
          Listar amigos
        </Button>
      </div>
      <div className="d-flex justify-content-center align-items-center mx-4">
        <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick="myPoints()">
          Mis puntos
        </Button>
      </div>
      <div className="d-flex justify-content-center align-items-center mx-4">
        <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick="filter">
          Filtrar por categoria
        </Button>
          <div>
          {!showOptions &&
            <select>
              {filterOptions.map(option => (
                <option key={option}> {option}</option>
                ))}
            </select>
          }
          </div>
          <p>{info}</p>
        </div>
        <div className="card-footer"> 
            <button onClick = {handleClose}> </button>
            <div className="d-flex justify-content-center align-items-center mx-4">
      </div>
        </div>
    </div>
);

};

export default Card;