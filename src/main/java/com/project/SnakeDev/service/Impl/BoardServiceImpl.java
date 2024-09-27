package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.BoardMapper;
import com.project.SnakeDev.service.BoardService;
import com.project.SnakeDev.vo.BoardVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    @Autowired
    private BoardMapper mapper;

    @Override
    public List<BoardVo> viewAll() {
        return mapper.viewAll();
    }
}
