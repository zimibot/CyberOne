import DataSet from '@antv/data-set';
import { Chart   } from '@antv/g2';
import { useEffect } from 'react';

const { DataView } = DataSet;


export const RadarChart = ({data}) => {
    useEffect(() => {
        
        const dv = new DataView().source(data);
        dv.transform({
            type: 'fold',
            fields: ['total'], // 展开字段集
            key: 'user', // key字段
            value: 'score', // value字段
        });
        const chart = new Chart({
            container: 'radar',
            autoFit: true,
            height: 500,
            renderer: 'svg'
        });
        
        chart.data(dv.rows);
        chart.scale('score', {
            min: 0,
            showLast:true
        });
        chart.coordinate('polar', {
            radius: 0.8,
            
        });
        chart.tooltip({
            shared: true,
            showCrosshairs: true,
            crosshairs: {
                line: {
                    style: {
                        lineDash: [4, 4],
                        stroke: '#333'
                    }
                }
            }
        });
        chart.axis('item', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                    },
                },
            },
        });
        chart.axis('score', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'circle',
                    style: {
                        lineDash: null,
                    },
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)',
            },
        });

        chart
            .point()
            .position('item*score')
            .color('user')
            .shape('circle')
            .size(4)
            .style({
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1,
            });
        chart
            .line()
            .position('item*score')
            .size(2)
            .color('user')

        chart
            .area()
            .position('item*score')
            .color('user');
            
        chart.render();

        return () => {
            chart.destroy()
        };
    }, []);
    return (<div id="radar"></div>)
}