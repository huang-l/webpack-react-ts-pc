import EchartRender from '@/common/EchartRender';

const Line = (props) => {
  const defaultOp = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };
  const { renderKey, width, height } = props;
  return (
    <EchartRender
      renderKey={renderKey}
      option={defaultOp}
      width={width}
      height={height}
    />
  );
};

export default Line;
