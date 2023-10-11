import React, { useEffect, useState } from 'react';
import country from "../../assets/country"
import { ReactSVG } from 'react-svg'
import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export const Maps = ({ zoom = 1.5 }) => {
    const [isload, setisload] = useState(false);
    useEffect(() => {
        let map
        Promise.all([
            fetch('http://ip-api.com/json').then((data) =>
                data.json()
            ),
            fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json').then((data) =>
                data.json()
            ),
        ]).then(async ([currentIP, list]) => {
            try {


                const initTerminal = async () => {
                    const pointData = [
                        { lng: currentIP.lon, lat: currentIP.lat, size: 900000 },
                    ];


                    map = new Scene({
                        id: 'map',
                        map: new Mapbox({
                            style: 'blank',
                            pitch: 15,
                            center: [3.438, 40.16797],
                            zoom: zoom,
                            token: 'pk.eyJ1IjoiZnVudHN1IiwiYSI6ImNqc2VtOW4zYTE3M3E0M2puZXRib2ZwaHcifQ.wN528VAVsDzEZnepnOyhyQ',
                            minZoom: zoom,
                            // attributionControl: false,
                            // interactive: false,
                            // offsetCoordinate: false
                        })
                    });

                    let
                        lineLayer,
                        provincelayer,
                        waveLayer;

                    map.on('loaded', () => {
                        setisload(true)

                        lineLayer = new LineLayer()
                            .source(country)
                            .shape('line')
                            .color('#E3E3E3')
                            .size(1);

                        map.addLayer(lineLayer);

                        provincelayer = new PolygonLayer({})
                            .source(country)
                            .size(1)
                            .color('#D9D9D9');


                        map.addLayer(provincelayer);


                        waveLayer = new PointLayer({ zIndex: 4, })
                            .source(pointData,
                                {
                                    parser: {
                                        type: 'json',
                                        x: 'lng',
                                        y: 'lat'
                                    }
                                }
                            )
                            .shape('circle')
                            .color('#00A3FF')
                            .size('size', v => v)
                            .animate(true)
                            .style({
                                unit: 'meter'
                            });

                        map.addLayer(waveLayer);
                        return '';
                    }); 

                }
                initTerminal()
            } catch (error) {

            }

        });

        return () => {
            if (map) {
                map.destroy();
                map.removeAllLayer()
            }

        }
    }, []);


    return (
        <div className="absolute w-full h-full">
            <div id="map" className={`absolute w-full h-full transition-all ${isload ? "opacity-1" : "opacity-0"}`}></div>
            {!isload && <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center loader overflow-hidden"><ReactSVG className="scale-50" src={'./world.svg'} /></div>}
        </div>
    )
}

