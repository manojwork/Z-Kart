package Handlers;

import java.util.ArrayList;
import com.google.gson.JsonObject;
import Classes.Customer;
import Classes.SuperClass;
import Controllers.ObjectURI;
import DataAccessObjects.CartDAO;
import DataAccessObjects.CustomerDAO;
import DataAccessObjects.ProductDAO;
import Operations.JsonConversion;
import Operations.Mailer;

public class CartHandler extends Handler {

	private CartDAO DAO = new CartDAO();
	private JsonConversion json = new JsonConversion();
	private CustomerDAO customerDAO = new CustomerDAO();
	private ProductDAO productDAO = new ProductDAO();
	private Mailer mailer = new Mailer();
	
	@Override
	public String fetch(ObjectURI objectUri,JsonObject jsonData) {
		
		String data = null;
		ArrayList<SuperClass> products = new ArrayList<>(); 
		
		// Fetching The Cart Products by using The Customer Id 
		if(objectUri.isSignleId()) {
			
			products = DAO.fetch_Products(objectUri.getSingleId());
			String cartProducts = json.listToJson(products);
			ArrayList<SuperClass> maxStock = productDAO.fetchMaxStockProducts();
			String maxStockProducts = json.listToJson(maxStock);
			
			// Sending The maxStock Products Alone with Cart Products .
			data = "{\"cartProducts\":"+cartProducts+","
					+ "\"maxStockProducts\":"+maxStockProducts+"}";
			
		}
		
		return data;
	}
	
	
	@Override
	public String create(ObjectURI objectUri,JsonObject jsonData){

		String data = null;
		
		if(objectUri.isSignleId()) {
			
			if(jsonData.get("productId")!=null) {
				
				Customer customer = (Customer) customerDAO.fetchCustomer(objectUri.getSingleId());
				String  cp_id = null;
				
				if( customer != null && !jsonData.get("productId").getAsString().strip().equals("")) {
					 // Adding The Product Into The Cart And returning The Cart Product Id . 
					 cp_id = DAO.add_To_Cart(objectUri.getSingleId(),jsonData.get("productId").getAsString());					
				}
				
				ArrayList<SuperClass> maxStock = productDAO.fetchMaxStockProducts();
				String maxStockProducts = json.listToJson(maxStock);	
				
				// Alone With The Cart Product Id Sending The Updated Max Stock Products .
				data = "{\"message\": \""+cp_id+"\","
						+ "\"maxStockProducts\":"+maxStockProducts+"}";
				
		}
		// Purchasing The Cart Products 
		else if (jsonData.get("coupon") != null && jsonData.get("discountPrice") != null) {
			
			boolean temp = false;
			
			Customer customer = (Customer) customerDAO.fetchCustomer(objectUri.getSingleId());
			
			if( customer != null && !jsonData.get("name").getAsString().strip().equals("") && !jsonData.get("mobile").getAsString().strip().equals("") && !jsonData.get("address").getAsString().strip().equals("")) {
				temp = DAO.check_Out(objectUri.getSingleId(),jsonData.get("discountPrice").getAsInt(),jsonData.get("coupon").getAsString(),
					   jsonData.get("name").getAsString(),jsonData.get("mobile").getAsString() , jsonData.get("address").getAsString());
			  }
			
			// Checking the userCoupon is used .
			if( temp && jsonData.get("userCoupon").getAsBoolean() == true) {
				// Updating The Data that The userCoupon is Used 
				customerDAO.updateCouponUsed(objectUri.getSingleId());
				
				// Sending A Email To Notify The USed That He Has Used Th User Coupon 
		        new Thread(() -> {
		        	mailer.sendEmail(customer.getEmail(), "couponUsed");
		        }).start();

			}
			
		   // Updating the Discount Price And Returning The Discount Price 	
		   int discountPrice =customerDAO.updateDiscountPrice(objectUri.getSingleId());
				
		   // Checking if The User Coupon is Enabled Or not .
			if (customer != null && customer.getOrdersCount() == 2) {
				
				// Notifying if Enabled 
		        new Thread(() -> {
		        	mailer.sendEmail(customer.getEmail(), "couponEnabled");
		        }).start();
		        
			}
			
			// Sending The Noatication That the Order is Placed Successfully
			if(temp) {	
			        new Thread(() -> {
			        	mailer.sendEmail(customer.getEmail(),"deliveryInfo");
			        }).start();
			}
			 data = "{\"message\":"+temp+", \"discountPrice\":"+discountPrice+"}";
		}
			
	 }
		// Sending Response 
		return data;
		
	}
	
	
	@Override
	public String update(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		
		if(objectUri.isSignleId()) {
			// Updating The Cart Product's Qunatity 
			if(jsonData.get("cartProductId")!=null  && jsonData.get("count") != null && jsonData.get("count").getAsInt() >0 ) {
				boolean temp = DAO.update_Product_Count(jsonData.get("count").getAsInt(), jsonData.get("cartProductId").getAsString());
				ArrayList<SuperClass> maxStock = productDAO.fetchMaxStockProducts();
				String maxStockProducts = json.listToJson(maxStock);
				
				// Sending the Updated MaxStock Products Also
				data = "{\"message\":"+temp+","
						+ "\"maxStockProducts\":"+maxStockProducts+"}";
			}
			
		}
		 return data;
	}
	
	
	@Override
	public String delete(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
				
		if(objectUri.isNestedIds()) {
				
				// Deleting the Cart Product 
				boolean temp = DAO.delete_Cart_Product(objectUri.getNestedIds()[3]);
				ArrayList<SuperClass> maxStock = productDAO.fetchMaxStockProducts();
				String maxStockProducts = json.listToJson(maxStock);
				
				// Sending the Updated MaxStock Products Also
				data = "{\"message\":"+temp+","
						+ "\"maxStockProducts\":"+maxStockProducts+"}";			
		}
		
		return data;
	}
	
	
}
