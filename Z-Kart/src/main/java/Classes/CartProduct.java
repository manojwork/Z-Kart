package Classes;


public class CartProduct extends SuperClass {
	
	
	private String cp_id;
	private Product product;
	private int count;
	
    public CartProduct(String cp_id,Product product,int quantity) {
    	
    	this.cp_id = cp_id;
    	this.product = product.clone();
    	this.count = quantity;

    }
    
    public CartProduct(CartProduct cartProduct) {
    	
    	this.cp_id = cartProduct.cp_id;
    	this.product = cartProduct.product.clone();
    	this.count = cartProduct.count;

    }
    
    public CartProduct() {
    	
    }
    
    
    public String getCpId() {
    	return this.cp_id;
    }
    
    public Product getProduct() {
    	return this.product.clone();
    }
    
    public int getQuantity() {
    	return this.count;
    }
    

	@Override
	public CartProduct  clone() {
		return new CartProduct(this);
	}
	

}
