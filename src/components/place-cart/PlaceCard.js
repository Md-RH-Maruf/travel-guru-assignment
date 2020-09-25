import React from 'react';
import './place-card.css';

const PlaceCard = (props) => {

    const place = props.place;
    const setSelectedPlace = props.setSelectedPlace;

    const cardStyle = {
        backgroundImage: `url(${place.image})`,
        width: "16rem",
        height: "350px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        borderRadius: "15px",
        cursor: "pointer",
        transition: "transform .2s"

    }
    return (
        <div className="col-md-4">
            <div onClick={() => setSelectedPlace(place)} className="place-image" style={cardStyle}>
                <div className="place-title">
                    <h5>{place.name ? place.name.toUpperCase() : ""}</h5>
                </div>
            </div>
        </div>

    );
};

export default PlaceCard;