import React, { useContext, useEffect, useState } from 'react';
import PlaceCard from '../place-cart/PlaceCard';
import places from '../../fake-data/Places';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './home.css';
import { CommonData } from '../../App';
import { Link } from 'react-router-dom';
const Home = () => {
    const [,,selectedPlace,setSelectedPlace] = useContext(CommonData);
    console.log("Home Selected place",selectedPlace);
    return (
        
        <div className="row home">
            <div className="col-md-4">
                <h1>{selectedPlace.name? selectedPlace.name.toUpperCase():""}</h1>
                <p>{selectedPlace.shortDescription}</p>
                <Link to="destination">
                    <button className="commonButton">Booking <FontAwesomeIcon icon={faArrowRight} /></button>
                </Link>
                
            </div>
            <div className="col-md-8">
                <div className="row">
                    {
                        places.map(place => <PlaceCard key={place.placeId} place={place} setSelectedPlace={setSelectedPlace} ></PlaceCard>)
                    }
                </div>
            </div>
        </div>

    );
};

export default Home;