function StarRating({ rate = 0, count }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rate)) return "full";
    if (i < rate) return "half";
    return "empty";
  });

  return (
    <div className="card-meta">
      <div className="star-rating" aria-label={`Rating: ${rate} out of 5`}>
        {stars.map((type, i) => (
          <span key={i} className={`star ${type === "empty" ? "empty" : ""}`}>
            {type === "full" ? "★" : type === "half" ? "⯨" : "☆"}
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="rating-count">({count})</span>
      )}
    </div>
  );
}

export default StarRating;
