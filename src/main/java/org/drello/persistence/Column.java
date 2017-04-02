package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Column {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Card> cards;

}
