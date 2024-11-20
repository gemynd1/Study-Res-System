import React from "react";
import { Select, MenuItem } from "@mui/material";


// Material UI 라이브러리 드롭다운 


export default function UnstyledSelectForm({ onChange }) {
  const handleChange = (event) => {
    const selectedRoom = event.target.value; // 선택된 값을 가져옴
    onChange(selectedRoom); // 부모 컴포넌트로 값 전달
  };

  return (
    <form>
      {/* Material UI 기본 Select 사용 */}
      <Select defaultValue="" onChange={handleChange} displayEmpty>
        <MenuItem value="">전체 스터디룸</MenuItem>
        <MenuItem value={1}>스터디룸1</MenuItem>
        <MenuItem value={2}>스터디룸2</MenuItem>
        <MenuItem value={3}>스터디룸3</MenuItem>
        <MenuItem value={4}>스터디룸4</MenuItem>
        <MenuItem value={5}>스터디룸5</MenuItem>
      </Select>
    </form>
  );
}
