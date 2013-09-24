package com.eshop.commonsys.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;
import org.junit.runner.Request;
import org.springframework.stereotype.Component;

import com.base.framwork.action.BaseAction;
import com.base.framwork.service.mail.IMailSenderService;
import com.eshop.domain.UserBuyer;
import com.eshop.model.UserBuyerModel;
import com.eshop.service.IUserBuyerService;

/**
 * 用户注册action
 * @author chenas
 *
 */
@Component
public class RegAction extends BaseAction{

	@Resource
	private IUserBuyerService userBuyerService;
	
	@Resource
	private IMailSenderService mailSenderService;
	
	//用于接收页面的参数
	private UserBuyer userBuyer;
	
	//验证码
	private String securityCode;
	
	@Override
	public String execute() {
		String serverCode = (String) doGetSessionObject("SESSION_SECURITY_CODE");
		if(securityCode == null || securityCode.equals("") || !serverCode.equals(securityCode)){
			addFieldError(securityCode, "验证码不正确");
			return INPUT;
		}
		UserBuyerModel user = new UserBuyerModel();
		user.setName(userBuyer.getName());
		user.setEmail(userBuyer.getEmail());
		user.setPassword(mdcrypt.MD5(userBuyer.getPassword())); //密码md5加密
		//保存注册信息
		userBuyerService.insertEntity(user, userBuyer);
		user = userBuyerService.findEntityById(userBuyerService.hasUser(userBuyer.getName(), null));
		doPutSessionObject("loginUser", user);
		sendMail(user);
		addActionMessage("亲，离注册完成还有一步哦，请登录邮箱戳一下链接即可");
		return SUCCESS;  //到首页
	}

	/**
	 * 设置用户名、目的邮箱地址
	 * 邮箱模板
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private void sendMail(UserBuyerModel user){
		Map model = new HashMap();
		model.put("username", userBuyer.getName());
		model.put("toMailAddr", userBuyer.getEmail());
		model.put("url", "http://localhost:8080/eshop/pages/commonsys/mailverify.action?id="+user.getId());
		mailSenderService.setTemplateName("mail-register.vm");
		mailSenderService.sendHtmlWithTemplate(user.getEmail(), model);
	}
	
	public UserBuyer getUserBuyer() {
		return userBuyer;
	}

	public void setUserBuyer(UserBuyer userBuyer) {
		this.userBuyer = userBuyer;
	}

	public String getSecurityCode() {
		return securityCode;
	}

	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}
	
}
