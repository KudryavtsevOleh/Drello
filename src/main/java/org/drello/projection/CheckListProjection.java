package org.drello.projection;

import org.drello.persistence.CheckList;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "checkList", types = CheckList.class)
public interface CheckListProjection {

    String getId();
    String getName();
    Double getProgress();
    List<CheckListItemProjection> getCheckListItems();

}
