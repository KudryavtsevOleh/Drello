package org.drello.repository;

import org.drello.persistence.CheckList;
import org.springframework.data.repository.CrudRepository;

public interface CheckListRepository extends CrudRepository<CheckList, Long> {
}
