import { useState, useEffect } from "react";
import { FiSave, FiX } from "react-icons/fi";

export default function EditHome() {
  const [heroContent, setHeroContent] = useState([
    { id: 1, title: "Get your brand new shades with", discount: "UP TO 40% OFF", subtitle: "PREMIUM COLLECTION", image: "/Image/32.jpeg" },
    { id: 2, title: "Luxury Designer Frames", discount: "NEW ARRIVALS 2025", subtitle: "EXCLUSIVE STYLES", image: "/Image/26.jpeg" },
    { id: 3, title: "Photochromic & Smart Tech", discount: "30% OFF FEATURED", subtitle: "SMART EYEWEAR", image: "/Image/28.jpeg" }
  ]);
  const [newSlide, setNewSlide] = useState({ title: "", discount: "", subtitle: "", image: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedHero = localStorage.getItem("heroContent");
    if (savedHero) {
      setHeroContent(JSON.parse(savedHero));
    }
  }, []);

  const handleAddSlide = () => {
    if (!newSlide.title || !newSlide.discount || !newSlide.subtitle) {
      alert("Please fill all fields");
      return;
    }
    const slide = {
      id: Date.now(),
      ...newSlide
    };
    setHeroContent([...heroContent, slide]);
    setNewSlide({ title: "", discount: "", subtitle: "", image: "" });
  };

  const handleRemoveSlide = (id) => {
    setHeroContent(heroContent.filter(s => s.id !== id));
  };

  const handleSave = () => {
    localStorage.setItem("heroContent", JSON.stringify(heroContent));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Home Page</h1>

        {/* HERO SLIDES SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Hero Banner Slides</h2>
          
          {/* ADD NEW SLIDE */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Add New Slide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Main Title"
                value={newSlide.title}
                onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                placeholder="Discount Text (e.g., UP TO 40% OFF)"
                value={newSlide.discount}
                onChange={(e) => setNewSlide({ ...newSlide, discount: e.target.value })}
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                placeholder="Subtitle"
                value={newSlide.subtitle}
                onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                placeholder="Image Path (e.g., /Image/32.jpeg)"
                value={newSlide.image}
                onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAddSlide}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition w-full"
            >
              Add Slide
            </button>
          </div>

          {/* CURRENT SLIDES */}
          <h3 className="text-lg font-bold mb-4 text-gray-900">Current Slides ({heroContent.length})</h3>
          <div className="space-y-4">
            {heroContent.map((slide, idx) => (
              <div key={slide.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Slide {idx + 1}</p>
                    <p className="font-bold text-gray-900">{slide.title}</p>
                  </div>
                  <div className="flex gap-2 sm:justify-end">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">{slide.discount}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><strong>Subtitle:</strong> {slide.subtitle}</p>
                  </div>
                  <div className="flex gap-2 sm:justify-end">
                    <button
                      onClick={() => handleRemoveSlide(slide.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition flex items-center gap-1"
                    >
                      <FiX /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 text-lg"
        >
          <FiSave size={24} /> Save All Changes
        </button>
        
        {saved && (
          <div className="mt-4 p-4 bg-green-100 border-2 border-green-500 text-green-800 rounded-lg font-semibold text-center">
            ✓ All changes saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}