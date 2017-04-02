package org.drello.projection;

import org.drello.persistence.User;
import org.springframework.data.rest.core.config.Projection;

import java.awt.datatransfer.StringSelection;

@Projection(name = "user", types = User.class)
public interface UserProjection {

    String getId();
    String getLogin();

}
