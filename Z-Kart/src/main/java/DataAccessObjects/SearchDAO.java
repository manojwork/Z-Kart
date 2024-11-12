package DataAccessObjects;

import java.util.ArrayList;

import Classes.SuperClass;

public class SearchDAO extends DAO{
	
	// Searching The Products 
	public ArrayList<SuperClass> fetchSearchProducts(String text){
		 return this.likeQuery("product","","LOWER(name),LOWER(model),LOWER(brand),LOWER(product_id),LOWER(category)",
                "?,?,?,?,?","OR","stock > 0",new String[] {"%"+text.toLowerCase()+"%",
                "%"+text.toLowerCase()+"%","%"+text.toLowerCase()+"%","%"+text.toLowerCase()+"%","%"+text.toLowerCase()+"%"
                });
	}
	
	// Filtering The Products 
	public ArrayList<SuperClass> fetchFilterProducts(String query,String[] values){
		return this.executeQuery(query, values,"product");
	}
	
}
