package com.hack.demo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.jdbc.core.RowMapper;

import java.beans.PropertyDescriptor;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Mapper {
    public static final String GET_DATE ="SELECT GETDATE() as dt";

    private Mapper() {
    }

    @Getter
    @Setter
    public static class GenericMapper<T> implements RowMapper<T> {
        private T entity;

        public T mapRow(ResultSet rs, int rowNum) throws SQLException {
            BeanWrapper bean = new BeanWrapperImpl(entity);
            PropertyDescriptor[] pd = bean.getPropertyDescriptors();
            for (PropertyDescriptor propertyDescriptor : pd) {
                bean.setPropertyValue(propertyDescriptor.getName(), pd);
            }

            throw new UnsupportedOperationException("Not supported yet.");
        }

    }


    public static class UserMapper implements RowMapper<User> {
        public static final String SELECT = "SELECT * FROM user";
        public static final String SELECT_EMAIL = "SELECT * FROM user WHERE email = ?";

        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User entity = new User();
            entity.setId(rs.getInt("Id"));
            entity.setEmail(rs.getString("Descrizione"));
            return entity;
        }
    }

    /*
    public static class HospitalMapper implements RowMapper<User> {
        public static final String SELECT = "SELECT * FROM hospital";

        public Hospital mapRow(ResultSet rs, int rowNum) throws SQLException {
            Hospital entity = new User();
            return entity;
        }
    }*/

}