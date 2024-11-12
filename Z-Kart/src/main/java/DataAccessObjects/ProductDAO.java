package DataAccessObjects;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import Logs.Logger;
import Classes.*;


public class ProductDAO extends DAO{
	private final String tableName = "product" ;
	private Logger logger = new Logger();
	
	// Fetch The All Products in DB 
	public ArrayList<SuperClass> fetchProducts(){
	    return this.selectQuery(tableName,"","",null);
	}

	// Fetch The Products In The Sorted order of Stock 
	public ArrayList<SuperClass> productsInSortingOrder(String sort){
		return this.orderByQuery(tableName,"","","stock",sort, null);
	}

	// Fetch Existing Products (Stock > 0)
	public ArrayList<SuperClass> fetchExistProducts() {
	    String tableName = "product";
	    String attributes = "*"; // Select all columns
	    String whereClause = "stock > 0 AND stock != (" + this.selectQueryToNest(tableName, "max(stock)", "") + ")";
	    String orderByCondition = "product_id";
	    String sortDirection = "DESC";
	    String[] values = null; // Assuming no values are needed for this query
	    
	    return this.orderByQuery(tableName, attributes, whereClause, orderByCondition, sortDirection, values);
	}

	
	// Fetch The Maximum Stock Products  
	public ArrayList<SuperClass> fetchMaxStockProducts(){
			return  this.selectQuery(tableName,""," stock in ("+
			        this.selectQueryToNest("product","max(stock)","")+")",null);
	}
	
	// Fetch The Particular Product Details 
	public SuperClass fetchProduct(String product_id) {
			ArrayList<SuperClass> list = this.selectQuery(tableName,"","product_id = ?", new String[] {product_id});
			return list.size()>0?list.get(0):null;
	}
	
	// Updating The Product Details 
	public boolean updateProduct(String product_id , String name,String category,String model,String brand,int price,int stock,String image) {
		boolean temp = false;
		int rowsAffected = this.updateQuery(tableName,
				           " name = ? , category=? , model=? ,brand=?, price=? , stock=? , image = ? ", "product_id = ? ",
		                   new String[] {name,category,model,brand,"int "+price,"int "+stock,image,product_id});
		if ( rowsAffected > 0) {
			temp = true;
		}
		return temp;
	}
	
	
	// Deleting The Product From DB 
	public boolean deleteProduct(String product_id ) {
		boolean temp = false;
		int rowsAffected = this.deleteQuery(tableName,"product_id = ? ", 
				           new String[] {product_id});
		if (rowsAffected  > 0) {
		    	temp = true;
		    }
		return temp;
	}
	
	// Creating the Product in DB 
	public String createProduct(String name,String category,String model,String brand,int price,int stock,String image) {
			 return this.insertQuery(tableName,"name,category,model,brand,price,stock,image","?,?,?,?,?,?,?",
					 new String[] {name,category,model,brand,"int "+price,"int "+stock,image},"product_id");	
	}
	
	
	// Purchasing The Particular Product 
	public boolean buy_product(String cartId,String productId,String coupon,int discountPrice,String name,String mobile,String address) {
		ResultSet resultSet = this.callFunctionQuery("insert_buyed","?,?,?,?,?,?,?",new String[] {name,mobile,address,cartId,productId,coupon,"int "+discountPrice});
		boolean temp = false;
		try {
			if (resultSet.next()) {
				temp = resultSet.getBoolean("insert_buyed");
				resultSet.close();
			}
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		return temp;
	}
	
	// Fetch The Particular Unique Column Values With Some Dependence  
	public ArrayList<String> fetchColumnsWithCondition(String column,String categories) {
		String[] categories_array = categories.split(",");
		String whereClause = "stock > 0 and ";
		String[] values = new String[categories_array.length];
		
		for (int i=0 ; i<categories_array.length ; i++) {
			whereClause += " LOWER(category) LIKE ? " ;
			values[i] = ("%"+categories_array[i]+"%").toLowerCase();
			if(i != categories_array.length-1 ) {
				whereClause += "OR";
			}
		}
		
		return fetchColumn(this.selectQueryResultSet(tableName,"DISTINCT "+column,whereClause,values),column);	
	}
	
	// Fetch The Particular Unique Column Values With Double Dependence  
	public ArrayList<String> fetchColumnsWithCondition(String column,String categories,String brands) {
		
		String[] categories_array = categories.split(",");
		String[] brands_array = brands.split(",");
		String whereClause = "stock > 0 and ";
		String[] values = new String[categories_array.length + brands_array.length];
		
		whereClause +="( ";
		for (int i=0 ; i<categories_array.length ; i++) {
			whereClause += " LOWER(category) LIKE ? " ;
			
			values[i] = ("%"+categories_array[i]+"%").toLowerCase();
			
			if(i != categories_array.length-1 ) {
				whereClause += "OR";
			}
			
		}
		
		whereClause +=" ) AND ( ";
		
		for (int i=0 ; i<brands_array.length ; i++) {
			whereClause += " LOWER(brand) LIKE ? " ;
			
			values[categories_array.length+i] = ("%"+brands_array[i]+"%").toLowerCase();
			
			if(i != brands_array.length-1 ) {
				whereClause += "OR";
			}
			
		}
		whereClause +=" ) ";
		return fetchColumn(this.selectQueryResultSet(tableName,"DISTINCT "+column,whereClause,values),column);
	}
	
	// Fetching Columns With No Dependence
	public ArrayList<String> fetchColumnsOnly(String column) {
		return fetchColumn(this.selectQueryResultSet(tableName,"DISTINCT "+column,"stock > 0", null),column);
	}
	
	// Fetching The Particular Column Values as ArrayList .
	private ArrayList<String> fetchColumn(ResultSet resultSet,String columnName) {
		ArrayList<String> columns = new ArrayList<>();
		try {
			while (resultSet.next()) {
				columns.add(resultSet.getString(columnName));
			}
			resultSet.close();
		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}
		return columns;
	}
}
