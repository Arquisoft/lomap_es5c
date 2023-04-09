import React, {useState} from "react";

import Button from '@material-ui/core/Button';
import FilterButton from "./FilterButton";

const Card = ({title, content}) => {
    const [isHidden, setIsHidden] = useState(false);
    const [showButton, setShowButton] = useState(false);


const handleClose = () => {
    setIsHidden(true);
    setShowButton(true);
}

const [showOptions, setShowOptions] = useState(false);
const filterOptions = ['Other', 'Landscape', 'Monument', 'Shop', 'Bar'];

const [info, setInfo] = useState('');

const [showFriendsCard, setShowFriendsCard] = useState(false);

if(isHidden) {
    return null;
}

const filter = () => {
    setShowOptions(!showOptions);
    setInfo("Que pasa aqui");
}

function listFriends() {
  return <div className="new-card"> These are your friends</div>;
}

const handleButtonFriendsClick = () => {
  setShowFriendsCard(true);
}; 

return (
    <div className="card">
        <div className="card-header"> 
            {title}           
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center mx-4">
            <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick={handleButtonFriendsClick}>
              My friends
            </Button>
            {showFriendsCard && <listFriends />}
          </div>
        <div className="d-flex justify-content-center align-items-center mx-4">
          <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick="myPoints()">
            My maps
          </Button>
         </div>

        <div className="d-flex justify-content-center align-items-center mx-4">
          <Button style={{ margin: '10px 0' }} color="primary" variant = "contained" onClick="filter">
            Filter by category
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
      </div>
        <div className="card-footer"> 
          <button className="d-flex justify-content-center align-items-center mx-4" onClick = {handleClose}> Close </button>
        </div>
    
  </div>
);

};

export default Card;