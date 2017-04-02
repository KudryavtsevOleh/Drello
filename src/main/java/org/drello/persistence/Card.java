package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Card {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;

    @OneToMany(fetch = FetchType.LAZY)
    private List<User> users;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Comment> comments;

    private Long dueDate;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Attachment> attachments;

    @OneToMany(fetch = FetchType.LAZY)
    private List<CheckList> checkLists;

}
