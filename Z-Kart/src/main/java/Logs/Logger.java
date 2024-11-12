package Logs;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import Classes.Customer;
import Controllers.ObjectURI;

public class Logger {
	
	// File Paths
	private final String USERLOGFILE = "/Users/manoj-pt7682/Desktop/userLogs.txt";
	private final String ERRORLOGFILE = "/Users/manoj-pt7682/Desktop/errorLogs.txt";
	private final String CONNECTIONLOGFILE = "/Users/manoj-pt7682/Desktop/ConnectionLogs.txt";
	
	
	// Writing Logs in File
	private void enterLog( String fileName, String log) {
        
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
	            writer.write(log);  // Append data to the file
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	}


	// User Action Logs 
    public void userLog(HttpServletRequest request, ObjectURI objectUri,Customer customer) {
 	   	 // Ensure the logs directory and file exist
	 
	     // Prepare log entry
	     StringBuilder logEntry = new StringBuilder();
	     logEntry.append("Date/Time: ").append(LocalDateTime.now()).append("\n")
	             .append("Request Method: ").append(request.getMethod()).append("\n")
	             .append("Request URI: ").append(objectUri.getURI()).append("\n")
	             .append("Collection Type: ").append(objectUri.getCollectionType()).append("\n")
	             .append("Customer ID: ").append(customer != null ? customer.getCustomerId() : " Null ").append("\n");
	
	
	     // Include single or multiple IDs if available
	     if (objectUri.isSignleId()) {
	         logEntry.append("Single ID: ").append(objectUri.getSingleId()).append("\n");
	     } else if (objectUri.isMultiId()) {
	         logEntry.append("Multiple IDs: ").append(String.join(", ", objectUri.getMultiIdentity())).append("\n");
	     }
	
	     // Log includes and filters if any
	     if (objectUri.isIncludes()) {
	         logEntry.append("Includes: ").append(objectUri.getIncludes().toString()).append("\n");
	     }
	     if (objectUri.isFilters()) {
	         logEntry.append("Filters: ").append(objectUri.getFilters().toString()).append("\n");
	     }
	
	     logEntry.append("---------------\n");
	
	
	 		enterLog(USERLOGFILE,logEntry.toString());
	 	 	
	    }
	    
	    // Data Base Connection Logs 
	    public void connectionLog(String message) {
	    	   // Prepare log entry
	        StringBuilder logEntry = new StringBuilder();
	        logEntry.append("Date/Time: ").append(LocalDateTime.now()).append("\n")
	                .append("Log : ").append(message).append("\n").append("---------------\n");
	         
	 		enterLog(CONNECTIONLOGFILE,logEntry.toString());

    }
    
    
    // Error Logs 
    public void errorLog(Exception exception) {
        // Prepare the log entry with detailed error information
        StringBuilder logEntry = new StringBuilder();
        logEntry.append("Date/Time: ").append(LocalDateTime.now()).append("\n")
                .append("Exception Type: ").append(exception.getClass().getName()).append("\n")
                .append("Message: ").append(exception.getMessage()).append("\n");

        // Capture stack trace information
        StackTraceElement[] stackTrace = exception.getStackTrace();
        if (stackTrace.length > 0) {
            StackTraceElement element = stackTrace[0]; // First element for where the exception occurred
            logEntry.append("Occurred in File: ").append(element.getFileName()).append("\n")
                    .append("At Line: ").append(element.getLineNumber()).append("\n")
                    .append("Method: ").append(element.getMethodName()).append("\n");
        }

        logEntry.append("Full Stack Trace: \n");
        for (StackTraceElement elem : stackTrace) {
            logEntry.append("\t").append(elem.toString()).append("\n");
        }
        logEntry.append("---------------\n");

        // Write the error log to the file
        enterLog(ERRORLOGFILE, logEntry.toString());
    }

    
    
}
