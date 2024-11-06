package com.project.SnakeDev.vo;

public class BoardVo {
    int classidx, classgrade;
    String classname;

    public BoardVo(int classidx, String classname, int classgrade) {
        this.classidx = classidx;
        this.classname = classname;
        this.classgrade = classgrade;
    }

    public int getClassidx() {
        return classidx;
    }

    public void setClassidx(int classidx) {
        this.classidx = classidx;
    }

    public int getClassgrade() {
        return classgrade;
    }

    public void setClassgrade(int classgrade) {
        this.classgrade = classgrade;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }
}
