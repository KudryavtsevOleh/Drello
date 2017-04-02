package org.drello.projection;

import org.drello.persistence.Comment;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "comment", types = Comment.class)
public interface CommentProjection {

    String getId();
    UserProjection getUser();
    String getText();
    Long getDate();

}
