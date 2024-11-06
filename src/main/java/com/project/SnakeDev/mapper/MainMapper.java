package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyGOrderVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import com.project.SnakeDev.vo.StudyOrderPayVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {
    List<StudyGInfoVo> ViewStudyGInfo();
    List<StudyInInfoVo> ViewStudyInInfo();
    List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
    int InsertOrderPay(StudyOrderPayVo studyOrderPayVo);
    int InsertGOrderWait(StudyGOrderVo studyGOrderVo);
}
