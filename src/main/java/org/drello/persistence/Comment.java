package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class Comment {

    private String id;

    @DBRef
    private User user;

    private String text;
    private Long date;

}
