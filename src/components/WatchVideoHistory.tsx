"use client";
import { useEffect, useState } from "react";

interface WatchHistoryProps {
  userId: string;
}

interface HistoryEntry {
  video: {
    title: string;
    videoSrc: string;
  };
  timestamp: string;
}

const WatchHistory: React.FC<WatchHistoryProps> = ({ userId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/history/${userId}`);
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch watch history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h2>Watch History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            Video Title: {entry.video.title}, Watched on:{" "}
            {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchHistory;
