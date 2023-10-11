import React, { useEffect, useState } from 'react';
import Line from '@ant-design/plots/lib/components/line';
import { formatBytes, formatNumber } from '../../helpers';
import moment from 'moment';

export const ChartLine = ({ data = [], type, color = "#00A3FF", noDate = false, multi = false }) => {
  const [state, setstate] = useState(false);

  let mlt = multi ? {
    seriesField: 'category'
  } : {
    color: color,
  }

  let tooltips = multi ? {} : {
    formatter: (datum) => {
      if (type) {
        switch (type) {
          case "percentCacheBytes":
            return { name: "Percents", value: `${datum[type].toFixed(2)}%` };
          case "bytes":
            return { name: type, value: formatBytes(datum[type]) };
          default:
            return { name: type, value: formatNumber(datum[type], 2) };
        }
      } else {
        return { name: datum['category'], value: formatNumber(datum['value'], 2) };
      }
    },
  }
  const config = {
    data,
    xField: 'date',
    yField: multi ? "value" : type,
    ...mlt,
    autoFit: true,
    // label: {},
    point: {
      size: 2,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: color,
        lineWidth: 1,
      },
    },
    xAxis: {
      label: {
        formatter: (value) => {
          return noDate ? "" : value
        }
      }
    },
    yAxis: {
      label: {
        formatter: (value) => {
          if (!multi) {
            switch (type) {
              case "percentCacheBytes":
                return value;
              case "bytes":
                return formatBytes(value);
              default:
                return formatNumber(value, 2);
            }
          } else {
            return value
          }
        },
      },
    },
    tooltip: {
      showMarkers: false,
      customContent: (title, data) => {
        let total = multi ? data.reduce((accum, item) => accum + parseInt(item['value']), 0) : 0
        title = title
        return <div className="space-y-2 py-2 min-w-[120px] bg-white">
          <div>{title}</div>
          <div className="space-y-2">{data?.map((d, k) => {
            return <div className="flex justify-between gap-3" key={k} style={{
              color: d.color
            }}>
              <b> {d.name}:</b>
              <span>{d.value}</span>
            </div>
          })}
            {multi
              &&
              <div className="flex justify-between"><b>Total:</b><span>{total}</span></div>
            }
          </div>
        </div>;
      },
      ...tooltips

    },
    // state: {
    //   active: {
    //     style: {
    //       shadowBlur: 4,
    //       stroke: '#000',
    //       fill: 'red',
    //     },
    //   },
    // },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setstate(true)
    }, 500);
    setstate(false)
    return () => {
      setstate(false)
    };
  }, []);

  return <Line className={`fade-in transition-all ${state ? "opacity-100" : "opacity-0"}`} {...config} animation={false} />
}