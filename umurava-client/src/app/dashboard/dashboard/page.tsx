"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { 
  Trophy, 
  Users, 
  Target, 
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Plus,
  ArrowRight,
  Activity,
  Zap
} from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { fetchChallenges } from "@/store/challengesSlice";
import { dashboardService, DashboardStats } from "@/services/dashboardService";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
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
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            change: '+12%',
            changeType: 'positive'
        },
        {
            name: 'Your Challenges',
            value: dashboardStats?.userChallenges || 0,
            icon: Target,
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            change: '+5%',
            changeType: 'positive'
        },
        {
            name: 'Completed',
            value: dashboardStats?.completedChallenges || 0,
            icon: Award,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            change: '+8%',
            changeType: 'positive'
        },
        {
            name: 'Ongoing',
            value: dashboardStats?.ongoingChallenges || 0,
            icon: Activity,
            color: 'bg-orange-500',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600',
            change: '+3%',
            changeType: 'positive'
        }
    ];

    const quickActions = [
        {
            title: 'Create New Challenge',
            description: 'Design a new challenge for the community',
            icon: Plus,
            color: 'bg-blue-500',
            action: () => router.push('/dashboard/challenges/create')
        },
        {
            title: 'Browse Challenges',
            description: 'Explore available challenges to participate',
            icon: Trophy,
            color: 'bg-green-500',
            action: () => router.push('/dashboard/challenges')
        },
        {
            title: 'Join Community',
            description: 'Connect with other developers and learners',
            icon: Users,
            color: 'bg-purple-500',
            action: () => router.push('/dashboard/community')
        }
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-light via-blue-600 to-blue-dark dark:from-blue-600 dark:via-blue-700 dark:to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user?.firstName}! 
                        </h1>
                    </div>
                    <p className="text-blue-100 dark:text-gray-200 text-lg mb-6 max-w-2xl">
                        Ready to level up your skills? Explore challenges, build your portfolio, and connect with the community.
                    </p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => router.push('/dashboard/challenges/create')}
                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            Create Challenge
                        </button>
                        <button 
                            onClick={() => router.push('/dashboard/challenges')}
                            className="bg-white/20 dark:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 dark:hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                            Browse Challenges
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 dark:bg-white/3 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bgColor} dark:${stat.bgColor.replace('50', '900/20')} p-3 rounded-lg`}>
                                <stat.icon className={`h-6 w-6 ${stat.textColor} dark:${stat.textColor.replace('600', '400')}`} />
                            </div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Challenges */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Challenges</h2>
                            <button 
                                onClick={() => router.push('/dashboard/challenges')}
                                className="text-sm text-blue-light dark:text-blue-400 hover:text-blue-dark dark:hover:text-blue-300 font-medium transition-colors"
                            >
                                View all
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        {dashboardStats?.recentChallenges && dashboardStats.recentChallenges.length > 0 ? (
                            <div className="space-y-4">
                                {dashboardStats.recentChallenges.slice(0, 3).map((challenge) => (
                                    <div key={challenge.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{challenge.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{challenge.description}</p>
                                            <div className="flex items-center gap-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    challenge.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                    challenge.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                                }`}>
                                                    {challenge.difficulty}
                                                </span>
                                                <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {challenge.duration} days
                                                </span>
                                                <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {new Date(challenge.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Trophy className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No challenges yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Create your first challenge to get started!</p>
                                <button 
                                    onClick={() => router.push('/dashboard/challenges/create')}
                                    className="bg-blue-light hover:bg-blue-dark text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Create Challenge
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions & Progress */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h3>
                        </div>
                        <div className="p-6 space-y-3">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                                            <action.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {action.title}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {action.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your Progress</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Challenges Completed</span>
                                    <span>0/10</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-light h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Skills Gained</span>
                                    <span>0/25</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <span>Community Rank</span>
                                    <span>Beginner</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
