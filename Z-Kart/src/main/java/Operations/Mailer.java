package Operations;

import java.util.Properties;
import java.util.Random;
import javax.mail.*;  
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;  
  
public class Mailer { 
	// Credentials 
	private final String user = "mandhalamanojbabu@gmail.com"; // your email
	private final String pass = "grzx albg efam hxde"; // use App Password if needed
	
	// Returning A Message
	private MimeMessage getMessage() {
	
	    Properties props = new Properties();
	    props.put("mail.smtp.host", "smtp.gmail.com"); // or other SMTP server
	    props.put("mail.smtp.port", "587");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.smtp.ssl.protocols", "TLSv1.2");// Enable TLS

	    Session session = Session.getInstance(props, new Authenticator() {
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(user, pass);
	        }
	    });

        MimeMessage message = new MimeMessage(session);
        return message;
	}
	
	
	// Sending OTP
	public String sentOtp(String to) {
		
		String otp = "";
		Random random = new Random();
	        // Generate 4 random integers between 0 (inclusive) and 100 (exclusive)
	        for (int i = 0; i < 4; i++) {
	            otp += random.nextInt(10); // Range: 1 to 9
	        }
	        
	        String htmlContent = 
	                "<html>" +
	                "<head>" +
	                "<style>" +
	                "  .container { " +
	                "      width: 100%; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; " +
	                "      border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;" +
	                "  }" +
	                "  .header { font-size: 24px; font-weight: bold; color: #4CAF50; margin-bottom: 20px; }" +
	                "  .otp { font-size: 32px; font-weight: bold; color: #ff5722; margin: 20px 0; }" +
	                "  .message { font-size: 16px; color: #333; line-height: 1.5; margin-bottom: 20px; }" +
	                "  .footer { font-size: 14px; color: #777; text-align: center; margin-top: 30px; }" +
	                "</style>" +
	                "</head>" +
	                "<body>" +
	                "  <div class='container'>" +
	                "    <div class='header'>ZKART OTP</div>" +
	                "    <div class='message'>Your One-Time Password is:</div>" +
	                "    <div class='otp'>" + otp + "</div>" +
	                "    <div class='message'>Please don't share this OTP with others. ❤️<br>Thanks for visiting us! 😀</div>" +
	                "    <div class='footer'>&copy; 2024 ZKART. All Rights Reserved.</div>" +
	                "  </div>" +
	                "</body>" +
	                "</html>";

	            send(to, "ZKART OTP", htmlContent);		
	            
	            return otp;
	}
	
	// Handling Fuction 
	public void sendEmail(String to, String type) {
	    // Generate the subject and HTML content based on the email type
	    String subject = getSubject(type);
	    String htmlContent = getHtmlContent(type);
	    send(to,subject,htmlContent);
	}
	
	private String getSubject(String type) {
	    switch (type) {
	        case "login":
	            return "Login Successful - Welcome Back!";
	        case "registration":
	            return "Registration Successful - Welcome to ZKART!";
	        case "passwordChange":
	            return "Password Changed Successfully!";
	        case "couponEnabled":
	            return "Your Coupon is Now Enabled!";
	        case "couponUsed":
	            return "Your Coupon Has Been Used!";
	        case "deliveryInfo":
	            return "Delivery Information for Your Order!";
	        default:
	            return "ZKART Notification";
	    }
	}

	// Method to generate HTML content based on the email type
	private String getHtmlContent(String type) {
	    String message;
	    String icon;

	    switch (type) {
	        case "login":
	            message = "You have successfully logged in.";
	            icon = "🔑"; // Key icon for login
	            break;
	        case "registration":
	            message = "Your registration was successful. Welcome to ZKART!";
	            icon = "🎉"; // Celebration icon for registration
	            break;
	        case "passwordChange":
	            message = "Your password has been changed successfully.";
	            icon = "🔒"; // Lock icon for password change
	            break;
	        case "couponEnabled":
	            message = "Your coupon is enabled. Please use it within 3 orders; otherwise, it will expire.";
	            icon = "🎟️"; // Ticket icon for coupon
	            break;
	        case "couponUsed":
	            message = "Your coupon has been used.";
	            icon = "✅"; // Check mark icon for coupon used
	            break;
	        case "deliveryInfo":
	            message = "Thank you for shopping with ZKART! Your order will be delivered within 4 days.";
	            icon = "🚚"; // Delivery truck icon for delivery info
	            break;
	        default:
	            message = "Notification from ZKART.";
	            icon = "ℹ️"; // Information icon
	    }

	    // Using traditional string concatenation for HTML content
	    return "<html>" +
	            "<head>" +
	            "<style>" +
	            ".container {" +
	            "    width: 100%; max-width: 600px; margin: auto; padding: 20px;" +
	            "    border: 1px solid #ddd; border-radius: 8px;" +
	            "    font-family: Arial, sans-serif; background-color: #f9f9f9;" +
	            "}" +
	            ".header {" +
	            "    font-size: 24px; font-weight: bold; color: #4CAF50;" +
	            "    margin-bottom: 20px; text-align: center;" +
	            "}" +
	            ".icon {" +
	            "    font-size: 40px; text-align: center; margin-bottom: 10px;" +
	            "}" +
	            ".message {" +
	            "    font-size: 16px; color: #333; line-height: 1.5;" +
	            "    margin-bottom: 20px; text-align: center;" +
	            "}" +
	            ".footer {" +
	            "    font-size: 14px; color: #777; text-align: center; margin-top: 30px;" +
	            "}" +
	            "</style>" +
	            "</head>" +
	            "<body>" +
	            "<div class=\"container\">" +
	            "<div class=\"header\">ZKART Notification</div>" +
	            "<div class=\"icon\">" + icon + "</div>" +
	            "<div class=\"message\">" +
	            "Hello!<br>" +
	            message + "<br><br>" +
	            "Thank you for being with us. If this wasn’t you, please contact support immediately." +
	            "</div>" +
	            "<div class=\"footer\">&copy; 2024 ZKART. All Rights Reserved.</div>" +
	            "</div>" +
	            "</body>" +
	            "</html>";
	}
	
	// Sending Mail 
	private void send(String to, String subject, String msg) {
		
	    try {
	        MimeMessage message = getMessage();
	        message.setFrom(new InternetAddress(user));
	        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
	        message.setSubject(subject);
	        MimeMultipart multipart = new MimeMultipart("related");

	        MimeBodyPart htmlPart = new MimeBodyPart();
	        htmlPart.setContent(msg, "text/html; charset=utf-8");
	        multipart.addBodyPart(htmlPart);

	        // Attach the multipart content to the message
	        message.setContent(multipart);	        
	        
	        
	        Transport.send(message);
	        

	    } catch (MessagingException e) {
	        e.printStackTrace();
	    }
	}

}  