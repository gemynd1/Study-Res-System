import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import teamDetail from "../../../style/teamDetail.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { styled, TableCell, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import { Modal, Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
// import { nanoid } from nanoid;
const { nanoid } = require('nanoid');

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
// const clientKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
const customerKey = "ll-yw-PKw-5_SU3JBZJvL";

// 예약 최종 확인 모델 여기서 데이터 처리
const PaymentModal = ({
  open, onClose, roomTitle, roomnum, date, 
  start, end, time, people, totalPrice}) => {

  const price = totalPrice;
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  const requestData = [
    { 
      roomnum : roomnum, 
      date : date, 
      start : start, 
      end : end,
      memberId : sessionStorage.getItem("id"),
      OrderType : "GroupOrder",
    },
  ]
  
  useEffect(() => {
    if(open) {
      const fetchPaymentWidgets = async () => {
        try {
          // ------  결제위젯 초기화 ------
          const tossPayments = await loadTossPayments(clientKey);
          // 회원 결제
          const widgets = tossPayments.widgets({
            customerKey,
          });
          // 비회원 결제
          // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
          setWidgets(widgets);
        } catch (error) {
          console.error("Error loading Toss Payments widgets:", error);
        }
      }
      fetchPaymentWidgets();
    }
  }, [clientKey, customerKey, open]);
  
  useEffect(() => {
    const renderPaymentWidgets = async () => {
      if (!widgets || !open) return;
      setTimeout(async () => {
        // ------ 주문의 결제 금액 설정 ------
        await widgets.setAmount({
          currency: "KRW",
          value: Number(price),
        });
        try {
          await Promise.all([
            // ------ 결제 UI 렌더링 ------
            widgets.renderPaymentMethods({
              selector: "#payment-method",
              variantKey: "DEFAULT",
            }),
            // ------ 이용약관 UI 렌더링 ------
            widgets.renderAgreement({
              selector: "#agreement",
              variantKey: "AGREEMENT",
            }),
          ]);

          setReady(true);
        } catch (error) {
          console.error("Error rendering payment widgets:", error);
        }
      }, 100);
    }
  
    renderPaymentWidgets();
  }, [widgets, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <div className="OrderTitle"
          style={{ 
            fontSize: "30px", fontWeight: "600", color: "#000000", marginBottom: "30px",
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >예약 정보</div>
        <Typography variant="h6">{roomTitle}</Typography>
        <Typography>날짜: {date}</Typography>
        <Typography>시간: {time}</Typography>
        <Typography>인원: {people}명</Typography>
        <Typography>총 가격: {totalPrice}원</Typography>
        <div className="title" style={{ fontSize: "24px", fontWeight: "600", color: "#000000", marginTop: "20px" }}>결제방법</div>
        <div id="payment-method" style={{ width: "100%" }} />
        <div id="agreement" />
        <button
          style={{
            marginTop: "20px", width: "100%" , height: "60px", fontSize: "1.25rem", padding: "12px 24px", 
            margin: "2px 2px", color: "white", backgroundColor: "#3065AC", borderRadius: "3px", border:"none" 
          }}
          className="button"
          disabled={!ready}
          onClick={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: nanoid(),
                orderName: `${roomTitle} - ${date} (${start} ~ ${end}) (${people}명) - ${totalPrice}원`,
                customerName: `${sessionStorage.getItem("name")}`,
                successUrl: window.location.origin + `/paysuccess?ordertype=GroupOrder&roomnum=${roomnum}&date=${date}&start=${start}&end=${end}&people=${people}`,
                failUrl: window.location.origin + `/fail`,
              });

              // const requestData = [
              //   { 
              //     roomnum : roomnum, 
              //     date : date, 
              //     start : start, 
              //     end : end,
              //     memberId : sessionStorage.getItem("id"),
              //     OrderType : "GroupOrder",
              //   },
              // ]
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}
        >
          예약하기
        </button>
        {/* <button id="payment-button" onClick={handlePaymentRequest}>결제하기</button> */}
        {/* 결제 툴 추가 해야함. */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button onClick={onClose} sx={{ marginRight: "8px" }}>
            취소
          </Button>
          <Button variant="contained" color="primary">
            예약
          </Button>
        </Box> */}
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// 슬라이드 이동 버튼
const MyButtons = ({ swiper }) => {
  return (
    <div className="moveButton">
      <div onClick={() => swiper.slidePrev()}>
        <img
          className="prevButton"
          src="/img/icon/prevButton.png"
          alt="prevButton"
        />
      </div>
      <div onClick={() => swiper.slideNext()}>
        <img
          className="nextButton"
          src="/img/icon/nextButton.png"
          alt="nextButton"
        />
      </div>
    </div>
  );
}

// 별점 추가 - 이 부분은 리뷰 페이지에서 작성한 별점 수를 보여주면됨.
const ControlledRating = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

// 가격 선택
const RadioButtonsGroup = ({ selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    setSelectedValue(event.target.value); // 선택된 값 업데이트
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedValue} // 상태에서 값을 받아옴
        name="radio-buttons-group"
        onChange={handleChange} // 변경 시 상태 업데이트
      >
        <FormControlLabel
          value={selectedValue}
          // value="1000"
          control={<Radio />}
          label={`${selectedValue}/시간(인)`}
        />
        {/* <FormControlLabel
          value="2000"
          control={<Radio />}
          label="2000원/시간(인)"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}

// 시간 단위 예약하기 버튼 클릭하면 보여주는 캘릭더 컴포넌트
const BasicDateCalendar = ({ selectedDate, setSelectedDate }) => {
  // const [selectedDate, setSelectedDate] = useState(null);

  const disablePastDates = (date) => {
    return date.isBefore(dayjs(), "day");
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // 선택된 날짜를 상태로 저장
  };

  // 상태가 업데이트된 후, 선택된 날짜를 콘솔에 출력
  useEffect(() => {
    if (selectedDate) {
      console.log("선택된 날짜:", selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]); // selectedDate가 변경될 때마다 실행

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        shouldDisableDate={disablePastDates}
        onChange={handleDateChange} // 날짜 선택 핸들러 추가
        value={selectedDate} // 선택된 날짜를 상태로 관리
      />
    </LocalizationProvider>
  );
}

// 버튼 커마한거
const BasicButtons = ({text, width, height, fontSize, padding, margin, backgroundColor, color, onClick}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: backgroundColor || "#ffffff",
        fontWeight: "bold",
        width: width || "92px",
        height: height || "74px",
        fontSize: fontSize || "1.25rem",
        padding: padding || "12px 24px",
        margin: margin || "2px 2px",
        color: color || "#000000",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

// 예약가능 버튼
const BasicButtons2 = ({
  text, width, height, fontSize, padding, margin, backgroundColor, 
  color, selectedTimes, totalPrice, count, selectedDate, roomOrderTitle, sginum
}) => {
  const navigate = useNavigate();
  const roomTitle= roomOrderTitle;
  const roomnum = sginum;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonReadonly, setIsButtonReadonly] = useState(true); // 읽기 전용 상태 관리
  // const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : ""; // 문자열로 변환

  // 시간 총 몇시간인지
  const formatTimeRange = (times) => {
    if (times.length === 1) {
      const start = times[0];
      return {
        timeRange: `${String(start).padStart(2, "0")}:00 ~ ${String(
          start + 1
        ).padStart(2, "0")}:00 (총 1시간)`,
        totalHours: 1,
        start,
        end: start + 1,
      };
    } else if (times.length >= 2) {
      const start = Math.min(...times);
      const end = Math.max(...times);
      const totalHours = end - start + 1;
      return {
        // 00:00 ~ 01:00 (총1시간)
        timeRange: `${String(start).padStart(2, "0")}:00 ~ ${String(
          end + 1
        ).padStart(2, "0")}:00 (총 ${totalHours}시간)`,
        totalHours,
        start,
        end,
      };
    }
    return { timeRange: "", totalHours: 0, start: 0, end: 0};
  };

  const handleOpenModal = () => {
    if (!isButtonReadonly && sessionStorage.getItem("id")) {
      setIsModalOpen(true); // 읽기 전용 상태가 아니면 모달 열기
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const { timeRange, totalHours, start, end } = formatTimeRange(selectedTimes);

  // selectedTimes와 selectedDate가 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
      if (selectedTimes.length > 0 && selectedDate) {
        setIsButtonReadonly(false); // 둘 다 선택되었을 때 읽기 전용 해제
      } else {
        setIsButtonReadonly(true); // 선택되지 않으면 읽기 전용 상태 유지
      }
  }, [selectedTimes, selectedDate]);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: isButtonReadonly || !sessionStorage.getItem("id") ? "#d3d3d3" : backgroundColor || "#7EE9BB",
          fontWeight: "bold",
          width: width || "192px",
          height: height || "74px",
          fontSize: fontSize || "1.25rem",
          padding: padding || "12px 24px",
          margin: margin || "2px 2px",
          color: color || "#000000",
          cursor: isButtonReadonly ? "not-allowed" : "pointer", // 클릭 불가시 커서 모양 변경
        }}
        onClick={handleOpenModal} // 모달 열기
      >
        {text}
      </Button>

      {/* 모달 컴포넌트 */}
      <PaymentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        roomTitle={roomTitle}
        roomnum={roomnum}
        date={selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
        start={start}
        end={end}
        time={timeRange}
        totalHours={totalHours}
        people={count}
        totalPrice={totalPrice}
      />
    </>
  );
}

const TeamDetailButtons = ({ count, setCount, start, end }) => {
  // const [count, setCount] = useState(3); // 초기값은 3
  const handleIncrement = () => {
    if (count < end) {
      setCount(Number(count) + 1);
    }
  };

  const handleDecrement = () => {
    if (count > start) {
      setCount(Number(count) - 1);
    }
  };

  console.log(start, end)

  return (
    <div className="teamDetail__side-buttons-wrap">
      <BasicButtons
        text={count}
        width="364px"
        height="74px"
        backgroundColor="#ffffff"
      />
      <div className="teamDetail__side-buttons">
        <BasicButtons
          text="-"
          width="84px"
          height="74px"
          backgroundColor="#A5A6B9"
          onClick={handleDecrement}
        />
        <BasicButtons
          text="+"
          width="84px"
          height="74px"
          backgroundColor="#A5A6B9"
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
}

// 0:00~23:00 시간 선택해주는 부분
const TimeSelector = ({ selectedTimes, onTimeChange }) => {
  const handleChange = (event, newSelectedTimes) => {
    if (newSelectedTimes.length <= 2) {
      if (newSelectedTimes.length === 2) {
        const [first, second] = newSelectedTimes;
        const start = Math.min(first, second);
        const end = Math.max(first, second);
        const newSelection = [];
        for (let i = start; i <= end; i++) {
          if (!newSelectedTimes.includes(i)) {
            newSelection.push(i);
          }
        }

        onTimeChange([...newSelectedTimes, ...newSelection]);
      } else {
        onTimeChange(newSelectedTimes);
      }
    } else {
      onTimeChange([]);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <ToggleButtonGroup
        value={selectedTimes}
        onChange={handleChange}
        aria-label="time-selector"
        size="small"
        className="toggleButtonGroup"
      >
        {/* 여기서 데이터를 가져와서 예약이 완료된 시간타임이 있으면 unselect 처리 */}
        {hours.map((hour) => (
          <ToggleButton
            key={hour}
            value={hour}
            aria-label={`${hour}:00`}
            className="toggleButton"
          >
            {hour}:00
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}

const TeamDetail = () => {
  const [swiper, setSwiper] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTimeChoiceSelected, setIsTimeChoiceSelected] = useState(false);
  const {sgiId} = useParams(); // 파라미터 저장
  const [ImgContent, setImgContent] = useState([]);
  const [htmlcontentdata, sethtmlcontentdata] = useState(
    {
      SGINum : '',
      SGIUseState : '',
      SGIContent1 : '',
      SGIContent2 : '',
      SGIDContent1 : ``,
      SGIDContent2 : ``,
      SGIDContent3 : ``,
      SGIDContent4 : ``,
      SGIDContent5 : '',
      SGIDContent6 : '',
      SGIDContent7 : '',
      SGIDContent8 : '',
      SGIDContent9 : 0,
      SGIDContent10 : 0,
      SGIIdx : '',
      SGPPrice : '',
    }
  );
  
  const handleRadioChange = (event) => {
    setIsTimeChoiceSelected(event.target.value === "timeChoice");
  };

  const totalPrice = selectedTimes.length * count * selectedValue;

  const contentRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = contentRefs.findIndex(
            (ref) => ref.current === entry.target
          );

          if (entry.isIntersecting) {  
            setActiveIndex(index);
          } else if(activeIndex === index){
            setActiveIndex(null);
          }
        });
      },
      { threshold: 0.8 } // 50% 이상 보이면 활성화
    );

    contentRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      contentRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [contentRefs]);

  useEffect(() => {
    axios.get('http://localhost:8099/api/studygInfoDetail', 
    {
      params: {
        sgiId
      },
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log(res.data);
      const Img = res.data['studyGImg'];
      const data = res.data['studyGInfoVo'];
      
      sethtmlcontentdata((prevState) => ({
        ...prevState,
        SGINum : data.sginum,
        SGIUseState : data.sgiuseState,
        SGIContent1 : data.sgicontent1,
        SGIContent2 : data.sgicontent2,
        SGIDContent1 : data.sgidcontent1,
        SGIDContent2 : data.sgidcontent2,
        SGIDContent3 : data.sgidcontent3,
        SGIDContent4 : data.sgidcontent4,
        SGIDContent5 : data.sgidcontent5,
        SGIDContent6 : data.sgidcontent6,
        SGIDContent7 : data.sgidcontent7,
        SGIDContent8 : data.sgidcontent8,
        SGIDContent9 : Number(data.sgidcontent9),
        SGIDContent10 : Number(data.sgidcontent10),
        SGIIdx : data.studyGPareVo.sgiidx
      }))
      setCount(data.sgidcontent9);
      setImgContent(Img);
      setSelectedValue(data.studyGPareVo.sgpprice);
    })
    .catch(error => {
      console.log(error);
      return false;
    })
  }, []);

  useEffect(() => {
    console.log('Updated htmlcontentdata:', htmlcontentdata, ImgContent, selectedValue);
  }, [htmlcontentdata, ImgContent, selectedValue]);

  const onContentClick = (index) => {
    contentRefs[index]?.current?.scrollIntoView({behavior: 'smooth'});
    setActiveIndex(index);
  }
  const getSelectColor = (index) => {
    return index === activeIndex ? 'yellow' : 'white';
  }

  // 이미지 팝업창
  const [ImgOpenModal, setImgOpenModal] = useState(false);
  const [ImgModalContent, setImgModalContent] = useState([]);
  const handleImgOpenModal = (ImgContent) => {  
    // console.log(ImgContent)
    setImgModalContent(ImgContent);
    setImgOpenModal(true);
  }

  const handleImgCloseModal = () => {
    setImgModalContent([]);
    setImgOpenModal(false);
  }

  const ImgModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
  }

  return (
    <div className="teamDetail">
      <div className="teamDetail__main">
        <div className="teamDetail__main-header">
          <h1 className="teamDetail__main-content-title">{htmlcontentdata.SGIContent1}</h1>
          <h4 className="teamDetail__main-content-title-option">
            {/* 태그 등등 */}
          </h4>
        </div>
        <div className="teamDetail__main-image">
          {/* <MyButtons swiper={swiper} /> */}
          <Swiper
            navigation={ImgContent.length > 1}
            modules={[Navigation]}
            className="mySwiper"
            pagenation={{ clickable: true }}
            onSwiper={setSwiper}
          >
            {/* <SwiperSlide>Slide 1</SwiperSlide> */}
            {ImgContent.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="teamDetail__main-content">
          <h3 className="teamDetail__main-content-title">
            {htmlcontentdata.SGIContent2}
          </h3>
          <div className="teamDetail__main-content-title-option_list">
            <ul className="navarea">
              <li onClick={() => onContentClick(0)} style={{backgroundColor : getSelectColor(0)}}>공간소개</li>
              <li onClick={() => onContentClick(1)} style={{backgroundColor : getSelectColor(1)}}>시설안내</li>
              <li onClick={() => onContentClick(2)} style={{backgroundColor : getSelectColor(2)}}>유의사항</li>
              <li onClick={() => onContentClick(3)} style={{backgroundColor : getSelectColor(3)}}>환불정책</li>
              {/* <li onClick={() => onContentClick(4)} style={{backgroundColor : getSelectColor(4)}}>Q&A</li> */}
              <li onClick={() => onContentClick(5)} style={{backgroundColor : getSelectColor(5)}}>이용후기</li>
            </ul>
          </div>
            {/* 공간소개 | 시설안내 | 유의사항 | 환불정책 | Q&A | 이용후기 */}
              {/* 안양역 스터디룸입니다.! <br /> 안영역에서 인기 있는 스터디룸!{" "} */}
          {/* <div className="teamDetail__main-header-line" /> */}
          <div className="teamDetail__main-content-text" ref={contentRefs[0]}>
            <div className="teamDetail__main-content-text-title">공간소개</div>
            <div className="teamDetail__main-content-text-text">
              <div dangerouslySetInnerHTML={{__html: htmlcontentdata.SGIDContent1}} />
            </div>
          </div>
          
          <div className="teamDetail__main-content-text" ref={contentRefs[1]}>
            <div className="teamDetail__main-header-line" />
            <div className="teamDetail__main-content-text-title">시설안내</div>
            <div className="teamDetail__main-content-text-text">
              <div dangerouslySetInnerHTML={{__html: htmlcontentdata.SGIDContent2}} />
            </div>
          </div>
          <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text" ref={contentRefs[2]}>
            <div className="teamDetail__main-content-text-title">유의사항</div>
            <div className="teamDetail__main-content-text-text">
              <div dangerouslySetInnerHTML={{__html: htmlcontentdata.SGIDContent3}} />
            </div>
          </div>
          <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text" ref={contentRefs[3]}>
            <div className="teamDetail__main-content-text-title">환불정책</div>
            <div className="teamDetail__main-content-text-text">
              <div dangerouslySetInnerHTML={{__html: htmlcontentdata.SGIDContent4}} />
            </div>
          </div>
          {/* <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text" ref={contentRefs[4]}>
            <div className="teamDetail__main-content-text-title">Q&A</div>
            <div className="teamDetail__main-content-text-text">
            </div>
          </div> */}
          <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text" ref={contentRefs[5]}>
            <div className="teamDetail__main-content-text-title">이용후기</div>
            <div className="flex fd-c ai-c p-r">
              <div className="teamDetail__main-review">
                <div className="teamDetail__main-review-profileIcon">
                  <img
                    className="profile"
                    src="/img/icon/profile.png"
                    alt="Profile"
                  />
                </div>
                <div className="teamDetail__main-review-wrap">
                  <div className="teamDetail__main-review-header">
                    <h2 className="teamDetail__main-review-name">김지민</h2>

                    <ControlledRating />
                  </div>
                  <h4 className="teamDetail__main-content-text-title">
                    안양역 스터디룸 괜찮네요.
                  </h4>
                  <h5>2024.09.27 00:00:00</h5>
                  <div className="teamDetail__main-review-photo">
                    <img
                      className="photos"
                      src="/img/icon/곧마감.png"
                      alt="star"
                    ></img>
                    <img
                      className="photos"
                      src="/img/icon/곧마감.png"
                      alt="star"
                    ></img>
                    <img
                      className="photos"
                      src="/img/icon/곧마감.png"
                      alt="star"
                    ></img>
                  </div>
                  <h2 className="teamDetail__main-review-name host">호스트</h2>
                  <h4 className="teamDetail__side-content-text-title">
                    다음에 또 들려주세요!
                  </h4>
                  <h5>2024.09.27 00:00:00</h5>
                  <div className="teamDetail__side-header-line black" />
                </div>
              </div>
              <div className="p-r b-80">
                <Stack spacing={2}>
                  <Pagination count={5} />
                </Stack>
              </div>
            </div>
          </div>  
        </div>
      </div>
      <div className="teamDetail__side&buttons">
        <div className="teamDetail__side">
          <div className="teamDetail__side-header">
            <h1 className="teamDetail__side-header-title">예약 & 결제</h1>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <RadioButtonsGroup
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
          <div className="teamDetail__side-image">
            <img src={ImgContent[0]} alt={`side-img`} onClick={() => handleImgOpenModal(ImgContent)} />
            <div className="img-text">
              <span>+{ImgContent.length}</span>
            </div>
            <Modal
              open={ImgOpenModal}
              onClose={handleImgCloseModal}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              
              <Box style={ImgModalStyle}>
                {/* <button onClick={handleImgCloseModal}>Close Modal</button> */}
                <>
                  {ImgModalContent.length > 1 ? (
                    <Swiper
                      slidesPerView="auto"
                      navigation={true}
                      centeredSlides={true}
                      modules={[Navigation]}
                      className="teamDetail_modal_swiper"
                      pagenation={{ clickable: true }}
                      // onSwiper={setSwiper}
                    >
                      {ImgModalContent.map((content, index) => (
                        <SwiperSlide key={index}>
                          <img src={content} alt={`side-img-${index}`}/>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    ImgModalContent.map((content, index) => (
                        <img src={content} alt={`side-img-${index}`}/>
                    ))
                  )}
                </>
              </Box>
            </Modal>
            {/* 이미지 들어가야함. */}
          </div>
          <div className="teamDetail__side-description">
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">공간유형</h3>
              <h4 className="teamDetail__side-content-text-text2">{htmlcontentdata.SGIDContent5}</h4>
            </div>
            <div className="teamDetail__side-header-line" />
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">공간면적</h3>
              <h4 className="teamDetail__side-content-text-text2">{htmlcontentdata.SGIDContent6}</h4>
            </div>
            <div className="teamDetail__side-header-line" />

            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">예약시간</h3>
              <h4 className="teamDetail__side-content-text-text2">{htmlcontentdata.SGIDContent7}</h4>
            </div>
            <div className="teamDetail__side-header-line" />
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">수용인원</h3>
              <h4 className="teamDetail__side-content-text-text2">{htmlcontentdata.SGIDContent8}
              </h4>
            </div>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <FormControlLabel
              value="timeChoice"
              control={<Radio onChange={handleRadioChange} />}
              label="시간단위 예약하기"
            />
          </div>
          {isTimeChoiceSelected && (
            // 날짜 나옴
            <>
              <div className="teamDetail__side-calendar">
                <BasicDateCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="teamDetail__side-legend">
                <div className="teamDetail__side-legend-wrap">
                  <div className="teamDetail__side-legend-boxColor1"></div>
                  <div className="teamDetail___side-legned-title">오늘</div>
                </div>
                <div className="teamDetail__side-legend-wrap">
                  <div className="teamDetail__side-legend-boxColor2"></div>
                  <div className="teamDetail___side-legned-title">예약불가</div>
                </div>
                <div className="teamDetail__side-legend-wrap">
                  <div className="teamDetail__side-legend-boxColor3"></div>
                  <div className="teamDetail___side-legned-title">선택</div>
                </div>
              </div>
              {selectedDate && (
                // 시간 나옴
                <>
                  <div className="teamDetail__side-header">
                    <h3 className="teamDetail__side-content-text-text">
                      시간선택
                    </h3>
                    <div className="teamDetail__side-header-line" />
                  </div>
                  <TimeSelector
                    selectedTimes={selectedTimes}
                    onTimeChange={setSelectedTimes}
                  />
                  <div className="teamDetail__side-legend">
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor1"></div>
                      <div className="teamDetail___side-legned-title">
                        예약가능
                      </div>
                    </div>
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor2"></div>
                      <div className="teamDetail___side-legned-title">
                        예약불가
                      </div>
                    </div>
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor3"></div>
                      <div className="teamDetail___side-legned-title">선택</div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">총예약인원</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <TeamDetailButtons 
            count={count} 
            setCount={setCount} 
            start={htmlcontentdata.SGIDContent9} 
            end={htmlcontentdata.SGIDContent10} 
          />
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">공간사용료</h3>
            <div className="teamDetail__side-header-line" />
            <h2 className="teamDetail__side-price">
              총 가격: {totalPrice.toLocaleString()}원
            </h2>
          </div>
        </div>
        <div className="teamDetail__side-contact-actions-buttons">
          <div className="teamDitail__call-chating">
            <BasicButtons text="전화" />
            <BasicButtons text="채팅" />
          </div>
          <BasicButtons2
            text="예약가능"
            width="192px"
            height="74px"
            selectedTimes={selectedTimes}
            totalPrice={totalPrice}
            count={count}
            selectedDate={selectedDate}
            roomOrderTitle={htmlcontentdata.SGIContent1}
            sginum={htmlcontentdata.SGINum}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
