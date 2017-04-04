package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.drello.enums.Role;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String login;
    private String email;
    private String password;
    private Role role;

}
