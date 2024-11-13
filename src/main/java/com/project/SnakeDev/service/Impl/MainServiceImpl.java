package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.MainMapper;
import com.project.SnakeDev.service.MainService;
import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Param;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MainServiceImpl implements MainService {
    @Autowired
    private MainMapper mainMapper;
    @Override
    @Transactional
    public List<StudyGInfoVo> ViewStudyGInfo() {
        return mainMapper.ViewStudyGInfo();
    }

    @Override
    @Transactional
    public List<StudyInInfoVo> ViewStudyInInfo() {
        return mainMapper.ViewStudyInInfo();
    }

    @Override
    @Transactional
    public List<StudyGInfoVo> ViewStudyGInfoDetail(String sginum) {
        return mainMapper.ViewStudyGInfoDetail(sginum);
    }

    @Override
    @Transactional
    public List<StudyGOrderVo> selectTime(String sginum) {
        return mainMapper.selectTime(sginum);
    }

    @Override
    @Transactional
    public int InsertOrderPay(@Param("MemberId") String MemberId,
                              @Param("pay") StudyOrderPayVo studyOrderPayVo) {
        return mainMapper.InsertOrderPay(MemberId, studyOrderPayVo);
    }

    @Override
    @Transactional
    public int InsertGOrderWait(@Param("MemberId") String MemberId,
                                @Param("wait") StudyGOrderVo studyGOrderVo) {
        return mainMapper.InsertGOrderWait(MemberId, studyGOrderVo);
    }

    @Override
    @Transactional
    public int InsertInOrderWait(HashMap<String, Object> params) {
        return mainMapper.InsertInOrderWait(params);
    }

    @Override
    @Transactional
    public int saveTemplateOrder(String TTOIdx, String requestData, String MemberId) {
        return mainMapper.saveTemplateOrder(TTOIdx, requestData, MemberId);
    }

    @Override
    @Transactional
    public String selectTemplateOrder(String orderid) {
        return mainMapper.selectTemplateOrder(orderid);
    }

    @Override
    @Transactional
    public int updateTemplateOrder(String orderid) {
        return mainMapper.updateTemplateOrder(orderid);
    }
}
