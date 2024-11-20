package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ChatRoomVo {
    private int ChatIdx, ComIdx;
    private String ChatName;

    // 기본생성자
    public ChatRoomVo() {

    }

    public int getChatIdx() {
        return ChatIdx;
    }

    public void setChatIdx(int chatIdx) {
        ChatIdx = chatIdx;
    }

    public int getComIdx() {
        return ComIdx;
    }

    public void setComIdx(int comIdx) {
        ComIdx = comIdx;
    }

    public String getChatName() {
        return ChatName;
    }

    public void setChatName(String chatName) {
        ChatName = chatName;
    }
}
