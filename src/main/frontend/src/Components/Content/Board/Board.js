import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../style/board.css";

const contentClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
}

const Board = () => {
    const [boardContents, setBoardContents] = useState([
        // {id:1, category:1, title:"1이 글의 제목입니다.", detail:"1이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:2, category:1, title:"2이 글의 제목입니다.", detail:"2이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:3, category:1, title:"3이 글의 제목입니다.", detail:"3이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:4, category:1, title:"4이 글의 제목입니다.", detail:"4이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:5, category:1, title:"5이 글의 제목입니다.", detail:"5이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
    ]);

    const [boardCategorys, setBoardCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8099/api/board", 
            {
                headers : { 'Content-Type': 'application/json' } // 요청 헤더 설정
            }
        )
        .then(response => {
            setBoardContents(response.data);
        })
        .catch(error => {
            // 오류 처리
            console.log(error); // 응답 출력
        });
    }, []);

    console.log(boardContents);

    return (
        <>
            <div className="ilovecode">
                <div className="board-page">
                    <div className="board-menubar">
                        <div className="category-section">
                            <Link to="/board/category/deadline" className="category1 category">
                                <img src="/img/icon/deadline(circle).png" alt="deadline" className="category1-image"/>
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
                    <div className="board-section">
                        <div className="board-category-1">
                            <div className="board-category-1-background">
                                <div className="board-category-1-headerbar">
                                    <img src="/img/icon/deadline.png" alt="deadline" className="board-category-1-headerbar-img"></img>
                                    <p className="board-category-1-headerbar-title">시작이 얼마남지 않은 모임을 확인해보세요! </p>
                                    <Link to="/board/category/deadline" className="board-category-1-headerbar-btn">
                                        <span className="board-category-1-headerbar-btn-text">더보기</span>
                                    </Link>
                                </div>
                                {boardContents.map((content) => (
                                    content.comCateIdx === 1 ? (
                                            <div className="board-category-1-content" onClick={() => contentClick(`/board/post/${content.comIdx}`)}>
                                                <p className="board-category-1-content-title">{content.comTitle}</p>
                                                <p className="board-category-1-content-detail">{content.comContent}</p>
                                                <div className="board-category-1-content-info">
                                                    <div className="board-category-1-content-info-dday">
                                                        <span className="board-category-1-content-info-dday-text">D-DAY</span>
                                                    </div>
                                                    <p className="board-category-1-content-info-date">{content.comStartDate}</p>
                                                    <p className="board-category-1-content-info-address">{content.comAddress}</p>
                                                </div>
                                                <div className="board-category-1-content-info2">
                                                    <img src="/img/icon/group.png" alt="그룹이미지" className="board-category-1-content-info2-group" />
                                                    <p className="board-category-1-content-info2-count">{content.groupCount + 1} / {content.comToCount}</p>
                                                </div>
                                            </div>
                                    ) : null
                                ))}
                                {/* <div className="board-category-1-content" onClick={() => contentClick("/board/post/1")}>
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
                                </div> */}
                            </div>
                        </div>

                        <div className="board-category-2">
                            <div className="board-category-2-background">
                                <div className="board-category-2-headerbar">
                                    <img src="/img/icon/new.png" alt="new" className="board-category-2-headerbar-img"></img>
                                    <p className="board-category-2-headerbar-title">새롭게 만들어진 모임을 확인해보세요! </p>
                                    <Link to="/board/category/new" className="board-category-2-headerbar-btn">
                                        <span className="board-category-2-headerbar-btn-text">더보기</span>
                                    </Link>
                                </div>
                                {boardContents.map((content) => (
                                    content.comCateIdx === 2 ? (
                                        <div className="board-category-2-content" onClick={() => contentClick(`/board/post/${content.comIdx}`)}>
                                            <p className="board-category-2-content-title">{content.comTitle}</p>
                                            <p className="board-category-2-content-detail">{content.comContent}</p>
                                            <div className="board-category-2-content-info">
                                                <div className="board-category-2-content-info-dday">
                                                    <span className="board-category-2-content-info-dday-text">D-DAY</span>
                                                </div>
                                                <p className="board-category-2-content-info-date">{content.comStartDate}</p>
                                                <p className="board-category-2-content-info-address">{content.comAddress}</p>
                                            </div>
                                            <div className="board-category-2-content-info2">
                                                <img src="/img/icon/group.png" alt="그룹이미지" className="board-category-2-content-info2-group" />
                                                <p className="board-category-2-content-info2-count">{content.groupCount + 1} / {content.comToCount}</p>
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Board;