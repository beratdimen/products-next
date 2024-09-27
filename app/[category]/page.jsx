"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductsCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="productsContainer">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonProduct key={index} />
            ))
          : products.map((product) => (
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
    </>
  );
}

const SkeletonProduct = () => (
  <div className="skeletonProductCard">
    <div className="skeletonImageContainer">
      <div className="skeletonImage"></div>
      <div className="skeletonTag"></div>
    </div>
    <div className="skeletonInfo">
      <div className="skeletonTitle"></div>
      <div className="skeletonCategory"></div>
      <div className="skeletonRating"></div>
      <div className="skeletonDescription"></div>
    </div>
    <div className="skeletonFooter">
      <div className="skeletonPrice"></div>
      <div className="skeletonButton"></div>
    </div>
  </div>
);

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
