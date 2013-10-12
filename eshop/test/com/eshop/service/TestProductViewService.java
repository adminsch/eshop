package com.eshop.service;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.eshop.view.ProductViewModel;

public class TestProductViewService {

	IProductViewService productViewService;
	
	@Before
	public void init(){
		ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
		productViewService = (IProductViewService) ctx.getBean("productViewService");
	}
	
	@Test
	public void testInsert(){
		List<ProductViewModel> lists = productViewService.findEntityList();
		for(ProductViewModel pv : lists){
			System.out.println(pv.getCounter());
		}
	}
	
	
	
}
