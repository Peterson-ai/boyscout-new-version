import { Users, DollarSign, School, Target } from "lucide-react";
import { StatisticsCard } from "@/components/needs/StatisticsCard";
import { GrowthChart } from "@/components/needs/GrowthChart";
import { ProgramCard } from "@/components/needs/ProgramCard";

const YouthNeedsPage = () => {
  const mealStatistics = {
    "Broward County": 62.3,
    "Miami-Dade County": 70.4,
    "Monroe County": 57.4
  };

  const growthData = [
    { year: 2021, target: 1000 },
    { year: 2022, target: 1200 },
    { year: 2023, target: 1300 },
    { year: 2024, target: 1350 }
  ];

  const programs = [
    {
      name: "Cub Scouts",
      description: "Primary youth program focusing on character development and outdoor activities",
      ageRange: "K-5",
      type: "Co-ed"
    },
    {
      name: "Scouts BSA",
      description: "Advanced scouting program with emphasis on leadership and outdoor skills",
      ageRange: "Ages 10-18",
      type: "Gender-specific"
    },
    {
      name: "Venturing",
      description: "High-adventure and leadership development program",
      ageRange: "Ages 14-21",
      type: "Co-ed"
    },
    {
      name: "Exploring",
      description: "Career-based education program for youth",
      ageRange: "Middle/High School",
      type: "Co-ed"
    },
    {
      name: "Learning for Life",
      description: "In-school character education program",
      ageRange: "K-12",
      type: "In-school"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Youth Needs & Programs</h1>
        <p className="text-gray-400">Supporting K-5 youth in socio-economically challenged areas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Program Sites (2024)"
          value="44"
          subtitle="Serving local communities"
          icon={<School className="h-5 w-5" />}
        />
        <StatisticsCard
          title="Youth Served"
          value="1,350"
          subtitle="Average 31 per site"
          icon={<Users className="h-5 w-5" />}
        />
        <StatisticsCard
          title="Cost per Youth"
          value="$385.89"
          subtitle="Annual investment"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatisticsCard
          title="Market Share"
          value="0.4%"
          subtitle="Of 313,498 available youth"
          icon={<Target className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Free/Reduced Meals Statistics</h2>
          {Object.entries(mealStatistics).map(([county, percentage]) => (
            <StatisticsCard
              key={county}
              title={county}
              value={`${percentage}%`}
              subtitle="Families receiving assistance"
            />
          ))}
        </div>
        <GrowthChart data={growthData} />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Programs Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard
              key={program.name}
              name={program.name}
              description={program.description}
              ageRange={program.ageRange}
              type={program.type}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#1A2235] border border-gray-800 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Program Budget (2025-2027)</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-800">
            <span className="text-gray-400">Total Budget</span>
            <span className="text-white font-semibold">$1,650,372</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-800">
            <span className="text-gray-400">Challenge Grant</span>
            <span className="text-white font-semibold">$500,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Remaining Funds Needed</span>
            <span className="text-white font-semibold">$1,150,372</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthNeedsPage;