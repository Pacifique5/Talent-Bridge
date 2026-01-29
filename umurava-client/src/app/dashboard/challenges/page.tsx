"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Filter, 
  Trophy, 
  Clock, 
  Users, 
  Calendar,
  Star,
  TrendingUp,
  Target,
  Award
} from "lucide-react";
import { fetchChallenges, setChallengeFilters } from "@/store/challengesSlice";
import { RootState, AppDispatch } from "@/store";
import { Challenge } from "@/types/challenge";
import Link from "next/link";

const ChallengesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { challenges, filters, loading, error } = useSelector((state: RootState) => state.challenges);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Fetch challenges when component mounts
    useEffect(() => {
        dispatch(fetchChallenges());
    }, [dispatch]);

    // Filter challenges based on search and filters
    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = !selectedDifficulty || challenge.difficulty === selectedDifficulty;
        const matchesStatus = !selectedStatus || challenge.difficulty === selectedStatus; // Placeholder for status
        
        return matchesSearch && matchesDifficulty && matchesStatus;
    });

    const difficultyColors = {
        easy: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800',
        medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        hard: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800'
    };

    const getDifficultyIcon = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return <Target className="h-4 w-4" />;
            case 'medium': return <TrendingUp className="h-4 w-4" />;
            case 'hard': return <Award className="h-4 w-4" />;
            default: return <Trophy className="h-4 w-4" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-light"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Challenges & Hackathons</h1>
                    <p className="text-gray-600 dark:text-gray-400">Join challenges to build your skills and gain valuable work experience</p>
                </div>
                <Link href="/dashboard/challenges/create">
                    <button className="bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                        <Plus className="h-5 w-5" />
                        Create Challenge
                    </button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Challenges</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{challenges.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {challenges.filter(c => c.difficulty === 'easy').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {challenges.filter(c => c.difficulty === 'medium').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <Award className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {challenges.filter(c => c.difficulty === 'hard').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                    >
                        <option value="">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="open">Open</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-800 dark:text-red-400">Error loading challenges: {error}</p>
                </div>
            )}

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.length > 0 ? (
                    filteredChallenges.map((challenge: Challenge) => (
                        <div
                            key={challenge.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                            onClick={() => router.push(`/dashboard/challenges/${challenge.id}`)}
                        >
                            <div className="p-6">
                                {/* Challenge Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                            <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors] || difficultyColors.easy}`}>
                                            {getDifficultyIcon(challenge.difficulty)}
                                            {challenge.difficulty}
                                        </span>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                        <Star className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400" />
                                    </button>
                                </div>

                                {/* Challenge Content */}
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {challenge.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {challenge.description}
                                </p>

                                {/* Challenge Meta */}
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{challenge.duration} days</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>0 participants</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(challenge.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button className="w-full bg-blue-light hover:bg-blue-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                        View Challenge
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No challenges found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {searchTerm || selectedDifficulty || selectedStatus 
                                    ? "Try adjusting your search or filters" 
                                    : "Be the first to create a challenge!"
                                }
                            </p>
                            <Link href="/dashboard/challenges/create">
                                <button className="bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Create First Challenge
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengesPage;
