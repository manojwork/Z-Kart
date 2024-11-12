package Handlers;

import DataAccessObjects.CustomerDAO;
import DataAccessObjects.ProductDAO;
import DataAccessObjects.SearchDAO;
import Operations.JsonConversion;
import Operations.Mailer;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import Classes.Customer;
import Classes.Product;
import Classes.SuperClass;
import Controllers.ObjectURI;

public class ProductHandler extends Handler{
	
	ProductDAO DAO = new ProductDAO();
	
	private JsonConversion json = new JsonConversion();
	private CustomerDAO customerDAO = new CustomerDAO();
	private Mailer mailer = new Mailer();
	private SearchDAO searchDAO = new SearchDAO();
	
	@Override
	public String fetch(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		ArrayList<SuperClass> products = null;
		ArrayList<String> list = null;
		
		if (objectUri.isFilters() && objectUri.getFilters().containsKey("filterProducts")) {
			
				switch(objectUri.getFilters().get("filterProducts")) {
				
					// Fetching The Exist Products 
					case "exist":
						products = DAO.fetchExistProducts();
						data = json.listToJson(products);
						break;
					// Fetching The Maximum Stock Products 
					case "maxStock":
						products = DAO.fetchMaxStockProducts();
						data = json.listToJson(products);
						break;
					// Fetching THe ASC or DES Products 
					default:
						products = DAO.productsInSortingOrder(objectUri.getFilters().get("filterProducts").strip().equals("") ? objectUri.getFilters().get("filterProducts") : "asc" );
						data = json.listToJson(products);
						break;
				}		
				
			}
		else if (objectUri.isFilters() && objectUri.getFilters().containsKey("filterColumns")) {
			
			// Fetching Models 
			if(objectUri.getFilters().get("filterCategory") != null && objectUri.getFilters().get("filterBrand") != null) {
				
				list = DAO.fetchColumnsWithCondition(objectUri.getFilters().get("filterColumns"), objectUri.getFilters().get("filterCategory"),objectUri.getFilters().get("filterBrand"));
				data = json.stringListToJson(list);
			
			}
			// Fetching Brands 
			else if(objectUri.getFilters().get("filterCategory") != null) {
				
				list = DAO.fetchColumnsWithCondition(objectUri.getFilters().get("filterColumns"), objectUri.getFilters().get("filterCategory"));
				data = json.stringListToJson(list);
			
			}
			// Fetching Categories 
			else {
				
				list = DAO.fetchColumnsOnly(objectUri.getFilters().get("filterColumns"));
				data = json.stringListToJson(list);
				
			}
		
		}
		// Fetching The Particular Product Alone With Related Products and Max Stock Products 
		else if (objectUri.isSignleId()) {	
			
			Product product = (Product) DAO.fetchProduct(objectUri.getSingleId());
			
			String productDetails = json.objectToJson(product);
			
			String maxStockProducts = json.listToJson(DAO.fetchMaxStockProducts());
			
			// maxStock Products ..
			
			String brands = product.getBrand() ;
			String categories = product.getCategory();

			List<String> mainConditions = new ArrayList<>(); // Main conditions for categories and price
			List<String> modelAndBrandConditions = new ArrayList<>(); // Separate conditions for models and brands
			List<String> values = new ArrayList<>();

			// Process categories (required for filtering)
			if (categories != null && !categories.isEmpty()) {
			    String[] categoryArray = categories.split(",");
			    List<String> categoryConditions = new ArrayList<>();
			    for (String category : categoryArray) {
			        categoryConditions.add("LOWER(category) LIKE ?");
			        values.add("%" + category.toLowerCase() + "%");
			    }
			    mainConditions.add("(" + String.join(" OR ", categoryConditions) + ")");
			}

		

			// Always add stock condition
			mainConditions.add("stock > 0");


			// Process brands (optional)
			if (brands != null && !brands.isEmpty()) {
			    String[] brandArray = brands.split(",");
			    List<String> brandConditions = new ArrayList<>();
			    for (String brand : brandArray) {
			        brandConditions.add("LOWER(brand) LIKE ?");
			        values.add("%" + brand.toLowerCase() + "%");
			    }
			    modelAndBrandConditions.add("(" + String.join(" OR ", brandConditions) + ")");
			}

			// Combine the main conditions (categories and price) with optional models/brands
			String whereClause = String.join(" AND ", mainConditions);
			if (!modelAndBrandConditions.isEmpty()) {
			    whereClause += " AND (" + String.join(" OR ", modelAndBrandConditions) + ")";
			}

			// Construct final SQL query
			String query = "SELECT * FROM product WHERE " + whereClause;
			String[] valuesArray = values.toArray(new String[0]);

			// Fetch products using the query and parameters
			ArrayList<SuperClass> lists = searchDAO.fetchFilterProducts(query, valuesArray);

			// Convert to JSON
			String relatedProducts = json.listToJson(lists);
			
			
			
			// related Products .. 
			
			data = "{ \"product\":"+productDetails+","
					+ "\"maxStock\":"+maxStockProducts+","
					+ "\"relatedProducts\":"+relatedProducts+"}";
		}
		// Fetching All The Products 
		else {
			products = DAO.fetchProducts();
			data = json.listToJson(products);
		}
		
		return data;
	}
	
	
	@Override
	public String create(ObjectURI objectUri,JsonObject jsonData) {
		
		String data = null;
		
		boolean createProduct = jsonData.get("name") != null && jsonData.get("category") != null &&
								jsonData.get("model") != null && jsonData.get("brand") != null && jsonData.get("image") != null && jsonData.get("stock") != null && jsonData.get("price") !=null &&
								!jsonData.get("name").getAsString().strip().equals("") && !jsonData.get("image").getAsString().strip().equals("") && !jsonData.get("brand").getAsString().strip().equals("") && !jsonData.get("category").getAsString().strip().equals("") && !jsonData.get("model").getAsString().strip().equals("") && 
								jsonData.get("stock").getAsInt() >= 0 && jsonData.get("price").getAsInt() >= 0  ;
										
		if(createProduct) {
			
			String product_id = null;
			product_id = DAO.createProduct(jsonData.get("name").getAsString(),jsonData.get("category").getAsString(), jsonData.get("model").getAsString(), 
			jsonData.get("brand").getAsString(), Integer.parseInt(jsonData.get("price").getAsString()),Integer.parseInt(jsonData.get("stock").getAsString()), 
			jsonData.get("image").getAsString());
			data = "{\"message\": \""+product_id+"\"}";

		}
		// Buying A Particular Product 
		else if (objectUri.isSignleId()) {
			
			boolean temp = false;
			Customer customer = (Customer) customerDAO.fetchCustomer(jsonData.get("cartId").getAsString());
			if( customer != null && !jsonData.get("name").getAsString().strip().equals("") && !jsonData.get("mobile").getAsString().strip().equals("") && !jsonData.get("address").getAsString().strip().equals("")) {

			 temp = DAO.buy_product(jsonData.get("cartId").getAsString(), objectUri.getSingleId(), 
			jsonData.get("coupon").getAsString(), jsonData.get("discountPrice").getAsInt(),jsonData.get("name").getAsString(),jsonData.get("mobile").getAsString(),jsonData.get("address").getAsString());
			data = "{\"message\":"+temp+"}";
			
			}
			// Notifying if The User Coupon is Enabled Or Not 
			if (temp && customer.getOrdersCount() == 2) {
		        new Thread(() -> {
		        	mailer.sendEmail(customer.getEmail(), "couponEnabled");
		        }).start();	
			}
			// Delivery Notification 
			if(temp) {
		        new Thread(() -> {
		        	mailer.sendEmail(customer.getEmail(),"deliveryInfo");
		        }).start();
			}
		}
		
		return data;
	}
	
	
	@Override
	public String update(ObjectURI objectUri,JsonObject jsonData) {
		
		System.out.println("triggered");
		
		 boolean temp = false;
		 String data = null;
		 
		 boolean updateProduct = jsonData.get("name") != null && jsonData.get("category") != null && 
				 jsonData.get("model") != null && jsonData.get("brand") != null && jsonData.get("image") != null && 
				 jsonData.get("stock") != null && jsonData.get("price") != null && !jsonData.get("name").getAsString().strip().equals("") &&
				 !jsonData.get("image").getAsString().strip().equals("") && !jsonData.get("brand").getAsString().strip().equals("") &&
				 !jsonData.get("category").getAsString().strip().equals("") && !jsonData.get("model").getAsString().strip().equals("") && 
				 jsonData.get("stock").getAsInt() >= 0 && jsonData.get("price").getAsInt() >= 0  ;
				
		if (objectUri.isSignleId()) {
			
			if (updateProduct) {
				
				temp = DAO.updateProduct(objectUri.getSingleId(),jsonData.get("name").getAsString(), jsonData.get("category").getAsString(),
				jsonData.get("model").getAsString(),jsonData.get("brand").getAsString(),Integer.parseInt(jsonData.get("price").getAsString()),
				Integer.parseInt(jsonData.get("stock").getAsString()), jsonData.get("image").getAsString());
			
				data = "{\"message\":"+temp+"}";

			}
		}
		
		return data;
		
	}
	
	@Override
	public String delete(ObjectURI objectUri,JsonObject jsonData){
		String data = null;
		
		// Deleting A Particular Product 
		if (objectUri.isSignleId()) {
			boolean temp = DAO.deleteProduct(objectUri.getSingleId());
			data = "{\"message\":"+temp+"}";
		}
	
		return data;
	}
	
	
}
