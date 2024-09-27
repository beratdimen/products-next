"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductComponents() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=5`);
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products">
      <h4>You might also like</h4>
      <div className="productsContainer">
        {products?.map((product) => (
          <Link
            className="productCard"
            href={`/products/${product.id}`}
            key={product.id}
          >
            <div className="imageContainer">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="productImage"
              />
              {product.discountPercentage > 0 && (
                <span className="tag">-{product.discountPercentage}%</span>
              )}
            </div>
            <div className="productInfo">
              <div className="productInfoTitleCategory">
                <h2 className="productTitle">{product.title}</h2>
                <p className="productCategory">{product.category}</p>
              </div>

              <div className="productRating">
                <div className="stars">{renderStars(product.rating)}</div>
              </div>

              <p className="productDescription">{product.description}</p>
            </div>
            <div className="productFooter">
              <div className="priceAndButton">
                <div className="productDiscountOriginalPrice">
                  <p className="productPrice">${product.price}</p>
                  {product.discountPercentage > 0 && (
                    <p className="productDiscount">
                      <span className="originalPrice">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <button className="addToCartButton">Detail</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function renderStars(rating) {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="fa fa-star checked"></span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="fa fa-star-half-o checked"></span>);
    } else {
      stars.push(<span key={i} className="fa fa-star-o"></span>);
    }
  }

  return stars;
}
