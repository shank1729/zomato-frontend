import React from 'react';
import {useNavigate} from 'react-router-dom';

function QuickSearchItems(props) {
  let { meal } = props;
  let navigate=useNavigate();
  let goToQuickSearch= (id) =>{
    navigate("/quick-search?meal_type="+id);
  };
  return (
    <>
    <div className="box my-3 d-flex p-0 bg-light " onClick={()=>goToQuickSearch(meal.meal_type)}>
      <div><img src={ `/image/${meal.image}`} alt={meal.name} className="food-image"/></div>
      <div className=" p-3">
        <p className="fw-bold fontb mb-1">{meal.name}</p>
        <p className="fontg">{meal.content}</p>
      </div>
    </div>
    </>
  );
}

export default QuickSearchItems
