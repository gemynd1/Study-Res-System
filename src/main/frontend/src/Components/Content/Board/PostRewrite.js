import React from "react";
import '../../../style/postRewrite.css';
// import { RadioGroup } from "@mui/material";

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


// input ui component
function BasicTextFields({label}) {
    const multiline = label === '내용' ? {multiline: true, rows: 15} : {};

    return (
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label={label} variant="outlined" {...multiline} />
      </Box>
    );
  }

// 카테고리select ui component
function BasicSelect() {
    const [category, setCategory] = React.useState('');
  
    const handleChange = (event) => {
      setCategory(event.target.value);
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
          >
            <MenuItem value={"곧마감"}>곧마감</MenuItem>
            <MenuItem value={"new"}>new</MenuItem>
            <MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

// group-section input ui component
function InputAdornments({type}) { 
    const typeText = type === 'current' ? '현재' : '최대';

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">모임의 {typeText} 인원</FormHelperText>
        </FormControl>
    );
}

// meetingPoint-section radio ui component
function RowRadioButtonsGroup() {
    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="온라인" control={<Radio />} label="온라인" />
          <FormControlLabel value="스터디룸" control={<Radio />} label="스터디룸" />
          <FormControlLabel value="상세주소" control={<Radio />} label="상세주소" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="other"
          />
        </RadioGroup>
      </FormControl>
    );
}

// startdate & enddate ui component
function ResponsiveDateTimePickers() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DateTimePicker'
          ]}
        >
          <DemoItem label="Responsive variant">
            <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
}

const PostRewrite = () => {
    return (
        <>
            <div className="ilovecode">
                <div className="postRewrite-section">

                    <div className="title-section">
                        <div className="title">
                            <span className="title-text">제목</span>
                        </div>
                        <BasicTextFields label="제목" />
                    </div>

                    <div className="category-section">
                        <div className="category">
                            <span className="category-text">카테고리</span>
                        </div>
                        <BasicSelect />
                    </div>

                    <div className="content-section">
                        <div className="content">
                            <span className="content-text">내용</span>
                        </div>
                        <BasicTextFields label="내용" />
                    </div>

                    <div className="groupCount-section">
                        <div className="groupCount">
                            <span className="groupCount-text">모임인원</span>
                        </div>
                        <div className="current-count">
                            <InputAdornments type='current' />
                        </div>
                        <div className="/">/</div>
                        <div className="maximum-count">
                            <InputAdornments type='maximum' />
                        </div>
                    </div>

                    <div className="meetingPoint-section">
                        <div className="meetingPoint">
                            <span className="meetingPoint-text">모임장소</span>
                        </div>
                        
                        {/* <form>
                            <input type="radio" />
                            <label for="meetingPoint">온라인</label>

                            <input type="radio" />
                            <label for="meetingPoint">스터디룸</label>

                            <input type="radio" />
                            <label for="meetingPoint">상세주소</label>
                        </form> */}
                        <RowRadioButtonsGroup />
                    </div>

                    <div className="test">
                        스터디룸
                    </div>

                    <div className="startdate-section">
                        <div className="startdate">
                            <span className="startdate-text">시작일</span>
                        </div>
                        {/* <input /> */}
                        <ResponsiveDateTimePickers />
                    </div>

                    <div className="enddate-section">
                        <div className="enddate">
                            <span className="enddate-text">종료일</span>
                        </div>
                        {/* <input /> */}
                        <ResponsiveDateTimePickers />
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