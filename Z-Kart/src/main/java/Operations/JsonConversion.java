package Operations;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import Classes.SuperClass;

public class JsonConversion {

	// Object To Json
	public String objectToJson(SuperClass obj) {
		String json = null;
		Gson gson = new Gson();
		json = gson.toJson(obj);
		return json;
		
	}
	
	// ArrayList of Objects To Json
	public String listToJson(ArrayList<SuperClass> obj) {
		String json = null;
		Gson gson = new Gson();
		json = gson.toJson(obj);
		return json;
	}
	
	// HashMap TO Json
	public String hashMapToJson(HashMap<String, String> parameters) {
		String json = null;
		Gson gson = new Gson();
		json = gson.toJson(parameters);
		return json;
	}
	
	// ArrayList Of Strings To Json
	public String stringListToJson(ArrayList<String> obj) {
		String json = null;
		Gson gson = new Gson();
		json = gson.toJson(obj);
		return json;
	}
	
	// Json To Object 
	public SuperClass jsonToObject(String json, String classPath){
        Class<?> clazz;
        SuperClass object = null;
		try {
			clazz = Class.forName(classPath);
			Gson gson = new Gson();
	        object = (SuperClass)gson.fromJson(json, clazz);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
        return object;
        
    }
	
	// String To Json
	public JsonObject stringToJson(String input) {
	    Gson gson = new Gson();
	    
	    try {
	        // Parse the input string into a JsonObject
	        JsonObject output = gson.fromJson(input, JsonObject.class);
	        // Assuming you want to return a superclass object, adjust as needed
	        return output;
	        
	    } catch (JsonSyntaxException e) {
	        System.out.println("Invalid JSON format: " + e.getMessage());
	        e.printStackTrace();
	    }
	    
	    return null; // or handle it with appropriate error handling
	}

	// Json To List 
	public ArrayList<SuperClass> jsonToList(String json, String classPath) {
        ArrayList<SuperClass> list = new ArrayList<>();
        try {
            Class<?> clazz = Class.forName(classPath);
            Type listType = TypeToken.getParameterized(ArrayList.class, clazz).getType();
            Gson gson = new Gson();
            list = gson.fromJson(json, listType);
            
        } catch (JsonSyntaxException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return list;
    }
	
}
