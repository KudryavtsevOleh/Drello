package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
public class Card {

    @Id
    private String id;

    private String name;
    private String description;

    @DBRef
    private List<User> users;

    @DBRef
    private List<Comment> comments;

    private Long dueDate;

    @DBRef
    private List<Attachment> attachments;

    @DBRef
    private List<CheckList> checkLists;

}
