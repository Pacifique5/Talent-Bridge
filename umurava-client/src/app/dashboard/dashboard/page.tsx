"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Trophy, 
  Users, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Award
} from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { fetchChallenges } from "@/store/challengesSlice";
import { dashboardService, DashboardStats } from "@/services/dashboardService";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { challenges } = useSelector((state: RootState) => state.challenges);
    
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch dashboard stats
                const stats = await dashboardService.getDashboardStats();
                setDashboardStats(stats);
                
                // Fetch challenges for the challenges section
                dispatch(fetchChallenges());
                
            } catch (err: any) {
                console.error("Dashboard loading error:", err);
                setError(err.message || "Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-light"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">Error loading dashboard: {error}</p>
            </div>
        );
    }

    const stats = [
        {
            name: 'Total Challenges',
            value: dashboardStats?.totalChallenges || 0,
            icon: Trophy,
            color: 'bg-blue-500',
            change: '+12%',
            changeType: 'positive'
        },
        {
            name: 'Your Challenges',
            value: dashboardStats?.userChallenges || 0,
            icon: Target,
            color: 'bg-green-500',
            change: '+5%',
            changeType: 'positive'
        },
        {
            name: 'Completed',
            value: dashboardStats?.completedChallenges || 0,
            icon: Award,
            color: 'bg-purple-500',
            change: '+8%',
            changeType: 'positive'
        },
        {
            name: 'Ongoing',
            value: dashboardStats?.ongoingChallenges || 0,
            icon: TrendingUp,
            color: 'bg-orange-500',
            change: '+3%',
            changeType: 'positive'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-light to-blue-dark rounded-lg p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-blue-100">
                    Ready to tackle some challenges today? Let's build your skills and grow your career.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-sm font-medium text-green-600">{stat.change}</span>
                            <span className="text-sm text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Challenges */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Challenges</h2>
                </div>
                <div className="p-6">
                    {dashboardStats?.recentChallenges && dashboardStats.recentChallenges.length > 0 ? (
                        <div className="space-y-4">
                            {dashboardStats.recentChallenges.map((challenge) => (
                                <div key={challenge.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {challenge.difficulty}
                                            </span>
                                            <span className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {challenge.duration} days
                                            </span>
                                            <span className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {new Date(challenge.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No challenges yet. Create your first challenge!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                            <div className="flex items-center">
                                <Trophy className="h-5 w-5 text-blue-light mr-3" />
                                <span className="font-medium text-gray-900">Create New Challenge</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                            <div className="flex items-center">
                                <Users className="h-5 w-5 text-green-600 mr-3" />
                                <span className="font-medium text-gray-900">Join Community</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Challenges Completed</span>
                                <span>0/10</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-light h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Skills Gained</span>
                                <span>0/25</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
