package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyGOrderVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import com.project.SnakeDev.vo.StudyOrderPayVo;

import java.util.List;

public interface MainService {
    public List<StudyGInfoVo> ViewStudyGInfo();
    public List<StudyInInfoVo> ViewStudyInInfo();
    public List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
    public int InsertOrderPay(StudyOrderPayVo studyOrderPayVo);
    public int InsertGOrderWait(StudyGOrderVo studyGOrderVo);
}
