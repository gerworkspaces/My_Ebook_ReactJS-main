import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../myebook-products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import applebtn from "../img/apple_btn.png";
import googlebtn from "../img/google_btn.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar, FaStarHalf } from "react-icons/fa";
import imgs1 from "../img/s1.jpg";
import imgs2 from "../img/s2.jpg";
import imgs3 from "../img/s3.jpg";
import imgs4 from "../img/s4.jpg";
import imgs5 from "../img/s5.jpg";
import imgs6 from "../img/s6.jpg";
function Homepage() {
  const [products, setProducts] = useState([]);
  //useSelector : selector co the dung nhiu noi, nhiu component khac nhau
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { addressInfo } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  // dispath di duoc action len redux-store
  const dispatch = useDispatch();
  //  dung` useNavigate dieu huong trang
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("addressInfo", JSON.stringify(addressInfo));
  }, [addressInfo]);
  //them vao gio hang
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      {/* COVER */}
      <div className="cover">
        <div className="cover__content">
          <h1>?????c s??ch Online</h1>
          <h5>
            Mua s??ch th???t ch??nh l?? b???n ???? ???ng h??? cho t??c gi??? v?? nh?? xu???t b???n{" "}
          </h5>
        </div>
      </div>
      <div className="intro">
        <div className="intro__content">
          <div className="row">
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-bullseye"></i>
                </div>
                <div className="intro__details">
                  <p>1.000 cu???n s??ch</p>
                  <p>Kh??m ph?? nhi???u ch??? ????? m???i</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-spinner"></i>
                </div>
                <div className="intro__details">
                  <p>Cu???n s??ch ph?? h???p</p>
                  <p>M???i ch??? ????? ?????u d??nh cho b???n</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="intro__items">
                <div className="intro__icon">
                  <i className="fa fa-sync-alt"></i>
                </div>
                <div className="intro__details">
                  <p> S??ch mi???n ph??</p>
                  <p>?????c m???i l??c m???i n??i</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* view ra ngoai */}
      <div className="container">
        {/* Sap xep */}
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"
          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value=""> ALL</option>
            <option value="mentality">T??m L?? - K??? n??ng s???ng</option>
            <option value="economy">Kinh t??? - Qu???n l??</option>
            <option value="literary">V??n h???c Vi???t Nam</option>
            <option value="other">Kh??c</option>
          </select>
        </div>
        <div className="row">
          {/* Sap xep */}
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="cart col-md-3 body_cart">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                      <p className="productNameBook">{product.name}</p>
                      <div className="card__stars">
                        <span className="iStar">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalf />
                        </span>
                        <span className="card__rate">4.6</span>
                        <span className="card__total">(11.597)</span>
                      </div>
                      <h4 id="product-actions-gia">{product.price} ??</h4>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} ??</h2>
                      <div className="d-flex">
                        <button
                          className="button--red mx-2"
                          onClick={() => addToCart(product)}
                        >
                          ADD TO CART
                        </button>
                        <button
                          className="button--red"
                          onClick={() => {
                            // chuyen toi trong Productinfo
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="banner">
        <div className="container">
          <h2>?????c m???i l??c m???i n??i</h2>
          <p>Tham gia c??c ???ng d???ng tr??n b???t k??? thi???t b??? n??o c???a b???n</p>
          <p>H??y th??? th??ch b???n th??n m??nh , v?????t qua m???i gi???i h???n</p>
          <button className="button--red">Sign Up For Free</button>
          <div className="row">
            <div className="col-6 text-right">
              <img src={googlebtn} alt="google btn" />
            </div>
            <div className="col-6 text-left">
              <img src={applebtn} alt="apple btn" />
            </div>
          </div>
        </div>
      </div>
      <OwlCarousel className="owl-theme" margin={10} items="3" autoplay>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs1} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs2} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs3} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs4} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs5} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
        <div className="students">
          <div className="card card--feedback">
            <div className="card-body">
              <div className="card__top">
                <div className="card__avatar">
                  <img src={imgs6} alt="student 1" />
                </div>
                <div>
                  <p className="card__name">Oscar Javier</p>
                  <div className="card__stars">
                    <span className="iStar">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStarHalf />
                    </span>
                  </div>
                </div>
              </div>
              <p className="card-text">
                I had a couple of months of experience trading without
                consistent results. After taking this course I'm pretty
                confident that I'll be a better trader and know better when to
                enter a trade, how to put my stop loss and take profit, how many
                lots to trade and much more.
              </p>
            </div>
          </div>
        </div>
      </OwlCarousel>
      ;
    </Layout>
  );
}
export default Homepage;
