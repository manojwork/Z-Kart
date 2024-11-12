package Classes;

public class Product extends SuperClass {

	
	private String product_id;
	private String name;
	private String category;
	private String model;
	private String image;
	private String brand;
	private int price;
	private int stock;
	
	public Product(String product_id,String name,String category,String model,String image,String brand,int price,int stock) {
		
		if (name.strip().equals("") || category.strip().equals("") || model.strip().equals("") || image.strip().equals("") || price<0 || stock <0) {
			throw new IllegalArgumentException(" invalid product details ! ");
		}
		
		
		this.brand = brand;
		this.product_id = product_id;
		this.name = name;
		this.category = category;
		this.model = model;
		this.image = image;
		this.price = price;
		this.stock = stock;
	}
	
	public Product(Product product) {
		
		if (product.name.strip().equals("") || product.category.strip().equals("") || product.model.strip().equals("") || product.image.strip().equals("") || product.price<0 || product.stock <0) {
			throw new IllegalArgumentException(" invalid product details ! ");
		}
		
		this.product_id = product.product_id;
		this.name = product.name;
		this.category = product.category;
		this.model = product.model;
		this.image = product.image;
		this.price = product.price;
		this.stock = product.stock;
		this.brand = product.brand;
		
	}
	
	public Product() {
		
	}
	
	public String getProductId() {
		return this.product_id;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getCategory() {
		return this.category;
	}
	
	public String getModel() {
		return this.model;
	}
	
	public String getImage() {
		return this.image;
	}
	
	public int getPrice() {
		return this.price;
	}
	
	public int getStock() {
		return this.stock;
	}
	
	public String getBrand() {
		return this.brand;
	}
	
	public void setBrand(String brand) {
		if (brand.strip().equals("")) {
			throw new IllegalArgumentException(" invalid product name! ");
		}
		this.brand = brand;
	}
	
	public void setName( String name) {
		if (name.strip().equals("")) {
			throw new IllegalArgumentException(" invalid product name! ");
		}
		this.name = name;
	}
	
	public void setCategory(String category) {
		if (category.strip().equals("")) {
			throw new IllegalArgumentException(" invalid product category! ");
		}
		this.category = category;
	}
	
	public void setModel( String model) {
		
		if (model.strip().equals("")) {
			throw new IllegalArgumentException(" invalid product model ! ");
		}
		
		this.model = model;
	}
	
	public void setPrice(int price) {
		
		if (price<0) {
			throw new IllegalArgumentException(" invalid product price! ");
		}
		
		this.price = price;
	}
	
	public void setStock(String image) {
		this.image = image;
	}
	public void setStock(int stock) {
		this.stock=stock;
	}
 
	
	@Override
	public Product clone() {
		
		return new Product(this);
		
	}
	
	

}
