package Controllers;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.Enumeration;

import DataAccessObjects.CustomerDAO;
import Operations.JsonConversion;
import Operations.PasswordCryption;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.JsonObject;
import Handlers.*;


public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private CustomerDAO dao = new CustomerDAO();
	private JsonConversion json = new JsonConversion();
	private PasswordCryption passwordCryption = new PasswordCryption();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		 process(request, response);	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	
	public void process(HttpServletRequest request,HttpServletResponse response)  {
		
		String method = request.getMethod(); 
				
		ObjectURI objectUri = new ObjectURI(request); // EndPoint Decoding
		
		String className = objectUri.getCollectionType();
		
		Handler object = getClass(className); // Handler Object 

		JsonObject jsonData = request.getMethod().equals("PUT")? putMethodJson(request) :generateJsonData(request); // Data 
		
		String data = switchMethod(method,object,objectUri,jsonData); // Sending Request To Handles and Storing Response
		
		// Adding A Cookie if User is Loging In 
		if(className.equals("Customer")&&method.toLowerCase().equals("post")&&jsonData.get("name")==null) {
			addCustomerToSession(json.stringToJson(data),response);
		}
		
		// Sending Response 
		response.setContentType("application/json");
		
		try {
			response.getWriter().print(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	private JsonObject putMethodJson(HttpServletRequest request) {
		
	           JsonObject data = (JsonObject)request.getAttribute("requestParams");
	           return data;        
	}
	
	
	
	private JsonObject generateJsonData(HttpServletRequest request) {
	    JsonObject jsonObject = new JsonObject();
	    
	    Enumeration<String> parameterNames = request.getParameterNames();
	    
	    while (parameterNames.hasMoreElements()) {
	        String paramName = parameterNames.nextElement();
	        String paramValue = request.getParameter(paramName);
	        jsonObject.addProperty(paramName, paramValue);
	    }
	    
	    return jsonObject;
	}
	
	
	private String switchMethod(String method,Handler handler,ObjectURI objectUri,JsonObject jsonData) {
		String data = null;
		
		switch(method.toLowerCase()) {
		case "get":
			data = handler.fetch(objectUri,jsonData);
			break;
		case "post":
			data = handler.create(objectUri,jsonData);
			break;
		case "put":
			data = handler.update(objectUri,jsonData);
			break;
		case "delete":
			data = handler.delete(objectUri,jsonData);
			break;
		default:
			break;
		}
		
		return data;
	}
	
	// Returning Handler Object By using Reflection 
	private Handler getClass(String className) {
		Handler object = null;
		
		 try {
			 
			String classPath = "Handlers."+className+"Handler";
			Constructor<?> con = Class.forName(classPath).getConstructor();
			object = (Handler) con.newInstance();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return object;
	}
	
	
	// Generating Cookie 
	private  void addCustomerToSession(JsonObject jsonData,HttpServletResponse response) {
				
		if(jsonData != null &&jsonData.get("customer_id") != null) {
			
			String [] sessionData = dao.fetchUserSession(jsonData.get("customer_id").getAsString());
			
			if (sessionData != null && sessionData.length > 0 ) {
				
				Cookie cookie = new Cookie("ZKART",passwordCryption.encryption(sessionData[0]+"-ZKART"));
				response.addCookie(cookie);
				dao.updateIsLogin(jsonData.get("customer_id").getAsString(),1);
				
			}
			else {
				
				// If The User Is Loging in For First Time 
				String session_id = dao.insertSession(jsonData.get("customer_id").getAsString());
				Cookie cookie = new Cookie("ZKART",passwordCryption.encryption(session_id+"-ZKART"));
				response.addCookie(cookie);
				
			}
		}
		
	}

	
	
	
	
}