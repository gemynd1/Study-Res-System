import React from "react";
// import { Link } from "react-router-dom";
import '../../../style/post.css';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

const ITEM_HEIGHT = 48;

function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
}

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

                        <div className="goto-info-button">
                            <img src="/img/icon/information.png" alt="informationicon" className="goto-info-icon" />
                            <span className="goto-info-text">정보보기</span>
                        </div>

                        <div className="goto-road-button">
                            <img src="/img/icon/road.png" alt="roadicon" className="goto-road-icon" />
                            <span className="goto-road-text">길찾기</span>
                        </div>

                    </div>

                    <div className="kakaomap">
                        지도
                    </div>
                    
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
                        <div className="QandA-button">
                            <img src="/img/icon/write.png" alt="QandAicon" className="QandA-button-icon" />
                            <span className="QandA-button-text">질문 작성하기</span>
                        </div>
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
                            <LongMenu />
                            {/* <img src="/img/icon/seemore.png" alt="seemoreicon" className="comment-seemore" />
                            <div className="comment-seemore-detail">
                                <img src="/img/icon/report.png" alt="reporticon" className="comment-report-icon" />
                                <span className="comment-report-text">신고</span>
                            </div> */}
                        </div>

                        <div className="post-reply">
                            <span className="psot-reply-author">호스트의 답글</span>
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

                    <div className="post-comment-footer">
                        <img src="/img/icon/beforePage.png" alt="beforepageicon" className="before-page" />
                        <img src="/img/icon/beforeNum.png" alt="beforenumicon" className="before-num" />
                        <div className="page-num-section">
                            <span className="page-num">1</span>
                            <span className="page-num">2</span>
                            <span className="page-num">3</span>
                        </div>
                        <img src="/img/icon/nextNum.png" alt="nextnumicon" className="next-num" />
                        <img src="/img/icon/nextPage.png" alt="nextpageicon" className="next-page" />
                    </div>

                </div>

                <div className="join-button">
                    <img src="/img/icon/check.png" alt="checkicon" className="join-button-icon" />
                    <span className="join-button-text">참여하기</span>
                </div>
                
            </div>
        </>
    )
}

export default Post;