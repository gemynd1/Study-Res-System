package com.project.SnakeDev.config;

import java.lang.reflect.Field;
import java.util.Map;

public class VOMapper {
    public static <T> T mapToVO(Map<String, Object> data, Class<T> voClass) throws Exception {
        T instance = voClass.getDeclaredConstructor().newInstance();

        for (Map.Entry<String, Object> entry : data.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            try {
                Field field = voClass.getDeclaredField(key);
                field.setAccessible(true);  // private 필드 접근 허용
                field.set(instance, value);  // 필드에 값 설정
            } catch (NoSuchFieldException e) {
                System.out.println("Field not found: " + key);
                // 필드가 VO에 없으면 무시하거나 로그 출력
            }
        }

        return instance;
    }
}
