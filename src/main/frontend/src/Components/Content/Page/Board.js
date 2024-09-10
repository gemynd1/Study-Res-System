import React from "react";
import "../../../style/board.css";

const Board = () => {
    return (
        <>
            <div className="board-menubar">
                <div className="categoty-section">
                    <div className="category1">
                        <div className="category1-logo">
                            <img src="/img/icon/곧마감.png" alt="곧마감" className="category1-image"/>
                            <div className="category1-circle"></div>
                        </div>
                        <div className="category1-title">곧 마감!</div>
                    </div>
                    <div className="category2">
                        <div className="category2-logo">
                            <img src="/img/icon/new.png" alt="new" className="category2-image"/>
                            <div className="category2-circle"></div>
                        </div>
                        <div className="category2-title">NEW!</div>
                    </div>
                    <div className="category3">
                        <div className="category3-logo">
                            <img src="/img/icon/programming.png" alt="programming" className="category3-image"/>
                            <div className="category3-circle"></div>
                        </div>
                        <div className="category3-title">프로그래밍</div>
                    </div>
                    <div className="category4">
                        <div className="category4-logo">
                            <img src="/img/icon/programming.png" alt="programming" className="category4-image"/>
                            <div className="category4-circle"></div>
                        </div>
                        <div className="category4-title">영어</div>
                    </div>
                    <div className="writeButton">
                        <div className="writeButton-1"></div>
                        <div className="writeButton-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;