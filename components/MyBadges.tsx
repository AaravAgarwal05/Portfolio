import { useState, useEffect } from "react";
import Image from "next/image";

interface Badge {
  id: string;
  name: string;
  shortName: string;
  displayName: string;
  icon: string;
  hoverText: string;
  category: string;
  medal: {
    slug: string;
    config: {
      iconGif: string;
      iconGifBackground: string;
    };
  };
  creationDate: string;
}

interface MyBadgesProps {
  username: string;
}

const MyBadges = ({ username }: MyBadgesProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch("/api/leetcode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (data.errors) {
          setError(data.errors[0]?.message || "Error fetching badges");
          return;
        }

        if (data.data?.matchedUser) {
          setBadges(data.data.matchedUser.badges || []);
        } else {
          setError("No user found");
        }
      } catch (error) {
        setError("Failed to fetch badges");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[180px] text-center">
        <div>
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-sm text-gray-400">
            Please check the username and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="relative flex items-center justify-center group hover:scale-110 transition-transform duration-200"
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20">
            <Image
              src={badge.icon}
              alt={badge.displayName}
              width={80}
              height={80}
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBadges;
