package DataAccessObjects;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;
import Logs.Logger;
import Classes.*;

public class CustomerDAO extends DAO {
	private final String tableName = "customer";
	private Logger logger = new Logger(); 
	
	// Login Authentication .
	public SuperClass loginCredentials(String email,String password) {
		ArrayList<SuperClass> lists =  this.selectQuery(tableName,"","email = ? and password = ? ",
					              new String[]{email,password});
		if (lists.isEmpty()) {
			return null;
		}
		return lists.get(0);
	}
	
	// Fetching the Session Details .
	public ResultSet getSessions() {
		return this.executeQuery(this.selectQueryToNest("usersession","",""), null);
	}
	
	// updating the status isLogin if the user in UserSession table 
	public int updateIsLogin(String customerId,int num) {
		return this.updateQuery("usersession","islogin = ?"," customer_id = ? ", new String[] {"int "+num,customerId});
	}
	
	// Fetching the Particular User Session Data by using Customer Id 
	public String[] fetchUserSession(String customer_id) {
		ResultSet resultset = this.selectQueryResultSet("usersession","","customer_id = ?", new String[] {customer_id});
		try {
			if (resultset.next()) {
				return new String[] {resultset.getString("session_id"),resultset.getString("customer_id"),""+resultset.getInt("islogin")};
			}
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		return null;
	}
	
	// inserting the Session For users (Only for First Time)
	public String insertSession(String customerId) {
		
		return this.insertQuery("usersession","customer_id","?",
			           new String[]{customerId},"session_id");
			
	}
		
	
	// Inserting The New Customer 
	public String createCustomer( String email , String password ,String  name , String mobile ,String  address,int userType) {
		
		return  this.insertQuery(tableName,"email , password , name , mobile , address , user_type ","?,?,?,?,?,?",
				           new String[]{email,password,name,mobile,address,"int "+userType},"customer_id");
	}
	
	
	// Updating The Details Of the Customer
	public boolean updateCustomer(String name ,String mobile ,String address ,String customerId,int userType) {
		boolean temp = false;
		
			int rowsAffected = this.updateQuery(tableName,"name = ?,mobile = ? , address = ? , user_type = ? ","customer_id = ? ",
					           new String[] {name,mobile,address,"int "+userType,customerId});
			if (rowsAffected > 0) {
				temp = true;
			}
		return temp;
	}
	
	
	// Updating The Password 
	public boolean updatePassword(String Id, String password,int emailOrPassword) {
		boolean temp = false;
		
		try {
			ResultSet resultSet = this.callFunctionQuery("set_password","?,?,?",new String[] {Id,password,"int "+emailOrPassword});
			if (resultSet.next()) {
				temp = resultSet.getBoolean("set_password");
			}
			resultSet.close();
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		
		return temp;
	}
	
	// Deleting The Customer from DB 
	public boolean deleteCustomer(String customerId) {
		boolean temp = false;
			int rowsAffected = this.deleteQuery(tableName,"customer_id = ? ",new String[] {customerId});
			if (rowsAffected > 0) {
				temp = true;
			}
		return temp;
	}
	
	
	
	// Fetching The Particular Customer by using Customer Id .
	public SuperClass fetchCustomer(String customerId) {
			ArrayList<SuperClass> list = this.selectQuery(tableName,"","customer_id = ?",
		              new String[]{customerId});
			return list.size()>0?list.get(0):null;
	}
	
	// Checking if The Particular Email is present in DB or Not 
	public boolean checkEmail(String email) {
		boolean temp = false;
			ArrayList<SuperClass> lists = this.likeQuery(tableName,"","email","?","","",
					              new String[] {email});
			if (lists.size()>0) {
				temp = true;
			}
		return temp;
	}
	
	// Checking Whether The Password Matched With Last 3 Passwords by Customere Id .
	public boolean checkPasswordWithId(String password,String customerId) {
		boolean temp = false;
			ArrayList<SuperClass> lists = this.likeQuery(tableName,"","password,password1,password2","?,?,?","OR","customer_id = ? ",
					              new String[] {password,password,password,customerId});
			if (lists.size()>0) {
				temp=true;
			}
		return temp;	
	}
	
	// Checking Whether The Password Matched With Last 3 Passwords by Email .
	public boolean checkPasswordWithEmail(String password,String email) {
		boolean temp = false;
			ArrayList<SuperClass> lists = this.likeQuery(tableName,"","password,password1,password2","?,?,?","OR","email = ? ",
					              new String[] {password,password,password,email});
			if (lists.size()>0) {
				temp=true;
			}
		return temp;
	}
	
	// Fetching The Customers Except Super Admin .
	public ArrayList<SuperClass> fetchCustomers(){
		return this.selectQuery("customer","","user_type != 2",null);
	}
	
	// Updating The LogFirst ( Which is Used to Check Whether The User is Loging In for The ForTime )
	public boolean updateLogFirst(int num,String customerId) {
		boolean temp = false;
			int rowsAffected = this.updateQuery(tableName, "log_first= ? " ,"customer_id = ? ",
					           new String[] {"int "+num,customerId});
			if ( rowsAffected > 0 ) {
				temp = true;
			}
		return temp;
	}
	
	// Updating The Discount Price After User Purchasing the Products 
	public int updateDiscountPrice(String customerId) {
		Random random = new Random();
		int value = random.nextInt(10)+20;
		
		this.updateQuery(tableName, "discountprice = ? " ,"customer_id = ? ",
		           new String[] {"int "+value,customerId});
		return value ;	
	}
	
	// Updating field used ( to Check Whether The customer used is User Coupon or not) in Customer Table 
	public void updateCouponUsed(String customerId) {
		this.updateQuery(tableName, "used=used+1" ,"customer_id = ? ",				      
				new String[] {customerId});
	}

	// Checking The Password matched With Past Three Passwords Or not 
	public boolean checkOldPassword(String customerId, String oldPassword) {
		boolean temp = this.selectQuery(tableName,"", "( password = ? OR password1 =? OR password2 = ? ) and customer_id = ? ", new String[] {oldPassword,oldPassword,oldPassword,customerId}).size() >0 ;
		return temp;
	}
	
	
	public String getCustomerSessionId(String email) {
		String sessionId = null;
		
		if(!email.strip().equals("")) {
			
			ResultSet resultSet = this.selectQueryResultSet("usersession","session_id"," customer_id in ("+
			this.selectQueryToNest("customer","customer_id"," email = ? ")+" ) ", new String[] {email});
			
			try {
				if(resultSet.next()) {
					sessionId = resultSet.getString("session_id");
				}
			} catch (SQLException e) {
				logger.errorLog(e);
				e.printStackTrace();
			}
		}
		
		return sessionId;
	}
	
}
