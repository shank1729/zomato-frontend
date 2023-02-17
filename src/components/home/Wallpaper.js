import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
function Wallpaper(props) {
    
    let navigate=useNavigate()
    let locRef = useRef();
    let [loclist, setLoclist] = useState([]);
    let [restaurantList, setRestaurantList] = useState([]);
    let [selectLoc, setSelectLoc] = useState(null);
    let [restDisable, setRestDisabled] = useState(true)
    let getLocationList = async (event) => {
        let city = event.target.value;
        setSelectLoc(null);
        setRestDisabled(true)
        if (city === "" || city.length < 2) {
            setLoclist([]);
            return false;
        }
        let URL = process.env.REACT_APP_API_URL+'get-location-by-city?city=' + city;
        try {
            let response = await axios.get(URL);
            let { location } = response.data;
            console.log(location);
            setLoclist([...location]);
            console.log(loclist);
        } catch (error) {
            alert(error);
            console.log("error");

        }
    };
    let selectLocation = (location) => {
        location = JSON.parse(location);
        locRef.current.value = `${location.name},${location.city}`;
        setSelectLoc({ ...location });
        setRestDisabled(false)
        setLoclist([]);
        
    };
    let getRestaurantDetails = async (event) => {
        let restaurant = event.target.value;
        if (restaurant === "" || restaurant.length < 2) {
            setRestaurantList([]);
            return false;
        }
        let URL = process.env.REACT_APP_API_URL+`get-restaurant-by-location-id?lid=${selectLoc.location_id}&rest=${restaurant}`;
        try {
            let response = await axios.get(URL);
            let { result } = response.data;
            setRestaurantList([...result]);

        } catch (error) {
            alert(error);
            console.log("error");

        }
    }
    let goToRestaurant=(id) =>{
        navigate("/restaurant/"+id);
    }
    return (
        <>
            <div className="main-section container-fluid  bg-secondary ">

                <Header bgColor="" />
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="logo rounded-circle border d-flex justify-content-center p-2 mt-5 bg-white fw-bold fs-1">
                        <p>e!</p>
                    </div>
                </div>


                {/* <!-- Heading and Location --> */}

                <div className="head-loc col-lg-12  ">

                    {/* <!-- Heading --> */}
                    <div className="row pt-4 mx-auto text-center restaurant-title-row">
                        <div className="col-12">
                            <p className="restaurant-title fs-2 text-white fw-bolder">Find the best restaurants, cafés, and bars</p>
                        </div>
                    </div>

                    {/* <!-- Location and Result --> */}
                    <div className="d-flex justify-content-center my-1 search-box">

                        <div className=" d-flex flex-column me-2 mb-2 search-loc">
                            <div className="bg-light d-flex align-content-center ">
                                <input type="text" className=" form-control loc border-0 ps-3"
                                    placeholder="Please type a location"
                                    onChange={getLocationList}
                                    ref={locRef} />
                            </div>
                            <ul className="list-group location-result bg-light  ">
                                {loclist.map((location) => {
                                    return (
                                        <li className="list-group-item fontg"
                                            key={location._id} onClick={() => selectLocation(`${JSON.stringify(location)}`)}>
                                            {location.name},{location.city}</li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className=" d-flex flex-column ">
                            <div className=" d-flex bg-light align-items-center search-width">

                                <div className="fa fa-search p-3"></div>
                                <input type="text" className=" form-control p-2 border-0"
                                    placeholder="Search for restaurants"
                                    onChange={getRestaurantDetails}
                                    disabled={restDisable} />
                            </div>
                            <div className="search-result  ">
                                {restaurantList.map((restaurant) => {
                                    return (

                                        <div className="search-item d-flex align-items-center bg-light p-2" 
                                        key={restaurant._id} 
                                        onClick={()=>goToRestaurant(restaurant._id)}>
                                            <img src={`/image/${restaurant.image}`} alt="" />
                                            <div className=" ms-3  ">
                                                <div className="fontb fw-bold">{restaurant.name}</div>
                                                <span className="fontg">{restaurant.locality},{restaurant.city}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
export default Wallpaper;