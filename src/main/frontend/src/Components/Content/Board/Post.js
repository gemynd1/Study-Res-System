import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
function FadeMenu({sessionId, sessionName, comment_memberName, comment_memberId, 
                   board_memberName, board_memberId, ModalhandleOpen, comment_ccidx, 
                   setCurrentComment, comment_cccontent, comment, setComment, add_or_edit, 
                   setAdd_or_edit, setCurrentCommentGroupNum, comment_ccgroupnum, comment_comidx}) {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // 모달에 상태에 대한 useState
    // const [Modalopen, setOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const edit_comment = () => {
        setCurrentComment(comment_ccidx);
        console.log("comment_ccidx:", comment_ccidx);
        // console.log("comment_cccontent:", comment_cccontent);
        // console.log("수정 버튼 클릭");
        setAnchorEl(null);
        ModalhandleOpen();
        setComment(comment_cccontent);
        setAdd_or_edit('edit');
        // console.log("comment:", comment);
    }

    const delete_comment = () => {
        setCurrentComment(comment_ccidx);
        // console.log("comment_ccidx:", comment_ccidx);
        // console.log("comment_ccgroupnum:", comment_ccgroupnum);
        // console.log("comment_comidx:", comment_comidx);
        console.log("삭제 버튼 클릭");

        axios.post('http://localhost:8099/api/board/delete/comment', {
            comment_ccidx: comment_ccidx,
            comment_ccgroupnum: comment_ccgroupnum,
            comment_comidx: comment_comidx
        }, {
            header: {'Content-Type': 'application/json'}
        }).then(response => {
            // console.log(response.data);
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
        }).catch(error => {
            console.log(error);
            alert("댓글 삭제를 실패하였습니다. 다시 시도해주세요");
        })
        setAnchorEl(null);
    }

    const report_comment = () => {
        setCurrentComment(comment_ccidx);
        // console.log("comment_ccidx:", comment_ccidx);
        console.log("신고 버튼 클릭");

        axios.post('http://localhost:8099/api/board/report/comment', {
            comment_ccidx: comment_ccidx
        },{
            header: {'Content-Type': 'application/json'}
        }).then(response => {
            console.log(response.data);
            alert("댓글이 신고되었습니다.");
        }).catch(error => {
            console.log(error);
            alert("댓글 신고를 실패하였습니다. 다시 시도해주세요");
        })

        setAnchorEl(null);
    }

    const reply_comment = () => {
        setCurrentComment(comment_ccidx);
        setCurrentCommentGroupNum(comment_ccgroupnum);
        // console.log("comment_ccidx:", comment_ccidx);
        // console.log("comment_ccgroupnum:", comment_ccgroupnum);
        console.log("답글작성 버튼 클릭");
        setAnchorEl(null);
        ModalhandleOpen();
        setAdd_or_edit('add');
    }

    const menuItem = () => {
        const items = [];

        if (sessionId === board_memberId && sessionName === board_memberName) {
            items.push(<MenuItem onClick={report_comment}>신고</MenuItem>)
            items.push(<MenuItem onClick={reply_comment}>답글작성</MenuItem>)
            items.push(<MenuItem onClick={delete_comment}>개시글 삭제</MenuItem>)
        } else if (sessionId === comment_memberId && sessionName === comment_memberName) {
            items.push(<MenuItem onClick={edit_comment}>수정</MenuItem>)
            items.push(<MenuItem onClick={delete_comment}>개시글 삭제</MenuItem>)
        } else if (sessionId === board_memberId && sessionName === board_memberName && 
                   sessionId === comment_memberId && sessionName === comment_memberName) {
            items.push(<MenuItem onClick={edit_comment}>수정</MenuItem>)
            items.push(<MenuItem onClick={delete_comment}>개시글 삭제</MenuItem>)
        } else {
            items.push(<MenuItem onClick={report_comment}>신고</MenuItem>)
        }

        return items;
    }

    // console.log(sessionId, sessionName, comment_memberName, comment_midx, board_memberName, board_midx);

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

                {menuItem().map((item)=>item)}

            </Menu>
        </div>
    );
}
// 댓글 페이지네이션
// props로 페이지네이션의 총 페이지 수를 받아와서 사용해야함.
function BasicPagination({currentPage, onChange, size}) {
    return (
    <Pagination 
        count={size}
        page={currentPage}
        onChange={onChange}/>
    );
}   

// input ui component
function BasicTextFields({onChange, comment_cccontent, name}) {
    // console.log("comment_cccontent:", comment_cccontent);
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label='내용' name={name} value={comment_cccontent} variant="outlined" multiline rows={9} onChange={onChange} />
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


function BasicModal({comIdx, memberId, sessionId, maxCCGroupNum, ModalhandleOpen, 
                     ModalhandleClose, open, setOpen, comment, setComment, currentComment,
                     setCurrentComment, add_or_edit, setAdd_or_edit, Modalstyle, currentCommentGroupNum}) {
    // console.log("comment", comment);
    console.log("add_or_edit:", add_or_edit);

    const handleComment = (e) => {
        setComment(e.target.value);
      }
    

    const insert_comment = (event) => {
        event.stopPropagation()
        // console.log("등록 버튼 클릭");
        // console.log(comment);
        // console.log("memberId:", memberId);
        // console.log("sessionId:", sessionId);
        console.log("currentComment:", currentComment);

        // 값이 같으면 댓글에 대한 답글을 쓰는거고 다르면 그냥 댓글을 쓰는거임
        const commentType = memberId === sessionId ? 1 : 0;

        // console.log(commentType);
        // console.log("comIdx:", comIdx);
        console.log("add_or_edit:", add_or_edit);

        axios.post('http://localhost:8099/api/board/insert/comment',
         {
            comIdx:comIdx,
            commentType: commentType,
            comment: comment,
            maxCCGroupNum: maxCCGroupNum,
            sessionId: sessionId,
            currentComment: currentComment,
            add_or_edit: add_or_edit,
            currentCommentGroupNum: currentCommentGroupNum
         }, {
            header: {'Content-Type': 'application/json'}
        }).then(response => {
            console.log(response.data);
            response.data === true ? alert("댓글이 등록되었습니다.") : alert("댓글등록을 실패하였습니다. 다시 시도해주세요");
            window.location.reload();
            
        }).catch(error => {
            console.log(error);
            alert("댓글등록을 실패하였습니다. 다시 시도해주세요");
            window.location.reload();
        })

        setCurrentComment(0);
        setAdd_or_edit('add');
        setOpen(false);
    }

    return (
        comment !== null ? (
            <div className="QandA-button" onClick={ModalhandleOpen} style={Modalstyle}>
                <img src="/img/icon/write.png" alt="QandAicon" className="QandA-button-icon" />
                <div className="QandA-button-text">질문 작성하기</div>
                <Modal
                    open={open}
                    onClose={ModalhandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modal-header">
                            <span className="modal-header-title">답글 작성하기</span>
                        </div>

                        <div className="modal-title-section">
                            <span className="modal-title">답글</span>
                            <span className="modal-title-count1">0자</span>
                            <span className="modal-title-count2">/200자</span>
                        </div>
                        <BasicTextFields name="apply_comment" comment_cccontent={comment} onChange={handleComment}/>
                        <div className="modal-caution-section">
                            <img src="/img/icon/!(modal).png" alt="!" className="modal-caution-icon" />
                            <span className="modal-caution-text">단, 공간 및 예약에 대한 문의가 아닌 글은 무통보 삭제될 수 있습니다.</span>
                        </div>
                        <div className="modal-button-section">
                            <div className="modal-cancel-button" onClick={ModalhandleClose}>
                                <span className="modal-cancel-text">취소</span>
                            </div>
                            <div className="modal-active-button" onClick={insert_comment}>
                                <span className="modal-active-text">등록</span>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        ) : (
            <div className="QandA-button" onClick={ModalhandleOpen}>
                <img src="/img/icon/write.png" alt="QandAicon" className="QandA-button-icon" />
                <div className="QandA-button-text">질문 작성하기</div>
                <Modal
                    open={open}
                    onClose={ModalhandleClose}
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
                        <BasicTextFields name="question_comment" onChange={handleComment}/>
                        <div className="modal-caution-section">
                            <img src="/img/icon/!(modal).png" alt="!" className="modal-caution-icon" />
                            <span className="modal-caution-text">단, 공간 및 예약에 대한 문의가 아닌 글은 무통보 삭제될 수 있습니다.</span>
                        </div>
                        <div className="modal-button-section">
                            <div className="modal-cancel-button" onClick={ModalhandleClose}>
                                <span className="modal-cancel-text">취소</span>
                            </div>
                            <div className="modal-active-button" onClick={insert_comment}>
                                <span className="modal-active-text">등록</span>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    ) 
}

// 카카오맵
const TheaterLocation = ({kakaoPlace}) => {
    return (
      <div className="kakaomap">
        <Map
        center={{ lat: parseFloat(kakaoPlace.y), lng: parseFloat(kakaoPlace.x) }}
        style={{ width: '1090px',
                 height: '378px',
                 borderRadius: '20px' }}
        >
            <MapMarker position={{ lat: parseFloat(kakaoPlace.y), lng: parseFloat(kakaoPlace.x) }}>
                <div style={{color:"#000"}}>{kakaoPlace.place_name}</div>
            </MapMarker>
        </Map>
      </div>
    );
  };



const Post = () => {
    // url에 담겨져 있는 parameter 값 가져오기
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const comIdx = queryParams.get('comIdx');

    const [commentData, setCommentData] = useState([]);
    const [boardContents, setBoardContents] = useState({midx: "", memberName: "", comTitle: "", comContent: "", comRegDate: "", comStartDate: "", comEndDate: "", comAddress: "", comPlace: "", comToCount: "", groupCount: "", memberNames: ""});
    // const [boardContents, setBoardContents] = useState();
    const [groupMemberInfos, setGroupMemberInfos] = useState([{memberId: "", memberName: "", midx: "", comIdx: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentSize, setCommentSize] = useState(0);
    // 모달의 open 상태를 관리하는 useState
    const [open, setOpen] = useState(false);
    // 현재 seemore 버튼의 대상이 되는 댓글의 ccidx의 값을 저장하는 useState
    const [currentComment, setCurrentComment] = useState(0);
    // 현재 댓글의 groupNum의 값을 저장하는 useState
    const [currentCommentGroupNum, setCurrentCommentGroupNum] = useState(0);
    // 모달에서의 댓글의 내용을 저장하는 useState
    const [comment, setComment] = useState('');
    // 댓글 추가인지 수정인지 구분하는 useState
    const [add_or_edit, setAdd_or_edit] = useState('add');
    // kakao restapi 값을 담는 변수
    const [kakaoRestApi, setKakaoRestApi] = useState([]);
    // kakao에서의 주소에 대한 장소id값을 담는 변수
    const [kakaoPlace, setKakaoPlace] = useState({id: "", x: 0, y: 0, place_name: ""});

    const sessionId = sessionStorage.getItem('id');
    const sessionName = sessionStorage.getItem('name');

    // 이전 페이지로 이동하는 함수
    const navigate = useNavigate();

    // 모달 open 람수
    const ModalhandleOpen = () => setOpen(true);

    // 모달 close 함수
    const ModalhandleClose = (event) => {
        event.stopPropagation()
        setCurrentComment(0);
        setComment('');
        setOpen(false);
    };

    // 페이지네이션의 페이지가 변경될 때 호출되는 함수
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // 현재 페이지 상태 업데이트
        // console.log(currentPage)
    };

    const insert_groupMember = () => {
        //현재 session이랑 해당 post의 groupmember들 작성자 확인 후 그리고 그룹의 인원 수가 현재인원수 보다 적으면 insert문 실행
        console.log("참여하기 버튼 클릭");
        // console.log("comToCount: ", boardContents.comToCount);
        // console.log("groupCount: ", groupMemberInfos.length + 1);
        // console.log("comIdx: ", comIdx);
        // console.log("sessionId: ", sessionId);
        if (sessionId !== null && groupMemberInfos.length + 1 < boardContents.comToCount) {
            axios.post("http://localhost:8099/api/board/insert/groupMember", {
                comIdx: comIdx,
                sessionId: sessionId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.data);
                alert("그룹 참여가 완료되었습니다.");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                alert("그룹 참여를 실패하였습니다. 다시 시도해주세요.");
            })
        }else{
            alert("그룹에 참여할 수 없습니다. 다시 시도해주세요.");
        }
    }

    const groupOutPage = () => {
        console.log("그룹 나가기 버튼 클릭");
        // console.log("comIdx: ", comIdx);
        // console.log("sessionId: ", sessionId);
        if(sessionId !== null && comIdx !== 0) {
            axios.post("http://localhost:8099/api/board/delete/groupMember", {
                comIdx: comIdx,
                sessionId: sessionId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.data);
                alert("그룹 나가기가 완료되었습니다.");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                alert("그룹 나가기를 실패하였습니다. 다시 시도해주세요.");
            })
        }else{
            alert("그룹에서 나갈 수 없습니다. 다시 시도해주세요.");
        }
    }

    const post_delete = () => {
        console.log("삭제 버튼 클릭");
        // console.log("comIdx: ", comIdx);
        if(sessionId === boardContents.memberId) {
            axios.post("http://localhost:8099/api/board/delete/post",  {
                comIdx: comIdx
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.data);
                alert("게시글이 삭제되었습니다.");
                navigate(-1);
            }).catch(error => {
                console.log(error);
                alert("게시글 삭제를 실패하였습니다. 다시 시도해주세요.");
            })
        }
    }

    const goto_back = () => {
        console.log("뒤로가기 버튼 클릭");
        navigate(-1);
    }

    const renderButtons = () => {
        if (groupMemberInfos.some(member => member.memberId === sessionId && member.memberName === sessionName)) {
            return (
                <>
                    <div className="out-button-section" onClick={groupOutPage}>
                        <div className="out-button">
                            <img src="/img/icon/out.png" alt="outIcon" className="out-button-icon" />
                            <span className="out-button-text">그룹 나가기</span>
                        </div>
                    </div>
                    <div className="back-button-section" onClick={goto_back}>
                        <div className="back-button">
                            <img src="/img/icon/back.png" alt="backIcon" className="back-button-icon" />
                            <span className="back-button-text">뒤로가기</span>
                        </div>
                    </div>
                </>
            );
        }

        if (boardContents && sessionId === boardContents.memberId && sessionName === boardContents.memberName) {
            return (
                <>
                    <Link to={`/board/postRewrite/?comIdx=${comIdx}`} style={{ textDecoration: "none"}}>
                        <div className="fix-button-section">
                            <div className="fix-button">
                                <img src="/img/icon/fix.png" alt="fixIcon" className="fix-button-icon" />
                                <span className="fix-button-text">수정</span>
                            </div>
                        </div>
                    </Link>
                    <div className="delete-button-section" onClick={post_delete}>
                        <div className="delete-button">
                            <img src="/img/icon/delete.png" alt="deleteIcon" className="delete-button-icon" />
                            <span className="delete-button-text">삭제</span>
                        </div>
                    </div>
                    <div className="out-button-section" onClick={groupOutPage} style={{marginTop: '40px'}}>
                        <div className="out-button">
                            <img src="/img/icon/out.png" alt="outIcon" className="out-button-icon" />
                            <span className="out-button-text">그룹 나가기</span>
                        </div>
                    </div>
                    <div className="back-button-section" onClick={goto_back}>
                        <div className="back-button">
                            <img src="/img/icon/back.png" alt="backIcon" className="back-button-icon" />
                            <span className="back-button-text">뒤로가기</span>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="join-button-section" onClick={insert_groupMember}>
                    <div className="join-button">
                        <img src="/img/icon/check.png" alt="checkIcon" className="join-button-icon" />
                        <span className="join-button-text">참여하기</span>
                    </div>
                </div>
                <div className="back-button-section" onClick={goto_back}>
                    <div className="back-button">
                        <img src="/img/icon/back.png" alt="backIcon" className="back-button-icon" />
                        <span className="back-button-text">뒤로가기</span>
                    </div>
                </div>
            </>
        );
    };

    // useEffect(() => {
    //     axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
    //         params: { query: boardContents.comAddress },
    //         headers: {
    //             'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(response => {
    //         console.log(response.data);
    //         setKakaoRestApi(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // },[boardContents.comAddress])

    useEffect(() => {
        const fetchAddressData = async () => {
            if (!boardContents.comAddress) {
                console.log('Missing comAddress');
                return;
            }

            try {
                const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
                    params: { query: boardContents.comAddress },
                    headers: {
                        'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log(response.data);
                setKakaoRestApi(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (boardContents.comAddress) {
            fetchAddressData();
        }
    }, [boardContents.comAddress]);

    useEffect(() => {
        axios.get('http://localhost:8099/api/board/post/comment', {
            params: { comIdx, currentPage, commentSize },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            setCommentData(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [comIdx, currentPage, commentSize])

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:8099/api/board/post/commentSize', {
                params: { comIdx },
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            axios.get('http://localhost:8099/api/board/post', {
                params: { comIdx },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        ]).then(axios.spread((commentSize, boardContents) => {
            commentSize.data === 0 ? setCommentSize(0) : setCommentSize(commentSize.data)
            setBoardContents(...boardContents.data.ViewPost)
            setGroupMemberInfos(boardContents.data.ViewGroupMember_forPost)
        })).catch(error => {
            console.log(error);
        })
    },[comIdx])

    useEffect(() => {
        if (kakaoRestApi && kakaoRestApi.documents) {
            kakaoRestApi.documents.map((data, index) => {
                if(data && index === 0) {
                    // console.log("id_data: " + data.id);
                    setKakaoPlace({id: data.id,
                                   x: data.x, 
                                   y: data.y, 
                                   place_name: data.place_name});
                    console.log(kakaoPlace)

                    // 위도와 경도의 값도 추출가능
                    // console.log("x_data: " + data.x);
                    // console.log("y_data: " + data.y);
                }
                return null;
            });
        }
    }, [kakaoRestApi]);

    useEffect(() => {
        console.log(kakaoPlace);
        console.log(typeof(parseFloat(kakaoPlace.x)));
        console.log(typeof(21.123123123));
    }, [kakaoPlace]); 

    console.log(boardContents);
    console.log(commentData);
    // console.log(sessionId, sessionName);
    // console.log(boardContents.memberId, boardContents.memberName);
    // console.log(commentSize);
    // console.log(groupMemberInfos);
    // console.log(sessionId !== boardContents.memberId);
    // console.log(comment);
    console.log("kakaoRestApi: " + kakaoRestApi.documents);

    if (!boardContents | !commentData | !groupMemberInfos) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="ilovecoding">
                <div className="post">

                    <p className="title">{boardContents.comTitle}</p>

                    <div className="breadcrumb">
                        <img src="/img/icon/home(breadcrumb).png" alt="homeicon" className="breadcrumb-home" />
                        <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow" />
                        <span className="breadcrumb-board">게시판</span>
                        <img src="/img/icon/arrow(breadcrumb).png" alt="arrowicon" className="breadcrumb-arrow2" />
                        <span className="breadcrumb-category">{boardContents.comCategoryName}</span>
                    </div>

                    <div className="contour"></div>

                    <div className="post-info1">
                        <img src="/img/icon/person.png" alt="personicon" className="post-author-icon" />
                        <span className="post-author">{boardContents.memberName} 님</span>
                        <img src="/img/icon/calendar.png" alt="calendaricon" className="post-calendar-icon" />
                        <span className="post-writeday">{boardContents.comRegDate}</span>
                    </div>

                    <div className="post-info2">
                        <img src="/img/icon/group.png" alt="groupicon" className="post-group-icon" />
                        <span className="post-group">{groupMemberInfos.length + 1} / {boardContents.comToCount} 명</span>
                        <span className="post-group2">({boardContents.comToCount - (groupMemberInfos.length + 1)}명 남음)</span>
                    </div>

                    <div className="post-info3-frame">
                        <div className="post-info3">
                            <div className="post-member">
                                <img src="/img/icon/person.png" alt="personicon" className="post-member-icon" />
                                <span className="post-member-name">{boardContents.memberName}</span>
                            </div>
                        </div>

                        {groupMemberInfos.map((groupMemberInfo) => (
                            <div className="post-info3">
                                <div className="post-member">
                                    <img src="/img/icon/person.png" alt="personicon" className="post-member-icon" />
                                    <span className="post-member-name">{groupMemberInfo.memberName}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="post-info4">

                        <div className="post-startdate">
                            <img src="/img/icon/calendar(startdate).png" alt="startdateicon" className="post-startdate-icon" />
                            <span className="post-startdate-text">{boardContents.comStartDate}</span>
                        </div>

                        <div className="post-enddate">
                            <img src="/img/icon/calendar(enddate).png" alt="enddateicon" className="post-enddate-icon" />
                            <span className="post-enddate-text">{boardContents.comEndDate}</span>
                        </div>

                        <div className="post-location">
                            <img src="/img/icon/location.png" alt="locationicon" className="post-location-icon" />
                            <span className="post-location-text">{boardContents.comAddress} {boardContents.comAddress !== '온라인' ? "(" + boardContents.comPlace + ")" : null}</span>
                        </div>


                        {/* <div className="kakaomap">
                        </div> */}
                        {boardContents.comAddress !== '온라인' && boardContents.comAddress !== '스터디룸' ? (
                            <>
                                <div className="kakao-button">

                                    <a href={`https://place.map.kakao.com/${kakaoPlace.id}`} className="goto-info-button">
                                        <img src="/img/icon/information.png" alt="informationicon" className="goto-info-icon" />
                                        <span className="goto-info-text">정보보기</span>
                                    </a>

                                    <a href={`https://map.kakao.com/link/to/${kakaoPlace.place_name},${parseFloat(kakaoPlace.y).toFixed(6)},${parseFloat(kakaoPlace.x).toFixed(6)}`} className="goto-road-button">
                                        <img src="/img/icon/road.png" alt="roadicon" className="goto-road-icon" />
                                        <span className="goto-road-text">길찾기</span>
                                    </a>

                                </div>

                                <TheaterLocation kakaoPlace={kakaoPlace} />
                            </>
                        ) : null }
                        
                    </div>

                    <div className="post-content">
                        <p className="post-content-text">{boardContents.comContent}</p>
                    </div>

                    <div className="post-comment">
                        <div className="post-comment-header">
                            <span className="QandA">Q&A</span>
                            {/* <span className="QandA-count">({commentData.length}개)</span> */}
                            {(sessionId !== boardContents.memberId && sessionId !== null) ? (
                                <BasicModal comIdx={comIdx}
                                            sessionId={sessionId}
                                            memberId={boardContents.memberId} 
                                            maxCCGroupNum={boardContents.maxCCGroupNum}
                                            ModalhandleOpen={ModalhandleOpen}
                                            ModalhandleClose={ModalhandleClose}
                                            open={open}
                                            setOpen={setOpen}
                                            comment={comment}
                                            setComment={setComment}
                                            currentComment={currentComment}
                                            setCurrentComment={setCurrentComment}
                                            add_or_edit={add_or_edit}
                                            setAdd_or_edit={setAdd_or_edit}
                                            currentCommentGroupNum={currentCommentGroupNum}/>
                            ) : (
                                <BasicModal Modalstyle={{display: 'none'}}
                                            comIdx={comIdx}
                                            sessionId={sessionId}
                                            memberId={boardContents.memberId} 
                                            maxCCGroupNum={boardContents.maxCCGroupNum}
                                            ModalhandleOpen={ModalhandleOpen}
                                            ModalhandleClose={ModalhandleClose}
                                            open={open}
                                            setOpen={setOpen}
                                            comment={comment}
                                            setComment={setComment}
                                            currentComment={currentComment}
                                            setCurrentComment={setCurrentComment}
                                            add_or_edit={add_or_edit}
                                            setAdd_or_edit={setAdd_or_edit}
                                            currentCommentGroupNum={currentCommentGroupNum}/>
                            )}
                        </div>

                        {/* {commentData.map((root) => (
                            <div className="post-comment-main" key={root.CCGroupNum}>
                                {commentData.map((comment) => (
                                    comment.ccrefnum === 1 && root.CCGroupNum === comment.CCGroupNum ? (
                                        <div className="post-question">
                                            <img src="/img/icon/person(comment).png" alt="personicon" className="comment-author" />
                                            <div className="comment-text">
                                                <span className="comment-author-name">{comment.memberName}</span>
                                                <p className="comment-detail">{comment.cccontent}</p>
                                                <span className="comment-loaddate">{comment.ccregdate}</span>
                                            </div>

                                            <FadeMenu sessionId={sessionId} sessionName={sessionName} memberName={comment.memberName} comidx={comment.midx} />

                                        </div>
                                    ) : comment.ccrefnum === 2 && root.CCGroupNum === comment.CCGroupNum ? (
                                        <div className="post-reply">
                                            <b className="post-reply-author">호스트의 답글</b>
                                            <p className="reply-detail">{comment.cccontent}</p>
                                            <span className="reply-loaddate">{comment.ccregdate}</span>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        ))} */}

                        <div className="post-comment-main">
                            {commentData.map((comment) => (
                                comment.ccrefnum === 1 ? (
                                    <div className="post-question">
                                        <img src="/img/icon/person(comment).png" alt="personicon" className="comment-author" />
                                        <div className="comment-text">
                                            <span className="comment-author-name">{comment.memberName}</span>
                                            <p className="comment-detail">{comment.cccontent}</p>
                                            <span className="comment-loaddate">{comment.ccregdate}</span>
                                        </div>

                                        <FadeMenu sessionId={sessionId}
                                                sessionName={sessionName}
                                                comment_memberName={comment.memberName}
                                                comment_memberId={comment.memberId}
                                                board_memberName={boardContents.memberName}
                                                board_memberId={boardContents.memberId}
                                                ModalhandleOpen={ModalhandleOpen}
                                                ModalhandleClose={ModalhandleClose}
                                                comment_ccidx={comment.ccidx}
                                                setCurrentComment={setCurrentComment}
                                                comment_cccontent={comment.cccontent}
                                                comment={comment}
                                                setComment={setComment}
                                                add_or_edit={add_or_edit}
                                                setAdd_or_edit={setAdd_or_edit}
                                                setCurrentCommentGroupNum={setCurrentCommentGroupNum}
                                                comment_ccgroupnum={comment.ccgroupnum}
                                                comment_comidx={comment.comidx} />

                                    </div>
                                ) : comment.ccrefnum === 2 ? (
                                    <div className="post-reply">
                                        <b className="post-reply-author">호스트의 답글</b>
                                        <p className="reply-detail">{comment.cccontent}</p>
                                        <span className="reply-loaddate">{comment.ccregdate}</span>
                                        
                                        {/* <FadeMenu sessionId={sessionId}
                                        sessionName={sessionName}
                                        comment_memberName={comment.memberName}
                                        comment_midx={comment.midx}
                                        board_memberName={boardContents.memberName}
                                        board_memberId={boardContents.memberId} /> */}
                                    </div>
                                ) : null
                            ))}
                        </div>

                        <BasicPagination page={currentPage} onChange={handlePageChange} size={commentSize} />

                    </div>

                    {renderButtons()}
                    
                </div>
            </div>
        </>
    )
}

export default Post;