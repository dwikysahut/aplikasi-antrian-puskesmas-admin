import React from 'react';

import '../styles/CardItem.css';

function CardItem({
  item, name, value, color,
}) {
  return (
    <div className="card-wrapper" style={{ backgroundColor: color }}>
      <div className="card-inner">
        <p className="item-title">{name}</p>
        <p className="item-value">{value}</p>

      </div>

    </div>
  );
}

export default CardItem;
