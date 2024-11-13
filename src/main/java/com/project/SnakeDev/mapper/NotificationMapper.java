package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.NotificationVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NotificationMapper {
    List<NotificationVo> ViewNotification(@Param("sessionId") String sessionId,
                                          @Param("sessionName") String sessionName);
    int OrderNotification(@Param("MaContent") String MaContent,
                          @Param("MemberId") String MemberId);
    int notificationdel(@Param("maidx") Integer maidx);
    int notificationdelall();
}
