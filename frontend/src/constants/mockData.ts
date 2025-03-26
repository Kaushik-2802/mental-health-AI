// Mock user data
export const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "https://i.pravatar.cc/150?img=32",
  streak: 15,
  totalCheckIns: 42,
  joinedDate: "2023-09-15",
};

// Mock doctor data
export const doctorData = {
  name: "Dr. Michael Chen",
  specialty: "Clinical Psychologist",
  avatar: "https://i.pravatar.cc/150?img=11",
  hospital: "Mindfulness Wellness Center",
  nextAvailable: "2025-04-02T14:30:00",
  contactEmail: "dr.chen@example.com",
  contactPhone: "+1 (555) 123-4567",
};

// Mock therapy sessions
export const therapySessions = [
  {
    id: 1,
    date: "2025-03-27T15:00:00",
    duration: 60, // minutes
    type: "One-on-one",
    doctor: "Dr. Michael Chen",
    notes: "Follow-up on stress management techniques",
    location: "Virtual (Zoom)",
    zoomLink: "https://zoom.us/j/123456789",
  },
  {
    id: 2,
    date: "2025-04-03T16:30:00",
    duration: 45, // minutes
    type: "One-on-one",
    doctor: "Dr. Michael Chen",
    notes: "Discussion of weekly progress",
    location: "Mindfulness Wellness Center, Room 302",
  },
  {
    id: 3,
    date: "2025-04-10T14:00:00",
    duration: 90, // minutes
    type: "Group Session",
    doctor: "Dr. Emily Wong",
    notes: "Anxiety support group",
    location: "Virtual (Zoom)",
    zoomLink: "https://zoom.us/j/987654321",
  },
];

// Mock check-in history
export const checkInHistory = [
  // Generate data for the last 60 days
  ...Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Random mood score between 1-10
    const moodScore = Math.floor(Math.random() * 10) + 1;

    // Determine if checked in (more recent days more likely to have check-ins)
    const hasCheckedIn = i < 20 ? Math.random() > 0.2 : Math.random() > 0.4;

    return {
      date: date.toISOString().split("T")[0],
      checkedIn: hasCheckedIn,
      moodScore: hasCheckedIn ? moodScore : null,
      method: hasCheckedIn
        ? ["text", "voice", "community"][Math.floor(Math.random() * 3)]
        : null,
    };
  }),
];

// Weekly insights based on check-ins
export const weeklyInsights = {
  averageMood: 7.2,
  moodTrend: "improving", // "improving", "declining", "stable"
  consistencyRate: 85, // percentage
  topMethod: "text",
  suggestedActions: [
    "Try a 5-minute meditation exercise daily",
    "Schedule a nature walk this weekend",
    "Practice deep breathing when feeling anxious",
  ],
};

// Mental health resources
export const resources = [
  {
    id: 1,
    title: "Understanding Anxiety",
    type: "Article",
    source: "Mental Health Foundation",
    link: "#",
  },
  {
    id: 2,
    title: "Sleep Meditation Guide",
    type: "Audio",
    duration: "15 min",
    link: "#",
  },
  {
    id: 3,
    title: "Stress Management Techniques",
    type: "Video",
    duration: "10 min",
    link: "#",
  },
];
