import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import '../../../style/ReviewDetail';
import "../../../style/ReviewDetail.css";

const ReviewDetail = () => {
    const { id } = useParams(); // URL에서 ID 추출
    const [review, setReview] = useState(null);

    useEffect(() => {
        // ID를 사용하여 리뷰 정보를 가져오는 API 호출
        axios.get(`http://localhost:8099/api/review/${id}`) // 수정된 URL
            .then(response => {
                setReview(response.data);
                console.log(id)
            })
            .catch(error => {
                console.error("리뷰를 가져오는 중 오류 발생:", error);
            });
    }, [id]);

    if (!review) {
        return (
          <>
          <div className='review__detail--main'>
            <div className='reivew__detail__reivew'>
              <div className='review-hedaer-flex'>
                <div className='profile-flex'>
                  {/* <div className='reivew__detail__reveiw--profile-icon'>(프로필사진)</div> */}
                  <h3 className='reivew__detail__reveiw--profile-name'>김스터디</h3>
                </div>
                <div className='reivew__detail__reveiw--star'>★★★★★</div>
              </div>
                <div className='review__detail__review--content'>
                  안양역 가까워서 스터디하기 괜찮고, 사람들과 이야기 나누기도 편해서 좋았습니다. 다음에 또 이용하겠습니다!
                </div>  
                <div className='review__detail__reivew-wrap--img'>
                  <img className='review__detail_review--img' src="/img/banner.png" alt="review"/>
                  <img className='review__detail_review--img' src="/img/banner.png" alt="review"/>
                  <img className='review__detail_review--img' src="/img/banner.png" alt="review"/>
    
                </div>
                <div className='review__detail__reivew--date'>2024.10.18 18:34:24</div>
            </div>
            <div className='review__detail__write'>
              <div className='review__detail__write__host'>
                <div className='review__detail__write__host-header-flex'>
                  <div className='write--flex'>
                    <h3 className='review__detail__write__host-header-name my-h3'>
                      호스트님의 답글
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
              <input className='review-input' placeholder='@를 통해 상대방에게 댓글을 달 수 있습니다.'  ></input>
              <button className='review-button'>등록</button>
              </div>
            </div>
          </div>
          </>
        )
    }

    return (
        <div>
            <h1>{review.MemberName}님의 리뷰</h1> {/* 리뷰 작성자 이름 */}
            <h2>별점: {review.SRStar}</h2> {/* 리뷰 별점 */}
            <p>{review.SRcontent}</p> {/* 리뷰 내용 */}
            <p>등록일: {new Date(review.SRRegDate).toLocaleString()}</p> {/* 등록일 포맷 */}
            {/* 다른 리뷰 정보 표시 */}
        </div>
    );
};

export default ReviewDetail;
