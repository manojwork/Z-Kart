package Controllers;

import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

public class ObjectURI {
	
	private String uriPath;
	private HashMap<String,String> includes = new HashMap<>();
	private HashMap<String,String> filters = new HashMap<>();
	private String [] nestedIds ;
	private boolean isIncludes = false;
	private boolean isNestIds = false;
	private boolean isFilters = false;
	private boolean isSingleIdentity = false;
	private boolean isMultiIdentites  = false;
	private boolean iscollection = false;
	private String singleIdentity;
	private String[] multipleIdentity;
	private String collectionType;
	
    public ObjectURI(HttpServletRequest request) {
    	
    	this.uriPath = request.getPathInfo();
    	putDetails(uriPath);
    	putIncludesAndFilters(request);
    	
    }
    
    private void putIncludesAndFilters(HttpServletRequest request) {
    	
		Enumeration<String> parameterNames = request.getParameterNames();

    	while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();  
            String paramValue = request.getParameter(paramName);
            
            if (paramName.contains("filter")) {
            	
            	this.isFilters=true;
            	this.filters.put(paramName, paramValue);

            }
            else if (paramName.contains("include")) {
            	this.isIncludes=true;
            	this.includes.put(paramName, paramValue);
            } 
        
    	}
    	
    }
    
    private void putDetails(String uriPath) {
    	String[] path = uriPath.split("/");
    	if(path.length==3) {
    		if (!(path[2].contains(","))) {
    			this.singleIdentity=path[2];
    			this.isSingleIdentity=true;
    		}
    		else {
    			this.multipleIdentity = path[2].split(",");
    			this.isMultiIdentites = true;
    		}
    	}
    	else if (path.length > 3) {
    		this.isNestIds = true;
    		this.nestedIds = Arrays.copyOf(path,path.length);
    		
    	}
    	else {
    		this.iscollection=true;
    	}
		this.collectionType=path[1].toUpperCase().charAt(0)+path[1].substring(1, path[1].length()-1);
    }
    
    
    public boolean isSignleId() {
    	return this.isSingleIdentity;
    }
    
    
    public boolean isMultiId() {
    	return this.isMultiIdentites;
    }
    
    
    public boolean isCollection() {
    	return this.iscollection;
    }
    
    
    public String getSingleId() {
    	return this.singleIdentity;
    }
    
    
    public String[] getMultiIdentity() {
    	return this.multipleIdentity;
    }
    
    
    public String getURI() {
    	return this.uriPath;
    }
    
    
    public String getCollectionType() {
    	return this.collectionType;
    }
    
    public HashMap<String,String> getIncludes(){
    	return this.includes;
    }
    
    public String[] getNestedIds(){
    	return this.nestedIds;
    }
    
    public HashMap<String,String> getFilters(){
    	return this.filters;
    }
    
    public boolean isIncludes() {
    	return this.isIncludes;
    }
    
    public boolean isFilters() {
    	return this.isFilters;
    }
    
    public boolean isNestedIds() {
    	return this.isNestIds;
    }
    
    

}
