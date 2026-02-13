  import React, { useState } from "react";

  export default function MediaScanner({ onRecipeDetected }) {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // This is the "Activity" - UI changes to show it's working
      setLoading(true);

      const formData = new FormData();
      formData.append("media", file);

      try {
        // We send the file to your server (port 4000)
        const response = await fetch("http://localhost:4000/api/ai/analyze", {
          method: "POST",
          body: formData,
        });
        
        const newRecipe = await response.json();
        
        // Send the result back to App.jsx to show the new card
        onRecipeDetected(newRecipe); 
      } catch (error) {
        console.error("AI Analysis failed:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="card" style={{ border: '2px dashed var(--nau-gold)', textAlign: 'center' }}>
        <h3>{loading ? "Analyzing Food..." : "Scan Food Image/Video"}</h3>
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={handleFileChange} 
          disabled={loading}
        />
        <p className="muted">Upload a photo or video of your meal to get the recipe.</p>
      </div>
    );
  }