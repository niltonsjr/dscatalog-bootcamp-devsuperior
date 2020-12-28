package com.devsuperior.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;

	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private Long countPCGamerProducts;
	private PageRequest pageRequest;
	private Long countTotalCategory;
	private Long emptyResult;

	@BeforeEach
	private void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
		countTotalCategory = 23L;
		emptyResult = 0L;
	}

	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}

	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}
	
	@Test
	public void saveShouldPersistWhitAutoIncrementWhenIdIsNull() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts+1, product.getId());	
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer";
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		String name = "pc gaMEr";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {
		String name = "";
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnNothinWhenNameDoesNotExists() {
		String name = "Camera";
		Page<Product> result = repository.find(null, name, pageRequest);
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findShouldReturnProductsWhenCategoryExists() {
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(3L, "Computadores"));
		
		Page<Product> result = repository.find(categories, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalCategory, result.getTotalElements());
	}
	
	@Test
	public void findShoudReturnEmptyResultWhenCategoryDoesNotExists() {
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(5L, "AAA"));
		Page<Product> result = repository.find(categories, "", pageRequest);
		
		Assertions.assertTrue(result.isEmpty());
		Assertions.assertEquals(emptyResult, result.getTotalElements());
	}
	
}
