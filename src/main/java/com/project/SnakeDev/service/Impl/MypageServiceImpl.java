package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.MypageMapper;
import com.project.SnakeDev.service.MypageService;
import com.project.SnakeDev.vo.AuthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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



}
