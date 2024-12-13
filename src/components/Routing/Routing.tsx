import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import CartPage from "../../Cart/CartPage";
import ProductPage from "../Products/ProductPage";
import MyOrderPage from "../../MyOrder/MyOrderPage";
import { useTotal } from "../../hooks/useTotal";

const Routing = () => {
  const { total } = useTotal();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route
        path="/myorder"
        element={
          <MyOrderPage
            headings={["Order", "Products", "Total", "Status"]}
            orders={[
              {
                products: ["iPhone 16", "Airpods", "Headphones"],
                status: "shipped",
                total: total,
              },
            ]}
          />
        }
      />
    </Routes>
  );
};

export default Routing;
