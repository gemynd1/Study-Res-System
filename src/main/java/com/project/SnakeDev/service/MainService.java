package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Param;
import org.json.simple.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface MainService {
    public List<StudyGInfoVo> ViewStudyGInfo();
    public List<StudyInInfoVo> ViewStudyInInfo();
    public List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
    public List<StudyGOrderVo> selectTime(String sginum);
    public int InsertOrderPay(String MemberId,StudyOrderPayVo studyOrderPayVo);
    public int InsertGOrderWait(String MemberId, StudyGOrderVo studyGOrderVo);
    public int InsertInOrderWait(HashMap<String, Object> params);
    public int saveTemplateOrder(String TTOIdx, String requestData, String MemberId);
    public String selectTemplateOrder(String orderid);
    public int updateTemplateOrder(String orderid);
}
