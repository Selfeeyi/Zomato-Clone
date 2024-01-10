import React, { useState } from "react";
import css from "./SearchBar.module.css";
import downArrow from "/icons/down-arrow1.png";
import locationIcon from "/icons/location.png";
import searchIcon from "/icons/search.png";

let SearchBar = () => {
  const [address, setAddress] = useState("");

  const handleLocationClick = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = await fetch(
            `https://userpanel.selfeey.com/api.selfeey.com/addressapi.php?lat=${latitude}&lng=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            const addressComponents = data.address.split(', ');
            const cityIndex = addressComponents.length - 5; // For example, to get -5, -4, and -3 components
            const city = addressComponents.slice(cityIndex, cityIndex + 3).join(', '); // Concatenating -5, -4, -3 components
            setAddress(city);
        }
        else {
            setAddress("Address not found");
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  return (
    <div className={css.outerDiv}>
      <div className={css.srch1}>
        <div className={css.iconBox}>
          <img
            className={css.icon}
            src={locationIcon}
            alt="location pointer"
            onClick={handleLocationClick}
          />
        </div>
        <input
    type="text"
    placeholder="Place.."
    className={css.inpt}
    value={address}
    onClick={handleLocationClick}
    onChange={(e) => setAddress(e.target.value)}
/>

        <div className={css.iconBox}>
          <img className={css.downArrow} src={downArrow} alt="down arrow" />
        </div>
      </div>
      <hr className={css.hr} />
      <div className={css.srch2}>
        <div className={css.iconBox}>
          <img className={css.icon} src={searchIcon} alt="search icon" />
        </div>
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          className={css.inpt}
        />
      </div>
      <div className={css.dropdownBox} style={{ display: "none" }}>
        <div className={css.dropdown}></div>
      </div>
    </div>
  );
};

export default SearchBar;
