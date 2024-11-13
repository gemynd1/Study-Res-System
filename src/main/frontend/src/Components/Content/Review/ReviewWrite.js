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
import { useState,useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

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
      // event.preventDefault();
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
          className="drop-wid"
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
  // const [midx, setMidx] = useState(null);  // MIDX를 상태로 추가
  // const [sriImg, setSriImg] = useState([]); // 이미지를 배열안에 string으로 url 가져오기
  // const memberName = sessionStorage.getItem('name');
  
  const [data1, setData1] = useState({
    studyRoom:'',
    content: '',
    rating: '',
    memberId: '',
  })
  // useEffect(() => {
  //   setData1((prevState) => ({
  //     ...prevState,
  //     sgiIdx: studyRoom,
  //     srContent: content,
  //     srStar: rating,
  //     memberId: sessionStorage.getItem('id'),
  //   }))
  // }, [])

  const handleCreate = (e) => {
    // console.log('data1:', data1);
    console.log('studyRoom:',studyRoom);
    console.log('content:',content)
    // console.log('data1.studyRoom:',data1.studyRoom);
    // console.log('data1.content:',data1.content);
    console.log('rating',rating);
    console.log(tags);
    console.log(uploadedFiles);

    e.preventDefault();

    // data1 ->
    // sgiIdx: Number(studyRoom),
    //       srContent: content,
    //       srStar: Number(rating),
    //       memberId: sessionStorage.getItem("id"),

    axios.post("http://localhost:8099/api/review/content", {
        params : {data1},
        // , tags, uploadedFiles
      },
      {
          headers: {
              "Content-Type": "application/json", // 반드시 JSON으로 설정
          },
      })
      .then(response => {
        // 성공하면 리뷰메인으로 나가게 해주면 되고
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
          // console.error("에러발생: ", error);
      })
  };

//   const requestMidx = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8099/api/reviews/member/${memberName}`, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//
//       if (response.status !== 200) {
//         throw new Error('MIDX를 가져오는 데 실패했습니다.');
//       }
//
//       return setMidx(response.data); // MIDX를 반환
//     } catch (error) {
//       console.error("Error fetching MIDX:", error);
//       alert(error.message);
//       return null;
//     }
//   };
// requestMidx();

// const requestSriImg = async () => { //
//   try {
//     const response = await axios.get('http://localhost:8099/api/reviews/img', {
//       headers: { 'Content-Type': 'application/json' }
//     });
//
//     if (response.status !== 200) {
//       throw new Error('SriImg를 가져오는 데 실패했습니다.');
//     }
//   } catch (error) {
//     console.error("Error fetching SriImg:", error);
//     alert(error.message);
//     return null;
//   }
// };
// requestSriImg(); 
  
    
  




    // if (!studyRoom || !content || !rating || tags.length === 0 || uploadedFiles.length === 0) {
    //   alert('모든 필드를 채워주세요.');
    //   return;
    // }

    // const reviewFormData = new FormData();
    // reviewFormData.append('SGIIDX', studyRoom);
    // reviewFormData.append('SRCONTENT', content);
    // reviewFormData.append('SRSTAR', rating);
    // reviewFormData.append('TSHTLCONTENT', tags);
    // reviewFormData.append('MIDX', midx); // MIDX 추가

  //   for (let [key, value] of formData.entries()) {
  //   if (value instanceof File) {
  //     console.log(`${key}: ${value.name} (${value.size} bytes)`); // Log file name and size
  //   } else {
  //     console.log(`${key}: ${value}`); // Log other form data
  //   }
  // }
  // reviewFormData .entries() 매서드 객체 FormData에 포함된 몯느 키-값 쌍의 반복자를 반환. 배열로 저장
  //   try {
  //     const reviewResponse = await axios.post('http://localhost:8099/api/reviews', reviewFormData );
  //     if (reviewResponse.status !== 200) {
  //       throw new Error('서버에 데이터를 저장하는 데 실패했습니다.');
  //     }
  //     alert('리뷰가 성공적으로 저장되었습니다.');
  //     console.log(reviewResponse.data);
  //
  //     const imageFormData = new FormData();
  //       uploadedFiles.forEach((uploadedFile) => {
  //       imageFormData.append('SRIIMG', uploadedFile.file.name); // file 객체 자체를 추가x 나는 이미지 이름을 넣고 싶음
  //     });
  //     const imageResponse = await axios.post('http://localhost:8099/api/reviews/img', imageFormData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //     });
  //     if (imageResponse.status !== 200) {
  //       throw new Error('이미지 데이터를 저장하는 데 실패했습니다.');
  //     }
  //     console.log('이미지가 성공적으로 저장되었습니다:', imageResponse.data);
  //
  //
  //   } catch (error) {
  //     console.error("Error:", error.response ? error.response.status : error.message);
  //     alert(error.message);
  //   }

  


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