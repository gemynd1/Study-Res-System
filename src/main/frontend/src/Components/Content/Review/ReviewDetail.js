import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../../../style/ReviewDetail';
import "../../../style/ReviewDetail.css";

const ReviewDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [review, setReview] = useState(state?.review || null);
  const memberName = sessionStorage.getItem("name"); //^^
  const navigate = useNavigate();


  useEffect(() => {
    // 만약 state로 전달된 review 데이터가 없다면 API 호출
    if (!review) {
      axios
          .get(`http://localhost:8099/api/review/${id}`)
          .then((response) => {
            setReview(response.data);
          })
          .catch((error) => {
            console.error("리뷰를 가져오는 중 오류 발생:", error);
          });
    }
  }, [id, review]);

  if (!review) {
    return <div>Loading...</div>;
  }

    return (
        <>
          <div className='review__detail--main'>
            <div className='reivew__detail__reivew'>
              <div className='review-hedaer-flex'>
                <div className='profile-flex'>
                  {/* <div className='reivew__detail__reveiw--profile-icon'>(프로필사진)</div> */}
                  <h3 className='reivew__detail__reveiw--profile-name'>{review.memberName}</h3>
                </div>
                <div className='reivew__detail__reveiw--star'>{"★".repeat(review.srStar)}</div>
              </div>
              <div className='review__detail__review--content'>
                {review.srContent}
              </div>
              <div className='review__detail__reivew-wrap--img'>
                <img className='review__detail_review--img' src={`http://localhost:8099/${review.sriImg[0]}`} alt="review"/>
                <img className='review__detail_review--img' src={`http://localhost:8099/${review.sriImg[1]}`} alt="review"/>
                <img className='review__detail_review--img' src={`http://localhost:8099/${review.sriImg[2]}`} alt="review"/>

              </div>
              <div className='review__detail__reivew--date'>{new Date(review.srRegDate).toLocaleString()}</div>
            </div>
            <div className='review__detail__write'>
              <div className='review__detail__write__host'>
                <div className='review__detail__write__host-header-flex'>
                  <div className='write--flex'>
                    <h3 className='review__detail__write__host-header-name my-h3'>
                      {memberName}님의 답글
                    </h3>
                    <div className='review__detail__write__host-header-date'>
                      2024.10.16 18:54:24
                    </div>
                  </div>
                  <div className='review__detail__write__host-content-flex'>
                    <h3 className='my-h3'>편하게 이용하셨다니 다행입니다. 다음번에 또 들려주세요! </h3>
                    <div className='reveiw__detail__write__like&chat-flex'>
                      <div className='review__detail__write--flex'>
                        <div className='review__detail__wirte__liek--flex'>
                          <div className='review__detail__write__like--icon'>👍</div>
                          <div className='review__detail__write__like--num'>6</div>
                        </div>
                        <div className='review__detail__write__comment'>댓글달기</div>
                      </div>
                    </div>
                  </div>
                  <div className='review__detail__underline'/>
                </div>
              </div>
            </div>


            <div className='review__detail__comment--write'>
              <div className='review__detail__write__host'>
                <div className='review__detail__write__host-header-flex'>
                  <div className='write--flex'>
                    <h3 className='review__detail__write__host-header-name my-h3'>
                      김지민
                    </h3>
                    <div className='review__detail__write__host-header-date'>
                      2024.10.16 18:54:24
                    </div>
                  </div>
                  <div className='review__detail__write__host-content-flex'>
                    <div className='review__detail__write__guest-tag-flex'>
                      <h3 className='mr8 my-h3'>@김스터디</h3>
                      <h3 className='my-h3'>면접준비 괜찮은가요?</h3>
                    </div>
                    <div className='reveiw__detail__write__like&chat-flex'>
                      <div className='review__detail__write--flex'>
                        <div className='review__detail__wirte__liek--flex'>
                          <div className='review__detail__write__like--icon'>👍</div>
                          <div className='review__detail__write__like--num'>6</div>
                        </div>
                        <div className='review__detail__write__comment'>댓글달기</div>
                      </div>
                    </div>
                  </div>


                  <div className='write--flex'>
                    <h3 className='review__detail__write__host-header-name2 my-h3'>
                      김스터디
                    </h3>
                    <div className='review__detail__write__host-header-date'>
                      2024.10.16 18:54:24
                    </div>
                  </div>
                  <div className='review__detail__write__host-content-flex'>
                    <div className='review__detail__write__guest-tag-flex'>
                      <h3 className='mr8 my-h3'>@김지민</h3>
                      <h3 className='my-h3'>편하게 준비할 수 있을것 같습니다.</h3>
                    </div>
                    <div className='reveiw__detail__write__like&chat-flex'>
                      <div className='review__detail__write--flex'>
                        <div className='review__detail__wirte__liek--flex'>
                          <div className='review__detail__write__like--icon'>👍</div>
                          <div className='review__detail__write__like--num'>6</div>
                        </div>
                        <div className='review__detail__write__comment'>댓글달기</div>
                      </div>
                    </div>
                  </div>
                  <div className='review__detail__underline'/>
                </div>
              </div>
            </div>
            <div className='review__detail__comment'>
              <h3> 댓글 작성</h3>
              <div className='review__detail__comment-input'>
                <input className='review-input' placeholder='@를 통해 상대방에게 댓글을 달 수 있습니다.'></input>
                <button className='review-button'>등록</button>
              </div>
            </div>
            <button onClick={() => navigate('/review')}>리뷰 목록으로 돌아가기</button>
          </div>

        </>
    );
};

export default ReviewDetail;
