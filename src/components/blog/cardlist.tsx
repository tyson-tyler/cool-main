"use client";
import React from "react";
import Card1 from ".";

const headings = [
  "What is Myaimix",
  "Future of Myaimix",
  "How Myaimix Stands Out",
  "AI Video Sharing Platform",
  "Community at Myaimix",
];

const paragraphs = [
  "Myaimix is not just another video sharing platform; it is a cutting-edge solution that leverages AI to enhance user experience, streamline content discovery, and provide personalized recommendations. Whether you're a content creator, marketer, or casual viewer, Myaimix offers something for everyone..",
  "Enhanced Content Discovery Finding the right content can often be a daunting task. Myaimix simplifies this process by utilizing AI to categorize and tag videos accurately. This makes it easier for users to discover new and relevant content, tailored to their tastes Myaimix ensures a seamless and enjoyable experience.",
  "Personalized Content Discovery Unlike traditional video platforms that rely on generic recommendations, Myaimix leverages AI algorithms to deliver highly personalized content suggestions to each user. By analyzing user preferences, viewing history, and engagement patterns, Myaimix ensures that every video recommendation ..",
  "Access to High-Quality AI Content In addition to user-generated content, Myaimix provides access to the best and highest quality AI-generated content available. Leveraging state-of-the-art AI technologies, Myaimix curates a diverse collection of AI-generated videos spanning various genres and styles. From stunning visual effects to lifelike animations, the possibilities are endless. Whether you're working on a creative project, educational endeavor, or marketing campaign, Myaimix offers a treasure trove of AI content to fuel your inspiration and elevate your work. Integration into Projects",
  "Myaimix offers educational resources and workshops to empower users with the knowledge and skills needed to succeed in their creative endeavors. From tutorials and guides to online workshops and masterclasses, Myaimix provides valuable resources to help users hone their craft, learn new techniques, and expand their horizons. By investing in the growth and development of its community members, Myaimix fosters a culture of learning and collaboration that benefits everyone. Myaimix organizes community challenges, events, and contests to encourage participation and creativity among users. These initiatives provide opportunities for users to showcase their talents, explore new ideas, and connect with fellow creators. Whether it's a filmmaking challenge, a themed contest, or a virtual event, Myaimix brings the community together to celebrate creativity and innovation.",
];
const Demo = [
  "In today's digital age, video content reigns supreme, captivating audiences and driving engagement like never before. With the advent of artificial intelligence (AI), the landscape of video sharing has experienced a transformative shift. Enter Myaimix, an innovative AI-driven video sharing platform that is setting new standards in the industry. In this blog post, we'll delve into what Myaimix is, its unique features, and how it is revolutionizing the way we interact with video content.",
  "AI-Powered Recommendations Myaimix uses sophisticated AI algorithms to analyze user behavior, preferences, and viewing history. This allows the platform to deliver highly personalized video recommendations, ensuring that users always find content that resonates with their interests Community Engagement Myaimix fosters a vibrant community where users can interact, share, and discuss videos. Features like comments, likes, and shares are enhanced with AI moderation tools to ensure a safe.",
  "While there are numerous video sharing platforms available, Myaimix distinguishes itself through its innovative use of AI. Here’s how: Personalization at Its Best Unlike traditional platforms that offer generic recommendations, Myaimix’s AI-driven approach ensures that each user receives a unique, personalized content feed. Smart Content Management Myaimix’s AI capabilities extend to content management, helping creators organize their video libraries efficiently more effectively.",
  "Myaimix serves as a dynamic hub for users to upload, share, and explore a wide range of video content. With its intuitive interface and AI-powered recommendation system, users can easily discover videos tailored to their interests and preferences. Whether you're a content creator looking to showcase your work or a viewer seeking captivating content, Myaimix offers a platform where creativity thrives and connections are made. provides users with a seamless experience ..",
  "Community engagement and collaboration are integral aspects of the Myaimix experience, fostering a sense of belonging and camaraderie among users. Here's how Myaimix facilitates community engagement and collaboration: Myaimix offers a range of interactive features that encourage users to engage with each other and the content on the platform. Users can leave comments, share their thoughts, and interact with fellow community members, creating a dynamic and interactive environment ..",
];
const keywords = [
  ["Myaimix", "What is Myaimix", "Ai world"],
  ["Feature", "Ai", "Future"],
  ["Stand Out", "High Quality", "Ai Videos"],
  ["Ai Video Sharing", "Intergeration Project", "Share"],
  ["Community", "People", "Ai Social web app"],
];
const images = [
  "/logo/1.avif",
  "/logo/2.jpg",
  "/logo.jpg",
  "/logo/3.avif",
  "/logo/he.avif",
];

const CardList = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {headings.map((heading, index) => (
        <Card1
          key={index}
          heading={heading}
          paragraph={paragraphs[index]}
          image={images[index]}
          keywords={keywords[index]}
          demo={Demo[index]}
        />
      ))}
    </div>
  );
};

export default CardList;
