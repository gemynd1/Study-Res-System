import React, { useState, useEffect } from "react";
import "../../../style/review.css";
import UnstyledSelectForm from "../Review/UnstlyedSelectForm";
import UnstyledInputBasic from "../Review/UnstyledInputBasic";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const baseImage =  "/img/banner.png"
// ReviewCard 컴포넌트

const ReviewCard = ({ review }) => {

    return (
        <Link to={`/review/${review.srIdx}`} state={{data: review.srIdx}}>
            <div className="review-card">
            
                {review.sriImg && review.sriImg.length > 0 ? (
                    <img
                        src={`http://localhost:8099/${review.sriImg}`}
                        alt="review"
                        className="review-card-image"
                    />
                ) : (
                    <img
                        src={"/img/banner.png"}
                        alt="review"
                        className="review-card-image"
                    />
                )}

                <div className="overlay flex">
                    <div className="review-rating yellow-star">
                        {"★".repeat(review.srStar)}
                    </div>
                    <div className="study-room">{review.sgicontent1}</div>
                </div>
                <p className="review-text">{review.srContent}</p>
                <div className="review-footer">
                    {/* 태그를 표시 (배열 형태이므로 join 사용) */}
                    <div className="color">
                        {review.tshtlcontent && review.tshtlcontent.length > 0
                            ? review.tshtlcontent.split(", ")
                            : "No tags available"}
                    </div>
                    <span>{review.srRegDate.split("T")[0]}</span>
                    <div className="likes-comments">
                        <span className="review-text">👍 0</span>
                        <span className="review-text">💬 0</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};


const Review = () => {

    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [selectedStudyRoom, setSelectedStudyRoom] = useState("");


    // 서버에서 리뷰 데이터를 받아오는 useEffect
    useEffect(() => {
        axios.get("http://localhost:8099/api/reviews/all", {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                console.log("서버 응답:", response.data);
                setReviews(response.data); // 받아온 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error("에러 발생:", error);
            });
    }, []);


    const handleReviewClick = (review) => {
        navigate(`/review?id=${review.srIdx}`, { state: { review } });
    };

    const handleLogin = () => {
        if (sessionStorage.getItem("id")) {
            navigate("/review/post");
        } else {
            alert("로그인 후 이용해주세요.");
        }
    };

    const handleReviewStudyroom = (selectedRoom) => {
        setSelectedStudyRoom(selectedRoom); // Update the selected study room
    };

    const filteredReviews = reviews.filter(
        (review) => selectedStudyRoom === "" || review.sgiIdx === selectedStudyRoom
    );

    return (
        <div className="review__page box">
            <div className="height"></div>
            <div className="review__page__main__wrap">
                <div className="review__page__main">
                    <div className="flex1">
                        {/* <UnstyledInputBasic /> */}
                        <UnstyledSelectForm onChange={handleReviewStudyroom} />
                    </div>
                    <button onClick={handleLogin}>글쓰기</button>
                </div>

                <div className="review-grid">
                    {filteredReviews.map((review) => (
                        <ReviewCard
                            key={review.srIdx}
                            review={review}
                            // onClick={() => handleReviewClick(review)}
                        />
                    ))}
                </div>
            </div>
            {/* <button className="more-button">MORE</button> */}
        </div>
    );
};

export default Review;
