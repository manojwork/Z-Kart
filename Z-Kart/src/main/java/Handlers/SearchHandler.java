package Handlers;


import java.util.ArrayList;
import java.util.List;
import com.google.gson.JsonObject;
import Classes.SuperClass;
import Controllers.ObjectURI;
import DataAccessObjects.SearchDAO;
import Operations.JsonConversion;

public class SearchHandler extends Handler {
	
	private SearchDAO DAO = new SearchDAO();
	private JsonConversion json = new JsonConversion();

	@Override
	public String fetch(ObjectURI objectUri,JsonObject jsonData) {
		
		String data = null;
		
		// Fetching The Products By Searching
		if(jsonData.get("searchContext") != null && !jsonData.get("searchContext").getAsString().strip().equals("")) {
			
			ArrayList<SuperClass> lists = DAO.fetchSearchProducts(jsonData.get("searchContext").getAsString());
			data = json.listToJson(lists);
		
		}
		// Fetching The Products BY Filtering The Products 
		else if (objectUri.isFilters()) {
							
			
			String models = objectUri.getFilters().get("filterModels");
			String brands = objectUri.getFilters().get("filterBrands");
			String categories = objectUri.getFilters().get("filterCategories");
			String highPrice = objectUri.getFilters().get("filterHighPrice");
			String lowPrice = objectUri.getFilters().get("filterLowPrice");

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

			// Process price range
			if (highPrice != null && !highPrice.isEmpty()) {
			    mainConditions.add("price <= ?");
			    values.add("int "+highPrice);
			}

			if (lowPrice != null && !lowPrice.isEmpty()) {
			    mainConditions.add("price >= ?");
			    values.add("int "+lowPrice);
			}

			// Always add stock condition
			mainConditions.add("stock > 0");

			// Process models (optional)
			if (models != null && !models.isEmpty()) {
			    String[] modelArray = models.split(",");
			    List<String> modelConditions = new ArrayList<>();
			    for (String model : modelArray) {
			        modelConditions.add("LOWER(model) LIKE ?");
			        values.add("%" + model.toLowerCase() + "%");
			    }
			    modelAndBrandConditions.add("(" + String.join(" OR ", modelConditions) + ")");
			}

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
			    whereClause += " AND (" + String.join(" AND ", modelAndBrandConditions) + ")";
			}

			// Construct final SQL query
			String query = "SELECT * FROM product WHERE " + whereClause;
			String[] valuesArray = values.toArray(new String[0]);

			// Fetch products using the query and parameters
			ArrayList<SuperClass> lists = DAO.fetchFilterProducts(query, valuesArray);

			// Convert to JSON
			data = json.listToJson(lists);


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
