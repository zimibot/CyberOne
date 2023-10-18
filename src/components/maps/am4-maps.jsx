import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const AmMaps = ({ id = "maps", data, otherData  =[] }) => {
    useEffect(() => {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create(id, am4maps.MapChart);
        // set map Zoom
        chart.homeZoomLevel = 1;

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#999");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#00A3FF");

        // Remove Antarctica
        polygonSeries.exclude = ["AQ"];

        // Add heat rule
        polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#6D6D6D"),
            "max": am4core.color("#00A3FF"),


        });

        // Add heat legend
        var heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.align = "left";
        heatLegend.valign = "bottom";
        heatLegend.orientation = "vertical";
        heatLegend.valueAxis.renderer.labels.template.fontSize = 15;
        heatLegend.valueAxis.renderer.minGridDistance = 30;
        heatLegend.series = polygonSeries;
        heatLegend.height = am4core.percent(98);
        heatLegend.marginBottom = am4core.percent(1);
        heatLegend.marginTop = am4core.percent(1);
        heatLegend.background.fill = am4core.color("red");
        heatLegend.background.fillOpacity = 0.05;
        polygonSeries.mapPolygons.template.events.on("over", function (ev) {
            if (!isNaN(ev.target.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
            }
            else {
                heatLegend.valueAxis.hideTooltip();
            }
        });

        polygonSeries.mapPolygons.template.events.on("out", function (ev) {
            heatLegend.valueAxis.hideTooltip();
        });

        if (data) {
            data = data.accounts[0]?.locationTotals
            data = data.map(d => ({
                id: d.dimensions.clientCountryName,
                value: d.sum.requests
            })) 
        } else {
            data = otherData
        }


        // Add expectancy data
        polygonSeries.data = data;
        // Theme
    }, [data, otherData]);
    return <div id={id} className="w-full h-full absolute p-2 top-0"></div>
}

export default AmMaps