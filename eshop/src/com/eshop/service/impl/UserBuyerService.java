package com.eshop.service.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.springframework.stereotype.Component;

import com.base.framwork.service.EntityService;
import com.eshop.model.UserBuyerModel;
import com.eshop.service.IUserBuyerService;

/**
 * userbuyerҵ�����ʵ��
 * @author chenas
 *
 */
@Component
public class UserBuyerService extends EntityService<UserBuyerModel> implements IUserBuyerService{
	
	/**
	 * 
	 * @param name
	 * @param password
	 * @return
	 */
	public String hasUser(String name, String password){
		List<UserBuyerModel> user = null;
		if(password == null || password.equals("")){
			user = getCrudDao().findObjListByHql("from USER_BUYER as a where a.name='"+name+"'");
		}else{
			user = getCrudDao().findObjListByHql("from USER_BUYER as a where a.name='"+name+"' and a.password='"+utilService.getMD5String(password)+"'");
		}
		if(user != null && user.size()>0){
			return user.get(0).getId();
		}else{
			return null;
		}
	}
	
	/**
	 * 此邮箱是否已被注册
	 * @param Email
	 * @return
	 * 		true if has
	 */
	@SuppressWarnings("unchecked")
	public boolean hasEmail(String Email){
		List<UserBuyerModel> user = null;
		if(Email != null && !Email.equals("")){
			user = getCrudDao().findObjListByHql("from USER_BUYER as a where a.email='"+Email+"'");
		}
		if(user != null && user.size()>0){
			return true;
		}else{
			return false;
		}
		
	}
	
}
