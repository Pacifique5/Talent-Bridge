"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Users, 
  MessageCircle, 
  Trophy, 
  Star, 
  TrendingUp, 
  Calendar,
  MapPin,
  ExternalLink,
  UserPlus,
  Award,
  Target,
  Zap,
  Globe,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";
import { fetchCommunityData } from "@/store/communitySlice";
import { AppDispatch, RootState } from "@/store";

const CommunityPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        dispatch(fetchCommunityData());
    }, [dispatch]);

    const communityStats = [
        { label: 'Total Members', value: '2,847', icon: Users, color: 'bg-blue-500' },
        { label: 'Active This Week', value: '1,234', icon: TrendingUp, color: 'bg-green-500' },
        { label: 'Challenges Completed', value: '156', icon: Trophy, color: 'bg-purple-500' },
        { label: 'Success Rate', value: '87%', icon: Target, color: 'bg-orange-500' }
    ];

    const topMembers = [
        { name: 'Sarah Johnson', role: 'Full Stack Developer', challenges: 23, rating: 4.9, avatar: 'SJ', location: 'Rwanda' },
        { name: 'Michael Chen', role: 'Frontend Developer', challenges: 19, rating: 4.8, avatar: 'MC', location: 'Kenya' },
        { name: 'Amina Hassan', role: 'Backend Developer', challenges: 17, rating: 4.7, avatar: 'AH', location: 'Uganda' },
        { name: 'David Mukasa', role: 'DevOps Engineer', challenges: 15, rating: 4.6, avatar: 'DM', location: 'Tanzania' },
        { name: 'Grace Uwimana', role: 'UI/UX Designer', challenges: 14, rating: 4.5, avatar: 'GU', location: 'Rwanda' }
    ];

    const recentActivities = [
        { user: 'Sarah Johnson', action: 'completed', target: 'E-commerce API Challenge', time: '2 hours ago', type: 'challenge' },
        { user: 'Michael Chen', action: 'joined', target: 'React Native Mobile App', time: '4 hours ago', type: 'challenge' },
        { user: 'Amina Hassan', action: 'created', target: 'Machine Learning Hackathon', time: '6 hours ago', type: 'hackathon' },
        { user: 'David Mukasa', action: 'won', target: 'DevOps Challenge #12', time: '1 day ago', type: 'achievement' },
        { user: 'Grace Uwimana', action: 'shared', target: 'Design System Guidelines', time: '2 days ago', type: 'resource' }
    ];

    const upcomingEvents = [
        { title: 'Monthly Hackathon', date: '2026-02-15', participants: 45, type: 'Hackathon' },
        { title: 'Frontend Masterclass', date: '2026-02-20', participants: 78, type: 'Workshop' },
        { title: 'Career Fair 2026', date: '2026-03-01', participants: 156, type: 'Event' },
        { title: 'AI/ML Challenge', date: '2026-03-10', participants: 23, type: 'Challenge' }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Globe },
        { id: 'members', label: 'Members', icon: Users },
        { id: 'activities', label: 'Activities', icon: TrendingUp },
        { id: 'events', label: 'Events', icon: Calendar }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-light via-blue-600 to-blue-dark rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Users className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Community Hub</h1>
                            <p className="text-blue-100">Connect, collaborate, and grow together</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Join WhatsApp Community
                        </button>
                        <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
                            <ExternalLink className="h-5 w-5" />
                            Discord Server
                        </button>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-xl`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-light text-blue-light'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Welcome Message */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Welcome to the Community, {user?.firstName}! 🎉
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Join thousands of developers, designers, and tech enthusiasts building amazing projects together.
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="bg-blue-light text-white px-4 py-2 rounded-lg hover:bg-blue-dark transition-colors">
                                            Complete Profile
                                        </button>
                                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                            Browse Challenges
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                                    <div className="space-y-3">
                                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Github className="h-5 w-5 text-gray-600" />
                                            <span className="text-gray-700">GitHub Organization</span>
                                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                                        </a>
                                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Linkedin className="h-5 w-5 text-gray-600" />
                                            <span className="text-gray-700">LinkedIn Group</span>
                                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                                        </a>
                                        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Twitter className="h-5 w-5 text-gray-600" />
                                            <span className="text-gray-700">Twitter Community</span>
                                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Recent Activities</h4>
                                <div className="space-y-4">
                                    {recentActivities.slice(0, 5).map((activity, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900">
                                                    <span className="font-medium">{activity.user}</span> {activity.action} {activity.target}
                                                </p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Top Contributors</h3>
                                <button className="text-blue-light hover:text-blue-dark font-medium">View All</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {topMembers.map((member, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-blue-light text-white rounded-full flex items-center justify-center font-semibold">
                                                {member.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                                <p className="text-sm text-gray-600">{member.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                                <span className="text-sm font-medium">{member.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Trophy className="h-4 w-4" />
                                                <span>{member.challenges} challenges</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{member.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Activities Tab */}
                    {activeTab === 'activities' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">Community Activities</h3>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Trophy className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900">
                                                <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            activity.type === 'challenge' ? 'bg-blue-100 text-blue-800' :
                                            activity.type === 'hackathon' ? 'bg-purple-100 text-purple-800' :
                                            activity.type === 'achievement' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {activity.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Events Tab */}
                    {activeTab === 'events' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                                <button className="bg-blue-light text-white px-4 py-2 rounded-lg hover:bg-blue-dark transition-colors">
                                    Create Event
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {upcomingEvents.map((event, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                event.type === 'Hackathon' ? 'bg-purple-100 text-purple-800' :
                                                event.type === 'Workshop' ? 'bg-green-100 text-green-800' :
                                                event.type === 'Challenge' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="h-4 w-4" />
                                                <span>{event.participants} participants</span>
                                            </div>
                                            <button className="text-blue-light hover:text-blue-dark font-medium text-sm">
                                                Join Event
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
