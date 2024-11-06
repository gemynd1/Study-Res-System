package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.NotificationVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {
    List<NotificationVo> ViewNotification(String MemberId, String MemberName);
}
