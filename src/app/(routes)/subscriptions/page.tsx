"use client";
import React, { useEffect, useState } from "react";
import getSubscriptionVideos from "@/actions/getSubscriptionVideo";
import SubscriptionList from "@/components/subscription/Subscription";
import Loader from "@/components/Loader";

export default function Subscription() {
  const [loading, setLoading] = useState(true);
  const [subscriptionVideos, setSubscriptionVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptionVideos = async () => {
      try {
        const videos = await getSubscriptionVideos();
        setSubscriptionVideos(videos);
      } catch (error) {
        console.error("Error fetching subscription videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionVideos();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return subscriptionVideos.length ? (
    <SubscriptionList videos={subscriptionVideos} />
  ) : (
    <div className="flex justify-center items-center w-full h-screen">
      <h1 className="text-md usespan">No Video</h1>
    </div>
  );
}
