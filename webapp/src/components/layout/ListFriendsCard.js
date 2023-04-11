import React, {useState} from "react";
import Friends from "./Friends";

const ListFriendsCard = ({title, content}) => {
    const [isHidden, setIsHidden] = useState(false);
    const [showButton, setShowButton] = useState(false);


const handleClose = () => {
    setIsHidden(true);
    setShowButton(true);
}

const [showOptions, setShowOptions] = useState(false);

const [info, setInfo] = useState('');


if(isHidden) {
    return null;
}


return (
    <div className="card">
        <div className="card-header"> 
            My friends          
        </div>

        <div className="card-body">
          <Friends></Friends>
        </div>

        <div className="card-footer"> 
          <button className="d-flex justify-content-center align-items-center mx-4" onClick = {handleClose}> Close </button>
        </div>
    
  </div>
);

};

export default ListFriendsCard;