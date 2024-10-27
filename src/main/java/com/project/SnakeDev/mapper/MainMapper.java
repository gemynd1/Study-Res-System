package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {
    List<StudyGInfoVo> ViewStudyGInfo();
    List<StudyInInfoVo> ViewStudyInInfo();
    List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
}
