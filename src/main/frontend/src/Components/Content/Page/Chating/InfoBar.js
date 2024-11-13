import React, {useState} from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import "../../../../style/Chating.css"

function InfoBar({onClose}) {



    return (
        <div className='infoBar'>
            {/*<div className='leftInnerContainer'>*/}
                <img src="/img/icon/onlineIcon.png" className='onlineIcon' alt='online icon' style={{width: "10px", height: "10px", marginLeft: "30px", marginRight: "15px"}}/>
                <h3>room</h3>
            {/*</div>*/}

            {/*<a href='/'>*/}
            <div className="chatClose">
                <img src="/img/icon/close(white).png" style={{width: "20px", height: "20px", marginLeft: "250px"}} alt='close icon' onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }} />
            </div>
            {/*</a>*/}
        </div>
    );
}

export default InfoBar;