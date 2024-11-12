package DataAccessObjects;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import Logs.Logger;
import Classes.*;


public class CartDAO extends DAO {
	
	private final String tableName = "cart_product";
	private Logger logger = new Logger();
	
	// To fetch the cart Products by Customer Id
	public ArrayList<SuperClass> fetch_Products(String cart_id){
		
			    return  this.joinQuery("cart_product c , product p","c.product_id = p.product_id",
					              "p.product_id,p.brand,p.name,p.category,p.model, p.price, p.stock,p.image, c.count, c.cp_id ","c.cart_id = ?",
					               new String[] {cart_id});			
	}
	
	// Adding a Product To The Cart 
	public String add_To_Cart(String cartId, String productId) {
		String temp = null;
		try {
			ResultSet resultSet = this.joinQueryResultSet("cart_product c , product p","c.product_id = p.product_id",
					              "p.stock,c.count","c.cart_id = ? and p.product_id = ? ",
					              new String[] {cartId,productId});
			
			// if Product is there in cart 
			if (resultSet.next()) {
				int productStock = resultSet.getInt("stock");
				int cartCount = resultSet.getInt("count");
				
				// Checking if the Product Stock >= Cart Product count .
				if (productStock >= cartCount+1) {
					 temp = add(cartId,productId);
				}
				
			}
			// if product not present in cart 
			else {
				  temp = add(cartId, productId);
			}
			resultSet.close();
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
			
		return temp;
	}
	
	
	// adding a 
	private String add(String cartId,String productId) throws SQLException {
		return this.insertQuery(tableName,"cart_id,product_id","?,?", new String[] {cartId,productId},"cp_id");
	}
	
	
	// Deleting The Cart Product .
	public boolean delete_Cart_Product(String cpId) {
		boolean temp = false;
			int rowsAffected = this.deleteQuery(tableName,"cp_id = ? ", new String[] {cpId});
			if (rowsAffected > 0 ) {
				temp = true;
			}
		return temp;
	}
	
	
	// Updating the Count Of The cart Product .
	public boolean update_Product_Count(int count,String cpId) {
		boolean temp = false;
		
		try {
			ResultSet resultSet = this.selectQueryResultSet("product","stock","product_id in ( "+
			                      this.selectQueryToNest(tableName,"product_id","cp_id = ? ")+" )",
			                      new String[] {cpId});
			
			if (resultSet.next()) {
				int stock = resultSet.getInt("stock");
				// Checking the Product Stock is Greater Than  Quantity of the Product In Cart .
				if (stock >= count) {
					updateCartproduct(count,cpId);
					temp=true;
				}
			}
			resultSet.close();
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		
		return temp;
	}
	
	
	
	
	// updating the Cart ,products Count .
	private void updateCartproduct(int count,String cpId) throws SQLException {
		this.updateQuery(tableName,"count = ?","cp_id = ? ",
				          new String[] {"int "+count,cpId});	
	}
	
	
	// Buying the Cart Products .
	public boolean check_Out(String cartId,int discountPrice,String coupon,String name,String mobile,String address) {
		boolean temp = false;
		try {
			ResultSet resultSet = this.callFunctionQuery("process_cart","?,?,?,?,?,?",
					              new String[] {name,mobile,address,cartId,"int "+discountPrice,coupon});
			
			if (resultSet.next()) {
				temp = resultSet.getBoolean("process_cart");
			}
		
			resultSet.close();
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		
		return temp;
	}

}
