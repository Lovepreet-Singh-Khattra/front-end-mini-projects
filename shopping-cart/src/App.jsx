import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "/headphones.png",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    image: "/watch.png",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2999,
    image: "/shoes.png",
  },
  {
    id: 4,
    name: "Backpack",
    price: 1499,
    image: "/backpack.png",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 999,
    image: "/sunglasses.jpg",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 1299,
    image: "/mouse.png",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product completely
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1>ShopKart 🛒</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="cart-count">
          🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main>

        <h2 className="title">Our Products</h2>

        {/* PRODUCTS */}
        <section className="products">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">
              <img src={product.image} alt={product.name} />
              </div>

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.price}
              </p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>

            </div>
          ))}
        </section>

        {/* CART */}
        <section className="cart-section">

          <h2>🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>

                  <div className="cart-product">
                    <img
                      className="cart-image"
                      src={item.image}
                      alt={item.name}
                      />

                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>
                  </div>

                  <div className="quantity">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="item-total">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <div className="cart-total">
                <h2>Total: ₹{total}</h2>

                <div className="cart-buttons">
                  <button
                    className="clear-cart"
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </button>

                  <button
                  className="checkout"
                  onClick={() => {
                    setCart([]);
                    alert("Order placed successfully! 🎉");
                  }}
                >
                  Checkout
                </button>
                </div>
              </div>
            </>
          )}

        </section>

      </main>
    </div>
  );
}

export default App;