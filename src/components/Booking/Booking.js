import React, { useContext, useEffect, useState } from 'react';
import { CommonData } from '../../App';
import hotels from '../../fake-data/Hotels';
import HotelCard from '../hotelCart/HotelCard';
import MapComponent from '../Map/MapComponent';

import './booking.css'

const Booking = () => {
    const [, , selectedPlace] = useContext(CommonData);
    const [hotelList, setHotelList] = useState([]);
    useEffect(() => {
        const newList = hotels.filter(hotel => selectedPlace.placeId == hotel.placeId);
        setHotelList(newList);
    }, [selectedPlace]);

    return (<div className="fill-background align-items-center" >
        <div className="row" >

            <div className="col-md-6" >
                <h3> Stay in {selectedPlace.name} </h3> {
                    hotelList.map(hotel => < HotelCard hotel={hotel} key={hotel.id}> </HotelCard>)
                }
            </div>
            <div className="col-md-6" >
                 <MapComponent></MapComponent>
            </div>
        </div >
    </div>
    );
};

export default Booking;