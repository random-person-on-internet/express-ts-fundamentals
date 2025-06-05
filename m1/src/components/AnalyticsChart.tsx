import { useMemo } from "react";

type DataItem = { value: number };

function computerAnalytics(data: DataItem[]): number {
  return data.reduce((acc, item) => acc + item.value, 0);
}

const AnalyticsChart: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const analytics = useMemo(() => computerAnalytics(data), [data]);
  return <div>Analytics Value: {analytics}</div>;
};

export default AnalyticsChart;
