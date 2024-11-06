import React from "react";

const Loading = () => {
    return (
        <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            width: '100%', margin: 'auto', paddingTop: '300px', paddingBottom: '300px'
        }}>
            <img src='/img/icon/spinner.gif' alt='loading' />
            <p>결제를 처리 중입니다. 잠시만 기다려 주세요...</p>
            {/* 로딩 스피너를 추가하고 싶다면 아래와 같이 표시할 수 있습니다 */}
        </div>
    )
}
export default Loading