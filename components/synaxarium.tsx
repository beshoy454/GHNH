"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Book } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface SynaxariumEntry {
  title: string
  content: string
  date: string
}

export function SynaxariumDialog({
  open,
  onOpenChange,
  darkMode,
  isHolyWeek,
  isEaster,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  darkMode: boolean
  isHolyWeek: boolean
  isEaster: boolean
}) {
  const [synaxariumData, setSynaxariumData] = useState<SynaxariumEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      setLoading(true)
      // In a real app, you would fetch from the API
      // For this demo, we'll use a simulated fetch with sample data
      setTimeout(() => {
        const today = new Date()
        const currentDay = today.getDate()
        const currentMonth = today.getMonth() + 1

        // Sample data - in a real app this would come from the API
        const sampleData: SynaxariumEntry = {
          title: "1 بشنس عيد تذكار",
          content: `ذكرى القديسة العذراء مريم، والقديس أثناسيوس الرسولي، والشهداء الآخرين الذين يتم الاحتفال بهم في هذا اليوم. في هذا اليوم تحتفل الكنيسة بتذكار السيدة العذراء مريم والدة الإله، وتذكار القديس أثناسيوس الرسولي بطريرك الإسكندرية العشرين، الذي دافع عن الإيمان المستقيم ضد بدعة آريوس، وكان له دور كبير في مجمع نيقية المسكوني الأول سنة 325م. وقد نفي عن كرسيه خمس مرات بسبب تمسكه بالإيمان المستقيم، وكتب العديد من الرسائل والمقالات اللاهوتية الهامة، ووضع قانون الإيمان المسيحي. تنيح في 2 مايو سنة 373م.`,
          date: `${currentDay} / ${currentMonth} / ${today.getFullYear()}`,
        }

        setSynaxariumData(sampleData)
        setLoading(false)
      }, 1500)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-3xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"} 
        ${isHolyWeek ? "bg-gray-900 text-gray-300 border-gray-700" : ""} 
        ${isEaster ? "border-yellow-300" : ""}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : ""} 
            ${isHolyWeek ? "text-gray-300" : ""} 
            ${isEaster ? "text-yellow-700" : "text-green-700"}`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            تذكار السنكسار اليومي
          </DialogTitle>
        </DialogHeader>

        <div
          className={`${darkMode ? "bg-gray-700/30" : "bg-green-50"} p-6 rounded-lg 
          ${isHolyWeek ? "bg-gray-800" : ""} 
          ${isEaster ? "bg-yellow-50" : ""}`}
          dir="rtl"
        >
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Calendar
                  className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"} 
                  ${isHolyWeek ? "text-gray-400" : ""} 
                  ${isEaster ? "text-yellow-600" : ""}`}
                />
                <p
                  className={`font-bold ${darkMode ? "text-green-400" : "text-green-800"} 
                  ${isHolyWeek ? "text-gray-300" : ""} 
                  ${isEaster ? "text-yellow-700" : ""}`}
                >
                  {synaxariumData?.date}
                </p>
              </div>

              <h3
                className={`text-xl font-bold mb-4 ${darkMode ? "text-green-300" : "text-green-900"} 
                ${isHolyWeek ? "text-gray-200" : ""} 
                ${isEaster ? "text-yellow-800" : ""}`}
              >
                {synaxariumData?.title}
              </h3>

              <div className="flex items-start mb-4">
                <Book
                  className={`h-5 w-5 mt-1 mr-2 ${darkMode ? "text-green-400" : "text-green-600"} 
                ${isHolyWeek ? "text-gray-400" : ""} 
                ${isEaster ? "text-yellow-600" : ""}`}
                />
                <p className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {synaxariumData?.content}
                </p>
              </div>

              <div className="text-center mt-6 text-sm text-gray-500">بيشوي مراد من موقعه الرسمي</div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SynaxariumCard({
  darkMode,
  isHolyWeek,
  isEaster,
  onClick,
}: {
  darkMode: boolean
  isHolyWeek: boolean
  isEaster: boolean
  onClick: () => void
}) {
  return (
    <Card
      className={`cursor-pointer ${darkMode ? "hover:bg-gray-800 bg-gray-800" : "hover:bg-green-50 bg-white"} 
      transition-colors ${isHolyWeek ? "bg-gray-800 border-gray-700" : ""} 
      ${isEaster ? "border-yellow-300" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-3 flex items-center gap-2">
        <div
          className={`${darkMode ? "bg-green-900" : "bg-green-100"} p-2 rounded-full 
          ${isHolyWeek ? "bg-gray-700" : ""} 
          ${isEaster ? "bg-yellow-100" : ""}`}
        >
          <Book
            className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"} 
            ${isHolyWeek ? "text-gray-400" : ""} 
            ${isEaster ? "text-yellow-600" : ""}`}
          />
        </div>
        <div className="flex-1">
          <h3
            className={`text-base font-bold ${darkMode ? "text-green-400" : "text-green-800"} 
            ${isHolyWeek ? "text-gray-300" : ""} 
            ${isEaster ? "text-yellow-700" : ""}`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            تذكار السنكسار اليومي
          </h3>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>
            قراءة تذكار قديسي اليوم من السنكسار
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
