import React from "react";
import Cross from "../../../asets/svg/Cross";

const Filter = () => {
  return (
    <Modal isOpen={createModal} onClose={() => setCreateModal(false)}>
      <div
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          // gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "4%",
          // overflow: "hidden",
          width: 700,
          height: 600,
          overflowY: "auto",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Filter
        <Cross />
      </div>
    </Modal>
  );
};

export default Filter;
