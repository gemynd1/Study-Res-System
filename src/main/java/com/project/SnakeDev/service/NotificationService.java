package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.NotificationVo;

import java.util.List;

public interface NotificationService {
    public List<NotificationVo> ViewNotification(String sessionId, String sessionName);
    public int OrderNotification(String MaContent, String MemberId);
    public int notificationdel(Integer maidx);
    public int notificationdelall();
}
