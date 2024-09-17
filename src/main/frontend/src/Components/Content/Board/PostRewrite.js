import React from "react";
import '../../../style/postRewrite.css';
// import { RadioGroup } from "@mui/material";

// 텍스트ui import
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


// input ui function
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

// 카테고리select ui function
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

// group-section input ui function
function InputAdornments() { 
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
          <FormHelperText id="outlined-weight-helper-text">모임의 현재 인원</FormHelperText>
        </FormControl>
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
                            {/* <input />
                            <span>명</span> */}
                            <InputAdornments />
                        </div>
                        <div className="/">/</div>
                        <div className="maximum-count">
                            {/* <input value={"5"} />
                            <span>명</span> */}
                            <InputAdornments />
                        </div>
                    </div>

                    <div className="meetingPoint-section">
                        <div className="meetingPoint">
                            <span className="meetingPoint-text">모임장소</span>
                        </div>
                        
                        <form>
                            <input type="radio" />
                            <label for="meetingPoint">온라인</label>

                            <input type="radio" />
                            <label for="meetingPoint">스터디룸</label>

                            <input type="radio" />
                            <label for="meetingPoint">상세주소</label>
                        </form>
                    </div>

                    <div className="test">
                        스터디룸
                    </div>

                    <div className="startdate-section">
                        <div className="startdate">
                            <span className="startdate-text">시작일</span>
                        </div>
                        <input />
                    </div>

                    <div className="enddate-section">
                        <div className="enddate">
                            <span className="enddate-text">종료일</span>
                        </div>
                        <input />
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