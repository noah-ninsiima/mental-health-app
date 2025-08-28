import { useState } from "react";

// Resource data with YouTube video IDs
const resources = [
  // --- Mindfulness (4) ---
  {
    id: 1,
    title: "Meditation Basics",
    category: "Mindfulness",
    description: "A beginner's guide to meditation for mental clarity.",
    videoId: "inpok4MKVLM",
  },
  {
    id: 2,
    title: "Mindful Breathing",
    category: "Mindfulness",
    description: "Simple breathing exercises to calm your mind.",
    videoId: "gedoSfZvBgE",
  },
  {
    id: 3,
    title: "Body Scan Meditation",
    category: "Mindfulness",
    description: "Learn to release tension with a guided body scan practice.",
    videoId: "ihwcw_ofuME",
  },
  {
    id: 4,
    title: "Mindfulness for Anxiety",
    category: "Mindfulness",
    description: "How mindfulness practices can reduce anxiety.",
    videoId: "ZToicYcHIOU",
  },

  // --- Wellbeing (4) ---
  {
    id: 5,
    title: "Coping with Stress",
    category: "Wellbeing",
    description: "Techniques to manage and reduce stress effectively.",
    videoId: "0BbHW3H_xmo",
  },
  {
    id: 6,
    title: "Gratitude Practices",
    category: "Wellbeing",
    description: "Daily gratitude exercises for a happier life.",
    videoId: "WPPPFqsECz0",
  },
  {
    id: 7,
    title: "Emotional Resilience",
    category: "Wellbeing",
    description: "Build resilience to bounce back from challenges.",
    videoId: "NWH8N-BvhAw",
  },
  {
    id: 8,
    title: "The Science of Happiness",
    category: "Wellbeing",
    description: "Discover what really makes us happy, based on research.",
    videoId: "GXy__kBVq1M",
  },

  // --- Lifestyle (4) ---
  {
    id: 9,
    title: "Healthy Sleep Habits",
    category: "Lifestyle",
    description: "Tips for getting consistent, quality sleep.",
    videoId: "OteFky2NEHc",
  },
  {
    id: 10,
    title: "Nutrition for Mental Health",
    category: "Lifestyle",
    description: "How your diet impacts your mood and wellbeing.",
    videoId: "xts3peHCqHe46pO1",
  },
  {
    id: 11,
    title: "Exercise and the Brain",
    category: "Lifestyle",
    description: "Why physical activity boosts mental performance.",
    videoId: "aUaInS6HIGo",
  },
  {
    id: 12,
    title: "Digital Detox",
    category: "Lifestyle",
    description: "Practical steps to reduce screen time and recharge.",
    videoId: "f0I2Kyt_B3ZJxSQ0",
  },
];

function ResourceLibrary() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || res.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Mental Health Resources
        </h2>
        <p className="text-md text-muted-foreground">
          Discover evidence-based tools and guides to support your mental wellness journey.
        </p>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search resources, topics, or keywords..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        {["All", "Mindfulness", "Wellbeing", "Lifestyle"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "therapeutic-gradient text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Resource cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Embedded YouTube video */}
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${res.videoId}`}
                  title={res.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{res.title}</h3>
                <p className="text-sm text-gray-500">{res.category}</p>
                <p className="mt-2 text-gray-700 text-sm">{res.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No resources found.</p>
        )}
      </div>
    </div>
  );
}

export default ResourceLibrary;
