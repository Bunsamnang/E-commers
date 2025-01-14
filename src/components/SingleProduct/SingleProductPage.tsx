import { useState } from "react";
import useData, { Product } from "../../hooks/useData";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import QuantityInput from "./QuantityInput";
import { useCart } from "../../hooks/useCart";

const SingleProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    errorMsg,
    isLoading,
  } = useData<Product>(`/products/${id}`);
  console.log(product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cart } = useCart();

  console.log(product);

  console.log(cart);

  return (
    <>
      {errorMsg ? (
        <p className="text-red-500 text-center">{errorMsg}</p>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <LoaderCircle className="animate-spin text-slate-800 w-10 h-10 " />
            </div>
          ) : (
            product && (
              <>
                <section className="grid md:grid-cols-[2fr_1.8fr] place-items-center mt-10 max-md:grid-rows-2 max-md:mt-0 max-md:mb-3">
                  <div className="flex gap-5 justify-center max-md:flex-col max-md:items-center">
                    <div className="flex flex-col max-md:flex-row justify-center gap-4 single-product-thumbnail">
                      {product?.images.map((image, index) => (
                        <img
                          src={`http://localhost:5000/products/${image}`}
                          key={index}
                          className={`w-20 h-20 max-md:w-14 max-md:h-14 rounded-md shadow cursor-pointer ${
                            selectedImage === index ? "scale-110" : ""
                          } transition-all 0.3s ease-in`}
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                    <img
                      src={`http://localhost:5000/products/${product?.images[selectedImage]}`}
                      alt={product?.title}
                      className="rounded-md single-product-display w-[40%]  aspect-square object-contain"
                    />
                  </div>
                  <div className="single-product-details flex flex-col max-md:items-center max-md:gap-3">
                    <h1 className="text-2xl font-bold mb-2">
                      {product?.title}
                    </h1>
                    <p className="max-md:text-center">{product?.description}</p>
                    <p className="font-semibold mt-2 text-xl">
                      ${product?.price}
                    </p>
                    <h2 className="text-xl font-semibold my-5">Quantity</h2>
                    <div className="flex items-center gap-5">
                      <QuantityInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={product.stock}
                      />
                    </div>
                    <button
                      className="text-left max-md:block max-md:text-center max-md:m-auto mt-4 px-5 py-2 rounded-full bg-violet-500 text-white self-start hover:bg-violet-600"
                      onClick={() => addToCart(product, quantity)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </section>
              </>
            )
          )}
        </>
      )}
    </>
  );
};

export default SingleProductPage;
