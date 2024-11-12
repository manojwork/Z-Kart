package Controllers;

import java.io.BufferedReader;
import Logs.Logger;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.JsonObject;
import java.lang.StringBuilder;
import Classes.Customer;
import DataAccessObjects.CustomerDAO;
import Operations.JsonConversion;
import Operations.PasswordCryption;

public class RequestFilter extends HttpFilter implements Filter {
    private static final long serialVersionUID = 1L;
    private final JsonConversion json = new JsonConversion();
    private static final ConcurrentHashMap<String, String[]> sessionsData = new ConcurrentHashMap<>();
    private static final CustomerDAO customerDAO = new CustomerDAO();
    private final PasswordCryption passwordCryption = new PasswordCryption();

    static {
        refreshSessionsData();
    }
    
    // Fetching The session data and Storing in ConcurrentHashMap
    private static void refreshSessionsData() {
        try (ResultSet resultSet = customerDAO.getSessions()) {
            while (resultSet.next()) {
                String sessionId = resultSet.getString("session_id");
                String customerId = resultSet.getString("customer_id");
                String isLogin = String.valueOf(resultSet.getInt("islogin"));
                sessionsData.put(sessionId, new String[]{customerId, isLogin});
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    // To Get The Customer From The Cookie's Session Info
    private Customer getCustomerFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("ZKART".equals(cookie.getName())) {
            	
                String sessionId = passwordCryption.decryption(cookie.getValue()).split("-")[0];
                String[] sessionData = sessionsData.get(sessionId);
                
                if (sessionData != null) {
                	
                	if(sessionData[1].equals("1")) {
                        return (Customer) customerDAO.fetchCustomer(sessionData[0]);
                	}
                }
                
                else {
                   refreshSessionsData();
                   sessionData = sessionsData.get(sessionId);
                   if (sessionData != null) {
                   	
                   	if(sessionData[1].equals("1")) {
                           return (Customer) customerDAO.fetchCustomer(sessionData[0]);
                   	}
                  }
                }
            }
        }
        return null;
    }
    
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        Customer user = getCustomerFromCookies(request); 
        
        // Parse the URI
        ObjectURI objectUri = new ObjectURI(request);
        
        Logger logger = new Logger();
		logger.userLog(request, objectUri, user);

        // Set CORS headers
        setCORSHeaders(response);

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }


        // Handle session-related endpoints
        String path = request.getPathInfo();
        
        if ("/sessionData".equals(path)) {
            
            respondWithJson(response,json.objectToJson(getCustomerFromCookies(request)));
            
            return;
        }

        if ("/logout".equals(path) && user != null) {
        	
            handleLogout(request, response, user);
            
            return;
        }
        
        
        if (request.getMethod().equals("PUT")) {
    		
    		StringBuilder sb = new StringBuilder();
           try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
                String line;
    				while ((line = reader.readLine()) != null) {
    				    sb.append(line);
    				}
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
           	String requestBody = sb.toString();
                          	
    			String decodedValue = URLDecoder.decode(requestBody, StandardCharsets.UTF_8);
    			
    			String[] andSparated = decodedValue.split("&");
    			
    			HashMap<String,String> parameters = new HashMap<>();
    	            
    			for ( String pair : andSparated ) {
    				
    				 String keyValue[] = pair.split("=");
    				 
    				 parameters.put(keyValue[0], keyValue[1]);
    				
    			}
    			
    		  JsonObject requestParams = json.stringToJson(json.hashMapToJson(parameters));
    	            
    		  request.setAttribute("requestParams",requestParams);
    	      
    	      
    	      if (requestParams.get("email") != null && requestParams.get("password") != null ){
    	        	chain.doFilter(request, response);
    	        	return;
    	      }
    	      
    	        
    	}    

        if ((isRegisterOrLoginRequest(request, objectUri) && user == null)  ||  authentication(request,objectUri,user) ) {
        	
            chain.doFilter(req, res);
            
            if(isLogin(request)) {
            	String sessionId = customerDAO.getCustomerSessionId(request.getParameter("email"));
            	String[] sessionData = sessionsData.get(sessionId);
            	if(sessionData != null) {
                 	sessionData[1]="1";
                	sessionsData.put(sessionId,sessionData);	
            	}
            }
            
        }
        else {
            handleMissingSession(response);
        }
    }
    
    
    private boolean authentication(HttpServletRequest request, ObjectURI objectUri, Customer user) {
    	boolean temp = false;
    	
    	if(user != null && user.getUserType() > 1) {
    		temp= true;
    	}
    	else if(objectUri.getCollectionType().equalsIgnoreCase("product")) {
    		
    		temp = request.getMethod().equalsIgnoreCase("get") ||
    				
    			  (request.getMethod().equalsIgnoreCase("post") && user.getCustomerId().equalsIgnoreCase(request.getParameter("cartId")) ) ||
    			  
    			  ((request.getMethod().equalsIgnoreCase("put") || request.getMethod().equalsIgnoreCase("post")   || request.getMethod().equalsIgnoreCase("delete")  ) && user!= null && user.getUserType() > 0);
    		
    	}else if (objectUri.getCollectionType().equalsIgnoreCase("customer")) {
    		
    		temp =  user != null && (user.getCustomerId().equalsIgnoreCase(objectUri.getSingleId()) && !request.getMethod().equalsIgnoreCase("delete") && !request.getMethod().equalsIgnoreCase("post")) ||  (request.getMethod().equalsIgnoreCase("get") && user.getUserType() > 0 );
    		
    	}else if (objectUri.getCollectionType().equalsIgnoreCase("cart")) {
    		
    		
    		temp =  user != null &&  ( user.getCustomerId().equalsIgnoreCase(objectUri.getSingleId()) || (objectUri.isNestedIds() && user.getCustomerId().equalsIgnoreCase(objectUri.getNestedIds()[2])));
    		
    	}else if (objectUri.getCollectionType().equalsIgnoreCase("order")) {
    		
    		temp =   user != null && request.getMethod().equalsIgnoreCase("get") && (user.getUserType() > 0 ) || ( user.getCustomerId().equalsIgnoreCase(objectUri.getSingleId()) || ( objectUri.isNestedIds() && user.getCustomerId().equalsIgnoreCase(objectUri.getNestedIds()[2])) );
    		
    	}else if (objectUri.getCollectionType().equalsIgnoreCase("search")) {
    		
    		temp = request.getMethod().equalsIgnoreCase("get");
    		
    	}
    	
    	return temp;
    }

    private void setCORSHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private void respondWithJson(HttpServletResponse response, String jsonResponse) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(jsonResponse);
    }

    private void handleLogout(HttpServletRequest request, HttpServletResponse response, Customer user) throws IOException {
    	boolean isLoggedOut = false;
    	
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("ZKART".equals(cookie.getName())) {
                	
                	String sessionId = passwordCryption.decryption(cookie.getValue()).split("-")[0];
                    String[] sessionData = sessionsData.get(sessionId);
                    sessionData[1] = "0";
                    sessionsData.put(sessionId, sessionData);
                    cookie.setMaxAge(0);
                    isLoggedOut = customerDAO.updateIsLogin(user.getCustomerId(), 0) > 0;
                    
                    response.addCookie(cookie);
                }
            }
        }
        respondWithJson(response, "{\"message\":" + isLoggedOut + "}");
    }

    private boolean isRegisterOrLoginRequest(HttpServletRequest request, ObjectURI objectUri) {
        return (request.getParameter("email") != null || request.getParameter("password") != null) ||
               (objectUri.getCollectionType().equals("Customer") &&
                request.getParameter("name") != null && request.getParameter("mobile") != null &&
                request.getParameter("address") != null);
    }
    
    private boolean isLogin (HttpServletRequest request) {
        return  request.getParameter("email") != null && request.getParameter("password") != null && request.getParameter("name") == null && request.getParameter("mobile") == null && request.getParameter("address") == null ;		
    }

    private void handleMissingSession(HttpServletResponse response) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Session expired or invalid. Please log in.");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if required
    }

    @Override
    public void destroy() {
        // Cleanup logic if required
    }
}
