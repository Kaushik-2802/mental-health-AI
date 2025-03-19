// components/InfoCardGrid.jsx
import React, { useState } from "react";
import {
  AlertCircle,
  FileText,
  Maximize2,
  Share2,
  Brain,
  MessageSquare,
} from "lucide-react";
import InfoCard from "./InfoCard";

const InfoCardGrid = ({ analysisData }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    concern_categories = {},
    concerns = [],
    intensity_scores = {},
    keywords = [],
    response_message = "",
    sentiment = "",
  } = analysisData;

  const cards = [
    {
      title: "Concern Categories",
      content: Object.entries(concern_categories),
      icon: <AlertCircle className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Concerns",
      content: concerns,
      icon: <FileText className="w-6 h-6" />,
      color: "indigo",
    },
    {
      title: "Intensity Scores",
      content: Object.entries(intensity_scores),
      icon: <Maximize2 className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Keywords",
      content: keywords,
      icon: <Share2 className="w-6 h-6" />,
      color: "pink",
    },
    {
      title: "Sentiment",
      content: sentiment,
      icon: <Brain className="w-6 h-6" />,
      color: sentiment === "Negative" ? "red" : "green",
    },
    {
      title: "Response",
      content: response_message,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <InfoCard
          key={index}
          title={card.title}
          content={card.content}
          icon={card.icon}
          color={card.color}
          index={index}
          isSelected={selectedCard === index}
          onSelect={() =>
            setSelectedCard(selectedCard === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default InfoCardGrid;
