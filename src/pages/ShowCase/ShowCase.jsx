import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultImageUrl from "../../utils/Cards/ShowcaseCard/ShowcaseCard";

import Collections from "../../components/HomeComponents/Collections/Collections";

import NavigationBar2 from "../../components/Navbars/NavigationBar2/NavigationBar2";
import CategorySelectionComp from "../../utils/OrderingUtils/CategorySelectionComp/CategorySelectionComp";
import FilterBox from "../../utils/OrderingUtils/FilterBox/FilterBox";
import CircleCard1 from "../../utils/Cards/CircleCards/CircleCard1/CircleCard1";
import CircleCard2 from "../../utils/Cards/CircleCards/CircleCard2/CircleCard2";
import ShowcaseCard from "../../utils/Cards/ShowcaseCard/ShowcaseCard";
import ExploreOptionsNearMe from "../../components/HomeComponents/ExploreOptionsNearMe/ExploreOptionsNearMe";
import Footer from "../../components/Footer/Footer";
import CarouselUtil from "../../utils/CarouselUtil/CarouselUtil";
import delivery1 from "/icons/delivery1.png";
import delivery2 from "/icons/delivery2.png";
import filtersIcon from "/icons/filter.png";
import deliveryTimeIcon from "/icons/delivery-time.png";
import downArrowIcon from "/icons/down-arrow.png";
import Filter from "../../utils/OrderingUtils/FilterBox/filter";
// import biryaniCImg from "/icons/Food/biryaniC.png";
// import burgerImg from "/icons/Food/burger.png";
// import chickenImg from "/icons/Food/chicken.png";
// import friesImg from "/icons/Food/fries.png";
// import homestyleImg from "/icons/Food/homestyle.png";
// import noodelsImg from "/icons/Food/noodels.png";
// import pannerImg from "/icons/Food/panner.png";
// import pizzaImg from "/icons/Food/pizza.png";
// import sandwichImg from "/icons/Food/sandwich.png";
// import shawarmaImg from "/icons/Food/shawarma.png";


import biryaniCImg from "../../asets/images/biryani.png";
import burgerImg from "../../asets/images/burger.png";
import chickenImg from "../../asets/images/chicken.png";
import friesImg from "../../asets/images/fries.png";
import homestyleImg from "../../asets/images/homeStyle.png";
import noodelsImg from "../../asets/images/noodels.png";
import pannerImg from "../../asets/images/panner.png";
import pizzaImg from "../../asets/images/pizza.png";
import sandwichImg from "../../asets/images/sandwich.png";
import shawarmaImg from "../../asets/images/shawarma.png";

import thalassery from "../../asets/images/thalassery.png";
import mcdelivery from "../../asets/images/mcdelivery.png";
import a2b from "../../asets/images/a2b.png";



import kfcImg from "/icons/Brands/kfc.png";
import pizzahutImg from "/icons/Brands/pizzahut.png";
import scoopsImg from "/icons/Brands/scoops.png";

import biryaniSCImg from "/images/Food/biryani.png";
import biryaniSCImg2 from "/images/Food/biryani2.png";
import chapathiImg from "/images/Food/chapathi.png";
import fishImg from "/images/Food/fish.png";
import icecreamImg from "/images/Food/icecream.png";
import kfcSCImg from "/images/Food/kfc.png";
import pizzaSCImg from "/images/Food/pizza.png";

import {
  orderOnlinePage,
  diningOutPage,
  nightLifePage,
} from "../../helpers/constants";

import css from "./ShowCase.module.css";
import Modal from "../../components/Modal/Modal";

import Cross from "../../asets/svg/Cross";
import Search from "../../asets/svg/Search";
import Cancel from "../../asets/svg/Cancel";

let ShowCase = () => {
  let [toogleMenu, setToggleMenu] = useState(true);
  const [modalId, setModalId] = useState(null);
  const [val, setVal] = useState("Sort by");
  const [restaurantImages, setRestaurantImages] = useState({});
  const [items, setItems] = useState([]);
  let location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const page = urlParams.get("page");
  const [isFilterPageOpen, setIsFilterPageOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popularity");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const [range, setRange] = useState("Any");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChange = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((selectedCity) => selectedCity !== city)
      : [...selectedCities, city];

    setSelectedCities(updatedCities);
  };

  const modalData = [
    {
      label: "Sort By",
    },
    {
      label: "Cuisines",
    },
    {
      label: "Rating",
    },
  ];

  const handleFilterBoxClick = () => {
    // Toggle the state to open/close the filter page
    setIsFilterPageOpen(!isFilterPageOpen);
  };

  // <Navbar setToggleMenu={setToggleMenu} toogleMenu={toogleMenu} />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://userpanel.selfeey.com/api.selfeey.com/restaurantsapi/getrestaurantlist.php"
        );
        const data = await response.json();
        setItems(data);
        fetchRestaurantImages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchRestaurantImages = async (restaurants) => {
    const imagePromises = restaurants.map(async (restaurant) => {
      try {
        const response = await fetch(
          `https://userpanel.selfeey.com/api.selfeey.com/newapi.php?restaurant_id=${restaurant.restaurant_id}`
        );
        const images = await response.json();

        return {
          restaurantId: restaurant.restaurant_id,
          imageUrl:
            images.length > 0
              ? `http://api.selfeey.com/restaurantsapi/${images[0].file_path}`
              : null,
        };
      } catch (error) {
        console.error("Error fetching images for restaurant:", error);
        return {
          restaurantId: restaurant.restaurant_id,
          imageUrl: null,
        };
      }
    });

    try {
      const imageData = await Promise.all(imagePromises);

      const imagesObj = {};
      imageData.forEach(({ restaurantId, imageUrl }) => {
        imagesObj[restaurantId] = imageUrl;
      });
      setRestaurantImages(imagesObj);
      console.log(imagesObj); // Log imagesObj here to see the retrieved image URLs
    } catch (error) {
      console.error("Error processing image data:", error);
    }
  };

  let [isActive, setIsActive] = useState({
    delivery: page === orderOnlinePage,
    dinning: page === diningOutPage,
    nightlife: page === nightLifePage,
  });
  let filterBoxes;

  let filters = {
    delivery: [
      { text: "Filter", leftIcon: filtersIcon },
      { text: "Rating: 4.0+" },
      // { text: "Delivery Time", leftIcon: TimeIcon },
      { text: "Pure Veg" },

      // { text: "Freate Offers" },
      { text: "Cuisines", leftIcon: downArrowIcon },
    ],
    // dinning: [
    //     { text: "Filter", leftIcon: filtersIcon },
    //     { text: "Rating: 4.0+" },
    //     { text: "Outdoor Seating" },
    //     { text: "Serves Alcohal" },
    //     { text: "Open Now" },
    // ],
    // nightLife: [
    //     { text: "Filter", leftIcon: filtersIcon },
    //     { text: "Distance", leftIcon: deliveryTimeIcon },
    //     { text: "Rating: 4.0+" },
    //     { text: "Pubs & Bars" },
    // ]
  };
  if (page !== orderOnlinePage || page === orderOnlinePage) {
    filterBoxes = filters?.delivery?.map((val, id) => {
      return (
        <div key={id}>
          <FilterBox
            leftIcon={val?.leftIcon ?? null}
            rightIcon={val?.rightIcon ?? null}
            text={val.text}
            onClick={() => {
              setModalId(id);
              setCreateModal(true);
            }}
          />
        </div>
      );
    });
  } else if (page === diningOutPage) {
    filterBoxes = filters?.dinning?.map((val, id) => {
      return (
        <div key={id}>
          <FilterBox
            leftIcon={val?.leftIcon ?? null}
            rightIcon={val?.rightIcon ?? null}
            text={val.text}
          />
        </div>
      );
    });
  } else if (page === nightLifePage) {
    filterBoxes = filters?.nightLife?.map((val, id) => {
      return (
        <div key={id}>
          <FilterBox
            leftIcon={val?.leftIcon ?? null}
            rightIcon={val?.rightIcon ?? null}
            text={val.text}
          />
        </div>
      );
    });
  }

  const foodCardScroll = [
    {
      name: "Biryani",
      imgSrc: biryaniCImg,
    },
    {
      name: "Burger",
      imgSrc: burgerImg,
    },
    {
      name: "Chicken",
      imgSrc: chickenImg,
    },
    {
      name: "Fries",
      imgSrc: friesImg,
    },
    {
      name: "Home Style",
      imgSrc: homestyleImg,
    },
    {
      name: "Noodles",
      imgSrc: noodelsImg,
    },
    {
      name: "Panner",
      imgSrc: pannerImg,
    },
    {
      name: "Pizza",
      imgSrc: pizzaImg,
    },
    {
      name: "Sandwich",
      imgSrc: sandwichImg,
    },
    {
      name: "Shawarma",
      imgSrc: shawarmaImg,
    },
  ];

  const brandsCardScroll = [
    {
      name: "Thalassery",
      imgSrc: thalassery,
      time: "45",
    },
    {
      name: "Mc Delivery",
      imgSrc: mcdelivery,
      time: "35",
    },
    {
      name: "A2B",
      imgSrc: a2b,
      time: "49",
    },
    {
      name: "KFC",
      imgSrc: kfcImg,
      time: "19",
    },
    {
      name: "Pizza Hut",
      imgSrc: pizzahutImg,
      time: "22",
    },
    {
      name: "Scoops",
      imgSrc: scoopsImg,
      time: "33",
    },
  ];

  // const items = [
  //   {
  //     promoted: true,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Paradise Hotel",
  //     rating: "3.6",
  //     imgSrc: biryaniSCImg,
  //   },
  //   {
  //     promoted: false,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Mangal Hotel",
  //     rating: "2.6",
  //     imgSrc: biryaniSCImg2,
  //   },
  //   {
  //     promoted: true,
  //     time: "30",
  //     offB: false,
  //     proExtraB: true,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Chapathi Hotel",
  //     rating: "4.6",
  //     imgSrc: chapathiImg,
  //   },
  //   {
  //     promoted: false,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Fish Mandi Hotel",
  //     rating: "4.9",
  //     imgSrc: fishImg,
  //   },
  //   {
  //     promoted: true,
  //     time: "25",
  //     offB: false,
  //     proExtraB: true,
  //     off: "30",
  //     proExtra: "40",
  //     name: "MangalCaptain Hotel",
  //     rating: "4.6",
  //     imgSrc: icecreamImg,
  //   },
  //   {
  //     promoted: false,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "KFCS Hotel",
  //     rating: "2.8",
  //     imgSrc: kfcSCImg,
  //   },
  //   {
  //     promoted: true,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Pizza Hotel",
  //     rating: "3.2",
  //     imgSrc: pizzaSCImg,
  //   },
  //   {
  //     promoted: false,
  //     time: "25",
  //     offB: true,
  //     proExtraB: false,
  //     off: "30",
  //     proExtra: "40",
  //     name: "Fish Mandi Hotel",
  //     rating: "4.6",
  //     imgSrc: fishImg,
  //   },
  //   {
  //     promoted: true,
  //     time: "25",
  //     offB: false,
  //     proExtraB: true,
  //     off: "30",
  //     proExtra: "40",
  //     name: "MangalCaptain Hotel",
  //     rating: "2.6",
  //     imgSrc: icecreamImg,
  //   },
  // ];

  return (
    <div className={css.outerDiv}>
      <NavigationBar2 />
      <div className={css.innerDiv}>
        <div className={css.breadcrumb} style={{color:'var(--secondary-color)'}}>
          Home / India / Bengaluru / Bangalore City / Indira Nagar
        </div>
      </div>
      <div className={css.showCaseDiv}>
        <div className={css.showcaseComps}>
          <CategorySelectionComp
            title="Delivery"
            imgSrc={delivery1}
            imgSrc2={delivery2}
            color="#FCEEC0"
            comp="delivery"
            isActive={isActive}
            setIsActive={setIsActive}
          />
          {/* <CategorySelectionComp title="Dinning" imgSrc={dinning1} imgSrc2={dinning2} color="#EDF4FF" comp='dinning' isActive={isActive} setIsActive={setIsActive} />
                <CategorySelectionComp title="NightLife" imgSrc={nightlife1} imgSrc2={nightlife2} color="#EDF4FF" comp='nightlife' isActive={isActive} setIsActive={setIsActive} /> */}
        </div>
      </div>
      {/* {page !== orderOnlinePage ? (
        <div className={css.innerDiv2}>
          <div className={css.w7}>
            <Collections />
          </div>
        </div>
      ) : null} */}
      <div className={css.innerDiv3}>
        <div className={css.filtersDiv}>{filterBoxes}</div>
      </div>
      {/* {page === orderOnlinePage ? ( */}
        <div className={css.innerDiv4}>
          <div className={css.w7}>
            <div className={css.innerDiv4Title}>
              Inspiration for your first order
            </div>
            <div className={css.rollerCarosuel}>
              <CarouselUtil>
                {foodCardScroll?.map((val, id) => {
                  return (
                    <div className={css.cardW} key={id}>
                      <CircleCard1 imgSrc={val.imgSrc} name={val.name} />
                    </div>
                  );
                })}
              </CarouselUtil>
            </div>
          </div>
        </div>
      {/* ) : null} */}
      {/* {page === orderOnlinePage ? ( */}
        <div className={css.innerDiv5}>
          <div className={css.w7}>
            <div className={css.innerDiv5Title}>Top brands for you</div>
            <div className={css.rollerCarosuel}>
              <CarouselUtil>
                {brandsCardScroll?.map((val, id) => {
                  return (
                    <div className={css.cardW} key={id}>
                      <CircleCard2
                        imgSrc={val.imgSrc}
                        name={val.name}
                        time={val.time}
                      />
                    </div>
                  );
                })}
              </CarouselUtil>
            </div>
          </div>
        </div>
      {/* ) : null} */}
      <div className={css.innerDiv6}>
        <div className={css.w7}>
          <div className={css.innerDiv6Title}style={{fontFamily:'DexaSemi',color:'var(--primary-color)'}}>
            {page === orderOnlinePage
              ? "Delivery Restaurants in Bangalore"
              : page === diningOutPage
              ? "Dine-Out Restaurants in Bangalore"
              : "Nightlife Restaurants in Bangalore"}
          </div>
          <div className={css.innerDiv6Body}>
            {/* {items?.map((item, id) => {
              return (
                <ShowcaseCard
                  key={id}
                  promoted={item.promoted}
                  time={item.time}
                  offB={item.offB}
                  proExtraB={item.proExtraB}
                  off={item.off}
                  proExtra={item.proExtra}
                  name={item.restaurant_name}
                  rating={item.rating}
                  imgSrc={item.imagesObj} // Ensure item.imageUrl holds the correct image URL
                />
              );
            })} */}
            {items.map((restaurant) => (
              <ShowcaseCard
                key={restaurant.restaurant_id}
                promoted={restaurant.promoted}
                time={restaurant.time}
                offB={restaurant.offB}
                proExtraB={restaurant.proExtraB}
                off={restaurant.off}
                proExtra={restaurant.proExtra}
                name={restaurant.restaurant_name}
                rating={restaurant.rating}
                imgSrc={restaurantImages[restaurant.restaurant_id]} // Use the image URL for imgSrc
              />
            ))}
          </div>
        </div>
      </div>
      <ExploreOptionsNearMe />
      <Footer />

      <Modal isOpen={createModal} onClose={() => setCreateModal(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // gridTemplateColumns: "repeat(2, 1fr)",
            // gridGap: "4%",
            // overflow: "hidden",
            width: 700,
            height: 600,
            overflowY: "auto",
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingInline: 10,
              margin: 0,

              borderBottom: "1px solid grey",
            }}
          >
            <h2>Filters</h2>
            <div onClick={() => setCreateModal(false)}>
              <Cross />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid grey",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  fontWeight: "600",
                  fontSize: 18,
                  backgroundColor: "#f8f8f8",
                  height: 420,
                }}
              >
                <div
                  onClick={() => setVal("Sort by")}
                  style={{
                    paddingLeft: val === "Sort by" ? 15 : 20,
                    backgroundColor: val === "Sort by" ? "white" : "",
                    borderLeft: val === "Sort by" ? "5px solid #ef4f5f " : "",
                    height: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ margin: 0, cursor: "pointer" }}>Sort by</p>
                  <p style={{ margin: 0, fontSize: 15, color: "#ef4f5f" }}>
                    {selectedOption}
                  </p>
                </div>
                <div
                  onClick={() => setVal("Cuisines")}
                  style={{
                    paddingLeft: val === "Cuisines" ? 15 : 20,
                    backgroundColor: val === "Cuisines" ? "white" : "",
                    borderLeft: val === "Cuisines" ? "5px solid #ef4f5f " : "",
                    height: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ margin: 0, cursor: "pointer" }}>Cuisines</p>
                  {selectedCities.length >= 1 && (
                    <p style={{ margin: 0, fontSize: 15, color: "#ef4f5f" }}>
                      {selectedCities.length} Selected
                    </p>
                  )}

                  {/* <p style={{ margin: 0, fontSize: 15, color: "#ef4f5f" }}>
                    Selected cities: {selectedCities.join(", ")}
                  </p> */}
                </div>
                <div
                  onClick={() => setVal("Rating")}
                  style={{
                    paddingLeft: val === "Rating" ? 15 : 20,
                    backgroundColor: val === "Rating" ? "white" : "",
                    borderLeft: val === "Rating" ? "5px solid #ef4f5f " : "",
                    height: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ margin: 0, cursor: "pointer",}}>Rating</p>
                </div>
                <div
                  onClick={() => setVal("More filters")}
                  style={{
                    paddingLeft: val === "More filters" ? 15 : 20,
                    backgroundColor: val === "More filters" ? "white" : "",
                    borderLeft:
                      val === "More filters" ? "5px solid #ef4f5f " : "",
                    height: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ margin: 0, cursor: "pointer" }}>More filters</p>
                </div>
              </div>
            </div>

            {val == "Sort by" && (
              <div style={{ flex: 2, paddingInline: 20 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="Popularity"
                    checked={selectedOption === "Popularity"}
                    onChange={handleOptionChange}
                  />
                  <p>Popularity</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="Rating: High to Low"
                    checked={selectedOption === "Rating: High to Low"}
                    onChange={handleOptionChange}
                  />
                  <p>Rating: High to Low</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="Delivery Time"
                    checked={selectedOption === "Delivery Time"}
                    onChange={handleOptionChange}
                  />
                  <p>Delivery Time</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="Cost: Low to High"
                    checked={selectedOption === "Cost: Low to High"}
                    onChange={handleOptionChange}
                  />
                  <p>Cost: Low to High</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    value="Cost: High to Low"
                    checked={selectedOption === "Cost: High to Low"}
                    onChange={handleOptionChange}
                  />
                  <p>Cost: High to Low</p>
                </div>
              </div>
            )}
            {val == "Cuisines" && (
              <div style={{ flex: 2, paddingInline: 20 }}>
                <div style={{ paddingBlock: 20, position: "relative" }}>
                  <div style={{ position: "absolute", top: "40%", left: 6 }}>
                    <Search />
                  </div>

                  <input
                    type="text"
                    placeholder="Search here"
                    style={{
                      border: "1px groove #CFCFCF",
                      width: "100%",
                      outline: "none",
                      borderRadius: 6,
                      paddingInline: 30,
                      paddingBlock: 10,
                      fontSize: 20,
                    }}
                  />
                  <div style={{ position: "absolute", top: "40%", right: 6 }}>
                    <Cancel />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 80,
                    height: 300,
                    overflowY: "auto",
                  }}
                >
                  <div style={{ height: 400, overflowY: "auto" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("New York")}
                      />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("Aegean")}
                      />
                      <p>Aegean</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("Abruzzese")}
                      />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("Aegean")}
                      />
                      <p>Aegean</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("England")}
                      />
                      <p>England</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Aegean</p>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Aegean</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Aegean</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Aegean</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Abruzzese</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <input type="checkbox" />
                      <p>Aegean</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {val == "Rating" && (
              <div style={{ flex: 2, paddingInline: 20 }}>
                <small style={{ color: "#696969", fontSize: 12 }}>Rating</small>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p
                    style={{
                      margin: 0,
                      color: "#1c1c1c",
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    {range}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#1c1c1c",
                      fontWeight: "600",
                      fontSize: 20,
                    }}
                  >
                    {range === "3.5" || range === "4.0" || range === "4.5"
                      ? " +"
                      : ""}
                  </p>
                </div>
                <div
                  className=""
                  style={{
                    marginTop: "40%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <div onClick={() => setRange("Any")}>
                    <div
                      style={{
                        height: range === "Any" ? 20 : 15,
                        width: range === "Any" ? 20 : 15,
                        backgroundColor:
                          range === "3.5" ||
                          range === "4.0" ||
                          range === "4.5" ||
                          range === "5.0"
                            ? "#e8e8e8"
                            : "#ef4f5f",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: 4,
                      backgroundColor:
                        range === "3.5" ||
                        range === "4.0" ||
                        range === "4.5" ||
                        range === "5.0"
                          ? "#e8e8e8"
                          : "#ef4f5f",
                    }}
                  ></div>
                  <div onClick={() => setRange("3.5")}>
                    <div
                      style={{
                        height: range === "3.5" ? 20 : 15,
                        width: range === "3.5" ? 20 : 15,
                        backgroundColor:
                          range === "4.0" || range === "4.5" || range === "5.0"
                            ? "#e8e8e8"
                            : "#ef4f5f",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 4,
                      backgroundColor:
                        range === "4.0" || range === "4.5" || range === "5.0"
                          ? "#e8e8e8"
                          : "#ef4f5f",
                    }}
                  ></div>
                  <div onClick={() => setRange("4.0")}>
                    <div
                      style={{
                        height: range === "4.0" ? 20 : 15,
                        width: range === "4.0" ? 20 : 15,
                        backgroundColor:
                          range === "4.5" || range === "5.0"
                            ? "#e8e8e8"
                            : "#ef4f5f",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 4,
                      backgroundColor:
                        range === "4.5" || range === "5.0"
                          ? "#e8e8e8"
                          : "#ef4f5f",
                    }}
                  ></div>
                  <div onClick={() => setRange("4.5")}>
                    <div
                      style={{
                        height: range === "4.5" ? 20 : 15,
                        width: range === "4.5" ? 20 : 15,
                        backgroundColor:
                          range === "5.0" ? "#e8e8e8" : "#ef4f5f",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 4,
                      backgroundColor: range === "5.0" ? "#e8e8e8" : "#ef4f5f",
                    }}
                  ></div>
                  <div onClick={() => setRange("5.0")}>
                    <div
                      style={{
                        height: range === "5.0" ? 20 : 15,
                        width: range === "5.0" ? 20 : 15,
                        backgroundColor: "#ef4f5f",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <small style={{ fontWeight: "500", color: "#000000de" }}>
                    Any
                  </small>
                  <small style={{ fontWeight: "500", color: "#000000de" }}>
                    3.5
                  </small>
                  <small style={{ fontWeight: "500", color: "#000000de" }}>
                    4.0
                  </small>
                  <small style={{ fontWeight: "500", color: "#000000de" }}>
                    4.5
                  </small>
                  <small style={{ fontWeight: "500", color: "#000000de" }}>
                    5.0
                  </small>
                </div>
              </div>
            )}

            {val == "More filters" && (
              <div style={{ flex: 2, paddingInline: 20 }}>
                <div style={{ paddingBlock: 20, position: "relative" }}>
                  <div style={{ position: "absolute", top: "40%", left: 6 }}>
                    <Search />
                  </div>

                  <input
                    type="text"
                    placeholder="Search here"
                    style={{
                      border: "1px groove #CFCFCF",
                      width: "100%",
                      outline: "none",
                      borderRadius: 6,
                      paddingInline: 30,
                      paddingBlock: 10,
                      fontSize: 20,
                    }}
                  />
                  <div style={{ position: "absolute", top: "40%", right: 6 }}>
                    <Cancel />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: 20,
              paddingInline: 20,
              alignItems: "center",
              gap: 30,
            }}
          >
            <p style={{ color: "#1C1C1C" }}>Clear All</p>
            <button
              style={{
                backgroundColor: "#ef4f5f",
                outline: "none",
                border: "none",
                color: "white",
                paddingInline: 40,
                borderRadius: 10,
                paddingBlock: 15,
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowCase;
