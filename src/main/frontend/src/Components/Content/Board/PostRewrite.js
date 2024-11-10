import React, { useState, useEffect } from "react";
import '../../../style/postRewrite.css';
import axios from "axios";
import { useLocation } from "react-router-dom";

// 텍스트 ui import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 카테고리 ui import
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Box from '@mui/material/Box';

// group-section input ui import
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

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

// daum postcode api import
// import DaumPostcode from "react-daum-postcode";

// swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// daum postcode import
import PostCodePopup from "../Account/AccountCom/PostCodePopup";

// input ui component
function BasicTextFields({label, comTitle, comContent, onChange, name}) {
	const multiline = label === '내용' ? {multiline: true, rows: 15} : {};
    const text = label === '제목' ? comTitle : comContent;

	return (
	  <Box
		component="form"
		sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
		noValidate
		autoComplete="off"
	  >
		<TextField id="outlined-basic" label={label} variant="outlined" value={text} onChange={onChange} name={name} {...multiline} />
	  </Box>
	);
  }

// 카테고리select ui component
function BasicSelect({comCategoryName, onChange, name}) {
	// const [category, setCategory] = React.useState('');
  
	// const handleChange = (event) => {
	//   setCategory(event.target.value);
	// };
  
	return (
	  <Box sx={{ minWidth: 120 }}>
		<FormControl fullWidth>
		  <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
		  <Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			value={comCategoryName}
			label="카테고리"
			onChange={onChange}
			name={name}
		  >
			<MenuItem value={"곧 마감!"}>곧 마감!</MenuItem>
			<MenuItem value={"new"}>new</MenuItem>
			<MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
		  </Select>
		</FormControl>
	  </Box>
	);
}

// group-section input ui component
function InputAdornments({type, groupCount}) { 
	const typeText = type === 'current' ? '현재' : '최대';
    const numberOfMember = type === 'current' ? groupCount : null;

	return (
		<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
		  <OutlinedInput
			id="outlined-adornment-weight"
			endAdornment={<InputAdornment position="end">명</InputAdornment>}
			aria-describedby="outlined-weight-helper-text"
			inputProps={{
			  'aria-label': 'weight',
			}}
            value={numberOfMember}
		  />
		  <FormHelperText id="outlined-weight-helper-text">모임의 {typeText} 인원</FormHelperText>
		</FormControl>
	);
}

// meetingPoint-section radio ui component
function RowRadioButtonsGroup({RadioValue, setRadioValue}) {
  const handleChange = (event) => {
	setRadioValue(event.target.value);
  }

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
function ResponsiveDateTimePickers({dateType, comStartDate, comEndDate, name, onChange}) {
  const dateTypeText = dateType === 'startdate' ? '모임 시작일' : '모임 종료일';
  let dateValue
  if(dateType === 'startdate') {
    dateValue = comStartDate;
  }else if(dateType === 'enddate') {
    dateValue = comEndDate;
  }else {
    dateValue = null;
  }

	return (
	  <LocalizationProvider dateAdapter={AdapterDayjs}>
		<DemoContainer
		  components={[
			'DateTimePicker'
		  ]}
		>
		  <DemoItem label={dateTypeText}>
			<DateTimePicker defaultValue={dayjs(dateValue)} name={name} onChange={onChange} />
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

function NumberInputAdornments({comToCount, name, onChange}) {
  return (
	<Box
	  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
	>
	  <NumberInput endAdornment={<InputAdornmentNumber>명</InputAdornmentNumber>}
	  			   name={name}
				   value={comToCount}
				   onChange={onChange}
				   min={1}
				   max={10}
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const comIdx = queryParams.get('comIdx');

  const [RadioValue, setRadioValue] = useState("");

  const [enroll_company, setEnroll_company] = useState({address : '', zonecode: '', detailedAddress: '', latitude : '', longitude : ''});
  const [popup, setPopup] = useState(false);

  const [boardContents, setBoardContents] = useState();

  const [studyRoomInfos, setStudyRoomInfos] = useState([]);

  // 해당 post에 참여중인 멤버들의 데이터를 처리하는 부분
  const [groupMemberInfos, setGroupMemberInfos] = useState();


  const handleComplete = (data) => {
	  setPopup(!popup);
  }

  const handleInput = (e) => {
	setEnroll_company({
		...enroll_company,
		[e.target.name]:e.target.value,
	});
  }

  const handleFormChange = (e) => {
	const { name, value } = e.target;
	setBoardContents(boardContents => ({
		...boardContents,
		[name]: value
	}));
  };

  const handleDateChange = (name, value) => {
	setBoardContents(boardContents => ({
		...boardContents,
		[name]: value
	}));
  };

  const handleNumberChange = (e) => {
  	const { name, value } = e.target;
  	setBoardContents(boardContents => ({
		...boardContents,
		[name]: parseInt(value, 10)
	}));
  };

  const del_groupMember = (event) => {
	const id = event.target.getAttribute('data-id');
	// db에 실제로 데이터를 지워야함
	setGroupMemberInfos(groupMemberInfos.filter((groupMemberInfo) => groupMemberInfo.id !== Number(id)));
  }

  useEffect(()=> {
	axios.get("http://localhost:8099/api/board/postRewrite", {
	  params: { comIdx },
	  Headers: {'content-type': 'application/json',}
	}).then((response) => {
        setBoardContents(...response.data.community);
        setStudyRoomInfos(response.data.studyroom);
	}).catch((error) => {
        console.log(error);
	})
  },[comIdx])

  useEffect(() => {
	console.log('useEffect 실행됨'); // useEffect 훅의 실행 여부 확인
    console.log('boardContents:', boardContents); // boardContents 값 확인
    if(boardContents && boardContents.memberNames) {

		// listagg를 통해서 여러 멤버들의 이름값을 가져와서 split으로 처리하고 useState로 관리하는 부분
        const split_memberNames = boardContents.memberNames.split(',').map((name, index) => ({
            id: index,
            name: name.trim()
        }));
        setGroupMemberInfos(split_memberNames);

		// db에서 address의 값을 가져와서 그 값에 해당하는 radio버튼을 선택하도록 처리하는 부분
		const usually_comAddress = boardContents.comAddress;
		console.log('comAddress:', usually_comAddress); // 콘솔 로그로 값 확인
		if (usually_comAddress === '온라인') {
        	setRadioValue('온라인');
		} else if (usually_comAddress === '스터디룸') {
			setRadioValue('스터디룸');
		} else if (usually_comAddress) {
			setRadioValue('상세주소');
		} else {
			setRadioValue('');
		}
    }else if(boardContents) {
		// db에서 address의 값을 가져와서 그 값에 해당하는 radio버튼을 선택하도록 처리하는 부분
		const usually_comAddress = boardContents.comAddress;
		console.log('comAddress:', usually_comAddress); // 콘솔 로그로 값 확인
		if (usually_comAddress === '온라인') {
        	setRadioValue('온라인');
		} else if (usually_comAddress === '스터디룸') {
			setRadioValue('스터디룸');
		} else if (usually_comAddress) {
			setRadioValue('상세주소');
		} else {
			setRadioValue('');
		}
	}
  }, [boardContents]);

//   TODO: 스터디룸 이미지를 listagg로 여러개 가져와서 split으로 처리해야함
//   useEffect(() => {
// 	if(boardContents && groupMemberInfos.studyGImgs) {
// 		const split_studyGImgs = groupMemberInfos.studyGImgs.split(',').map((name, index) => ({
// 				id: index,
// 				name: name.trim()
// 			}));
// 	}
//   }, [groupMemberInfos]);
  
  console.log(boardContents);
  console.log(groupMemberInfos);
  console.log(studyRoomInfos);
  console.log(RadioValue);

  // 데이터가 로드되기 전에는 로딩 메시지를 표시
  if (!boardContents) {
    return <div>Loading...</div>;
  }

	return (
		<>
			<div className="ilovecode">
				<div className="postRewrite-section">

					<div className="title-section">
						<div className="title">
							<span className="title-text">제목</span>
						</div>
						<BasicTextFields label="제목" name="comTitle" comTitle={boardContents.comTitle} onChange={handleFormChange}/>
					</div>

					<div className="category-section">
						<div className="category">
							<span className="category-text">카테고리</span>
						</div>
						<BasicSelect name="comCategoryName" comCategoryName={boardContents.comCategoryName} onChange={handleFormChange}/>
					</div>

					<div className="content-section">
						<div className="content">
							<span className="content-text">내용</span>
						</div>
						<BasicTextFields label="내용" name="comContent" comContent={boardContents.comContent} onChange={handleFormChange}/>
					</div>

					<div className="groupCount-section">
						<div className="groupCount">
							<span className="groupCount-text">모임인원</span>
						</div>
						<div className="testgroup">
							<div className="current-count">
								<InputAdornments type='current' groupCount={boardContents.groupCount + 1}/>
							</div>
							<div className="/">/</div>
							<div className="maximum-count">
								<NumberInputAdornments name="comToCount" comToCount={boardContents.comToCount} onChange={handleNumberChange}/>
								<p className="maximum-count-text">모임의 최대인원</p>
							</div>
						</div>
					</div>

					<div className="groupCount-user-section">
						{groupMemberInfos && groupMemberInfos.map((groupMemberInfo) => (
							<div className="group-user-background">
								<div className="group-user" key={groupMemberInfo.id}>
									<img src="/img/icon/person.png" alt="userIcon" className="user-icon" />
									<span className="user-text">{groupMemberInfo.name}</span>
									<img src="/img/icon/x.png" alt="XIcon" className="X-icon" data-id={groupMemberInfo.id} onClick={del_groupMember} />
								</div>
							</div>
						))}
					</div>

					<div className="meetingPoint-section">
						<div className="meetingPoint">
							<span className="meetingPoint-text">모임장소</span>
						</div>
						
						{/* 해당 라디오그룹은 props로 값들을 전달한다. 
						그리고 전달되어진 props의 값이 무엇인지에 따라서 
						밑에 나타나는 div의 내용을 달라지게 한다. */}
                        {/* TODO: db처리에서 comAddress값으로 스터디룸인지 온라인인지 상세정보인지 구분가능하도록 해당값들을 comAddress에서 처리해야함 */}
						<RowRadioButtonsGroup RadioValue={RadioValue} setRadioValue={setRadioValue}/>

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
								{/* <input type="text" id="sample6_postcode" placeholder="우편번호" /> */}
								{/* <input type="button" onclick={sample6_execDaumPostcode} value="우편번호 찾기" /><br/> */}
								{/* <input type="button" value="우편번호 찾기" /><br/> */}
								{/* <input type="text" id="sample6_address" placeholder="주소" /><br/>
								<input type="text" id="sample6_detailAddress" placeholder="상세주소" /> */}
								{/* <input type="text" id="sample6_extraAddress" placeholder="참고항목" /> */}
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
					 </div>)}
					{RadioValue === '스터디룸' && 
					(<div className="meetingPoint-studyroom">
						<Swiper navigation={true} modules={[Navigation]} className="mySwiper_postRewrite">

							{studyRoomInfos.map((studyRoomInfo) => (
								<SwiperSlide className="mySwiper_postRewrite-slide">
									<div className="studyroom">
										<img src={`${studyRoomInfo.studyGImgs}`} alt={`room${studyRoomInfo.sgiidx}`} />
										<div>{studyRoomInfo.sgicontent1}</div>
									</div>
								</SwiperSlide>
							))}

						</Swiper>
					 </div>)}

					<div className="startdate-section">
						<div className="startdate">
							<span className="startdate-text">시작일</span>
						</div>
						<ResponsiveDateTimePickers dateType='startdate' name="comStartDate" comStartDate={boardContents.comStartDate} onChange={handleDateChange}/>
					</div>

					<div className="enddate-section">
						<div className="enddate">
							<span className="enddate-text">종료일</span>
						</div>
						<ResponsiveDateTimePickers dateType='enddate' name="comEndDate" comEndDate={boardContents.comEndDate} onChange={handleDateChange}/>
					</div>

					<div className="button-section">
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