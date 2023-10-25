import React from "react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function SelectShow() {
    const { city, movie } = useParams();
    const [items, setItems] = useState([]);
    const [DataisLoaded, setDataIsLoaded] = useState(false);

    if(!(movie&&city)) {
        //ERROR
    }

    const groupData = (data) => {
        if(items.length==0) {
            const tempItem = {
                theatre: data[0].theatre.name,
                screen: data[0].screen.name,
                timings: [data[0].startTime],
            };
            setItems([...items,tempItem]);
        }

        for(let i=1;i<data.length;i++) {
            for(let j=0;j<items.length;j++) {
                if(data[i].theatre.name==items[j].theatre && data[i].screen.name==items[j].screen) {
                    items[j].timings.push(data[i].startTime)    
                }
                else {
                    const tempItem = {
                        theatre: data[i].theatre.name,
                        screen: data[i].screen.name,
                        timings: [data[i].startTime],
                    };
                    setItems([...items,tempItem]);
                }
            }
        }
    }

    var url="http://mr-app-env.eba-j6sddxiv.us-east-2.elasticbeanstalk.com/search/shows?movie_id="+movie+"&city_id="+city
    useEffect(() => {
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            groupData(json);
            setDataIsLoaded(true);
          })
          .catch(err => {
            throw new Error(err);
          });
    }, []);

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                <div className="logo">
                    <img className="logo" src="https://repository-images.githubusercontent.com/363009543/e049ba80-ab25-11eb-8112-78ae862803a0" />
                </div>

                <div className="navElements">
                    <ul>
                    <li>
                        <button className="cityButton">{city}</button>
                    </li>
                    <li>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            <div className="showsGrid">
                {items?.map((item) => (
                    <div>
                        <div className="theatre">
                            {item.theatre}
                        </div>
                        <div className="screen">
                            {item.screen}
                        </div>
                        <div className="timings">
                            {item.timings?.map((time) => (
                                <button className="timingButton" onClick={() => "Navigate to Seat Selection"}>
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        
        </div>
    );
}

export default SelectShow;