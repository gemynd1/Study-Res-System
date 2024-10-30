package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.MainMapper;
import com.project.SnakeDev.service.MainService;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
