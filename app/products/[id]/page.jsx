"use client";

import { notFound } from "next/navigation";
import Header from "@/components/header";
import "./style.css";
import Slider from "@/components/slider";
import SelectProduct from "@/components/select-product";
import ProductComponents from "@/components/products";

export default async function ProductDetail({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      return notFound();
    }

    const product = await response.json();

    return (
      <>
        <div className="container">
          <Header />
          <div className="body">
            <Slider product={product} />
            <div className="general">
              <Information product={product} />
              <Price product={product} />
              <div className="addBasket">
                <SelectProduct />
                <AddCardBtn />
              </div>
            </div>
          </div>
          <InBasket product={product} />
        </div>
        <ProductComponents />
      </>
    );
  } catch (e) {
    console.error("Error fetching product data:", e);
    throw new Error("Sunucuda bir hata oluştu");
  }
}

function Price({ product }) {
  return (
    <div className="price">
      <div className="discount">
        <h3>${product.price}</h3>
        <h5>%{product.discountPercentage}</h5>
      </div>
      <h6>
        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
      </h6>
    </div>
  );
}

function AddCardBtn() {
  function addToCard() {
    // Sepete ekle işlemi şu an boş
  }

  return (
    <div className="addCard">
      <button onClick={addToCard}>
        <img src="/img/basket.svg" alt="Add to cart" /> Add to cart
      </button>
    </div>
  );
}

function InBasket({ product, open, setOpen }) {
  return (
    <dialog className="inBasket" open={open}>
      <button onClick={() => setOpen(false)}>X</button>

      <h4>Cart</h4>
      <div className="content">
        {product ? (
          <>
            <div className="contentImg">
              <img src={product.image} alt="" />
            </div>
            <div className="contentText">
              <p>{product.title}</p>
              <div className="calc">
                <p>{product.price}$ x</p>
                <p>{product.unit}</p>
                <h4>${product.unit * product.price}</h4>
                <button onClick={() => setOpen(false)}>🗑️</button>
              </div>
            </div>
          </>
        ) : (
          <h2>Your cart is empty.</h2>
        )}
      </div>
      <button className="check">Checkout</button>
    </dialog>
  );
}

function Information({ product }) {
  return (
    <div className="information">
      <h6>{product.category}</h6>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
}
