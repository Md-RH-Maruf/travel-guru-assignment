import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonData } from '../../App';
import './destination.css';

const Destination = () => {
    const [ loggedInUser, setLoggedInUser, selectedPlace, setSelectedPlace] = useContext(CommonData);
    const history = useHistory();
    const handleSubmit = (e)=>{
        e.preventDefault();
        history.push("/booking");
    }
    return (
        <div className="row home">
            <div className="col-md-6 px-5">
                <h1>{selectedPlace.name ? selectedPlace.name.toUpperCase() : ""}</h1>
                <p>{selectedPlace.description}</p>

            </div>
            <div className="col-md-6">
                <div className="card destination-cart">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="origin">Origin</label>
                            <input type="text" className="form-control" id="origin" required placeholder="Enter Origin Name" />
                        </div>
                        <div className="form-group">
                            <label for="destination">Destination</label>
                            <input type="text" className="form-control" id="destination" required placeholder="Enter Destination Name" value={selectedPlace.name} readOnly/>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="fromDate">From Date</label>
                                    <input type="date" className="form-control" id="fromDate" required placeholder="Enter Destination Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="toDate">To Date</label>
                                    <input type="date" className="form-control" id="toDate" required placeholder="Enter Destination Name" />
                                </div>
                            </div>
                        </div>
                        <input type="submit" className="commonButton" value="Start Booking"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Destination;