// Import => React and Hooks
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import useResize from "../../Utils/elementDimension";

// Import Yandex map
import {
    YMaps,
    Map,
    Placemark,
    ZoomControl,
    TypeSelector,
    ListBox,
    ListBoxItem,
    GeolocationControl,
    FullscreenControl,
} from "react-yandex-maps";

// Import Components
import AdvertPlacemark from "../AdvertPlacemark/AdvertPlacemark";
import Spinner from "../Spinner/Spinner";
import "./AdvertMap.scss";


function AdvertMap({ currentAdvert, zoom = 10 }) {

    const [data, setData] = useState([]);
    const [dataError, setDataError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const URL = `https://ali98.uz/api/post`;

    useEffect(() => {
        const result = axios
            .get(URL)
            .then((response) => {
                let newData = response?.data.data;
                if (newData && newData?.length > 0) {
                    setData(response?.data.data);
                } else {
                    setDataError(true);
                }
            })
            .catch((error) => {
                setDataError(true);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const coordinate = [currentAdvert.latitude, currentAdvert.longitude];

    if (isLoading) {
        return (
            <div className="advertMapLoader">
                <Spinner />
            </div>
        )
    } else if (data?.length > 0) {
        return (
            <YMaps query={{
                load: 'geoObject.addon.balloon'
            }}>
                <Map
                    defaultState={{
                        center: coordinate,
                        zoom: zoom,
                        // behaviors: ["disable('scrollZoom')"],
                    }}
                    width="100%"
                    height="100%"
                >
                    <TypeSelector />
                    <ZoomControl />
                    <GeolocationControl />
                    <FullscreenControl />
                    <ListBox
                        data={{
                            content: "Select city",
                        }}
                    >
                        <ListBoxItem
                            data={{
                                content: "Moscow",
                            }}
                        />
                        <ListBoxItem
                            data={{
                                content: "Saint Petersburg",
                            }}
                        />
                    </ListBox>
                    {data?.map((advert) => (
                        <AdvertPlacemark advert={advert} />
                    ))}
                </Map>
            </YMaps>
        );
    }
}
export default AdvertMap;
