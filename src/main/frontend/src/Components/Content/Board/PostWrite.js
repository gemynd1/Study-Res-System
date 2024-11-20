import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../../style/postWrite.css';


// 텍스트 ui import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 카테고리 ui import
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Box from '@mui/material/Box';

// meetingPoint-section radio ui import
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';

// startdate & enddate ui import
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// group-section number-input ui component
import { styled } from '@mui/system';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';

// swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// daum postcode import
import PostCodePopup from "../Account/AccountCom/PostCodePopup";


// input ui component
function BasicTextFields({label, name, onChange}) {
    const multiline = label === '내용' ? {multiline: true, rows: 15} : {};

    return (
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label={label} variant="outlined" {...multiline} name={name} onChange={onChange} required={true} />
      </Box>
    );
  }

// 카테고리select ui component
function BasicSelect({category1, value, onChange}) {
    const [category, setCategory] = React.useState('');
  
    const handleChange = (event) => {
      setCategory(event.target.value);
      onChange(event);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="카테고리"
            onChange={handleChange}
            name={category1}
          >
            <MenuItem value={"곧 마감!"}>곧마감</MenuItem>
            <MenuItem value={"NEW!"}>new</MenuItem>
            <MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

// meetingPoint-section radio ui component
function RowRadioButtonsGroup({RadioValue, setRadioValue, setBoardContents}) {
  const handleChange = (event) => {
    const value = event.target.value;
    setRadioValue(value);

    // 라디오 버튼 값에 따라 상태 업데이트
    if (value === '온라인') {
        setBoardContents(prevState => ({
            ...prevState,
            comPlace: '',
            comZipcode: '',
            comAddress: '온라인'
        }));
    } else if (value === '스터디룸') {
        setBoardContents(prevState => ({
            ...prevState,
            comPlace: '',
            comZipcode: '',
            comAddress: '스터디룸'
        }));
    } else if (value === '상세주소') {
        setBoardContents(prevState => ({
            ...prevState,
            comPlace: "",
            comZipcode: "",
            comAddress: ""
        }));
    } else {
        setBoardContents(prevState => ({
            ...prevState,
            comPlace: '',
            comZipcode: '',
            comAddress: ''
        }));
    }
  };

  // const handleChange = (event) => {
  //   setRadioValue(event.target.value);
  // }

  // userEffect함수는 컴포넌트가 렌더링 될 때 특정 작업을 수행하도록 설정할 수 있는 Hook  
  // RadioValue가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log(RadioValue);
  }, [RadioValue]);

    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={RadioValue}
          onChange={handleChange}
        >
          <FormControlLabel value="온라인" control={<Radio />} label="온라인" />
          <FormControlLabel value="스터디룸" control={<Radio />} label="스터디룸" />
          <FormControlLabel value="상세주소" control={<Radio />} label="상세주소" />
          
        </RadioGroup>
      </FormControl>
    );
}

// startdate & enddate ui component
function ResponsiveDateTimePickers({dateType, name, setBoardContents}) {
    const dateTypeText = dateType === 'startdate' ? '모임 시작일' : '모임 종료일';
    const [value, setValue] = useState(null);

    useEffect(() => {
      if (value && dayjs(value).isValid()) {
        const stringValue = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        handleDateChange(name, stringValue);
        console.log(stringValue);
      }
    }, [value]);
  
    const handleChange = (newValue) => {
      if (dayjs(newValue).isValid()) {
        setValue(newValue);
      }
    };

    const handleDateChange = (name, value) => {
        setBoardContents(boardContents => ({
          ...boardContents,
          [name]: value
        }));
      };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DateTimePicker'
          ]}
        >
          <DemoItem label={dateTypeText}>
            <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')}
                            name={name}
                            onChange={handleChange} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
}

// group-section number-input ui component
const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: InputRoot,
        input: InputElement,
        incrementButton: Button,
        decrementButton: Button,
      }}
      slotProps={{
        incrementButton: {
          children: <span className="arrow">▴</span>,
        },
        decrementButton: {
          children: <span className="arrow">▾</span>,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

function NumberInputAdornments({setBoardContents, name}) {
  const [value, setValue] = React.useState(null);
  useEffect(() =>{
	  setValue(value);
    setBoardContents(prevState => {
      return {
        ...prevState,
        groupCount: value,
      }
    });
    // console.log(value);

  }, [value]); 

  return (
	<Box
	  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
	>
	  <NumberInput endAdornment={<InputAdornmentNumber>명</InputAdornmentNumber>}
	  			       name={name}
                 value={value}
                 onChange={(event, value) => setValue(value)}
                 min={2}
                 max={10}
                 readOnly={true}
	  />
	</Box>
  );
}

const InputAdornmentNumber = styled('div')(
  ({ theme }) => `
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[500] : grey[700]};
`,
);

const blue = {
  100: '#DAECFF',
  200: '#B6DAFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: grid;
  grid-template-columns: auto 1fr auto 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const Button = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 20px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 4/5;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 4/5;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};

    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`,
);

const PostRewrite = () => {
  const [RadioValue, setRadioValue] = useState('');

  const [studyRoomInfos, setStudyRoomInfos] = useState([]);

  const [enroll_company, setEnroll_company] = useState({address : '', zonecode: '', detailedAddress: '', latitude : '', longitude : ''});
  const [popup, setPopup] = useState(false);

  const [boardContents, setBoardContents] = useState({title: "", content: "", category1: "", groupCount: 0, startday: "", enddate: "", comPlace: "", comZipcode: "", comAddress: "", groupName: ""});

  const [currentSlide, setCurrentSlide] = useState(0);
  //   현재 선택한 studyRoom에 key값을 저장하는 변수 
  const [currentStudyRoom, setCurrentStudyRoom] = useState(0);

  const sessionId = sessionStorage.getItem('id');
  const sessionName = sessionStorage.getItem('name');

  const handleComplete = (data) => {
      setPopup(!popup);
  }

  const handleBoardContents = (e) => {
    const { name, value } = e.target;
    setBoardContents({
        ...boardContents,
        [name]: value,
    });
  }

  const handleInput = (e) => {
    setEnroll_company({
        ...enroll_company,
        [e.target.name]:e.target.value,
    });
  }

  // Swiper의 슬라이드 변경 이벤트 핸들러
  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
    // console.log('Current Slide Index:', swiper.activeIndex);
    };

  const postWrite = () => {
    if(!boardContents.title || !boardContents.category1 || !boardContents.content || !boardContents.startday || !boardContents.enddate || !boardContents.groupCount || (!boardContents.comAddress && !enroll_company.detailedAddress)) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if(boardContents.startday > boardContents.enddate) {
      alert('시작일이 종료일보다 늦을 수 없습니다.');
      return;
    }
    axios.post('http://localhost:8099/api/board/post/postWrite', {
      boardContents: boardContents,
      enroll_company: enroll_company,
      currentStudyRoom: currentStudyRoom,
      sessionId: sessionId,
      sessionName: sessionName
    }).then((response) => {
      console.log(response.data);
      alert('게시글이 작성되었습니다.');
      window.location.href = '/board';
    }).catch((error) => {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:8099/api/board/get/postWrite`, {
        headers: { 'Content-Type': 'application' }
    }).then((response) => {
        console.log(response.data);
        setStudyRoomInfos(response.data);
    }).catch((error) => {
        console.error(error);
    })
  }, [])

  useEffect(() => {
    if(studyRoomInfos[currentSlide]) {
      setCurrentStudyRoom(studyRoomInfos[currentSlide].sgiidx);
      console.log('currentStudyRoom:', currentStudyRoom);
    }
    }, [currentSlide, studyRoomInfos, currentStudyRoom]);

  useEffect(() => {
    console.log(boardContents)
  }, [boardContents])

  useEffect(() => {
    console.log(enroll_company);
  }, [enroll_company]);


    return (
        <>
            <div className="ilovecode">
                <div className="postRewrite-section">

                    <div className="title-section">
                        <div className="title">
                            <span className="title-text">제목</span>
                        </div>
                        <BasicTextFields label="제목" name="title" value={boardContents.title} onChange={handleBoardContents} />
                    </div>

                    <div className="category-section">
                        <div className="category">
                            <span className="category-text">카테고리</span>
                        </div>
                        <BasicSelect category1="category1" value={boardContents.category} onChange={handleBoardContents}/>
                    </div>

                    <div className="content-section">
                        <div className="content">
                            <span className="content-text">내용</span>
                        </div>
                        <BasicTextFields label="내용" name="content" value={boardContents.content} onChange={handleBoardContents} />
                    </div>

                    <div className="groupCount-section">
                        <div className="groupCount">
                            <span className="groupCount-text">모임인원</span>
                        </div>
                        <div className="testgroup">
                            <div className="maximum-count">
                                {/* <InputAdornments type='maximum' /> */}
                                <NumberInputAdornments name="gorupCount" setBoardContents={setBoardContents} />
                                <p className="maximum-count-text">모임의 최대인원</p>
                            </div>
                        </div>
                    </div>

                    <div className="meetingPoint-section">
                        <div className="meetingPoint">
                            <span className="meetingPoint-text">모임장소</span>
                        </div>
                        
                        <RowRadioButtonsGroup RadioValue={RadioValue} setRadioValue={setRadioValue} setBoardContents={setBoardContents} />

                    </div>

                    {RadioValue === '온라인' && (<div className="meetingPoint-online"></div>) }
                    {RadioValue === '상세주소' && 
                    (<div className="meetingPoint-detailaddress">
                        <div className="detailaddress-background">
                            <div className="kakaomap-button-section">
                                <img src="/img/icon/kakaobutton(location).png" alt="locationIcon" className="kakaomap-icon" />
                                <span className="kakaomap-text">카카오맵으로 찾아보기</span>
                            </div>
                            <div className="test">
                                <div className="first-line">
                                    <input type="text" name="zonecode" placeholder="우편번호" onChange={handleInput} value={enroll_company.zonecode} readOnly />
                                    <button type="button" className="postBtn" onClick={handleComplete}>우편번호 찾기</button>
                                </div>
                                {popup && <PostCodePopup company={enroll_company} setcompany={setEnroll_company} />}
                                <div className="second-line">
                                    <input type="text" name="address" placeholder="도로명 주소" size="40" onChange={handleInput} value={enroll_company.address} readOnly />
                                    <input type="hidden" name="latitude" value={enroll_company.latitude} />
                                    <input type="hidden" name="longitude" value={enroll_company.longitude} />
                                </div>
                                <div className="third-line">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="detailedAddress"
                                        placeholder="상세 주소"
                                        size="40"
                                        value={enroll_company.detailedAddress}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                        </div>
                     </div>) }
                    {RadioValue === '스터디룸' && (
                      <div className="meetingPoint-studyroom">
                        <Swiper navigation={true} modules={[Navigation]} onSlideChange={handleSlideChange} className="mySwiper_postWrite">

                          {studyRoomInfos.map((studyRoomInfo) => (
                            <SwiperSlide className="mySwiper_postRewrite-slide">
                              <div className="studyroom">
                                <img src={`${studyRoomInfo.studyGImgs}`} alt={`room${studyRoomInfo.sgiidx}`} />
                                <div>{studyRoomInfo.sgicontent1}</div>
                              </div>
                            </SwiperSlide>
                          ))}

                        </Swiper>
                     </div>
                    ) }

                    <div className="startdate-section">
                        <div className="startdate">
                            <span className="startdate-text">시작일</span>
                        </div>
                        <ResponsiveDateTimePickers dateType='startdate' name="startday" setBoardContents={setBoardContents} />
                    </div>

                    <div className="enddate-section">
                        <div className="enddate">
                            <span className="enddate-text">종료일</span>
                        </div>
                        <ResponsiveDateTimePickers dateType='enddate' name="enddate" setBoardContents={setBoardContents} />
                    </div>

                    <div className="groupName-section">
                        <div className="groupName">
                            <span className="groupName-text">그룹이름</span>
                        </div>
                        <BasicTextFields label="그룹이름" name="groupName" value={boardContents.groupName} onChange={handleBoardContents} />
                    </div>

                    <div className="button-section" onClick={postWrite}>
                        <div className="active-button">
                            <img src="/img/icon/check.png" alt="" className="activeIcon" />
                            <span className="active-text">작성하기</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default PostRewrite;