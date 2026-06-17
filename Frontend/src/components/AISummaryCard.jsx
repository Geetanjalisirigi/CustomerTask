import { Sparkles } from 'lucide-react'

export default function AISummaryCard({ summary, isLoading }) {
  if (!summary && !isLoading) return null

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 mb-8 border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">AI Insights</h3>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-text-muted/20 rounded w-full"></div>
            <div className="h-4 bg-text-muted/20 rounded w-5/6"></div>
            <div className="h-4 bg-text-muted/20 rounded w-4/6"></div>
          </div>
        ) : (
          <p className="text-foreground leading-relaxed text-lg">
            {summary?.summary || summary}
          </p>
        )}
      </div>
    </div>
  )
}
