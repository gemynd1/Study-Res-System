import "../../../style/reviewWrite.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// import { styled } from "@mui/material/styles";
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
// 파일 업로드(사진) logic
function InputFileUpload({ uploadedFiles, setUploadedFiles }) {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (uploadedFiles.length + files.length <= 3) {
      const newFiles = files.map(file => ({
        file, // actual file object
        url: URL.createObjectURL(file) // URL for preview
      }));
      setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    } else {
      alert('최대 3장까지 업로드할 수 있습니다.');
    }  
  };

  const removeImage = (indexToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        disabled={uploadedFiles.length >= 3}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </Button>

      <div className="uploaded-images">
        {uploadedFiles.map((uploadedFile, index) => (
          <div key={index} className="image-container">
            <img src={uploadedFile.url} alt={`uploaded preview ${index}`} className="uploaded-image" />
            <IconButton aria-label="delete" onClick={() => removeImage(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
//내용
function MultilineTextFields({ content, setContent }) {
  return (
    <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
      <TextField
        id="outlined-multiline-static"
        label="content"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Box>
  );
}
//태그
function OneLineTextFields({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      if (inputValue.length <= 6 && tags.length < 3) {
        setTags((prevTags) => [...prevTags, `#${inputValue.trim()}`]);
        setInputValue('');
      } else if (inputValue.length > 6) {
        alert('태그는 최대 6글자까지만 입력할 수 있습니다.');
      } else if (tags.length >= 3) {
        alert('최대 3개의 태그만 추가할 수 있습니다.');
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value.length <= 6) {
      setInputValue(e.target.value);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
      <TextField
        id="outlined-multiline-flexible"
        label="Tag"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={4}
        helperText="Enter를 눌러 태그를 추가하세요. (최대 6글자)"
        disabled={tags.length >= 3}
      />
      <div className="tags-preview" style={{ marginTop: '10px' }}>
        {tags.map((tag, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
            <span>{tag}</span>
            <IconButton aria-label="delete" onClick={() => removeTag(index)} style={{ marginLeft: '5px' }}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </Box>
  );
}
//스터디룸dropdown
function BasicSelect({ studyRoom, setStudyRoom }) {
  const handleChange = (event) => {
    setStudyRoom(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="study-room-label">Study room</InputLabel>
        <Select
          labelId="study-room-label"
          id="study-room"
          value={studyRoom}
          label="Study Room"
          onChange={handleChange}
        >
          <MenuItem value={1}>스터디룸1</MenuItem>
          <MenuItem value={2}>스터디룸2</MenuItem>
          <MenuItem value={3}>스터디룸3</MenuItem>
          <MenuItem value={4}>스터디룸4</MenuItem>
          <MenuItem value={5}>스터디룸5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
//별점
function RowRadioButtonsGroup({ rating, setRating }) {
  const handleChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Rating</FormLabel>
      <RadioGroup
        row
        value={rating}
        onChange={handleChange}
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
//4개의 crud 버튼
function ContainedButtons({ handleCreate }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={handleCreate}>생 성</Button>
      <Button variant="contained">수 정</Button>
      <Button variant="contained">삭 제</Button>
      <Link to="/review">
        <Button variant="contained">취 소</Button>
      </Link>
    </Stack>
  );
}

const ReviewWrite = () => {
  const [studyRoom, setStudyRoom] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [tags, setTags] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleCreate = async () => {
    if (!studyRoom || !content || !rating || tags.length === 0 || uploadedFiles.length === 0) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    
    const formData = new FormData();
    formData.append('studyRoom', studyRoom);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('tags', JSON.stringify(tags));
    
    // Add files to formData
    uploadedFiles.forEach((uploadedFile) => {
      formData.append('images', uploadedFile.file); // All images are appended under the same key
    });
    
    const loggedInId = sessionStorage.getItem('name');
  
    // MIDX 조회
    let memberIndex;
    try {
      const response = await fetch(`http://localhost:8099/api/reviews/member/${loggedInId}`,{
        method: 'GET',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('MIDX를 가져오는 데 실패했습니다.');
      }
      memberIndex = await response.json();
    } catch (error) {
      alert(error.message);
      return; // MIDX를 가져오지 못하면 함수 종료
    }
    
    formData.append('memberIndex', memberIndex); // MIDX를 formData에 추가
  
    try {
      const response = await fetch('http://localhost:8099/api/reviews', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // 서버에서 보내준 오류 메시지
        console.error('Error:', response.status, errorMessage);
        throw new Error('서버에 데이터를 저장하는 데 실패했습니다.');
      }
  
      const result = await response.json();
      alert('리뷰가 성공적으로 저장되었습니다.');
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="post-setting">
      <div className="tes">
        <h2 className="Rpost-title">스터디룸</h2>
        <BasicSelect studyRoom={studyRoom} setStudyRoom={setStudyRoom} />
      </div>
      <div className="tes">
        <h2 className="Rpost-title">내 용</h2>
        <MultilineTextFields content={content} setContent={setContent} />
      </div>
      <div className="tes">
        <h2 className="Rpost-title">이미지</h2>
        <InputFileUpload uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
      </div>
      <div className="tes">
        <h2 className="Rpost-title">별 점</h2>
        <RowRadioButtonsGroup rating={rating} setRating={setRating} />
      </div>
      <div className="tes">
        <h2 className="Rpost-title">태 그</h2>
        <OneLineTextFields tags={tags} setTags={setTags} />
      </div>
      <div className="tes wid">
        <ContainedButtons handleCreate={handleCreate} />
      </div>
    </div>
    
  );
};

export default ReviewWrite;
