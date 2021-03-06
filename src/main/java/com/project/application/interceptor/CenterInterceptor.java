package com.project.application.interceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.project.application.bean.Admin;
import com.project.application.bean.ProjectGroup;
import com.project.application.config.Constant;

public class CenterInterceptor implements HandlerInterceptor {

	@Resource 
	HttpSession session;
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		//读取session中的帐号信息
		ProjectGroup pg = (ProjectGroup) session.getAttribute(Constant.LOGIN_GROUP);    
		if(pg == null) {
			arg0.getRequestDispatcher("/group-login").forward(arg0, arg1);
			return false;
		}else {
			return true;
		}
	}

}
