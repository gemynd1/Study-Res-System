package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.BoardVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardVo> viewAll();
}
