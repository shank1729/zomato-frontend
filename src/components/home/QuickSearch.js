import React,{useEffect, useState} from "react";
import QuickSearchItems from "./QuickSearchItems";
import axios from "axios";

function QuickSearch() {
    let [mealType, setMealType] = useState([])
    let getQuickSearchData = async () => {
        let URL = 'https://murmuring-plains-68361.herokuapp.com/api/get-meal-types';


        try {
            let response = await axios.get(URL);
            let { status, meal_type } = response.data;
            if (status) {
                setMealType([...meal_type]);
            }
            else {
                alert("Meal types not found");
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };
    useEffect(() => {
        getQuickSearchData();
    })

    return (
        <>
            <h2 className="mx-5 px-3 mt-4 pt-4 fontb fw-bolder">Quick Search</h2>

            <p className="mx-5 px-3 fontg">Discover restaurants by type of meal</p>

            <div className="container-fluid  ">
                
                <div className="row my-4 mx-1 d-flex justify-content-evenly ">
                    {
                        mealType.map((meal) => {


                            return <QuickSearchItems meal={meal} key={meal._id}/>;
                         })
        
                     }
                </div>
            </div>
        </>
    );
}
export default QuickSearch;