import React from "react";
import { Link } from "react-router-dom";
import '../../../style/post.css';

const Post = () => {
    return (
        <>
            <div className="post">
                <p className="title">게시판 (곧 마감)</p>
                <div className="breadcrumb">
                    <img src="/img/icon/home(breadcrumb).png" alt="homeicon" className="breadcrumb-home" />
                    <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow" />
                    <span className="breadcrumb-board"></span>
                    <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow" />
                    <span className="breadcrumb-category"></span>
                </div>
                <hr></hr>
                <div className="">
                    <img src="/img/icon/person.png" alt="personicon" className="" />
                    <span className="">백지민 님</span>
                    <img src="/img/icon/calendar.png" alt="" className="" />
                    <span className="">2024-09-05</span>
                </div>
                <div className="">
                    <img src="/img/icon/group.png" alt="" className="" />
                    <span className="">1 / 5 명</span>
                    <span className="">(4명 남음)</span>
                </div>
                <div className="">
                    <div className="">
                        <img src="/img/icon/person.png" alt="" className="" />
                        <span className="">김지민</span>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <img src="" alt="" className="" />
                        <span className="">2024-09-06 AM 10:00</span>
                    </div>
                    <div className="">
                        <img src="" alt="" className="" />
                        <span className="">2024-09-06 AM 12:00</span>
                    </div>
                    <div className="">
                        <img src="" alt="" className="" />
                        <span className="">경기도 안양시 만안구 양화로37번길 34 (연성대학교)</span>
                    </div>

                    <div className="">
                        <div className="">
                            <img />
                            <span className=""></span>
                        </div>
                        <div className="">
                            <img />
                            <span className=""></span>
                        </div>
                    </div>

                    <div>
                        지도
                    </div>
                    
                </div>

                <div className="">
                    
                </div>
                
            </div>
        </>
    )
}

export default Post;