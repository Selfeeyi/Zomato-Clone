import React from "react";
import css from "./SearchResultModal.module.css";

const SearchResultModal = ({ searchResults, onClose }) => {
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
              <p>{result.item_name} - {result.restaurant_name}</p>
              {/* Render other details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
