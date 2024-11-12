package Classes;


public class Order extends SuperClass{
	
	
	private String order_id ;
	private String time;
	private String cart_id;
	private int total_price;
	private String coupon;
	private int discountprice;
	private String name;
	private String mobile;
	private String address;
	
	public Order( String order_id, String time , String cart_id, String coupon,String name,String mobile,String address , int totalPrice, int discountPrice) {
		
		this.order_id = order_id;
		this.time = time;
		this.cart_id = cart_id;
		this.coupon = coupon;
		this.total_price = totalPrice;
		this.discountprice = discountPrice;
		this.name = name;
		this.mobile = mobile;
		this.address = address;
		
		
	}
	
	
	public Order(Order order) {

		this.order_id = order.order_id;
		this.time = order.time;
		this.cart_id = order.cart_id;
		this.coupon = order.coupon;
		this.total_price = order.total_price;
		this.discountprice = order.discountprice;
		this.name = order.name;
		this.address = order.address;
		this.mobile = order.mobile;
		
	}
	
	public Order() {
		
	}
	
	public String getOrderId() {
		return this.order_id;
	}
	
	public String getTime() {
		return this.time;
	}
	
	public String getCartId() {
		return this.cart_id;
	}
	
	public String getCoupon() {
		return this.coupon;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getMobile() {
		return this.mobile;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public int getTotalPrice() {
		return this.total_price;
	}
	
	public int getDiscountPrice() {
		return this.discountprice;
	}

	@Override
	public Order clone() {
	
		return new Order(this);
	}
	

}
