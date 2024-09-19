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

// group-section number-input ui component
import { styled } from '@mui/system';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';



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
          
        </RadioGroup>
      </FormControl>
    );
}

// startdate & enddate ui component
function ResponsiveDateTimePickers({dateType}) {
  const dateTypeText = dateType === 'startdate' ? '모임 시작일' : '모임 종료일';

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DateTimePicker'
          ]}
        >
          <DemoItem label={dateTypeText}>
            <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
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

function NumberInputAdornments() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
    >
      <NumberInput endAdornment={<InputAdornmentNumber>명</InputAdornmentNumber>} />
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
                            {/* <InputAdornments type='maximum' /> */}
                            <NumberInputAdornments />
                            <p className="maximum-count-text">모임의 최대인원</p>
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
                        <ResponsiveDateTimePickers dateType='startdate' />
                    </div>

                    <div className="enddate-section">
                        <div className="enddate">
                            <span className="enddate-text">종료일</span>
                        </div>
                        <ResponsiveDateTimePickers dateType='enddate' />
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