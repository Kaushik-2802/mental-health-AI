import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

// Navigation Bar Titles
export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "TechStack",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/signin",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];
// Roadmap - instead make them future goals
export const roadmap = [
  {
    id: "0",
    title: "Voice integration",
    text: "We are trying to implement Natural Language Processing (NLP) through text wherein the user simply records his text for explaining their mental situation.",
    date: "Idea # 1 ",
    status: "In Progress ",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: " Beyond Mental Health ",
    text: "Extended to all health conditions that require continuous montoring for efficient data collection and analysis to help doctors get a better perspective of a patient.",
    date: "Idea # 2",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: " Mobile Application",
    text: ' Enables seamless user interaction through the "KalRav" mobile app .',
    date: "Idea # 3",
    status: "In progress",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with chat apps",
    text: "Create a plugin to integrate apps like whattsapp or facebook to enable voice and chat to enable user to interact without the need to install and login through web or mobile app . ",
    date: "Idea # 4",
    status: "In Progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart report generation, mental health experts can suggest the best course of medication or therapy for their patients";

export const collabContent = [
  {
    id: "0",
    title: " Highly Scalable ",
  },
  {
    id: "1",
    title: "Smart Report Generation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

// Instead of pricing , display tech stack
export const pricing = [
  {
    id: "0",
    title: "Frontend",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Backend",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Model",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

// Features of KalRav
export const benefits = [
  {
    id: "0",
    title: "Polarity Detection",
    text: " Identifies the emotional polarity (positive, neutral, or negative) of each input and tracks entiment trends over time.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: " Keyword Extraction ",
    text: " Extracts key mental health related phrases or entities, providing insights into recurring or significant concerns. ",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Concern Classifier",
    text: " Categorizes concerns into predefined mental health issues such as Anxiety, Depression, Stress, Insomnia, or Eating Disorders.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Timeline-Based Sentiment Shift Analysis",
    text: "Evaluates how sentiment, concerns, and intensity have evolved over a specified time period.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Intensity Scoring",
    text: "Assigns a severity score (1-10) based on linguistic and contextual cues, indicating the seriousness of the user's concerns. ",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: " Report Generation",
    text: "The model later generates a report describing all of the mentioned features through graphs , pictures etc helping to quickly get overview of a user's mental state.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
