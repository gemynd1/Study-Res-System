import React from "react";
import { Link } from "react-router-dom";
import "../../../style/boardCategory.css";

const contentClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
}

const BoardCategory = () => {
    return (
        <>
            <div className="board-page">
                <div className="board-menubar">
                    <div className="category-section">
                        <Link to="/board/category/곧마감" className="category1 category">
                            <img src="/img/icon/곧마감(circle).png" alt="곧마감" className="category1-image"/>
                            <div className="category1-title">곧 마감!</div>
                        </Link>
                        <Link to="/board/category/new" className="category2 category">
                            <img src="/img/icon/new(circle).png" alt="new" className="category2-image"/>
                            <div className="category2-title">NEW!</div>
                        </Link>
                        <Link to="/board/category/programming" className="category3 category">
                            <img src="/img/icon/programming(circle).png" alt="programming" className="category3-image"/>
                            <div className="category3-title">프로그래밍</div>
                        </Link>
                        <Link to="/board/category/programming" className="category4 category">
                            <img src="/img/icon/programming(circle).png" alt="programming" className="category4-image"/>
                            <div className="category4-title">영어</div>
                        </Link>
                    </div>
                    <Link to="/board/postWrite" className="writeButton">
                        <div className="writeButton-1">글쓰기</div>
                        {/* <div className="writeButton-2"></div> */}
                    </Link>
                </div>
                <div className="board-category-1">
                    <div className="board-category-1-background">
                        <div className="board-category-1-headerbar">
                            <img src="/img/icon/곧마감.png" alt="곧마감" className="board-category-1-headerbar-img"></img>
                            <p className="board-category-1-headerbar-title">시작이 얼마남지 않은 모임을 확인해보세요! </p>
                        </div>
                        <div className="board-category-1-content" onClick={() => contentClick("/board/post/1")}>
                            <p className="board-category-1-content-title">이 글의 제목입니다.</p>
                            <p className="board-category-1-content-detail">이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.</p>
                            <div className="board-category-1-content-info">
                                <div className="board-category-1-content-info-dday">
                                    <span className="board-category-1-content-info-dday-text">D-DAY</span>
                                </div>
                                <p className="board-category-1-content-info-date">2024년 09월 05일 AM 12:00</p>
                                <p className="board-category-1-content-info-address">장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)</p>
                            </div>
                            <div className="board-category-1-content-info2">
                                <img src="/img/icon/group.png" alt="그룹이미지" className="board-category-1-content-info2-group" />
                                <p className="board-category-1-content-info2-count">1 / 5 명 (최소 2명)</p>
                            </div>
                        </div>
                        <div className="moreButton">
                            <div className="moreButton-section">
                                <span className="moreButton-text">MORE</span>
                                <img src="/img/icon/arrow(down).png" alt="moreButton" className="moreButton-arrow" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardCategory;