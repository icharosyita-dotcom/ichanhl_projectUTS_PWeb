export default function ResultsSection({ undertone, recommendations, onAddToCart }) {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Your Skin Undertone</h2>
          <Badge className="text-2xl px-6 py-2">{undertone}</Badge>
          <Card className="max-w-2xl mx-auto p-8">
            <p>Based on your skin analysis, you have {undertone} undertones...</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
