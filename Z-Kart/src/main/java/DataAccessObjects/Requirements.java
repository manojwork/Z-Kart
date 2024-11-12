package DataAccessObjects;

import java.sql.Connection;
import Logs.Logger;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public abstract class Requirements {
    private final static String DRIVER = "org.postgresql.Driver";
    private final static String JDBC = "jdbc:postgresql://localhost:5432/Z-Kart";
    private final static String USERNAME = "postgres";
    private final static String PASSWORD = "start";
    private static final int  MAX_CONNECTIONS = 50;
    private static Logger logger = new Logger();
    private static List<Connection> connectionPool = getConnections();
    
    /**
     * Initializes and populates the connection pool up to MAX_CONNECTIONS.
     */
    private static List<Connection> getConnections(){
    	List<Connection> connectionPool = new ArrayList<>();
    	 try {
             Class.forName(DRIVER);
             // Pre-populate the connection pool with the maximum number of connections
             for (int i = 0; i < MAX_CONNECTIONS; i++) {
                 connectionPool.add(DriverManager.getConnection(JDBC, USERNAME, PASSWORD));
             }
             
             logger.connectionLog("Initialized connection pool with " + MAX_CONNECTIONS + " connections.");
         } catch (ClassNotFoundException | SQLException e) {
             logger.connectionLog("Error initializing connection pool: " + e.getMessage());
        	 e.printStackTrace();
         }
    	 
    	 return connectionPool;
    	
    }
    
   
    /**
     * Synchronized method to get a connection from the pool.
     * Logs when a connection is retrieved.
     * @return a Connection object or null if the pool is empty.
     */
    protected synchronized Connection getConnection() {
        if (connectionPool.isEmpty()) {
            logger.connectionLog("Connection pool is empty. Returning null.");
            return null;
        } else {
        	
        	System.out.println(" opened "+connectionPool.size());
            logger.connectionLog("Connection retrieved from pool. Pool size: " + connectionPool.size());
            // Remove a connection from the pool and return it
            return connectionPool.remove(connectionPool.size() - 1);
        }
    }
    
    /**
     * Synchronized method to release a connection back to the pool.
     * Logs when a connection is returned.
     * @param connection the Connection object to return to the pool.
     */
    protected synchronized void releaseConnection(Connection connection) {
       if (connectionPool.size() < MAX_CONNECTIONS) {
    	   		
    	   		 System.out.println(" closed ");
             	 connectionPool.add(connection);
                 logger.connectionLog("Connection returned to pool. Pool size: " + connectionPool.size());
        }
       else {
           logger.connectionLog("Attempted to return a null connection or pool is full.");
       }
   }
    
    
}
