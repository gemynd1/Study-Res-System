import React, {useState} from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import "../../../../style/Chating.css"

function InfoBar({onClose, room, onToggle}) {



    return (
        <div className='infoBar'>
            {/*<div className='leftInnerContainer'>*/}
                <img src="/img/icon/onlineIcon.png" className='onlineIcon' alt='online icon' style={{width: "10px", height: "10px", paddingLeft: "20px"}}/> {/* , marginLeft: "30px", marginRight: "15px"*/} 
                <h3>{room}</h3>
            {/*</div>*/}

            {/*<a href='/'>*/}
            <div className="chatClose">
                <img src="/img/icon/arrowDown(white).png" alt="토글내리기" style={{width: "24px", height: "24px"}} // , marginLeft: "250px"
                     onClick={(e) => {
                         e.preventDefault();
                         onToggle();
                     }}/>

                <img src="/img/icon/close(white).png" style={{width: "20px", height: "20px", marginLeft: "10px"}} // , marginLeft: "30px"
                     alt='close icon' onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    }}/>

                {/*<div onClick={(e) =>{*/}
                {/*    e.preventDefault();*/}
                {/*    onToggle();*/}
                {/*}} >*/}
                {/*    채팅방 내리기*/}
                {/*</div>*/}
            </div>
            {/*</a>*/}
        </div>
    );
}

export default InfoBar;