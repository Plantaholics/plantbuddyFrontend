function PlantCareCard({ water, fertilization, benefits, sunlight, preferred_area, plant }) {
    return (
      <div className="TaskCard card">
        <h2>How to take care of your plant buddy!</h2>
        <h4>Water:</h4>
        <p>{water}</p>
        <h4>Fertilization:</h4>
        <p>{fertilization}</p>
        <h4>Benefits:</h4>
        <p>{benefits}</p>
        <h4>Sunlight:</h4>
        <p>{sunlight}</p>
        <h4>Prefered area:</h4>
        <p>{preferred_area}</p>
        <h4>Plants:</h4>
        <p>{{}}</p>
      </div>
    );
  }
  
  export default PlantCareCard;