"use client";

import Link from "next/link";
import "./style.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/category-list");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="header">
      <div className="headerLeft">
        <Link href="/">
          <img
            src="/img/berat-dimen-siyaah-logo.png"
            alt="Logo"
            width={200}
          />
        </Link>
      </div>
      <div className="headerCenter">
        <ul className={`menu`}>
          <button className="close-menu" onClick={() => setOpen(false)}>
            ×
          </button>
          <li>
            <Link href={`/products`}>Home</Link>
          </li>
          {categories.length > 0 &&
            categories.slice(0, 5).map((category) => (
              <li>
                <Link href={`/${category}`}>{category.replace("-", " ")}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="headerRight">
        <button onClick={() => setOpen(true)}>
          <img src="/img/basket.svg" alt="Basket" />
        </button>
        <Link href="/user">
          <img src="/img/user.png" alt="User" />
        </Link>
      </div>
      <div className="hamburger" onClick={() => setOpen(true)}>
        <img src="/img/hamburger-menu.svg" alt="Menu" />
      </div>
      <ul className={`open ${open ? "true" : "false"}`}>
        <button className="close-menu" onClick={() => setOpen(false)}>
          ×
        </button>
        <li>
          <Link href={`/products`}>Home</Link>
        </li>
        {categories.length > 0 &&
          categories.slice(0, 5).map((category) => (
            <li>
              <Link href={`/${category}`}>{category.replace("-", " ")}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
