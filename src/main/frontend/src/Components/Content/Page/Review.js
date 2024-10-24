import React from "react";
import "../../../style/review.css";
import UnstyledSelectForm from "../Review/UnstlyedSelectForm";
import UnstyledInputBasic from "../Review/UnstyledInputBasic";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const reviews = [
  {
    id: 1,
    image: "/img/banner.png",
    text: "안양역 가까워서 스터디 하기 괜찮고 사람들과 교류할 수 있었어요.",
    rating: 5,
    studyRoomInfo: "스터디룸1",
    createdAt: "2024-09-27 18:30:24",
    likes: 10,
    comments: 3,
    tag: ["#태그", "#태그"],
  },
  {
    id: 2,
    image: "/img/banner2.png",
    text: "안양역 스터디! ○○○○ ○○○○○○...",
    rating: 3,
    studyRoomInfo: "스터디룸2",
    createdAt: "2024-09-27 18:30:24",
    likes: 5,
    comments: 2,
    tag: ["#태그", "#태그"],
  },
  {
    id: 3,
    image: "/img/banner.png",
    text: "안양역 스터디! ○○○○ ○○○○○○...",
    rating: 4,
    studyRoomInfo: "스터디룸3",
    createdAt: "2024-09-27 18:30:24",
    likes: 5,
    comments: 2,
    tag: ["#태그", "#태그"],
  },
  {
    id: 4,
    image: "/img/banner.png",
    text: "안양역 스터디! ○○○○ ○○○○○○...",
    rating: 2,
    studyRoomInfo: "스터디룸4",
    createdAt: "2024-09-27 18:30:24",
    likes: 5,
    comments: 2,
    tag: ["#태그", "#태그"],
  },
  {
    id: 5,
    image: "/img/banner.png",
    text: "안양역 스터디! ○○○○ ○○○○○○...",
    rating: 1,
    studyRoomInfo: "스터디룸5",
    createdAt: "2024-09-27 18:30:24",
    likes: 5,
    comments: 2,
    tag: ["#태그", "#태그"],
  },
];

const ReviewCard = ({ review, onClick }) => (
  <div className="review-card" onClick={onClick}>
    <img src={review.image} alt="review" className="review-card-image" />
    <div className="overlay flex">
      <div className="review-rating yellow-star">
        {"★".repeat(review.rating)}
      </div>
      <div className="study-room">{review.studyRoomInfo}</div>
    </div>
    {/* 이미지 여러장 일때 img 오른쪽하단에 +2 숫자 나오게 하는 코드 */}
    <p className="review-text">{review.text}</p>
    <div className="review-footer">
      <div className="color">{review.tag}</div>
      <span>{review.createdAt}</span>
      <div className="likes-comments">
        <span className="review-text">{review.likes} 👍</span>
        <span className="review-text">{review.comments} 💬</span>
      </div>
    </div>
  </div>
);

const Review = () => {
  const navigate = useNavigate();
  const [selectedStudyRoom, setSelectedStudyRoom] = useState("");
  const filteredReviews = reviews.filter(
    (review) =>
      selectedStudyRoom === "" || review.studyRoomInfo === selectedStudyRoom
  );
  const handleReviewClick = (id) => {
    navigate(`/review/${id}`);
    // <Link to="/review/${id}"/>
    
};

  return (
    <>
      <div className="review__page box">
        <div className="height"></div>
        <div className="review__page__main__wrap">
          <div className="review__page__main">
            <div className="flex1">
              {/* 검색창 검색코드 추가 해야 함 */}
              <UnstyledInputBasic />
              <UnstyledSelectForm onChange={setSelectedStudyRoom} />
            </div>
            <Link to="/review/post">
              <button>글쓰기</button>
            </Link>
          </div>

          <div className="review-grid">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} onClick={() => handleReviewClick(review.id)} review={review} />
            ))}
          </div>
        </div>
        {/* more 버튼 click -> 추가로 보여주기  */}
        <button className="more-button">MORE</button>
      </div>
    </>
  );
};

export default Review;
