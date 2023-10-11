import { Chart } from '@antv/g2';
import { useEffect } from 'react';


export const Donuts = ({ id, data }) => {
    useEffect(() => {
        const chart = new Chart({
            container: id,
            autoFit: true,
            height: 500,
            renderer: 'svg',
        });
        chart.data(data);
        chart.legend(false);
        chart.tooltip({
            showMarkers: false
        });
        chart.facet('rect', {
            fields: ['type'],
            padding: 5,
            showTitle: false,
            eachView: (view, facet) => {
                const data = facet.data;
                let color;
                if (data[0].type === '男性') {
                    color = '#0a9afe';
                } else {
                    color = '#f0657d';
                }
                data.push({ type: '其他', value: 100 - data[0].value });
                view.data(data);
                view.coordinate('theta', {
                    radius: 0.82,
                    innerRadius: 0.95
                });
                view
                    .interval()
                    .adjust('stack')
                    .position('value')
                    .color('type', ['#0085FF', '#EBEBEB'])
                    .style({
                        opacity: 1,
                    });
                view.annotation().text({
                    position: ['50%', '50%'],
                    content: data[0].type,
                    style: {
                        fontSize: 15,
                        fill: '#8c8c8c',
                        fontWeight: 300,
                        textBaseline: 'bottom',
                        textAlign: 'center'
                    },
                    offsetY: 35,
                });

                view.annotation().text({
                    position: ['50%', '50%'],
                    content: data[0].value,
                    style: {
                        fontSize: 40,
                        fill: '#000',
                        fontWeight: 200,
                        textAlign: 'center'
                    },
                    offsetY: -12,
                });

                view.interaction('element-active');
            }
        });
        
        chart.render();
        

        return () => {
            chart.destroy()
        }
    }, []);
    return <div className="w-full h-full" id={id}></div>
}
