package DataAccessObjects;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import Logs.Logger;
import Classes.*;

public abstract class DAO extends Requirements{
	private Logger logger = new Logger();

	private HashMap<String,String> mapTableClassName(){
		 HashMap<String,String> map = new HashMap<>();
		 map.put("customer", "Classes.Customer");
		 map.put("product", "Classes.Product");
		 map.put("orders", "Classes.Order");
		 map.put("purchased_product", "Classes.OrderProduct");
		 map.put("cart_product", "Classes.CartProduct");
		 return map;
	 }
	
	
	// Select Query to use in nesting 
	protected String selectQueryToNest(String tableName, String attributes, String whereCondition) {
	 	String selectAttributes = (attributes == null || attributes.isEmpty()) ? "*" : attributes;
        String whereClause = (whereCondition == null || whereCondition.isEmpty()) ? "" : " WHERE " + whereCondition;
        return "SELECT " + selectAttributes + " FROM " + tableName + whereClause + "";
	}
	
	
	// Select Query
	 protected ArrayList<SuperClass> selectQuery(String tableName, String attributes, String whereCondition,String[] values) {
	        return  whileResultSet(selectQueryResultSet(tableName,attributes,whereCondition,values),tableName);
	 }
	 
	 // Select Query Returns ResultSet 
	 protected ResultSet selectQueryResultSet(String tableName, String attributes, String whereCondition,String[] values) {
		 	return executeResultSet(selectQueryToNest(tableName,attributes,whereCondition),values);
	 }
	 
	 //Insert Query
	 protected int insertQuery(String tableName, String columns, String values,String[] value) {
	        String columnClause = (columns == null || columns.isEmpty()) ? "" : "(" + columns + ")";
	        return executeNoRowsAffected("INSERT INTO " + tableName + columnClause + " VALUES (" + values + ");",value);     
	 }
	 
	 // Insert Query To Return The Id's After Insertion 
	 protected String insertQuery(String tableName, String columns, String values,String[] value,String returnData) {
	        String columnClause = (columns == null || columns.isEmpty()) ? "" : "(" + columns + ")";
	        ResultSet resultSet = executeResultSet("INSERT INTO " + tableName + columnClause + " VALUES (" + values + ") returning "+returnData+";",value);
	        String data = null;
	        try {
				if (resultSet.next()) {
					data = resultSet.getString(returnData);
				}
			} catch (SQLException e) {
				logger.errorLog(e);
				e.printStackTrace();
			}
	        return data;
	 }
	 
	 //Update Query
	 protected int updateQuery(String tableName, String setValues, String whereCondition,String[] values) {
	        String whereClause = (whereCondition == null || whereCondition.isEmpty()) ? "" : " WHERE " + whereCondition;
	        return executeNoRowsAffected("UPDATE " + tableName + " SET " + setValues + whereClause + ";",values);
	 }
	 
	 //Delete Query
	 protected int deleteQuery(String tableName, String whereCondition,String[] values) {
	        String whereClause = (whereCondition == null || whereCondition.isEmpty()) ? "" : " WHERE " + whereCondition;
	        return executeNoRowsAffected("DELETE FROM " + tableName + whereClause + ";",values);
	 }
	 
	 //Calling a function 
	 protected ResultSet callFunctionQuery(String functionName, String parameters,String[] values) {
	        return executeResultSet("SELECT " + functionName + "(" + parameters + ");",values);
	 }
	 
	 //group by
	 protected ArrayList<SuperClass> groupByQuery(String tableName, String attributes, String groupByCondition, String havingCondition,String[] values) {
	        String selectAttributes = (attributes == null || attributes.isEmpty()) ? "*" : attributes;
	        String havingClause = (havingCondition == null || havingCondition.isEmpty()) ? "" : " HAVING " + havingCondition;
	        return whileResultSet(executeResultSet("SELECT " + selectAttributes + " FROM " + tableName + " GROUP BY " + groupByCondition + havingClause + ";",values),tableName);
	 }
	 
	 
	// Order by 
	 protected ArrayList<SuperClass> orderByQuery(String tableName, String attributes, String whereClause, String orderByCondition, String sortDirection, String[] values) {
	     // Select all attributes if none specified
	     String selectAttributes = (attributes == null || attributes.isEmpty()) ? "*" : attributes;
	     
	     // Add WHERE clause if provided
	     String wherePart = (whereClause == null || whereClause.isEmpty()) ? "" : " WHERE " + whereClause;
	     
	     // Add ORDER BY condition if provided
	     String orderByPart = (orderByCondition == null || orderByCondition.isEmpty()) ? "" : " ORDER BY " + orderByCondition;
	     
	     // Add sorting direction (ASC/DESC) if provided
	     String sortClause = (sortDirection == null || sortDirection.isEmpty()) ? "" : " " + sortDirection;
	     
	     // Construct final query string
	     String query = "SELECT " + selectAttributes + " FROM " + tableName + wherePart + orderByPart + sortClause + ";";
	     
	     // Execute query and process the result set
	     return whileResultSet(executeResultSet(query, values), tableName);
	 }

	 
	 
	 // joining Multiple Tables 
	 protected ArrayList<SuperClass> joinQuery(String tables, String joinConditions, String attributes, String whereCondition,String[] values) {
	        
	        return whileResultSet(joinQueryResultSet(tables,joinConditions,attributes,whereCondition,values),tables.split(",")[0].split(" ")[0]);
	
	 }
	 
	 // joining Multiple Tables and Returning The ResultSet
	 protected ResultSet joinQueryResultSet(String tables, String joinConditions, String attributes, String whereCondition,String[] values) {
			String[] tablesArray = tables.split(",");
			String[] joinConditionsArray = joinConditions.split(",");		
			String query = "SELECT " + attributes + " FROM " + tablesArray[0];
			
	        for (int i = 1; i < tablesArray.length; i++) {
	            query+=" JOIN "+tablesArray[i]+" ON "+joinConditionsArray[i - 1];
	        }
	        
	        if (whereCondition != null && !whereCondition.isEmpty()) {
	            query+=" WHERE "+whereCondition;
	        }
	        
	        query+=";";
	        return executeResultSet(query,values);
	}
		
		
		
      // Like Query used in Searching Products
	protected ArrayList<SuperClass> likeQuery(String tableName, String attributes, String columns, String patterns, String operator,String whereCondition,String [] values) {
		    
			String[] columnsArray = columns.split(",");
			String[] patternsArray = patterns.split(",");
			
			if (columnsArray.length != patternsArray.length) {
		        throw new IllegalArgumentException("Columns and patterns must have the same length.");
		    }
			
		    String whereClause = "( ";
		    
		    for (int i = 0; i < columnsArray.length; i++) {
		        whereClause+=columnsArray[i]+" LIKE "+patternsArray[i]+"";
		        if ( !operator.isEmpty() && operator != null && i < columnsArray.length - 1) {
		            whereClause+=" "+operator+" ";
		        }
		    }
		    
		    whereClause+=" )";
		    
		    if (whereCondition != null && !whereCondition.isEmpty()) {
	            whereClause+=" AND "+whereCondition;
	        }
		    
	        String selectAttributes = (attributes == null || attributes.isEmpty()) ? "*" : attributes;
		    return whileResultSet(executeResultSet("SELECT " + selectAttributes + " FROM " + tableName + " WHERE " + whereClause+ ";",values),tableName);
	}
		
	 
	

	// returns the Result Set 
    private ResultSet executeResultSet(String query,String[] values) {
    	    	
    	Connection connection = this.getConnection();
    	
    	System.out.println(query);
	
    		ResultSet resultSet = null;
    		
    	try {
    		
			PreparedStatement statement = connection.prepareStatement(query);
			
			if (values != null&&values.length>0) {
				
				for (int i =0;i<values.length;i++) {
					String[] value = values[i].split(" ");
					if (value[0].equalsIgnoreCase("int")) {
						
						statement.setInt(i+1, Integer.parseInt(value[1]));
					}
					else  {
						
						statement.setString(i+1, values[i]);
					}				}
				
			}
			
		    resultSet = statement.executeQuery();

		} catch (SQLException e) {
			logger.errorLog(e);
			e.printStackTrace();
		}

    	this.releaseConnection(connection);
    	return resultSet;	
    }
    
    
    // returns No of Rows affected .
    private int executeNoRowsAffected(String query,String[] values) {
    	    	
		int rowsAffected = 0;
    	Connection connection = this.getConnection();

    	try {
		PreparedStatement statement = connection.prepareStatement(query);
		
		if (values.length>0&&values != null) {

			for (int i =0;i<values.length;i++) {
				String[] value = values[i].split(" ");
				if (value[0].equalsIgnoreCase("int")) {
					statement.setInt(i+1, Integer.parseInt(value[1]));
				}
				else  {
					statement.setString(i+1, values[i]);
				}
			
			}
			
		}
	    rowsAffected = statement.executeUpdate();
	} catch (SQLException e) {
		logger.errorLog(e);
		e.printStackTrace();
	}
		this.releaseConnection(connection);
		return rowsAffected;
    }
    
    
    private SuperClass createClass(String className) {
    	SuperClass obj=null;
    	try {
			Constructor<?> construct = Class.forName(className).getConstructor();
			 obj = (SuperClass)construct.newInstance();

    	} catch (Exception e) {
			logger.errorLog(e);
			e.printStackTrace();
		} 
    	return obj;
    }
    
    
    // Dynamic Creation of the Objects by using ResultSet Data .
   private ArrayList<SuperClass> whileResultSet(ResultSet resultSet,String className){
	   ArrayList<SuperClass> objects = new ArrayList<>();
	   try {
		while (resultSet != null && resultSet.next()) {
			SuperClass obj = createClass(mapTableClassName().get(className));
			Field[] fields = obj.getClass().getDeclaredFields();
			
			for  (Field field: fields) {
				
				field.setAccessible(true);
				
				if (field.getName().toLowerCase().contains("time")) {
					
					Timestamp timestamp = resultSet.getTimestamp(field.getName());
		            String timeString = (timestamp != null) ? timestamp.toString() : "No timestamp";
		            field.set(obj,timeString);
				}
				
				else if(field.getType() == int.class){
					field.set(obj,resultSet.getInt(field.getName()));
				}
				
				else if (field.getType() == boolean.class) {
					field.set(obj,resultSet.getBoolean(field.getName()));
				}
				
				else if (field.getType() == String.class){
					field.set(obj,resultSet.getString(field.getName()));
				}
				else {
					
					try{
						SuperClass ob = createClass("Classes."+field.getName().toUpperCase().charAt(0)+
								        field.getName().toLowerCase().substring(1,field.getName().length()));
						Field[] fds = ob.getClass().getDeclaredFields();
						
						for  (Field fd: fds) {
							fd.setAccessible(true);
							
							if (fd.getName().toLowerCase().contains("time")) {
								
								Timestamp timestamp = resultSet.getTimestamp(field.getName());
					            String timeString = (timestamp != null) ? timestamp.toString() : "No timestamp";
					            fd.set(ob,timeString);
					            
							}
							else if(fd.getType() == int.class){
								
								fd.set(ob,resultSet.getInt(fd.getName()));
								
							}
							else if (fd.getType() == boolean.class) {
								
								fd.set(ob,resultSet.getBoolean(fd.getName()));
								
							}
							else {
								
								fd.set(ob,resultSet.getString(fd.getName()));
								
							}
						}
						 field.set(obj,ob);
			    }
				catch(Exception e) {
					logger.errorLog(e);
					e.printStackTrace();	
				}	
			 }   
		   }
			objects.add(obj);			
		}
		
	} catch (SQLException e) {
		logger.errorLog(e);
		e.printStackTrace();
	} catch (IllegalArgumentException e) {
		logger.errorLog(e);
		e.printStackTrace();
	} catch (IllegalAccessException e) {
		logger.errorLog(e);
		e.printStackTrace();
	} 
	   return objects;
   }
    
    
   	// To Give A Custom Query To Return The ArrayList of Objects  
	protected  ArrayList<SuperClass> executeQuery ( String query,String values[],String tableName) {
		return whileResultSet(executeResultSet(query,values),tableName);
	}
	 
	
   	// To Give A Custom Query To Return The Result Set 
	protected ResultSet executeQuery ( String query,String values[]) {
		return executeResultSet(query,values);
	}
}
