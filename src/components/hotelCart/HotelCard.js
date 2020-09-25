import React from 'react';
import './hotel-card.css'
import ratingIcon from '../../icon/star.png'

const HotelCard = (props) => {
    const hotel = props.hotel;
    return (
        <div className="hotel-card">
            <div className="row">
                <div className="col-md-6 px-1">
                    <img className="hotel-image img-thumbnail" src={hotel.image} alt="hotel image"></img>
                </div>
                <div className="col-md-6 px-1">
                    <h5>{hotel.title}</h5>
                    <p>{hotel.description}</p>
                    <div className="row px-3 footer">  
                        <p><span><img className="rating-icon" src={ratingIcon} alt=""/></span>{hotel.rating},     Price <b>${hotel.price}</b>/night</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;