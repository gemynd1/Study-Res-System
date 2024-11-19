import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';

// import './TextContainer.css';

function TextContainer({ users }) {
    return (
        <div className='textContainer'>

            {users ? (
                <div>
                    <h1>현재 채팅중인 사람들 : </h1>
                    <div className='activeContainer'>
                        <h2>
                            {users.map(({ name }) => (
                                <div key={name} className='activeItem'>
                                    {name}
                                    <img src="/img/icon/onlineIcon.png" style={{width: "10px", height: "10px", marginLeft: "10px"}} alt='Online Icon' />
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default TextContainer;