import React from "react";
import css from "./SearchResultModal.module.css";

const SearchResultModal = ({ searchResults, isDishSearch, onClose }) => {
  console.log("Inside SearchResultModal component");
  console.log("searchResults:", searchResults);
  console.log("isDishSearch:", isDishSearch);
  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2>Search Results</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className={css.modalBody}>
          {searchResults.map((result) => (
            <div key={result.menu_id}>
              <p>
                {isDishSearch ? (
                  <>
                    <span>{result.item_name} - </span>
                    <span>{result.restaurant_name}</span>
                  </>
                ) : (
                  <span>{result.restaurant_name}</span>
                )}
              </p>
              {/* Render other details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
