import React from "react";
import '../../../style/postRewrite.css';
import { RadioGroup } from "@mui/material";

const PostRewrite = () => {
    return (
        <>
            <div className="ilovecode">
                <div className="postRewrite-section">

                    <div className="title-section">
                        <div className="title">
                            <span className="title-text">제목</span>
                        </div>
                        <input />
                    </div>

                    <div className="category-section">
                        <div className="category">
                            <span className="category-text">카테고리</span>
                        </div>
                        <input />
                    </div>

                    <div className="content-section">
                        <div className="content">
                            <span className="content-text">내용</span>
                        </div>
                        <textarea />
                    </div>

                    <div className="groupCount-section">
                        <div className="groupCount">
                            <span className="groupCount-text">모임인원</span>
                        </div>
                        <div className="current-count">
                            <input />
                            <span>명</span>
                        </div>
                        <div className="/">/</div>
                        <div className="maximum-count">
                            <input />
                            <span>명</span>
                        </div>
                    </div>

                    <div className="meetingPoint-section">
                        <div className="meetingPoint">
                            <span className="meetingPoint-text">모임장소</span>
                        </div>
                        
                        <form>
                            <input type="radio" />
                            <label for="meetingPoint">온라인</label>

                            <input type="radio" />
                            <label for="meetingPoint">스터디룸</label>

                            <input type="radio" />
                            <label for="meetingPoint">상세주소</label>
                        </form>
                    </div>

                    <div className="startdate-section">
                        <div className="startdate">
                            <span className="startdate-text">시작일</span>
                        </div>
                        <input />
                    </div>

                    <div className="enddate-section">
                        <div className="enddate">
                            <span className="enddate-text">종료일</span>
                        </div>
                        <input />
                    </div>

                    <div className="active-button">
                        <img src="/img/icon/check.png" alt="" className="activeIcon" />
                        <span className="active-text">작성하기</span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default PostRewrite;