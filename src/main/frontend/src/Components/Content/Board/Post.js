import React from "react";
import { Link } from "react-router-dom";
import '../../../style/post.css';

// 댓글 더보기 버튼 import
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

// 페이지네이션 import
import Pagination from '@mui/material/Pagination';

// 모달 import
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

// 텍스트 ui import
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// 카카오맵 import
import { Map, MapMarker } from "react-kakao-maps-sdk";

// 댓글 더보기 버튼
function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="fademenu">
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src="/img/icon/seemore.png" alt="seemoreicon" className="seemore-icon" />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>신고</MenuItem>
                <MenuItem onClick={handleClose}>답글작성</MenuItem>
                <MenuItem onClick={handleClose}>수정</MenuItem>
                <MenuItem onClick={handleClose}>개시글 삭제</MenuItem>
            </Menu>
        </div>
    );
}
// 댓글 페이지네이션
function BasicPagination() {
    return (
    <Pagination count={10} />
    );
}   

// input ui component
function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label='내용' variant="outlined" multiline rows={9} />
        </Box>
    );
}

//모달
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 562,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 6,
    boxShadow: 24,
};

function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="QandA-button" >
            <img src="/img/icon/write.png" alt="QandAicon" className="QandA-button-icon" />
            <div className="QandA-button-text" onClick={handleOpen}>질문 작성하기</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal-header">
                        <span className="modal-header-title">질문 작성하기</span>
                    </div>

                    <div className="modal-title-section">
                        <span className="modal-title">질문</span>
                        <span className="modal-title-count1">0자</span>
                        <span className="modal-title-count2">/200자</span>
                    </div>
                    <BasicTextFields />
                    <div className="modal-caution-section">
                        <img src="/img/icon/!(modal).png" alt="!" className="modal-caution-icon" />
                        <span className="modal-caution-text">단, 공간 및 예약에 대한 문의가 아닌 글은 무통보 삭제될 수 있습니다.</span>
                    </div>
                    <div className="modal-button-section">
                        <div onClick={handleClose} className="modal-cancel-button">
                            <span className="modal-cancel-text">취소</span>
                        </div>
                        <div onClick={handleClose} className="modal-active-button">
                            <span className="modal-active-text">등록</span>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

// 카카오맵
const TheaterLocation = () => {
    return (
      <div className="kakaomap">
        <Map
          center={{ lat: 37.398184423401, lng: 126.91023974128 }}
          style={{
            width: '1090px',
            height: '378px',
            borderRadius: '20px',
          }}
        >
        {/* 지도에 보여줄 위치 지정 (위도,경도)  */}
        
          <MapMarker
            style={{ border: 'tranparent' }}
            position={{ lat: 37.398184423401, lng: 126.91023974128 }}
          >
          {/* 핀 찍힐 위치 */}
          
            <div
              style={{
                color: '#9971ff',
                fontSize: '19px',
                fontWeight: '700',
                border: '4px solid #9971ff',
                borderRadius: '10px',
                padding: '2.5px',
              }}
            >
              연성대학교
            </div>
          </MapMarker>
        </Map>
      </div>
      //핀에 적힐 이름 (위치 이름)
    );
  };

const Post = () => {
    return (
        <>
            <div className="post">

                <p className="title">게시판 (곧 마감)</p>

                <div className="breadcrumb">
                    <img src="/img/icon/home(breadcrumb).png" alt="homeicon" className="breadcrumb-home" />
                    <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow" />
                    <span className="breadcrumb-board">게시판</span>
                    <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow2" />
                    <span className="breadcrumb-category">곧 마감</span>
                </div>

                <div className="contour"></div>

                <div className="post-info1">
                    <img src="/img/icon/person.png" alt="personicon" className="post-author-icon" />
                    <span className="post-author">백지민 님</span>
                    <img src="/img/icon/calendar.png" alt="calendaricon" className="post-calendar-icon" />
                    <span className="post-writeday">2024-09-05</span>
                </div>

                <div className="post-info2">
                    <img src="/img/icon/group.png" alt="groupicon" className="post-group-icon" />
                    <span className="post-group">1 / 5 명</span>
                    <span className="post-group2">(4명 남음)</span>
                </div>

                <div className="post-info3">
                    <div className="post-member">
                        <img src="/img/icon/person.png" alt="personicon" className="post-member-icon" />
                        <span className="post-member-name">김지민</span>
                    </div>
                </div>

                <div className="post-info4">

                    <div className="post-startdate">
                        <img src="/img/icon/calendar(startdate).png" alt="startdateicon" className="post-startdate-icon" />
                        <span className="post-startdate-text">2024-09-06 AM 10:00</span>
                    </div>

                    <div className="post-enddate">
                        <img src="/img/icon/calendar(enddate).png" alt="enddateicon" className="post-enddate-icon" />
                        <span className="post-enddate-text">2024-09-06 AM 12:00</span>
                    </div>

                    <div className="post-location">
                        <img src="/img/icon/location.png" alt="locationicon" className="post-location-icon" />
                        <span className="post-location-text">경기도 안양시 만안구 양화로37번길 34 (연성대학교)</span>
                    </div>

                    <div className="kakao-button">

                        <Link to="https://place.map.kakao.com/8430579" className="goto-info-button">
                            <img src="/img/icon/information.png" alt="informationicon" className="goto-info-icon" />
                            <span className="goto-info-text">정보보기</span>
                        </Link>

                        <Link to="https://map.kakao.com/link/to/8430579" className="goto-road-button">
                            <img src="/img/icon/road.png" alt="roadicon" className="goto-road-icon" />
                            <span className="goto-road-text">길찾기</span>
                        </Link>

                    </div>

                    <div className="kakaomap">
                    </div>
                    <TheaterLocation />
                    
                </div>

                <div className="post-content">
                    <p className="post-content-text">
                    입찰 시 일정 고시금액 이상은 적격심사를 하게되어있습니다.
                    적격심사 시 신인도 가점 3점을 무조건 확보하는 것이 유리합니다.
                    적격심사 가점 항목 중 특허•디자인 등록 보유시 적격심사 신인도
                    가점 0.75점을 받을 수 있습니다.(이전 소요기간 약 2주)
                     
                     
                    이에 자사에서 가지고 있는 디자인등록증(간판/조형물)의 권리이전을 통해 광고인분들에게 도움이 되고자 합니다.
                    - 권리이전 수수료: 150만원(vat별도)
                    * 특허법인 양도이전 수수료 별도 (VAT,관납료 포함) : 286,600원
                     
                     
                     
                    ※ 문의 : 김세근 과장 010-3344-5305
                    </p>
                </div>

                <div className="post-comment">
                    <div className="post-comment-header">
                        <span className="QandA">Q&A</span>
                        <span className="QandA-count">(2개)</span>
                        <BasicModal />
                        {/* <span className="QandA-button-text">질문 작성하기</span> */}
                    </div>
                    <div className="post-comment-main">
                        <div className="post-question">
                            <img src="/img/icon/person(comment).png" alt="personicon" className="comment-author" />
                            <div className="comment-text">
                                <span className="comment-author-name">김지민</span>
                                <p className="comment-detail">
                                안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요? 안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요?
                                안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요?안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요?
                                안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요?안녕하세요. 화상회의에 필요한데 노트북 사용 가능한가요?
                                </p>
                                <span className="comment-loaddate">2024-09-05 21:49:17</span>
                            </div>

                            <FadeMenu />

                            {/* <img src="/img/icon/seemore.png" alt="seemoreicon" className="comment-seemore" />
                            <div className="comment-seemore-detail">
                                <img src="/img/icon/report.png" alt="reporticon" className="comment-report-icon" />
                                <span className="comment-report-text">신고</span>
                            </div> */}
                        </div>

                        <div className="post-reply">
                            <b className="post-reply-author">호스트의 답글</b>
                            <p className="reply-detail">
                            네 노트북 사용 가능합니다. 네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.네 노트북 사용 가능합니다. 네 노트북
                            사용 가능합니다. 네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.네 노트북 사용 가능
                            합니다. 네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.네 노트북 사용 가능합니다.
                            </p>
                            <span className="reply-loaddate">2024-09-05 21:49:17</span>
                            {/* <img src="/img/icon/seemore.png" alt="seemoreicon" className="comment-seemore" /> */}
                            {/* <div className="comment-seemore-detail">
                                <img src="/img/icon/report.png" alt="reporticon" className="comment-report-icon" />
                                <span className="comment-report-text">신고</span>
                            </div> */}
                        </div>
                    </div>

                    <BasicPagination />
                    {/* <div className="post-comment-footer">
                        <img src="/img/icon/beforePage.png" alt="beforepageicon" className="before-page" />
                        <img src="/img/icon/beforeNum.png" alt="beforenumicon" className="before-num" />
                        <div className="page-num-section">
                            <span className="page-num">1</span>
                            <span className="page-num">2</span>
                            <span className="page-num">3</span>
                        </div>
                        <img src="/img/icon/nextNum.png" alt="nextnumicon" className="next-num" />
                        <img src="/img/icon/nextPage.png" alt="nextpageicon" className="next-page" />
                    </div> */}

                </div>

                <div className="join-button-section">
                    <div className="join-button">
                        <img src="/img/icon/check.png" alt="checkicon" className="join-button-icon" />
                        <span className="join-button-text">참여하기</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Post;