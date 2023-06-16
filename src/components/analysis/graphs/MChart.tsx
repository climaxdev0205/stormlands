import {Chart, ChartData} from "chart.js/auto";
import {useRef, useEffect, useState} from "react";

interface Props {
    chartData: any;
    chartType: string;
}

const MChart = ({chartData, chartType}: Props) => {
    // helper function to format chart data since you do this twice
    const formatData = (data: number[]): ChartData => ({
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        datasets: chartData
    });

    // use a ref to store the chart instance since it it mutable
    const chartRef = useRef<Chart | null>(null);
    const chartId = useRef<string | null>(null);

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            if (chartId.current !== null) {
                return;
            }
            chartRef.current = new Chart(ctx, {
                type: (chartType === 'Bar') ? 'bar' : 'line',
                data: formatData(chartData),
                options: {responsive: true}
            });
            chartId.current = "1";
        }
    };

    // effect to update the chart when props are updated
    useEffect(() => {
        // must verify that the chart exists
        if (chartRef.current) {
            let ctx = chartRef.current.ctx;
            chartRef.current.destroy();
            chartRef.current = new Chart(ctx, {
                type: (chartType === 'Bar') ? 'bar' : 'line',
                data: formatData(chartData),
                options: {responsive: true}
            });
        }
    }, [chartData, chartType]);

    return (
        //<div className="self-center w-1/2">
        <div className="overflow-hidden">
            <canvas ref={canvasCallback}></canvas>
        </div>
        //</div>
    );
};
/*
// want to see some changes in the props on order to test MChart
export default () => {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  const onClick = () => {
    setData((prevData) => prevData.slice(1).concat(10 * Math.random()));
  };

  return (
    <div>
      <button onClick={onClick}>Change</button>
      <MChart chartData={data} />
    </div>
  );
};
*/

export default MChart;