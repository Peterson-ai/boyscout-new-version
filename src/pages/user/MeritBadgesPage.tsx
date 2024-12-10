import { BadgeCard } from "@/components/badges/BadgeCard";
import { BadgeSection } from "@/components/badges/BadgeSection";

const MeritBadgesPage = () => {
  const donationBadges = [
    {
      name: "First Step",
      description: "Made your first donation to support Scouting",
      level: "bronze",
      icon: "🥉",
      earnedDate: "2024-01-15",
    },
    {
      name: "Regular Supporter",
      description: "Consistently supported Scouting programs",
      level: "silver",
      icon: "🥈",
      earnedDate: "2024-02-20",
    },
    {
      name: "Major Contributor",
      description: "Made significant contributions to Scouting initiatives",
      level: "gold",
      icon: "🥇",
      progress: 75,
    },
    {
      name: "Legacy Builder",
      description: "Created lasting impact through exceptional support",
      level: "diamond",
      icon: "💎",
      progress: 30,
    },
  ];

  const engagementBadges = [
    {
      name: "Event Participant",
      description: "Attended Scouting events and ceremonies",
      level: "bronze",
      icon: "🎯",
      earnedDate: "2024-01-10",
    },
    {
      name: "Active Supporter",
      description: "Regularly participated in Scouting activities",
      level: "silver",
      icon: "⭐",
      progress: 60,
    },
    {
      name: "Community Leader",
      description: "Demonstrated leadership in supporting Scouting",
      level: "gold",
      icon: "👑",
      progress: 45,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Merit Badges & Recognition</h1>
        <p className="text-gray-400">Celebrating your contributions and achievements in supporting Scouting</p>
      </div>

      <div className="space-y-12">
        <BadgeSection
          title="Donation Achievements"
          description="Recognition for your financial support and contributions"
        >
          {donationBadges.map((badge) => (
            <BadgeCard
              key={badge.name}
              name={badge.name}
              description={badge.description}
              level={badge.level as "bronze" | "silver" | "gold" | "diamond"}
              icon={badge.icon}
              earnedDate={badge.earnedDate}
              progress={badge.progress}
            />
          ))}
        </BadgeSection>

        <BadgeSection
          title="Engagement Recognition"
          description="Acknowledging your participation and involvement"
        >
          {engagementBadges.map((badge) => (
            <BadgeCard
              key={badge.name}
              name={badge.name}
              description={badge.description}
              level={badge.level as "bronze" | "silver" | "gold" | "diamond"}
              icon={badge.icon}
              earnedDate={badge.earnedDate}
              progress={badge.progress}
            />
          ))}
        </BadgeSection>
      </div>
    </div>
  );
};

export default MeritBadgesPage;