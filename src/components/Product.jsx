import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton count={5} />
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="p-20 w-screen">
        <div className="">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="280px"
          />
        </div>
        <div className="">
          <h4 className="">{product.category}</h4>
          <h1 className="">{product.title}</h1>
          <p className="">
            Rating {product.rating && product.rating.rate}
            <span>
              <FaStar />
            </span>
          </p>
          <h3 className="">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            onClick={() => addProduct(product)}
            className="btn btn-outline-dark"
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-outline-dark ms-2 px-3 py-2">
            Go to cart
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>
        <div className=" font-Kanit">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
