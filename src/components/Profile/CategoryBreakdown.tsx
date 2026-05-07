interface CategoryStat {
  categoryName: string;
  wins: number;
  losses: number;
}

interface CategoryBreakdownProps {
  categories: CategoryStat[];
}

export default function CategoryBreakdown({
  categories,
}: CategoryBreakdownProps) {
  // Sort by total games played
  const sortedCategories = [...categories].sort(
    (a, b) => b.wins + b.losses - (a.wins + a.losses)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sortedCategories.map((cat) => {
        const total = cat.wins + cat.losses;
        const winRate = total > 0 ? (cat.wins / total) * 100 : 0;

        return (
          <div
            key={cat.categoryName}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium truncate flex-1">{cat.categoryName}</p>
              <p className="text-sm opacity-50 ml-2">{total} games</p>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${winRate}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-400">{cat.wins}W</span>
              <span className="opacity-50">{winRate.toFixed(0)}%</span>
              <span className="text-red-400">{cat.losses}L</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
