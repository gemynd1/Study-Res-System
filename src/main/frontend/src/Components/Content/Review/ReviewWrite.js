import "../../../style/reviewWrite.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// 시각적으로 숨겨진 input 태그 스타일
const VisuallyHiddenInput = (props) => (
  <input
    type="file"
    style={{ display: 'none' }}
    {...props}
  />
);

function InputFileUpload() {
  const [uploadedImages, setUploadedImages] = useState([]);

  // 파일 선택 시 이미지 추가
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // 현재 업로드된 이미지가 3개 미만인 경우에만 추가
    if (uploadedImages.length + files.length <= 3) {
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setUploadedImages(prevImages => [...prevImages, ...imageUrls]);
    } else {
      alert('최대 3장까지 업로드할 수 있습니다.');
    }
  };

  // 이미지 제거
  const removeImage = (indexToRemove) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      {/* 업로드 버튼 */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={uploadedImages.length >= 3} // 3장 이상이면 버튼 비활성화
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </Button>

      {/* 업로드된 이미지 미리보기 */}
      <div className="uploaded-images">
        {uploadedImages.map((imageSrc, index) => (
          <div key={index} className="image-container">
            <img
              src={imageSrc}
              alt={`uploaded preview ${index}`}
              className="uploaded-image"
            />
            {/* 이미지 제거 버튼 (X 버튼) */}
            <IconButton
              aria-label="delete"
              onClick={() => removeImage(index)}
              className="delete-button"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
// dropdown
function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="content"
          multiline
          rows={4}
        />
      </div>
    </Box>
  );
}
//태그 input 
function OneLineTextFields() {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Tag"
          multiline
          maxRows={4}
        />
      </div>
    </Box>
  );
}
//input 
function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">study room</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>스터디룸1</MenuItem>
          <MenuItem value={20}>스터디룸2</MenuItem>
          <MenuItem value={30}>스터디룸3</MenuItem>
          <MenuItem value={40}>스터디룸4</MenuItem>
          <MenuItem value={50}>스터디룸5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
//업로드 버튼
// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// function InputFileUpload() {
//   return (
//     <Button
//       component="label"
//       role={undefined}
//       variant="contained"
//       tabIndex={-1}
//       startIcon={<CloudUploadIcon />}
//     >
//       Upload files
//       <VisuallyHiddenInput
//         type="file"
//         onChange={(event) => console.log(event.target.files)}
//         multiple
//       />
//     </Button>
//   );
// }

function RowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Rating</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio />} label="★" />
        <FormControlLabel value="2" control={<Radio />} label="★★" />
        <FormControlLabel value="3" control={<Radio />} label="★★★" />
        <FormControlLabel value="4" control={<Radio />} label="★★★★" />
        <FormControlLabel value="5" control={<Radio />} label="★★★★★" />
      </RadioGroup>
    </FormControl>
  );
}

function ContainedButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">생 성</Button>
      <Button variant="contained">수 정</Button>
      <Button variant="contained">삭 제</Button>
      <Link to="/review">
        <Button variant="contained">취 소</Button>
      </Link>
    </Stack>
  );
}

const ReviewWrite = () => {
  return (
    <>
      <div className="post-setting">
        <div className="tes">
          <h2 className="Rpost-title">스터디룸</h2>
          {/* 해당 계정이 결제한 내역의 스터디룸만 보이게 하기 */}
          <BasicSelect />
        </div>
        <div className="tes">
          <h2 className="Rpost-title">내 용</h2>
          <MultilineTextFields />
        </div>
        <div className="tes">
          <h2 className="Rpost-title">이미지</h2>
          {/* 업로드 후 이미지가 아래에 나오게 하기 */}
          <InputFileUpload />
        </div>
        <div className="tes">
          <h2 className="Rpost-title ">별 점</h2>
          <RowRadioButtonsGroup />
        </div>
        <div className="tes">
          <h2 className="Rpost-title">태 그</h2>
          {/* 작성 후 enter치면 오른쪽에 나오고 x로 삭제가능  */}
          <OneLineTextFields />
        </div>
        <div className="tes wid">
          <ContainedButtons />
        </div>
      </div>
    </>
  );
};

export default ReviewWrite;
