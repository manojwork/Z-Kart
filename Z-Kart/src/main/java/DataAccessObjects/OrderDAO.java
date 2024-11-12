package DataAccessObjects;

import java.util.ArrayList;

import Classes.*;

public class OrderDAO extends DAO {
	private final String tableName = "orders";

	// Fetching the Orders Based On The Customer Id 
	public ArrayList<SuperClass> fetchOrders(String cart_id){
		return this.selectQuery(tableName,"","cart_id = ?  ORDER BY order_id desc ",
			   new String[]{cart_id});
	}
	
	// Fetching All The Orders in DB
	public ArrayList<SuperClass> fetchAllOrders() {
		return this.orderByQuery(tableName,"","","order_id","desc", null);
	}
	
	// Fetching The Order Products of The Particular Order 
	public ArrayList<SuperClass> fetchOrderProducts(String orderId){
		return this.joinQuery("purchased_product o , product p","p.product_id = o.product_id",
					              "o.purchased_product_id,o.order_id,o.count,p.product_id,p.name,p.category,p.brand,p.price,p.model,p.stock,p.image",
					              "o.order_id = ?",new String[] {orderId});
	}	
}
