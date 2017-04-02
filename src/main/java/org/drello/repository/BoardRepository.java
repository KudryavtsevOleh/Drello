package org.drello.repository;

import org.drello.persistence.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BoardRepository extends PagingAndSortingRepository<Board, Long> {

    Page<List<Board>> findByUserId(Long id, Pageable pageable);

}
