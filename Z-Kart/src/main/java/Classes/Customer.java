package Classes;

import java.util.HashMap;

public class Customer extends SuperClass{
    
	
	private String customer_id;
	private String email;
	private String name;
	private String mobile;
	private int orders_count;
	private int log_first;
	private int user_type;
	private String coupon;
	private int used;
	private String address;
	private int discountprice;
	
	
	public Customer (String customer_id,String email,String name,String mobile,int orders_count,String coupon,String address,int logFirst,int userType,int used,int discountPrice) {
		
		if (address.strip().equals("") ||name.strip().equals("") || mobile.strip().equals(""))     {
			throw new IllegalArgumentException(" Invalid Customer Details ! ");
		}
	
		this.discountprice = discountPrice;
		this.address = address;
		this.customer_id = customer_id;
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.log_first = logFirst;
		this.coupon = coupon;
		this.used = used;
		this.user_type = userType;
	}
	
	public Customer ( Customer customer ) {
		if (address.strip().equals("") || customer.name.strip().equals("") || customer.mobile.strip().equals("") )     {
			throw new IllegalArgumentException(" Invalid Customer Details ! ");
		}
	
		this.discountprice = customer.discountprice;
		this.customer_id = customer.customer_id;
		this.email = customer.email;
		this.name = customer.name;
		this.mobile = customer.mobile;
		this.orders_count = customer.orders_count;
		this.log_first = customer.log_first;
		this.coupon = customer.coupon;
		this.used = customer.used;
		this.user_type = customer.user_type;

	}
	
	public Customer() {
		// Empty Constructor for Dynamic creation .
	}
	
	public String getCustomerId() {
		return this.customer_id;
	}
	
	public String getEmail() {
		return this.email;
	}

	public int getUserType() {
		return this.user_type;
	}
	public String getName() {
		return this.name;
	}
	
	public String getMobile() {
		return this.mobile;
	}
	
	public int getOrdersCount() {
		return this.orders_count;
	}
	
	
	public HashMap<String,Integer> getCouponCode() {
	
		HashMap<String,Integer> map = new HashMap<>();
		
		if(this.used>3) {
			return null;
		}
		
		map.put(this.coupon,this.discountprice);
		
		return map;
		
	}
	
	
	public int getLogFirst() {
		return this.log_first;
	}
	
	public int getCouponUsed() {
		return this.used;
	}
	
	public boolean IsAdmin() {
		return this.user_type > 0;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public void setAddress( String address ) {
		if (address.strip().equals(""))     {
			throw new IllegalArgumentException(" Invalid Customer address ! ");
		}
		
		this.address = address;
	}	
	
	public void setName(String name) {
		
		if (name.strip().equals(""))     {
			throw new IllegalArgumentException(" Invalid Customer Details ! ");
		}
		
		this.name = name;
	}
	
	public void setMobile (String mobile) {
		
		if (mobile.strip().equals("") )     {
			throw new IllegalArgumentException(" Invalid Customer Details ! ");
		}
		
		this.mobile = mobile;
	}
	
	public void setLogfirst(int i) {
		this.log_first = i;
	}
	
	public void setUserRole(int i) {
		this.user_type=i;
	}
	
	public void addCouponUsed(int value) {
		
		this.used+=1;
		this.discountprice = value;
		
	}
	
	@Override
	public Customer clone() {
		return new Customer(this);
	}
	
	
	

}
