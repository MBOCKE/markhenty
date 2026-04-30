import React, { useEffect, useState } from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { TierDistributionChart } from '../components/dashboard/TierDistributionChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { dashboardAPI } from '../api/dashboard';
import { classificationAPI } from '../api/classification';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [kpiData, setKpiData] = useState(null);
  const [tierData, setTierData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, tierRes, activityRes] = await Promise.all([
          dashboardAPI.getSummary(),
          classificationAPI.getTierDistribution(),
          dashboardAPI.getRecentActivity(),
        ]);

        setKpiData(summaryRes.data);
        // Calculate percentages and ensure they sum to exactly 100%
        const total = summaryRes.data.totalCustomers;
        const tierDataWithPercent = tierRes.data.map((tier, index, array) => {
          let percent = Math.round((tier.count / total) * 100);
          // For the last item, adjust to ensure total is exactly 100%
          if (index === array.length - 1) {
            const currentSum = array.slice(0, -1).reduce((sum, t) => sum + Math.round((t.count / total) * 100), 0);
            percent = 100 - currentSum;
          }
          return {
            name: tier.current_tier || tier.name || 'NORMAL',
            percentage: Math.max(0, percent),
          };
        });
        setTierData(tierDataWithPercent);
        setActivities(activityRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Dashboard load partial - using fallback data');
        // Fallback mock data
        setKpiData({
          totalCustomers: 124,
          activeCustomers: 98,
          totalRevenue: 245680,
          newCustomers: 12,
          bonusPool: 12500,
        });
        setTierData([
          { name: 'NORMAL', percentage: 40 },
          { name: 'STANDARD', percentage: 30 },
          { name: 'PREMIUM', percentage: 20 },
          { name: 'BRONZE', percentage: 10 },
        ]);
        setActivities([
          { action: 'login', target: 'cust_1001', timestamp: new Date().toISOString(), user: 'Admin' },
          { action: 'customer_update', target: 'cust_1002', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Manager' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>
      <KPICards kpiData={kpiData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TierDistributionChart tierData={tierData} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

