package Handlers;

import DataAccessObjects.CustomerDAO;

import com.google.gson.JsonObject;

import Operations.JsonConversion;
import Operations.Mailer;
import Operations.PasswordCryption;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;

import Classes.Customer;
import Classes.SuperClass;
import Controllers.ObjectURI;

public class CustomerHandler extends Handler{

	private CustomerDAO DAO = new CustomerDAO();
	private PasswordCryption passwordCryption = new PasswordCryption();
	private JsonConversion json = new JsonConversion();	
	private Mailer mailer = new Mailer();
	private static HashMap<String,String> otps = new HashMap<String,String>();
	
	// Decryption Of Front End Encrypted Data .
	private String deEnPassword(String password) {
		byte[] decodedBytes = Base64.getDecoder().decode(password);
		String decoded = new String(decodedBytes);
		String encryptedPassword = passwordCryption.encryption(decoded);
		return encryptedPassword;
	}
	
	@Override
	public String fetch(ObjectURI objectUri,JsonObject jsonData){
		String outputData = null; 
		
		// Checking The Password With Customer Id .
		if (jsonData.get("password") != null && objectUri.isSignleId()) {
			
			String encryptedPassword = deEnPassword(jsonData.get("password").getAsString());
			boolean temp = DAO.checkPasswordWithId(encryptedPassword, objectUri.getSingleId());
			outputData = "{\"message\":"+temp+"}";
			
		}
		
		// Checking if the Email is Present in DB or Not .
		else if (jsonData.get("email")!= null && !jsonData.get("email").getAsString().strip().equals("")) {
			boolean temp = DAO.checkEmail(jsonData.get("email").getAsString());
			
			// Sending OTP 
			if (jsonData.get("sendOtp") != null) {
				
				// Sending OTP if Email is Present In DB 
				if (jsonData.get("sendOtp").getAsInt() == 1 && temp) {
					   new Thread(() -> {
						   String otp = mailer.sentOtp(jsonData.get("email").getAsString());
						   	otps.put(jsonData.get("email").getAsString(), otp);
				        }).start();				
				}
				// Sending OTP if Email is Not Present in DB 
				else if (jsonData.get("sendOtp").getAsInt() == 0 && !temp){
					   new Thread(() -> {
						   String otp = mailer.sentOtp(jsonData.get("email").getAsString());
						   otps.put(jsonData.get("email").getAsString(), otp);
				        }).start();				
				}
				
				outputData = "{\"message\":"+temp+"}";
				
			}else {
				outputData = "{\"message\":"+temp+"}";
			}
			
		}
			
		// Fetching Particular Customer Data 
		else if (objectUri.isSignleId()) {
			outputData = json.objectToJson(DAO.fetchCustomer(objectUri.getSingleId()));
		}
		// Fetch All Customers 
		else {
			ArrayList<SuperClass> customerList = DAO.fetchCustomers();		
			outputData = json.listToJson(customerList);
		}
		
		return outputData;
	}
	
	
	@Override
	public String create(ObjectURI objectUri,JsonObject jsonData){
		String outputData = null;
		
		// Password Encryption 
		String encryptedPassword =  jsonData.get("password").getAsString().strip().equals("") ? null : deEnPassword(jsonData.get("password").getAsString());
		
		boolean login = jsonData.get("email") != null && jsonData.get("password") != null && jsonData.get("name") == null && jsonData.get("mobile") == null && jsonData.get("address") == null &&
				!jsonData.get("email").getAsString().strip().equals("") && !jsonData.get("password").getAsString().strip().equals("");
		
		boolean register = jsonData.get("email") != null && jsonData.get("password") != null && jsonData.get("name") != null && jsonData.get("mobile") != null && jsonData.get("address") != null && jsonData.get("otp") != null &&
				!jsonData.get("email").getAsString().strip().equals("") && !jsonData.get("password").getAsString().strip().equals("") && !jsonData.get("name").getAsString().strip().equals("") && !jsonData.get("mobile").getAsString().strip().equals("") && 
				!jsonData.get("address").getAsString().strip().equals("") ;
		
		if (login) {
			SuperClass object = DAO.loginCredentials(jsonData.get("email").getAsString(), encryptedPassword);
			if (object != null) {
				outputData = json.objectToJson(object);
				
				   new Thread(() -> {
			            mailer.sendEmail(jsonData.get("email").getAsString(), "login");
			        }).start();				
				
			}
			else {
				
				outputData=null;
				
			}
		}
		
		else if (register) {
			
			// After Registration Returning The Customer Id 
			String customer_id = null;
			
			int userType = jsonData.get("userType") == null ? 0 : jsonData.get("userType").getAsInt();
			
			// OTP Validation
			if (otps.get(jsonData.get("email").getAsString()).equals(jsonData.get("otp").getAsString())){
				
				customer_id = DAO.createCustomer(jsonData.get("email").getAsString(), encryptedPassword, jsonData.get("name").getAsString(),
						jsonData.get("mobile").getAsString(), jsonData.get("address").getAsString(),userType);
				
				if(customer_id != null) {
					
					  otps.remove(jsonData.get("email").getAsString());
	
					   new Thread(() -> {
						   	mailer.sendEmail(jsonData.get("email").getAsString(), "registration");
				        }).start();				
				}
			} 
			
			outputData = "{\"message\":\""+customer_id+"\"}";
		
		}
		return outputData;	
	}
		
		


	
	@Override
	public String update(ObjectURI objectUri,JsonObject jsonData){
		String outputData = null; 
		
		boolean updateCustomer = jsonData.get("name")!=null && jsonData.get("address") != null && jsonData.get("mobile") != null && jsonData.get("password") == null && jsonData.get("user_type") == null && !jsonData.get("name").getAsString().strip().equals("") && !jsonData.get("mobile").getAsString().strip().equals("") && 
				!jsonData.get("address").getAsString().strip().equals("") ;
		
		boolean updatePassword = jsonData.get("name") ==null && jsonData.get("address") == null && jsonData.get("mobile") == null && jsonData.get("password") != null && jsonData.get("user_type") == null && !jsonData.get("password").getAsString().strip().equals("") ;
			
		boolean logFirst = jsonData.get("logFirst") != null &&jsonData.get("name") ==null && jsonData.get("address") == null && jsonData.get("mobile") == null && jsonData.get("password") == null && jsonData.get("user_type") == null ;

		if(objectUri.isSignleId()) {
			if (updateCustomer) {
				
				boolean temp = DAO.updateCustomer(jsonData.get("name").getAsString(),jsonData.get("mobile").getAsString(),
						jsonData.get("address").getAsString(), objectUri.getSingleId(),jsonData.get("userType") == null ? 0 : jsonData.get("userType").getAsInt() );
				
				outputData = "{\"message\":"+temp+"}";
				
			}
			else if(updatePassword) {
				
				String encryptedPassword = deEnPassword(jsonData.get("password").getAsString());			
				boolean temp =  DAO.updatePassword(objectUri.getSingleId(), encryptedPassword,1);
				Customer customer = (Customer)DAO.fetchCustomer(objectUri.getSingleId());
				String email = customer.getEmail();
				
				if(temp) {
					   new Thread(() -> {
						   mailer.sendEmail(email, "passwordChange");
				        }).start();				
				}
				outputData = "{\"message\":"+temp+"}";
			}
			
			else if (logFirst) {
					boolean temp = DAO.updateLogFirst(jsonData.get("logFirst").getAsInt(),objectUri.getSingleId());
					outputData = "{\"message\":"+temp+"}";
			}
			
		}
		else if (jsonData.get("otp")!=null && jsonData.get("email") != null && updatePassword && 
				!jsonData.get("email").getAsString().strip().equals("") && !jsonData.get("otp").getAsString().strip().equals("") ) {
			
		    // Password Encryption 	        
			String encryptedPassword =  deEnPassword(jsonData.get("password").getAsString());			
			boolean temp = false;
			
			
			if (jsonData.get("otp") != null && jsonData.get("email") != null && otps.get(jsonData.get("email").getAsString()).equals(jsonData.get("otp").getAsString())){
			    temp = DAO.updatePassword(jsonData.get("email").getAsString(), encryptedPassword,0);
			    
				if(temp) {
					
					outputData = "{\"message\":"+temp+"}";
					otps.remove(jsonData.get("email").getAsString());
				    new Thread(() -> {
					   mailer.sendEmail(jsonData.get("email").getAsString(), "passwordChange");
			         }).start();
				    
				}else {
					outputData = "{\"message\":"+temp+",\"error\":\"password\"}";
				}	
			}else {
				    outputData = "{\"message\":"+temp+",\"error\":\"otp\"}";
			}
		}
		
		return outputData;	
	}
	
	
	@Override
	public String delete(ObjectURI objectUri,JsonObject jsonData){
	
		String outputData = null;
		// Deleteing The Customer 
		if (objectUri.isSignleId()) {
			boolean temp = DAO.deleteCustomer(objectUri.getSingleId());
			outputData = "{\"message\":"+temp+"}";
		}
	
	   return outputData;
	
	}	

}
