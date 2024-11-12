package Classes;



public class OrderProduct extends SuperClass{

	
	private String purchased_product_id;
	private String order_id;
	private Product product;
	private int count;
	
	public OrderProduct( String orderProduct_id, String order,Product product,int count) {
		
		this.purchased_product_id = orderProduct_id;
		this.order_id = order;
		this.product = product.clone();
		this.count = count;
		
	}
	
	public OrderProduct( OrderProduct orderProduct) {
		
		this.purchased_product_id = orderProduct.purchased_product_id;
		this.order_id = orderProduct.order_id;
		this.product = orderProduct.product.clone();
		this.count = orderProduct.count;
		
	}
	
	public OrderProduct() {
		
	}
	
	public String getOrderProductId() {
		
		return this.purchased_product_id;
	}
	
	public String getOrder() {
		return this.order_id;
	}
	
	public Product getProduct() {
		return this.product;
	}
	
	public int getCount() {
		return this.count;
	}


	@Override
	public OrderProduct clone() {
		return new OrderProduct(this);
	}

}
