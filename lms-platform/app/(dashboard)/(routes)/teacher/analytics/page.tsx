import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";

const Analytics = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalSales} label="Total Sales" />
        <DataCard value={totalRevenue || 0} label="Total Revenue($)" />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default Analytics;
