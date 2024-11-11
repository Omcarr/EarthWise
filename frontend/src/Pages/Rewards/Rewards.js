import React from "react";
import {
  Leaf,
  Droplets,
  Wind,
  Sprout,
  TreePine,
  TrendingUp,
  Users,
  Target,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";

const Rewards = () => {
  // ... previous data definitions remain the same ...

  const achievements = [
    {
      id: 1,
      title: "Carbon Footprint Reducer",
      description: "Reduce your carbon footprint through sustainable practices",
      progress: "75%",
      achieved: true,
      impact: "Saved 250kg of CO2 emissions",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
    },
    {
      id: 2,
      title: "Water Conservation Champion",
      description: "Implement water-saving techniques in daily routine",
      progress: "60%",
      achieved: true,
      impact: "Saved 1000 liters of water",
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
    },
    {
      id: 3,
      title: "Renewable Energy Adopter",
      description: "Switch to renewable energy sources",
      progress: "40%",
      achieved: false,
      impact: "On track to save 500kWh",
      icon: <Wind className="w-6 h-6 text-teal-600" />,
    },
    {
      id: 4,
      title: "Green Garden Guardian",
      description: "Maintain a sustainable garden with native plants",
      progress: "90%",
      achieved: true,
      impact: "Created habitat for 12 local species",
      icon: <Sprout className="w-6 h-6 text-green-600" />,
    },
  ];

  // Define leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Chen",
      points: "3,250",
      streak: "45 days",
      growth: "+15% this week",
    },
    {
      rank: 2,
      name: "Michael Rodriguez",
      points: "2,890",
      streak: "30 days",
      growth: "+12% this week",
    },
    {
      rank: 3,
      name: "Emma Wilson",
      points: "2,675",
      streak: "28 days",
      growth: "+10% this week",
    },
    {
      rank: 4,
      name: "James Kim",
      points: "2,450",
      streak: "21 days",
      growth: "+8% this week",
    },
    {
      rank: 5,
      name: "Lisa Patel",
      points: "2,340",
      streak: "15 days",
      growth: "+5% this week",
    },
  ];

  return (
    <div className="ml-14">
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero/Dashboard Section */}
        <div className="bg-gradient-to-r from-teal-700 to-green-600 pt-16 pb-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">
                Ecolyzer Impact Dashboard
              </h1>
              <p className="text-xl text-teal-100">
                Track your environmental achievements and compete for a greener
                future
              </p>
            </div>

            {/* Main Dashboard Stats */}
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-lg"></div>
              <div className="grid grid-cols-4 gap-6 p-8 relative">
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <TrendingUp className="w-8 h-8 text-teal-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">
                      2,500+
                    </div>
                    <div className="text-teal-100 text-sm">Total Points</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <Target className="w-8 h-8 text-teal-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">
                      85%
                    </div>
                    <div className="text-teal-100 text-sm">Sustainability</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <Users className="w-8 h-8 text-teal-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">
                      250+
                    </div>
                    <div className="text-teal-100 text-sm">Active Users</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-xl p-6">
                    <Award className="w-8 h-8 text-teal-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">30</div>
                    <div className="text-teal-100 text-sm">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto px-6 -mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Section - Environmental Achievements */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-teal-800">
                  Environmental Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg transition-all duration-300 hover:scale-102 
                    ${achievement.achieved ? "bg-green-50" : "bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-3 
                      ${achievement.achieved ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3
                            className={`font-bold ${
                              achievement.achieved
                                ? "text-green-700"
                                : "text-gray-700"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded-full
                          ${
                            achievement.achieved
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          >
                            {achievement.progress}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              achievement.achieved
                                ? "bg-green-500"
                                : "bg-teal-200"
                            }`}
                            style={{ width: achievement.progress }}
                          ></div>
                        </div>
                        <div className="mt-2 text-sm font-medium text-teal-600">
                          {achievement.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Right Section - Top Achievers */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-teal-800">
                  Top Achievers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 
                    ${index !== leaderboard.length - 1 ? "border-b" : ""} 
                    hover:bg-teal-50 transition-colors rounded-lg`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                      ${
                        entry.rank === 1
                          ? "bg-yellow-400"
                          : entry.rank === 2
                          ? "bg-gray-400"
                          : entry.rank === 3
                          ? "bg-amber-600"
                          : "bg-teal-600"
                      }`}
                      >
                        {entry.rank}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {entry.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Streak: {entry.streak}
                          </span>
                          <span className="text-sm text-green-600">
                            {entry.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-teal-700">
                        {entry.points}
                      </div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Community Impact Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">
              Community Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-teal-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-full">
                      <Leaf className="w-6 h-6 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800">
                      Carbon Reduction
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-teal-700 mb-1">
                    1,250 kg
                  </div>
                  <div className="text-sm text-green-600">
                    CO₂ saved this month
                  </div>
                  <div className="mt-2 text-sm text-teal-600 bg-teal-100/50 px-2 py-1 rounded-full inline-block">
                    +25% from last month
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-full">
                      <Users className="w-6 h-6 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800">
                      Active Members
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-teal-700 mb-1">
                    250+
                  </div>
                  <div className="text-sm text-green-600">
                    Active participants
                  </div>
                  <div className="mt-2 text-sm text-teal-600 bg-teal-100/50 px-2 py-1 rounded-full inline-block">
                    15 new this week
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-full">
                      <Target className="w-6 h-6 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-teal-800">
                      Green Initiatives
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-teal-700 mb-1">
                    15
                  </div>
                  <div className="text-sm text-green-600">Ongoing projects</div>
                  <div className="mt-2 text-sm text-teal-600 bg-teal-100/50 px-2 py-1 rounded-full inline-block">
                    5 completed this month
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
