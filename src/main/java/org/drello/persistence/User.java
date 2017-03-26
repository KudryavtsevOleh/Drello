package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.drello.enums.Role;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class User {

    @Id
    private String id;
    private String login;
    private String email;
    private String password;
    private Role role;

}