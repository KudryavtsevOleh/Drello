package org.drello.projection;

import org.drello.persistence.Board;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "board", types = Board.class)
public interface BoardProjection {

    String getId();
    String getName();
    List<ColumnProjection> getColumns();
    UserProjection getUser();

}
