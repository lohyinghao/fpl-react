import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
  Label,
} from 'recharts';

const ZoomableChart = (props) => {
  const [state, setState] = useState({
    data: [],
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    animation: true,
  });

  const [playerMap, setPlayerMap] = useState({});
  const [clickCount, setClickCount] = useState(0);

  let singleClickTimer = '';

  useEffect(() => {
    setState({ ...state, ...{ data: props.initialData } });
  }, [props.initialData]);

  useEffect(() => {
    setPlayerMap({ ...props.playerMap });
  }, [props.playerMap]);

  const getAxisYDomain = (from, to, offset, data) => {
    const refData = data.slice(from - 1, to);
    let values = refData.map((row) => Object.values(_.omit(row, 'name')));
    values = _.flatten(values);
    let bottom = _.min(values);
    let top = _.max(values);
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;
    const { data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setState(() => ({ ...state, ...{ refAreaLeft: '', refAreaRight: '' } }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 1, data);

    setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data,
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  };

  const zoomOut = () => {
    const { data } = state;
    setState(() => ({
      data: data,
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin-1',
    }));
  };

  /* double click logic */
  const handleClicks = () => {
    setClickCount(clickCount + 1);
  };

  useEffect(() => {
    if (clickCount === 1) {
      singleClickTimer = setTimeout(function () {
        setClickCount(0);
      }, 300);
    } else if (clickCount === 2) {
      clearTimeout(singleClickTimer);
      setClickCount(0);
      zoomOut();
    }
  }, [clickCount]);
  /* double click logic */

  const { data, left, right, refAreaLeft, refAreaRight, top, bottom } = state;

  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart
        margin={{ left: -10, right: 10 }}
        data={data}
        onMouseDown={(e) => {
          if (e) setState({ ...state, ...{ refAreaLeft: e.activeLabel } });
        }}
        onMouseMove={(e) =>
          e &&
          state.refAreaLeft &&
          setState({ ...state, ...{ refAreaRight: e.activeLabel } })
        }
        // eslint-disable-next-line react/jsx-no-bind
        onMouseUp={zoom}
        onClick={handleClicks}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          allowDataOverflow
          dataKey='name'
          domain={[left, right]}
          type='number'
        />
        <YAxis
          allowDataOverflow
          domain={[bottom, top]}
          type='number'
          yAxisId='1'
          reversed={true}
        />
        <Tooltip />
        <Legend />
        {Object.entries(playerMap).map(([id, playerData], index) => (
          <Line
            yAxisId='1'
            key={`line-${index}`}
            dataKey={playerData.name}
            stroke={playerData.color}
            dot={false}
            strokeWidth={3}
          />
        ))}

        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            yAxisId='1'
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
};

ZoomableChart.propTypes = {};

ZoomableChart.defaultProps = {};

export default ZoomableChart;
