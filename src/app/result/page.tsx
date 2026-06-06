import { AppFooter, AppHeader } from "@/components/app-shell"
import { ResultDashboard } from "@/components/result-dashboard"

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <AppHeader dark={false} />
      <ResultDashboard />
      <AppFooter />
    </div>
  )
}
