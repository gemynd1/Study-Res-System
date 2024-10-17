import React from "react";
import review from "../../../style/review.css";

const reviews = [
  {
    id: 1,
    image: "/img/banner.png",
    text: "안양역 가까워서 스터디 하기 괜찮고 사람들과 교류할 수 있었어요.",
    rating: 5,
    studyRoomInfo: "스터디룸2",
    createdAt: "2024-09-27 18:30:24",
    likes: 10,
    comments: 3,
    tag: ["#태그", "#태그"],
  },
  {
    id: 2,
    image: "/img/banner.png",
    text: "안양역 스터디! ○○○○ ○○○○○○...",
    rating: 3,
    studyRoomInfo: "스터디룸1",
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
    studyRoomInfo: "스터디룸1",
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
    studyRoomInfo: "스터디룸1",
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
    studyRoomInfo: "스터디룸1",
    createdAt: "2024-09-27 18:30:24",
    likes: 5,
    comments: 2,
    tag: ["#태그", "#태그"],
  },
  // 추가 리뷰
];

const ReviewCard = ({ review }) => (
  <div className="review-card">
    <img src={review.image} alt="review" className="review-card-image" />
    <div className="overlay flex">
      <div className="review-rating yellow-star">
        {"★".repeat(review.rating)}
      </div>
      <div className="study-room">{review.studyRoomInfo}</div>
    </div>
    <p>{review.text}</p>
    <div className="review-footer">
      <div className="color">{review.tag}</div>
      <span>{review.createdAt}</span>
      <div className="likes-comments">
        <span>{review.likes} 👍</span>
        <span>{review.comments} 💬</span>
      </div>
    </div>
  </div>
);

const Review = () => {
  return (
    <>
      <div className="review__page box">
        <div className="height"></div>
        <div className="review__page__main">
          <input type="text" placeholder="태그 | 제목" />
          <input type="text" placeholder="룸 선택" />
          <button>글쓰기</button>
        </div>
        <div className="review__page__main__wrap">
          <div className="review-grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
        <button className="more-button">MORE</button>
      </div>
    </>
  );
};

export default Review;
