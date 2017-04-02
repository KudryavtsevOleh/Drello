package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class CheckList {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Double progress;

    @OneToMany(fetch = FetchType.LAZY)
    private List<CheckListItem> checkListItems;

}
