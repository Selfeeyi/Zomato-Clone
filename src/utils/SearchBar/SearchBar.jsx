import React, { useState, useEffect } from "react";
import css from "./SearchBar.module.css";
import downArrow from "/icons/down-arrow1.png";
import locationIcon from "/icons/location.png";
import searchIcon from "/icons/search.png";
import SearchResultModal from "./SearchResultModal"; 

const SearchBar = () => {
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isDishSearch, setIsDishSearch] = useState(false);



  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.selfeey.com/restaurantsapi/search.php?query=${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        setShowResultsModal(true); // Accessing results under the 'results' key
        setIsDishSearch(true); // Set the flag for dish search
      } else {
        setSearchResults([]); // Resetting search results if there's an error
        setIsDishSearch(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // Resetting search results on error
      setIsDishSearch(false);
    }
  };
  
  

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Fetch search results only if query length is more than 2 characters
    if (query.length > 2) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]); // Reset search results if query length is insufficient
    }
  };

  useEffect(() => {
    console.log("Search Results:", searchResults);
  }, [searchResults]);

  // Use useEffect to monitor changes in the search query and fetch results accordingly
  useEffect(() => {
   
    
    if (searchQuery.length > 3) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);
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
            const addressComponents = data.address.split(", ");
            const cityIndex = addressComponents.length - 5; // For example, to get -5, -4, and -3 components
            const city = addressComponents
              .slice(cityIndex, cityIndex + 3)
              .join(", "); // Concatenating -5, -4, -3 components
            setAddress(city);
          } else {
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

  const openModal = () => {
    if (searchResults && searchResults.length > 0) {
      setShowResultsModal(true);
    }
  };

  const closeModal = () => {
    setShowResultsModal(false);
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className={css.dropdownBox} style={{  display: searchResults.length > 0 ? "block" : "none" , color: "black"  }}>
  {searchResults.length > 0 && (
    <div className={css.dropdown}>
      {/* Render search results here */}
      <ul className={css.searchResultsList}>
  {searchResults.map(result => (
    <li key={result.menu_id} onClick={() => handleResultClick(result)} style={{ listStyle: "none", padding: "10px", borderBottom: "1px solid #ddd" }}>
      <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>{result.item_name}</div>
      <div style={{ color: "#666", fontSize: "14px", marginBottom: "5px" }}>{result.restaurant_name}</div>
      <div style={{ color: "#888", fontSize: "12px" }}>{result.description}</div>
    </li>
  ))}
</ul>

    </div>
  )}
</div>
    </div>
  );
};

export default SearchBar;
