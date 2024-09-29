package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.AuthMapper;
import com.project.SnakeDev.service.AuthService;
import com.project.SnakeDev.vo.AuthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthMapper authMapper;

    @Override
    @Transactional
    public int InsertJoin(AuthVo authVo) {
        return authMapper.InsertJoin(authVo);
    }

    @Override
    @Transactional
    public int InsertMemberAddress(AuthVo authVo) {
        return authMapper.InsertMemberAddress(authVo);
    }
}
