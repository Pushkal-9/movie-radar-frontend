import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { SearchBar } from "../search/SearchBar";
import { SearchResultsList } from "../search/SearchResultsList";
import "./Home.css";
import { LandingCarousel } from "./LandingCarousel";
import { SliderData } from './SliderData';
import { Link } from 'react-router-dom';
import {config} from "../common/Constants";

import MiniChat from "../chat/MiniChat";


function Home() {
  const [openModal, setOpenModal] = useState(false);
  const storedCity = JSON.parse(localStorage.getItem('selectedCity')) || { name: "Select a city...", id: -1 };

  const [city, setCity] = useState(storedCity.name);
  const [city_id, setCityId] = useState(storedCity.id);const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [DataisLoaded, setDataIsLoaded] = useState(false);


  useEffect(() => {
    fetch(config.url.API_BASE_URL+"/search/city")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setDataIsLoaded(true);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  const selectCity = (city) => {

    setCity(city.name);
    setCityId(city.id);

    localStorage.setItem('selectedCity', JSON.stringify(city));
    onCloseModal();
  }


  const onClickButton = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <div>
      {openModal && (
          <Modal open={openModal} onClose={onCloseModal}>
            <h3> Select a City </h3>
            <div className="cityGrid">
              {items?.map((item) => (
                  <button className="cityButton" onClick={() => selectCity(item)}>
                    {item.name}
                  </button>
              ))}
            </div>
          </Modal>
      )}

      <nav className="navbar">
        <div className="container">

          <div className="search-bar-container">
        {console.log("Verify the info: "+city+city_id)}
        <SearchBar setResults={setResults} city_id={city_id} />
        {results && results.length > 0 && <SearchResultsList results={results} city_id={city_id} />}
      </div>

          <div className="navElements">
            <ul>
              <li>
                <button className="cityButton" onClick={onClickButton}>{city}</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="landingCarousel">
        <LandingCarousel slides={SliderData} />
      </div>


      {/* Rip Mini-chat 2023 - 2023
      <div>
        <MiniChat />
      </div>
      */}

    </div>
  );
}

export default Home;
