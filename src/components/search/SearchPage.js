import SearchHeader from "./SearchHeader";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from './../Header';




function SearchPage() {
  let [searchParams] = useSearchParams();
  let [filter, setFilter] = useState({});
  let [searchList, setSearchList] = useState([]);
  let [locationList, setLocationList] = useState([]);
  let [isPage, setIsPage] = useState(1);
  let lessPage = () => {
    let _page = isPage;
    _page -= 1;
    if (_page > 0) {
      setIsPage(_page);
      filterData({
        target: {
          value: _page
        }
      }, "page");
    }
  }
  let greatPage = () => {
    let _page = isPage;
    _page += 1;
    if (_page > 0 && _page < 5) {
      setIsPage(_page);
      filterData({
        target: {
          value: _page
        }
      }, "page");
    }
  }

  let getFilterDetails = async (_filter) => {
    _filter = { ..._filter };
    let URL = "https://murmuring-plains-68361.herokuapp.com/api/filter";

    if (searchParams.get("meal_type"))
      _filter["mealtype"] = searchParams.get("meal_type");
    try {
      let response = await axios.post(URL, _filter);
      let data = response.data;
      setSearchList([...data.result]);

    }
    catch (error) {
      alert("Error");
      console.log(error);
    }
  }
  let getLocationList = async () => {
    let URL = "https://murmuring-plains-68361.herokuapp.com/api/get-location";
    try {
      let response = await axios.get(URL);
      let data = response.data;
      setLocationList([...data.location]);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  let filterData = (event, option) => {
    let { value } = event.target;
    let _filter = {};
    switch (option) {
      case "location":
        _filter["location"] = value;
        break;
      case "sort":
        _filter["sort"] = value;
        break;
      case "cuisine":
        // if (Object.keys(filter).indexOf("cuisine") >= 0) {
        //   let res = {};
        //   res = [...filter["cuisine"]];
        //   if (event.target.checked) {
        //     res.push(Number(event.target.value));
        //   }
        //   else {
        //     res.splice(res.indexOf(Number(event.target.value), 1));
        //   }
        //   _filter["cuisine"] = [...res];
        // }
        // else {
        //   _filter["cuisine"] = [];
        //   _filter["cuisine"].push(Number(event.target.value));
        // }
        if(event.target.checked){
          if (Object.keys(filter).indexOf("cuisine") >= 0) {
            _filter["cuisine"] = [...filter.cuisine]
          }
          else{
            _filter["cuisine"] = [];
          }
          _filter["cuisine"].push(Number(event.target.value));
        }
        else{
          _filter["cuisine"] = [...filter.cuisine];
          _filter["cuisine"].splice(_filter["cuisine"].indexOf(Number(event.target.value)),1);
          if(_filter["cuisine"].length === 0){
            delete _filter.cuisine;
            // flag=false;
          }
        }
        break;
      case "cost":
        let cost = value.split("-");
        _filter["lcost"] = cost[0];
        _filter["hcost"] = cost[1];
        break;
      case "page":
        _filter["page"] = Number(event.target.value);
        setIsPage(Number(event.target.value))
        break;
    }

    setFilter({ ...filter, ..._filter });
  };
  useEffect(() => {
    getLocationList();
  }, []);
  useEffect(() => {
    getFilterDetails(filter)
  }, [filter]);

  return (
    <>
      <Header bgColor="bg-danger" />

      {/* <!-- section --> */}
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3">Breakfast Places In Mumbai</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <SearchFilter locationList={locationList} filterData={filterData} />
          {/* <!-- search result --> */}
          <SearchResult searchList={searchList} filterData={filterData} isPage={isPage} lessPage={lessPage} greatPage={greatPage}/>
        </div>
      </div>
    </>
  );
}
export default SearchPage;
