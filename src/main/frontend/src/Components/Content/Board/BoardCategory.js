import React, { useState , useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../style/boardCategory.css";


const BoardCategory = () => {
    const navigate = useNavigate();

    const contentClick = (url) => {
        // window.open(url, "_blank", "noopener,noreferrer");
        navigate(url);
    }
    
    const [boardContents, setBoardContents] = useState([
        // {id:1, category:1, title:"1이 글의 제목입니다.", detail:"1이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:2, category:1, title:"2이 글의 제목입니다.", detail:"2이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:3, category:1, title:"3이 글의 제목입니다.", detail:"3이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:4, category:1, title:"4이 글의 제목입니다.", detail:"4이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:5, category:1, title:"5이 글의 제목입니다.", detail:"5이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:6, category:2, title:"1이 글의 제목입니다.", detail:"1이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:7, category:2, title:"2이 글의 제목입니다.", detail:"2이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:8, category:2, title:"3이 글의 제목입니다.", detail:"3이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:9, category:2, title:"4이 글의 제목입니다.", detail:"4이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
        // {id:10, category:2, title:"5이 글의 제목입니다.", detail:"5이 글의 내용부분입니다 이 글의 내용부분입니다 이 글의 내용부분입니다.", date:"2024년 09월 05일 AM 12:00", address:"장소: 경기도 안양시 만안구 양화로37번길 34 (연성대학교)", group:"1 / 5 명 (최소 2명)"},
    ]);

    // 카테고리를 담어두는 state
    const [boardCategorys, setBoardCategory] = useState([]);

    //현재 주소 가져오기
    const location = useLocation();

    const addBoardContent = () => {
        console.log(categoryValue + " - " + boardContents.length)
        // db에서 boardContents.length+1부터 5개씩 가져오는 sql문을 만들어서 실행해야함 
        // 그리고나서 boardContents안에 sql로 가져온 값을 추가해준면된다.
        
        axios.get('http://localhost:8099/api/board/select/category/more', {
            params : { currentCategory : categoryValue, ContentNumber : boardContents.length },
            headers : { 'Content-Type': 'application/json' }
        }).then(response => {
            setBoardContents(boardContents => [...boardContents, ...response.data]);
            console.log(boardContents)
        }).catch(error => {
            console.log(error);
        },[]);
    }

    const currentUrl = window.location.href;
    console.log(currentUrl);

    const categoryMatch = currentUrl.match(/category\/([^/]+)/);
    const categoryValue = categoryMatch ? categoryMatch[1] : null;

    console.log(categoryValue)

    console.log(boardContents)

    const changeBoardContents = (currentCategoryValue) => {
        // db에서 categoryValue에 해당하는 데이터를 가져와서 boardContents의 값을 변경한다.
        // setBoardContents
        axios.all([
            axios.get("http://localhost:8099/api/board/category", {
                headers : { 'Content-Type': 'application/json' } // 요청 헤더 설정
            }),
            axios.get(`http://localhost:8099/api/board/select/category`, {
                params : { currentCategory : currentCategoryValue },
                headers : { 'Content-Type': 'application/json' } // 요청 헤더 설정
            })
        ])
        .then(
            axios.spread((res1, res2) => {
                setBoardCategory(res1.data);
                setBoardContents(res2.data);
                console.log(currentCategoryValue + "db에서 사용할 카테고리 값")
            })
        )
        .catch(error => {
            console.log(error);
        });
    }

    const headerbar_title_change = (categoryValue) => {
        if(categoryValue === "deadline") {
            return "시작이 얼마남지 않은 모임을 확인해보세요!";
        } else if(categoryValue === "new") {
            return "새로 만들어진 모임을 확인해보세요!";
        } else if(categoryValue === "programming") {
            return "프로그래밍 모임을 확인해보세요!";
        }
    }


    useEffect(() => {
        const currentCategoryValue = location.pathname.split("/").pop();
        changeBoardContents(currentCategoryValue);
    },[location]);

    return (
        <>
            <div className="board-page">
                <div className="board-menubar">
                    <div className="category-section">
                        {boardCategorys.map((category) => (
                            category.comcateidx === 1 ? (
                                <Link to="/board/category/deadline" className="category1 category" onClick={() => changeBoardContents(categoryValue)}>
                                    <img src="/img/icon/deadline(circle).png" alt="deadline" className="category1-image"/>
                                    <div className="category1-title">{category.comcatename}</div>
                                </Link>
                            ) : category.comcateidx === 2 ? (
                                <Link to="/board/category/new" className="category2 category" onClick={() => changeBoardContents(categoryValue)}>
                                    <img src="/img/icon/new(circle).png" alt="new" className="category2-image"/>
                                    <div className="category2-title">NEW!</div>
                                </Link>
                            ) : category.comcateidx === 3 ? (
                                <Link to="/board/category/programming" className="category3 category" onClick={() => changeBoardContents(categoryValue)}>
                                    <img src="/img/icon/programming(circle).png" alt="programming" className="category3-image"/>
                                    <div className="category3-title">프로그래밍</div>
                                </Link>
                            ) : null
                        ))}
                        <Link to="/board/postWrite" className="writeButton">
                            <div className="writeButton-1">글쓰기</div>
                            {/* <div className="writeButton-2"></div> */}
                        </Link>
                    </div>
                </div>
                <div className="board-category-1">
                    <div className="board-category-1-background">
                        <div className="board-category-1-headerbar">
                            <img src={`/img/icon/${categoryValue}.png`} alt={categoryValue} className="board-category-1-headerbar-img"></img>
                            <p className="board-category-1-headerbar-title">{headerbar_title_change(categoryValue)}</p>
                        </div>

                        {boardContents.map((content) => (
                                <div className="board-category-1-content" onClick={() => contentClick(`/board/post/?comIdx=${content.comIdx}`)}>
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

                        <div className="moreButton" onClick={addBoardContent}>
                            {/* moreButton-section영역은 boardContent의 데이터를 sql로 가져올때 
                            카테고리에 해당하는 전체 게시물데이터의 개수를 가져와 boardContents의 크기가 
                            전체게시글개수와 일치할때 display none의 값을 주면 된다. */}
                            <div className="moreButton-section">
                                <span className="moreButton-text">MORE</span>
                                <img src="/img/icon/arrow(down).png" alt="moreButton" className="moreButton-arrow" onClick={addBoardContent} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardCategory;