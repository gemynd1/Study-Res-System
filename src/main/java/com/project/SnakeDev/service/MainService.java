package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyInInfoVo;

import java.util.List;

public interface MainService {
    public List<StudyGInfoVo> ViewStudyGInfo();
    public List<StudyInInfoVo> ViewStudyInInfo();
    public List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
}
