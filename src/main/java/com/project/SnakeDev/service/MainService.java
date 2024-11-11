package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Param;
import org.json.simple.JSONObject;

import java.util.List;
import java.util.Map;

public interface MainService {
    public List<StudyGInfoVo> ViewStudyGInfo();
    public List<StudyInInfoVo> ViewStudyInInfo();
    public List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
    public List<StudyGOrderVo> selectTime(String sginum);
    public int InsertOrderPay(String MemberId,StudyOrderPayVo studyOrderPayVo);
    public int InsertGOrderWait(String MemberId, StudyGOrderVo studyGOrderVo);
    public int saveTemplateOrder(String TTOIdx, String requestData);
    public String selectTemplateOrder(String ordernum);
    public int updateTemplateOrder(String ordernum);
}
