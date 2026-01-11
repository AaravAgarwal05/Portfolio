import { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

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

interface Certificate {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink: string;
}

interface MyBadgesProps {
  username: string;
}

const MyBadges = ({ username }: MyBadgesProps) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    type: "badge" | "certificate";
    data: Badge | Certificate;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/badges-certificates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (data.leetcode?.data?.matchedUser) {
          setBadges(data.leetcode.data.matchedUser.badges || []);
        }

        if (data.certificates) {
          setCertificates(data.certificates);
        }
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const closeModal = () => setSelectedItem(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Combine items for display
  const allItems = [...badges, ...certificates];

  return (
    <>
      <div className="h-full flex flex-col antialiased items-center justify-center relative overflow-hidden">
        {allItems.length > 0 ? (
          <InfiniteMovingCards
            items={allItems}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className="w-full"
            onItemClick={(item) => {
              // Determine type based on property existence
              if ("displayName" in item) {
                setSelectedItem({ type: "badge", data: item });
              } else {
                setSelectedItem({ type: "certificate", data: item });
              }
            }}
          />
        ) : (
          <div className="text-gray-400">No badges or certificates found.</div>
        )}
      </div>

      {selectedItem &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-[#10132E] border border-white/20 p-4 rounded-2xl w-[95vw] h-[90vh] overflow-hidden relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full z-10"
                aria-label="Close modal"
              >
                <IoClose size={24} />
              </button>

              {selectedItem.type === "badge" ? (
                // Badge Detail View
                <div className="flex flex-col items-center justify-center gap-4 py-8 h-full">
                  <div className="w-40 h-40 md:w-60 md:h-60">
                    <Image
                      src={(selectedItem.data as Badge).icon}
                      alt={(selectedItem.data as Badge).displayName}
                      width={240}
                      height={240}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center">
                    {(selectedItem.data as Badge).displayName}
                  </h3>
                  <p className="text-gray-400">
                    Awarded:{" "}
                    {new Date(
                      (selectedItem.data as Badge).creationDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                // Certificate Detail View (PDF or Image)
                <div className="w-full h-full flex flex-col items-center">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    {(selectedItem.data as Certificate).name}
                  </h3>
                  {/* Using Google Drive Preview Embed */}
                  <iframe
                    src={`https://drive.google.com/file/d/${
                      (selectedItem.data as Certificate).id
                    }/preview`}
                    className="w-full h-full rounded-lg border border-white/10 bg-white flex-1"
                    title="Certificate Preview"
                  ></iframe>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MyBadges;
