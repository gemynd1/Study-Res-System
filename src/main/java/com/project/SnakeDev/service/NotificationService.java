package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.NotificationVo;

import java.util.List;

public interface NotificationService {
    public List<NotificationVo> ViewNotification(String MemberId, String MemberName);
}
