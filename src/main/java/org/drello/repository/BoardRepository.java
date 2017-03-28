package org.drello.repository;

import org.drello.persistence.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BoardRepository extends MongoRepository<Board, String> {

    Page<List<Board>> findByUserId(String id, Pageable pageable);

}
