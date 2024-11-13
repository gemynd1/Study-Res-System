package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface MainMapper {
    List<StudyGInfoVo> ViewStudyGInfo();
    List<StudyInInfoVo> ViewStudyInInfo();
    List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum);
    List<StudyGOrderVo> selectTime(String sginum);
    int InsertOrderPay(@Param("MemberId") String MemberId, @Param("pay") StudyOrderPayVo studyOrderPayVo);
    int InsertGOrderWait(@Param("MemberId") String MemberId, @Param("wait") StudyGOrderVo studyGOrderVo);
    int InsertInOrderWait(HashMap<String, Object> params);
    int saveTemplateOrder(String TTOIdx, String requestData, String MemberId);
    String selectTemplateOrder(String orderid);
    int updateTemplateOrder(String orderid);
}
