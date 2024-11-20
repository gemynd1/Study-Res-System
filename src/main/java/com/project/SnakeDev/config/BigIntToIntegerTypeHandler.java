package com.project.SnakeDev.config;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BigIntToIntegerTypeHandler extends BaseTypeHandler<Long> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Long parameter, JdbcType jdbcType) throws SQLException {
        if (parameter > Integer.MAX_VALUE || parameter < Integer.MIN_VALUE) {
            throw new IllegalArgumentException("Value exceeds INTEGER range: " + parameter);
        }
        ps.setInt(i, parameter.intValue()); // Long -> Integer 변환
    }

    @Override
    public Long getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return (long) rs.getInt(columnName); // Integer -> Long 변환
    }

    @Override
    public Long getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return (long) rs.getInt(columnIndex);
    }

    @Override
    public Long getNullableResult(java.sql.CallableStatement cs, int columnIndex) throws SQLException {
        return (long) cs.getInt(columnIndex);
    }
}

