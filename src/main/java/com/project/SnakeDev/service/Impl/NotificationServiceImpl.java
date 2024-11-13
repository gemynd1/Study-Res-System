package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.NotificationMapper;
import com.project.SnakeDev.service.NotificationService;
import com.project.SnakeDev.vo.NotificationVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationMapper notificationMapper;

    @Override
    public List<NotificationVo> ViewNotification(@Param("sessionId") String sessionId,
                                                 @Param("sessionName") String sessionName) {
        return notificationMapper.ViewNotification(sessionId, sessionName);
    }

    @Override
    public int OrderNotification(String MaContent) {
        return notificationMapper.OrderNotification(MaContent);
    }

}
