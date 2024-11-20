package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.MypageMapper;
import com.project.SnakeDev.service.MypageService;
import com.project.SnakeDev.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
@Transactional
public class MypageServiceImpl implements MypageService {

    @Autowired
    private MypageMapper mypageMapper;

    @Override
    public AuthVo getUserInfo(
            String memberId,
            String memberPw) {
        // MypageMapper를 사용하여 데이터베이스에서 사용자 정보를 조회합니다.
        return mypageMapper.getUserInfo(memberId, memberPw);
    }

    @Override
    public AuthVo getMemberInfo(
            String memberId) {
        return mypageMapper.getMemberInfo(memberId);
    }

    @Override
    public AuthVo getUpdateInfo(String memberId) {
        return mypageMapper.getUpdateInfo(memberId);
    }

    @Override
    public int updateMemberInfo(AuthVo authVo) {
        return mypageMapper.updateMemberInfo(authVo);
    }

    @Override
    public int updateMemberAddress(AuthVo authVo) {
        return mypageMapper.updateMemberAddress(authVo);
    }

    @Override
    public List<StudyInPareVo> ViewStudyInPare() {
        return mypageMapper.ViewStudyInPare();
    }

    @Override
    public AuthVo mypageAddTime(String memberid) {
        return mypageMapper.mypageAddTime(memberid);
    }

    @Override
    public List<StudyCommunityVo> getBoardInfo(
            String memberId) {
        return mypageMapper.getBoardInfo(memberId);
    }

    @Override
    public List<StudyReviewVo> getReviewInfo(
            String memberId) {
        return mypageMapper.getReviewInfo(memberId);
    }

    @Override
    public List<StudyGOrderVo> mypageGroupCheck(String MemberId) {
        return mypageMapper.mypageGroupCheck(MemberId);
    }

    @Override
    public List<TemplateOrderVo> mypageInviCheck(String MemberId) {
        return mypageMapper.mypageInviCheck(MemberId);
    }

    @Override
    public AuthVo ExitMemberInfo(
            String memberId){
        return mypageMapper.ExitMemberInfo(memberId);
    }

    @Override
    public int InsertCustomerHelp(CustomerHelpVo customerHelpVo) {
        return mypageMapper.InsertCustomerHelp(customerHelpVo);
    }

    @Override
    public List<CustomerHelpVo> getCustomerHelpInfo(String memberId) {
        return mypageMapper.getCustomerHelpInfo(memberId);
    }
//    @Override
//    public void savePayment(StudyOrderPayVo studyOrderPayVo) throws Exception {
//        mypageMapper.insertPayment(studyOrderPayVo);
//    }

}
