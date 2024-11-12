package Handlers;

import java.util.ArrayList;


import com.google.gson.JsonObject;

import Classes.SuperClass;
import Controllers.ObjectURI;
import DataAccessObjects.OrderDAO;
import Operations.JsonConversion;

public class OrderHandler extends Handler {
       
	private OrderDAO DAO = new OrderDAO();
	
	private JsonConversion json = new JsonConversion();	    
	
	@Override
	public String fetch(ObjectURI objectUri,JsonObject jsonData) {
		String data = null;
		ArrayList<SuperClass> orders ; 
		
		// Fetching The Orders Of The Particular User 
		if (objectUri.isSignleId()) {
			orders = DAO.fetchOrders(objectUri.getSingleId());
			data = json.listToJson(orders);
		}
		
		// Fetching The Ordered Products Data
		else if(objectUri.isNestedIds()) {
			if (objectUri.getNestedIds().length == 5 && objectUri.getNestedIds()[4].equalsIgnoreCase("products")) {
				System.out.println(objectUri.getNestedIds()[3]);
				orders = DAO.fetchOrderProducts(objectUri.getNestedIds()[3]);
				data = json.listToJson(orders);
			}
		}
		
		// Fetching The All Orders Data 
		else {
			orders = DAO.fetchAllOrders();
			data = json.listToJson(orders);
		}
		
		return data;
	}
	
	
	@Override
	public String  create(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		
		return data;
	}
	
	
	@Override
	public String update(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		
		return data;
	}
	
	
	@Override
	public String delete(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		
		return data;
	}

}
