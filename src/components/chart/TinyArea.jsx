import React from 'react';
import { TinyArea } from '@ant-design/plots';

export const ChartTinyArea = ({data = []}) => {
 
  const config = {
    height: 40,
    autoFit: true,
    data,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };
  return <TinyArea {...config} />;
};

