package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.NotificationMapper;
import com.project.SnakeDev.service.NotificationService;
import com.project.SnakeDev.vo.NotificationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationMapper notificationMapper;

    @Override
    public List<NotificationVo> ViewNotification(String MemberId, String MemberName) {
        return notificationMapper.ViewNotification(MemberId, MemberName);
    }

}
