"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HelpCircle,
  Brain,
  Moon,
  Sun,
  AlertCircle,
  Calendar,
  Upload,
  FileText,
  PlusCircle,
  X,
  Search,
  Check,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Add import for the Synaxarium components
import { SynaxariumCard, SynaxariumDialog } from "@/components/synaxarium"

// Add more animations for Holy Week and Easter
const animateSpinSlow = `
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
}
.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes reveal-text {
  0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
  100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}
.animate-reveal-text {
  animation: reveal-text 1.5s ease-out forwards;
}

@keyframes celebration {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-celebration {
  animation: celebration 2s ease-in-out infinite;
}

@keyframes mourning-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}
.animate-mourning {
  animation: mourning-pulse 4s ease-in-out infinite;
}

@keyframes holy-week-bg {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-holy-week-bg {
  background: linear-gradient(270deg, #1f2937, #111827);
  background-size: 200% 200%;
  animation: holy-week-bg 8s ease infinite;
}

@keyframes easter-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
  50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.8); }
}
.animate-easter-glow {
  animation: easter-glow 3s ease-in-out infinite;
}

@keyframes cross-fade {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}
.animate-cross-fade {
  animation: cross-fade 5s ease-in-out infinite;
}

/* Fancy border animation */
@keyframes border-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); }
  50% { box-shadow: 0 0 20px rgba(0, 0, 0, 1); }
}
.animate-border-glow {
  animation: border-glow 3s ease-in-out infinite;
}

/* Watermark animation */
@keyframes watermark-fade {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.15; }
}
.animate-watermark-fade {
  animation: watermark-fade 8s ease-in-out infinite;
}
`

type Student = {
  id: string
  name: string
  number: string
  birthDate: string
  month: string
  fridays: boolean[]
  behavior: number
  commitment: number
  percentage: number
  photoUrl?: string
  notes?: string
  lastUpdated?: string
}

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "إبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]

// Updated Bible verses data for April 2025
const bibleVerses = [
  {
    date: "8 مايو",
    day: "الخميس",
    verse: "لَكِنِ الَّذِينَ يَتَرَجُّونَ الرَّبَّ يُجَدِّدُونَ قُوَّتَهُمْ.",
    reference: "إشعياء 40: 31",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "9 مايو",
    day: "الجمعة",
    verse: "قَدْ غَلَبْتُمُوهُمْ، لأَنَّ الَّذِي فِيكُمْ أَعْظَمُ مِنَ الَّذِي فِي الْعَالَمِ.",
    reference: "1 يوحنا 4: 4",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "10 مايو",
    day: "السبت",
    verse: "اَلرَّبُّ يُحَافِظُ عَلَى جَمِيعِ مُحِبِّيهِ.",
    reference: "مزمور 145: 20",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "11 مايو",
    day: "الأحد",
    verse: "اُطْلُبُوا وَتُعْطَوْا. اُقْرَعُوا وَيُفْتَحُ لَكُمْ.",
    reference: "متى 7: 7",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "12 مايو",
    day: "الإثنين",
    verse: "اَلرَّبُّ قُوَّتِي وَتَرْنِيمَتِي، وَقَدْ صَارَ لِي خَلاَصًا.",
    reference: "خروج 15: 2",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "13 مايو",
    day: "الثلاثاء",
    verse: "فِي الضِّيقِ دَعَوْتَ، فَنَجَّيْتُكَ.",
    reference: "مزمور 81: 7",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "14 مايو",
    day: "الأربعاء",
    verse: "لَا يَتْرُكُكَ وَلاَ يَخْذُلُكَ.",
    reference: "تثنية 31: 6",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "15 مايو",
    day: "الخميس",
    verse: "اَلرَّبُّ يُعِينُهُمْ وَيُنَجِّيهِمْ.",
    reference: "مزمور 37: 40",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "16 مايو",
    day: "الجمعة",
    verse: "لِكُلِّ شَيْءٍ زَمَانٌ، وَلِكُلِّ أَمْرٍ تَحْتَ السَّمَاوَاتِ وَقْتٌ.",
    reference: "جامعة 3: 1",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "17 مايو",
    day: "السبت",
    verse: "إِنَّكَ تُحِيطُ بِي مِنْ كُلِّ جِهَةٍ، وَتَضَعُ يَدَكَ عَلَيَّ.",
    reference: "مزمور 139: 5",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "18 مايو",
    day: "الأحد",
    verse: "اَلرَّبُّ يُبَارِكُ شَعْبَهُ بِالسَّلاَمِ.",
    reference: "مزمور 29: 11",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "19 مايو",
    day: "الإثنين",
    verse: "مَا لَمْ تَرَهُ عَيْنٌ، وَمَا لَمْ تَسْمَعْ بِهِ أُذُنٌ، مَا أَعَدَّهُ اللهُ لِلَّذِينَ يُحِبُّونَهُ.",
    reference: "1 كورنثوس 2: 9",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "20 مايو",
    day: "الثلاثاء",
    verse: "اَلرَّبُّ مَلْجَأٌ لِلْمَسَاكِينِ، مَلْجَأٌ فِي أَزْمِنَةِ الضِّيقِ.",
    reference: "إشعياء 25: 4",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "21 مايو",
    day: "الأربعاء",
    verse: "لَا تَخَافُوا لأَنِّي مَعَكُمْ.",
    reference: "إشعياء 43: 5",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "22 مايو",
    day: "الخميس",
    verse: "اَلرَّبُّ نُورِي وَخَلاَصِي.",
    reference: "مزمور 27: 1",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "23 مايو",
    day: "الجمعة",
    verse: "تَشَدَّدُوا وَتَشَجَّعُوا، لَا تَخَافُوا.",
    reference: "تثنية 31: 6",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "24 مايو",
    day: "السبت",
    verse: "لَا تَتْرُكْ قَلْبَكَ يَفْشَلُ.",
    reference: "أمثال 4: 23",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "25 مايو",
    day: "الأحد",
    verse: "اَلرَّبُّ حَارِسُكَ، الرَّبُّ ظِلُّكَ عَنْ يَدِكَ الْيُمْنَى.",
    reference: "مزمور 121: 5",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "26 مايو",
    day: "الإثنين",
    verse: "قَدْ جَعَلْتُ الرَّبَّ أَمَامِي فِي كُلِّ حِينٍ.",
    reference: "مزمور 16: 8",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "27 مايو",
    day: "الثلاثاء",
    verse: "اَلرَّبُّ يُحَارِبُ عَنْكُمْ، وَأَنْتُمْ تَصْمُتُونَ.",
    reference: "خروج 14: 14",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "28 مايو",
    day: "الأربعاء",
    verse: "اُثْبُتُوا فِي الإِيمَانِ، تَشَدَّدُوا.",
    reference: "1 كورنثوس 16: 13",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "29 مايو",
    day: "الخميس",
    verse: "لَا يَخْذُلُكَ وَلاَ يَتْرُكُكَ.",
    reference: "يشوع 1: 5",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "30 مايو",
    day: "الجمعة",
    verse: "اَلرَّبُّ يَسْمَعُ، وَيُنْقِذُكَ.",
    reference: "مزمور 34: 17",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
  {
    date: "31 مايو",
    day: "السبت",
    verse: "إِنَّ اللهَ لَنَا مَلْجَأٌ وَقُوَّةٌ، عَوْنًا فِي الضِّيقَاتِ.",
    reference: "مزمور 46: 1",
    explanation: "شوف ربنا بيقولك اي واسمع كلامـــــه ..!",
  },
]

// App version and updates
const APP_VERSION = "1.0.0"
const APP_UPDATES = {}

// Usage instructions image
const USAGE_INSTRUCTIONS_IMAGE = "/placeholder.svg?height=800&width=600"

// صور الأحداث المقدسة
const BLIND_MAN_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qSogjM7UD6HNbrnRwhSma9pmXCYqK3.png"
const MONDAY_HOLY_WEEK_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EptuZVUw0FnReChM9u8z4eZfXuzc2i.png"
const TUESDAY_HOLY_WEEK_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9l2eFaIlo6vT6KzC81wGiZQlXAkQs3.png"

// QR Code URL - This would be a real QR code in a production app
const QR_CODE_URL = "/placeholder.svg?height=100&width=100"

// Church logo
const CHURCH_LOGO = "/church-logo.png"

export default function AttendanceTracker() {
  const [students, setStudents] = useState<Student[]>([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [month, setMonth] = useState("")
  const [fridays, setFridays] = useState([false, false, false, false])
  const [behavior, setBehavior] = useState(0)
  const [commitment, setCommitment] = useState(0)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [hasBorder, setHasBorder] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("")
  const [showStats, setShowStats] = useState(false)
  const [showPrintConfirm, setShowPrintConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const reportCanvasRef = useRef<HTMLCanvasElement>(null)
  const excelExportRef = useRef<HTMLAnchorElement>(null)

  const { toast } = useToast()

  // Add state for the Synaxarium dialog
  const [showSynaxarium, setShowSynaxarium] = useState(false)

  // Get current date for Bible verse and special events
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1
  const currentDate = `${currentDay} ${months[today.getMonth()]}`

  // Find the verse for today's date
  const getCurrentVerse = () => {
    // First try to find by exact date
    const verseByDate = bibleVerses.find((v) => v.date === currentDate)
    if (verseByDate) return verseByDate

    // If not found, use the closest date in April
    if (currentMonth === 4) {
      // Find the closest date
      const aprilVerses = bibleVerses.filter((v) => v.date.includes("أبريل"))
      if (aprilVerses.length === 0) return bibleVerses[0]

      // Extract day numbers and find closest
      const dayNumbers = aprilVerses.map((v) => {
        const dayStr = v.date.split(" ")[0]
        return Number.parseInt(dayStr, 10)
      })

      // Find closest day
      let closestDay = dayNumbers[0]
      let minDiff = Math.abs(currentDay - closestDay)

      for (let i = 1; i < dayNumbers.length; i++) {
        const diff = Math.abs(currentDay - dayNumbers[i])
        if (diff < minDiff) {
          minDiff = diff
          closestDay = dayNumbers[i]
        }
      }

      return aprilVerses[dayNumbers.indexOf(closestDay)]
    }

    // Default to first verse if nothing matches
    return bibleVerses[0]
  }

  const currentVerse = getCurrentVerse()

  // Check for special dates
  const isHolyWeek = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1 // JavaScript months are 0-indexed
    const hour = today.getHours()

    // April 13th after 6 PM or between April 14-19
    return month === 4 && ((day === 13 && hour >= 18) || (day >= 14 && day <= 19))
  }

  const isEaster = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1

    // April 20th
    return month === 4 && day === 20
  }

  const isBlindManWeek = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1

    // Until April 11th
    return month === 4 && day <= 11
  }

  const isHolyMonday = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1

    // April 14th
    return month === 4 && day === 14
  }

  const isHolyTuesday = () => {
    const day = today.getDate()
    const month = today.getMonth() + 1

    // April 15th
    return month === 4 && day === 15
  }

  // Get special text based on date for watermark
  const getSpecialTextForWatermark = () => {
    return "الكمبيوتر وتكنلوجيا المعلومات والآتصالآت"
  }

  // Special Text Watermark component
  const SpecialTextWatermark = () => {
    const watermarkText = getSpecialTextForWatermark()

    // Special styling for Holy Week (mourning)
    const holyWeekStyle = isHolyWeek()
      ? {
          color: "#4a4a4a",
          opacity: 0.4,
          animation: "mourning-pulse 4s ease-in-out infinite",
        }
      : {}

    // Special styling for Easter (celebration)
    const easterStyle = isEaster()
      ? {
          color: "#ffd700",
          opacity: 0.4,
          animation: "celebration 2s ease-in-out infinite",
        }
      : {}

    // Default style
    const defaultStyle = {
      color: "#3b82f6",
      opacity: 0.3,
    }

    // Choose the appropriate style
    const styleToUse = isHolyWeek() ? holyWeekStyle : isEaster() ? easterStyle : defaultStyle

    return (
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="text-center w-full flex flex-col items-center justify-center py-10">
          <div className="flex items-center justify-center">
            <h1
              className={`text-6xl md:text-7xl font-extrabold transform ${isHolyWeek() ? "animate-mourning" : isEaster() ? "animate-celebration" : ""}`}
              style={{
                fontFamily: "'El Messiri', 'Noto Kufi Arabic', 'Amiri', serif",
                whiteSpace: "nowrap",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                ...styleToUse,
                textAlign: "center",
              }}
            >
              {watermarkText}
            </h1>
            <span
              className="text-6xl md:text-7xl font-extrabold ml-4"
              style={{
                fontFamily: "'Arial Black', 'Helvetica', sans-serif",
                textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                color: "#22c55e", // Green color
                opacity: 0.5,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-7c.83 0 1.5-.67 1.5-1.5S10.33 10 9.5 10 8 10.67 8 11.5 8.67 13 9.5 13zm5 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-2.5 3c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </span>
          </div>

          {isEaster() && (
            <h2
              className="text-4xl md:text-5xl font-extrabold mt-2 text-yellow-500 animate-celebration"
              style={{
                fontFamily: "'Noto Kufi Arabic', 'Amiri', serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                opacity: 0.6,
              }}
            >
              المسيـــــــــــــح قام بالحقيقية قــام
            </h2>
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-gray-500 font-bold text-sm">beshoymorad</div>
      </div>
    )
  }

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme) {
      setDarkMode(savedTheme === "true")
    }

    // Load saved students data
    const savedStudents = localStorage.getItem("students")
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }

    // Set border if app version is 1.0.3 or higher
    if (APP_VERSION === "1.0.3") {
      setHasBorder(true)
    }

    // Force dark mode during Holy Week
    if (isHolyWeek()) {
      setDarkMode(true)
    }
  }, [])

  // Apply dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode.toString())
  }, [darkMode])

  // Save data to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students))
  }, [students])

  const calculatePercentage = (fridays: boolean[], behavior: number, commitment: number) => {
    const fridaysPercentage = fridays.reduce((acc, curr) => acc + (curr ? 20 : 0), 0)
    return fridaysPercentage + behavior + commitment
  }

  const getProgressEmoji = (percentage: number) => {
    if (percentage >= 90) return "🌟"
    if (percentage >= 75) return "😀"
    if (percentage >= 60) return "🙂"
    if (percentage >= 40) return "😐"
    return "😞"
  }

  const handleAddStudent = () => {
    if (!name || !number || !birthDate || !month) return

    if (students.length >= 200) {
      toast({
        title: "تنبيه",
        description: "لقد وصلت إلى الحد الأقصى من الطلاب (200)",
        variant: "destructive",
      })
      return
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      number: number.startsWith("666") ? number : "666" + number,
      birthDate: birthDate,
      month,
      fridays,
      behavior,
      commitment,
      percentage: calculatePercentage(fridays, behavior, commitment),
      photoUrl: photoUrl || undefined,
      notes: notes || undefined,
      lastUpdated: new Date().toISOString(),
    }

    setStudents([...students, newStudent])
    resetForm()

    toast({
      title: "تم بنجاح",
      description: "تم إضافة الطالب بنجاح",
      variant: "default",
    })
  }

  const resetForm = () => {
    setName("")
    setNumber("")
    setBirthDate("")
    setMonth("")
    setFridays([false, false, false, false])
    setBehavior(0)
    setCommitment(0)
    setPhotoUrl(null)
    setNotes("")
  }

  const updateFriday = (studentId: string, fridayIndex: number, value: boolean) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const newFridays = [...student.fridays]
          newFridays[fridayIndex] = value
          const newPercentage = calculatePercentage(newFridays, student.behavior, student.commitment)
          return {
            ...student,
            fridays: newFridays,
            percentage: newPercentage,
            lastUpdated: new Date().toISOString(),
          }
        }
        return student
      }),
    )
  }

  const updateBehavior = (studentId: string, value: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const newPercentage = calculatePercentage(student.fridays, value, student.commitment)
          return {
            ...student,
            behavior: value,
            percentage: newPercentage,
            lastUpdated: new Date().toISOString(),
          }
        }
        return student
      }),
    )
  }

  const updateCommitment = (studentId: string, value: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const newPercentage = calculatePercentage(student.fridays, student.behavior, value)
          return {
            ...student,
            commitment: value,
            percentage: newPercentage,
            lastUpdated: new Date().toISOString(),
          }
        }
        return student
      }),
    )
  }

  const updateStudentNotes = (studentId: string, notes: string) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            notes,
            lastUpdated: new Date().toISOString(),
          }
        }
        return student
      }),
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadUsageInstructions = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = USAGE_INSTRUCTIONS_IMAGE
    link.download = "دليل_استخدام_التطبيق.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "تم التحميل",
      description: "تم تحميل دليل استخدام التطبيق بنجاح",
    })
  }

  const generateStudentReport = (student: Student) => {
    setSelectedStudent(student)
    setShowPrintConfirm(true)
  }

  // Update the renderAdvancedReport function to create the report with the requested format
  const renderAdvancedReport = () => {
    if (!selectedStudent || !reportCanvasRef.current) return

    setTimeout(() => {
      if (reportCanvasRef.current && selectedStudent) {
        const canvas = reportCanvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions - make it more phone-friendly
        canvas.width = 600
        canvas.height = 800

        // Fill background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw fancy black border - make it stronger
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 20
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

        // Add inner border
        ctx.strokeStyle = "#222222"
        ctx.lineWidth = 2
        ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50)

        // Add QR code at the top left
        const qrSize = 80
        const qrX = 50
        const qrY = 50

        // Draw placeholder for QR code
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(qrX, qrY, qrSize, qrSize)
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        ctx.strokeRect(qrX, qrY, qrSize, qrSize)

        // Add pattern inside QR code
        ctx.fillStyle = "#000000"
        const cellSize = qrSize / 8
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(qrX + i * cellSize, qrY + j * cellSize, cellSize, cellSize)
            }
          }
        }

        // Add logo at the top right
        const logoSize = 80
        const logoX = canvas.width - 50 - logoSize
        const logoY = 50

        // Draw placeholder for logo
        ctx.fillStyle = "#22c55e" // Green color
        ctx.beginPath()
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 40px Arial"
        ctx.textAlign = "center"
        ctx.fillText("VS", logoX + logoSize / 2, logoY + logoSize / 2 + 15)

        // Add header rectangle with student info
        ctx.fillStyle = "#f8f8f8"
        ctx.fillRect(50, 150, canvas.width - 100, 150)
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 3
        ctx.strokeRect(50, 150, canvas.width - 100, 150)

        // Add student name and info
        ctx.fillStyle = "#000000"
        ctx.font = "bold 24px 'Noto Kufi Arabic', serif"
        ctx.textAlign = "right"
        ctx.fillText(`الاسم: ${selectedStudent.name}`, canvas.width - 80, 180)

        // Add student number (starting with 666)
        const studentNumber = selectedStudent.number.startsWith("666")
          ? selectedStudent.number
          : "666" + selectedStudent.number
        ctx.font = "bold 18px 'Noto Kufi Arabic', serif"
        ctx.fillText(`الرقم: ${studentNumber}`, canvas.width - 80, 210)

        // Add code
        const randomCode =
          "SYS" +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")
        ctx.fillText(`الكود: ${randomCode} من النظــــــام`, canvas.width - 80, 240)

        // Add birth date
        ctx.fillText(`تاريخ الميلاد: ${selectedStudent.birthDate}`, canvas.width - 80, 270)

        // Draw circular student photo on the left
        const photoX = 120
        const photoY = 225
        const photoRadius = 50

        // Draw circular clipping path
        ctx.save()
        ctx.beginPath()
        ctx.arc(photoX, photoY, photoRadius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()

        // Draw photo or placeholder
        if (selectedStudent.photoUrl) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            ctx.drawImage(img, photoX - photoRadius, photoY - photoRadius, photoRadius * 2, photoRadius * 2)
            ctx.restore()

            // Continue drawing the rest of the report
            finishReport()
          }
          img.src = selectedStudent.photoUrl
        } else {
          ctx.fillStyle = "#cccccc"
          ctx.fillRect(photoX - photoRadius, photoY - photoRadius, photoRadius * 2, photoRadius * 2)
          ctx.fillStyle = "#666666"
          ctx.font = "bold 40px Arial"
          ctx.textAlign = "center"
          ctx.fillText(selectedStudent.name.charAt(0), photoX, photoY + 15)
          ctx.restore()

          // Continue drawing the rest of the report
          finishReport()
        }

        function finishReport() {
          // Add attendance rectangle
          ctx.fillStyle = "#f8f8f8"
          ctx.fillRect(50, 320, canvas.width - 100, 200)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 3
          ctx.strokeRect(50, 320, canvas.width - 100, 200)

          // Create attendance table
          const tableTop = 340
          const tableWidth = canvas.width - 140
          const rowHeight = 40
          const colWidth = tableWidth / 4

          // Draw table header
          ctx.fillStyle = "#f0f0f0"
          ctx.fillRect(70, tableTop, tableWidth, rowHeight)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 1
          ctx.strokeRect(70, tableTop, tableWidth, rowHeight)

          // Draw table header text
          ctx.fillStyle = "#000000"
          ctx.font = "bold 16px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"

          ctx.fillText("الجمعة 1", 70 + colWidth * 0.5, tableTop + 25)
          ctx.fillText("الجمعة 2", 70 + colWidth * 1.5, tableTop + 25)
          ctx.fillText("الجمعة 3", 70 + colWidth * 2.5, tableTop + 25)
          ctx.fillText("الجمعة 4", 70 + colWidth * 3.5, tableTop + 25)

          // Draw vertical lines
          for (let i = 1; i < 4; i++) {
            ctx.beginPath()
            ctx.moveTo(70 + colWidth * i, tableTop)
            ctx.lineTo(70 + colWidth * i, tableTop + rowHeight * 2)
            ctx.stroke()
          }

          // Draw attendance data
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(70, tableTop + rowHeight, tableWidth, rowHeight)
          ctx.strokeRect(70, tableTop + rowHeight, tableWidth, rowHeight)

          // Fill attendance data
          ctx.fillStyle = "#000000"
          ctx.font = "16px 'Noto Kufi Arabic', serif"

          for (let i = 0; i < 4; i++) {
            const status = selectedStudent.fridays[i] ? "✓ حاضر" : "✗ غائب"
            ctx.fillText(status, 70 + colWidth * (i + 0.5), tableTop + rowHeight + 25)
          }

          // Draw behavior and commitment section
          const bcTop = tableTop + rowHeight * 2 + 20

          ctx.font = "bold 18px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "right"
          ctx.fillText("السلوك:", canvas.width - 80, bcTop)
          ctx.fillText("الالتزام:", canvas.width - 80, bcTop + 40)

          // Draw behavior bar
          const barWidth = 250
          const barHeight = 20
          const barLeft = canvas.width - 350

          ctx.fillStyle = "#f0f0f0"
          ctx.fillRect(barLeft, bcTop - 15, barWidth, barHeight)

          ctx.fillStyle = "#4caf50"
          ctx.fillRect(barLeft, bcTop - 15, (selectedStudent.behavior / 5) * barWidth, barHeight)

          ctx.strokeStyle = "#000000"
          ctx.strokeRect(barLeft, bcTop - 15, barWidth, barHeight)

          ctx.fillStyle = "#000000"
          ctx.textAlign = "left"
          ctx.fillText(`${selectedStudent.behavior}/5`, barLeft + barWidth + 10, bcTop)

          // Draw commitment bar
          ctx.fillStyle = "#f0f0f0"
          ctx.fillRect(barLeft, bcTop + 25, barWidth, barHeight)

          ctx.fillStyle = "#2196f3"
          ctx.fillRect(barLeft, bcTop + 25, (selectedStudent.commitment / 5) * barWidth, barHeight)

          ctx.strokeStyle = "#000000"
          ctx.strokeRect(barLeft, bcTop + 25, barWidth, barHeight)

          ctx.fillStyle = "#000000"
          ctx.textAlign = "left"
          ctx.fillText(`${selectedStudent.commitment}/5`, barLeft + barWidth + 10, bcTop + 40)

          // Draw percentage with 3D effect
          const percentTop = 540
          ctx.font = "bold 24px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"

          // Draw 3D effect for percentage
          ctx.fillStyle = "#22c55e" // Green shadow
          ctx.fillText(`النسبة الإجمالية: ${selectedStudent.percentage}%`, canvas.width / 2 + 3, percentTop + 3)
          ctx.fillStyle = "#000000" // Main text
          ctx.fillText(`النسبة الإجمالية: ${selectedStudent.percentage}%`, canvas.width / 2, percentTop)

          // Draw 3D progress emoji
          ctx.font = "bold 40px Arial"
          ctx.fillStyle = "#22c55e" // Green shadow
          ctx.fillText(getProgressEmoji(selectedStudent.percentage), canvas.width / 2 + 5, percentTop + 50)
          ctx.fillStyle = "#000000" // Main emoji
          ctx.fillText(getProgressEmoji(selectedStudent.percentage), canvas.width / 2, percentTop + 45)

          // Add notes if available
          if (selectedStudent.notes) {
            const notesTop = percentTop + 80
            ctx.font = "bold 18px 'Noto Kufi Arabic', serif"
            ctx.textAlign = "right"
            ctx.fillText("ملاحظات:", canvas.width - 80, notesTop)

            ctx.font = "16px 'Noto Kufi Arabic', serif"

            // Wrap text for notes
            const maxWidth = canvas.width - 160
            const words = selectedStudent.notes.split(" ")
            let line = ""
            let lineY = notesTop + 25

            for (let i = 0; i < words.length; i++) {
              const testLine = line + words[i] + " "
              const metrics = ctx.measureText(testLine)

              if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(line, canvas.width - 80, lineY)
                line = words[i] + " "
                lineY += 25
              } else {
                line = testLine
              }
            }
            ctx.fillText(line, canvas.width - 80, lineY)
          }

          // Add "فريق النظام بيشوي مراد" at the bottom
          ctx.font = "bold 16px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"
          ctx.fillText("فريق النظام بيشوي مراد", canvas.width / 2, canvas.height - 100)

          // Add watermark
          ctx.save()
          ctx.globalAlpha = 0.1
          ctx.font = "bold 30px 'El Messiri', 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"
          ctx.fillText("الكمبيوتر وتكنلوجيا المعلومات والآتصالآت", canvas.width / 2, canvas.height - 60)
          ctx.restore()

          // Add "Made by Beshoy Morad" in English at the bottom
          ctx.font = "12px Arial"
          ctx.textAlign = "right"
          ctx.fillText("Made by Beshoy Morad", canvas.width - 60, canvas.height - 30)

          // Add WiFi router icon
          ctx.fillStyle = "#22c55e" // Green color
          ctx.beginPath()
          ctx.arc(canvas.width - 40, canvas.height - 35, 10, 0, Math.PI * 2)
          ctx.fill()

          // Draw WiFi waves
          ctx.strokeStyle = "#22c55e"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(canvas.width - 40, canvas.height - 35, 15, Math.PI, 0)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(canvas.width - 40, canvas.height - 35, 20, Math.PI, 0)
          ctx.stroke()
        }
      }
    }, 100)
  }

  // Update the shareViaWhatsApp function to share directly to the student's number
  const shareViaWhatsApp = () => {
    if (!selectedStudent) return

    // Extract the phone number from the student number (remove the 666 prefix)
    let phoneNumber = selectedStudent.number
    if (phoneNumber.startsWith("666")) {
      phoneNumber = phoneNumber.substring(3)
    }

    // Add Egypt country code if needed
    if (!phoneNumber.startsWith("+") && !phoneNumber.startsWith("2")) {
      phoneNumber = "2" + phoneNumber
    }

    // Create a message to share
    const message = `
تقرير الطالب: ${selectedStudent.name}
الرقم: ${selectedStudent.number}
النسبة الإجمالية: ${selectedStudent.percentage}%
الحضور: ${selectedStudent.fridays.filter((f) => f).length} من 4 جمعات
السلوك: ${selectedStudent.behavior}/5
الالتزام: ${selectedStudent.commitment}/5
  `

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message)

    // Create WhatsApp URL with the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new window
    window.open(whatsappUrl, "_blank")

    toast({
      title: "تمت المشاركة",
      description: "تم فتح واتساب لمشاركة التقرير مع الطالب",
    })
  }

  const downloadStudentReport = () => {
    if (!selectedStudent || !reportCanvasRef.current) return

    // Render the advanced report first
    renderAdvancedReport()

    // Wait for the report to render
    setTimeout(() => {
      // Get the canvas data as an image
      const dataUrl = reportCanvasRef.current!.toDataURL("image/png")

      // Create a link to download the image
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `تقرير_${selectedStudent.name}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "تم التحميل",
        description: "تم تحميل تقرير الطالب بنجاح",
      })

      // Close the confirmation dialog
      setShowPrintConfirm(false)
    }, 500)
  }

  const exportToExcel = () => {
    // In a real application, you would generate a proper Excel file
    // For this example, we'll create a CSV file

    // Create CSV header
    let csv = "الاسم,الرقم,تاريخ الميلاد,الشهر,الجمعة 1,الجمعة 2,الجمعة 3,الجمعة 4,السلوك,الالتزام,النسبة,الملاحظات\n"

    // Add each student as a row
    students.forEach((student) => {
      const row = [
        student.name,
        student.number,
        student.birthDate,
        student.month,
        student.fridays[0] ? "حاضر" : "غائب",
        student.fridays[1] ? "حاضر" : "غائب",
        student.fridays[2] ? "حاضر" : "غائب",
        student.fridays[3] ? "حاضر" : "غائب",
        student.behavior,
        student.commitment,
        student.percentage + "%",
        student.notes || "",
      ]

      csv += row.join(",") + "\n"
    })

    // Create a Blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    // Create a link to download the CSV
    const link = document.createElement("a")
    link.href = url
    link.download = `تقرير_الطلاب_${new Date().toLocaleDateString()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "تم التصدير",
      description: "تم تصدير بيانات الطلاب بنجاح",
    })
  }

  const backupData = () => {
    // Create a backup object with all data
    const backup = {
      students,
      appVersion: localStorage.getItem("appVersion") || APP_VERSION,
      timestamp: new Date().toISOString(),
    }

    // Convert to JSON
    const backupJson = JSON.stringify(backup, null, 2)

    // Create a Blob with the JSON data
    const blob = new Blob([backupJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    // Create a link to download the backup
    const link = document.createElement("a")
    link.href = url
    link.download = `نسخة_احتياطية_${new Date().toLocaleDateString()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "تم النسخ الاحتياطي",
      description: "تم حفظ نسخة احتياطية من البيانات بنجاح",
    })
  }

  const restoreData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const backup = JSON.parse(event.target?.result as string)

        // Validate backup data
        if (backup.students && Array.isArray(backup.students)) {
          setStudents(backup.students)

          toast({
            title: "تم الاستعادة",
            description: "تم استعادة البيانات من النسخة الاحتياطية بنجاح",
          })
        } else {
          throw new Error("Invalid backup file")
        }
      } catch (error) {
        toast({
          title: "خطأ",
          description: "ملف النسخة الاحتياطية غير صالح",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  // Filter students based on search term and month filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.number.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMonth = filterMonth === "" || student.month === filterMonth

    return matchesSearch && matchesMonth
  })

  // Calculate statistics
  const calculateStats = () => {
    if (students.length === 0) return null

    const totalStudents = students.length
    const averageAttendance =
      (students.reduce((acc, student) => acc + student.fridays.filter((f) => f).length / 4, 0) / totalStudents) * 100

    const averageBehavior = students.reduce((acc, student) => acc + student.behavior, 0) / totalStudents
    const averageCommitment = students.reduce((acc, student) => acc + student.commitment, 0) / totalStudents
    const averagePercentage = students.reduce((acc, student) => acc + student.percentage, 0) / totalStudents

    const excellentStudents = students.filter((s) => s.percentage >= 90).length
    const goodStudents = students.filter((s) => s.percentage >= 75 && s.percentage < 90).length
    const averageStudents = students.filter((s) => s.percentage >= 60 && s.percentage < 75).length
    const belowAverageStudents = students.filter((s) => s.percentage < 60).length

    return {
      totalStudents,
      averageAttendance: Math.round(averageAttendance),
      averageBehavior: Math.round(averageBehavior * 10) / 10,
      averageCommitment: Math.round(averageCommitment * 10) / 10,
      averagePercentage: Math.round(averagePercentage),
      excellentStudents,
      goodStudents,
      averageStudents,
      belowAverageStudents,
    }
  }

  // Get theme based on special dates
  const getThemeStyles = () => {
    if (isHolyWeek()) {
      return {
        headerBg: darkMode ? "bg-gray-900" : "bg-gray-800",
        headerText: "text-gray-300",
        buttonBg: "bg-gray-700 hover:bg-gray-600",
        cardBg: darkMode ? "bg-gray-900" : "bg-gray-800",
        borderColor: "border-gray-700",
      }
    } else if (isEaster()) {
      return {
        headerBg: darkMode
          ? "bg-gradient-to-r from-yellow-900 to-yellow-700"
          : "bg-gradient-to-r from-yellow-600 to-yellow-400",
        headerText: "text-white",
        buttonBg: "bg-yellow-600 hover:bg-yellow-500",
        cardBg: darkMode ? "bg-gray-800" : "bg-white",
        borderColor: "border-yellow-500",
      }
    } else {
      return {
        headerBg: darkMode
          ? "bg-gradient-to-r from-green-900 to-green-700"
          : "bg-gradient-to-r from-green-600 to-green-800",
        headerText: "text-white",
        buttonBg: darkMode ? "bg-green-700 hover:bg-green-600" : "bg-green-600 hover:bg-green-700",
        cardBg: darkMode ? "bg-gray-800" : "bg-white",
        borderColor: "border-green-600",
      }
    }
  }

  const themeStyles = getThemeStyles()

  // Component for displaying the special images based on date
  const SpecialImage = () => {
    if (isBlindManWeek()) {
      return (
        <div className="absolute top-24 right-4 md:right-8 z-10 w-32 md:w-48">
          <div className="relative">
            <div className="absolute inset-0 border-4 border-black rounded-lg"></div>
            <div className="absolute top-0 left-0 right-0 bg-black text-white text-center py-1 text-sm md:text-base font-bold rounded-t-lg">
              شفاء الآعمــــى
            </div>
            <img
              src={BLIND_MAN_IMAGE || "/placeholder.svg"}
              alt="شفاء الأعمى"
              className="rounded-lg border-2 border-gray-300 mt-6"
            />
          </div>
        </div>
      )
    } else if (isHolyMonday()) {
      return (
        <div className="absolute top-24 right-4 md:right-8 z-10 w-32 md:w-48">
          <img
            src={MONDAY_HOLY_WEEK_IMAGE || "/placeholder.svg"}
            alt="اثنين البصخة"
            className="rounded-lg border-2 border-gray-300"
          />
        </div>
      )
    } else if (isHolyTuesday()) {
      return (
        <div className="absolute top-24 right-4 md:right-8 z-10 w-32 md:w-48">
          <img
            src={TUESDAY_HOLY_WEEK_IMAGE || "/placeholder.svg"}
            alt="ثلاثاء البصخة"
            className="rounded-lg border-2 border-gray-300"
          />
        </div>
      )
    }

    return null
  }

  // Help, Verse, and Synaxarium Section - Optimized for Mobile
  return (
    <div
      className={`relative container mx-auto py-2 px-2 space-y-4 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen ${hasBorder ? "border-8 border-black" : ""} ${isHolyWeek() ? "bg-gray-900 text-gray-300 animate-holy-week-bg" : ""} ${isEaster() ? "bg-gradient-to-b from-gray-50 to-yellow-50 text-gray-900" : ""}`}
      style={{ fontFamily: "'Amiri', 'Noto Kufi Arabic', serif", maxWidth: "100%", overflowX: "hidden" }}
    >
      <style jsx global>{`
        ${animateSpinSlow}
      `}</style>

      {/* Special Text Watermark */}
      <SpecialTextWatermark />

      {/* Special Image based on date */}
      <SpecialImage />

      {/* Top Buttons and Title */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h1
          className={`text-2xl md:text-3xl font-extrabold ${themeStyles.headerText}`}
          style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
        >
          نظام خدمة مدارس الآحـــــد
        </h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="icon" onClick={downloadUsageInstructions}>
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowStats(!showStats)}>
            <Brain className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Help, Verse, and Synaxarium Section - Optimized for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 relative z-10">
        {/* Help Section */}
        <Dialog>
          <DialogTrigger asChild>
            <Card
              className={`cursor-pointer ${darkMode ? "hover:bg-gray-800 bg-gray-800" : "hover:bg-green-50 bg-white"} transition-colors ${isHolyWeek() ? "bg-gray-800 border-gray-700" : ""} ${isEaster() ? "border-yellow-300" : ""}`}
            >
              <CardContent className="p-3 flex items-center gap-2">
                <div
                  className={`${darkMode ? "bg-green-900" : "bg-green-100"} p-2 rounded-full ${isHolyWeek() ? "bg-gray-700" : ""} ${isEaster() ? "bg-yellow-100" : ""}`}
                >
                  <HelpCircle
                    className={`h-5 w-5 ${darkMode ? "text-green-400" : "text-green-600"} ${isHolyWeek() ? "text-gray-400" : ""} ${isEaster() ? "text-yellow-600" : ""}`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-base font-bold ${darkMode ? "text-green-400" : "text-green-800"} ${isHolyWeek() ? "text-gray-300" : ""} ${isEaster() ? "text-yellow-700" : ""}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
                  >
                    عن التطبيق
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>
                    اضغط هنا لمعرفة المزيد عن استخدام التطبيق
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent
            className={`max-w-3xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"} ${isHolyWeek() ? "bg-gray-900 text-gray-300 border-gray-700" : ""} ${isEaster() ? "border-yellow-300" : ""}`}
          >
            <DialogHeader>
              <DialogTitle
                className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : ""} ${isHolyWeek() ? "text-gray-300" : ""} ${isEaster() ? "text-yellow-700" : ""}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                عن التطبيق
              </DialogTitle>
            </DialogHeader>
            <div className="text-right" dir="rtl">
              <p className="mb-3 text-base leading-relaxed">
                تم تطوير هذا التطبيق بواسطة: <strong>بيشوي مراد</strong>
              </p>
              <p className="mb-3 text-base leading-relaxed">تطبيق متابعة الحضور والسلوك لخدمة مدارس الأحد</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Daily Verse Section - make more compact */}
        <Dialog>
          <DialogTrigger asChild>
            <Card
              className={`cursor-pointer ${darkMode ? "hover:bg-gray-800 bg-gray-800" : "hover:bg-green-50 bg-white"} transition-colors ${isHolyWeek() ? "bg-gray-800 border-gray-700" : ""} ${isEaster() ? "border-yellow-300" : ""}`}
            >
              <CardContent className="p-3 flex items-center gap-2">
                <div
                  className={`${darkMode ? "bg-amber-900" : "bg-amber-100"} p-2 rounded-full ${isHolyWeek() ? "bg-gray-700" : ""} ${isEaster() ? "bg-yellow-100" : ""}`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${darkMode ? "text-amber-400" : "text-amber-600"} ${isHolyWeek() ? "text-gray-400" : ""} ${isEaster() ? "text-yellow-600" : ""}`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-base font-bold ${darkMode ? "text-amber-400" : "text-amber-800"} ${isHolyWeek() ? "text-gray-300" : ""} ${isEaster() ? "text-yellow-700" : ""}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
                  >
                    رسالة من ربنا ليــــــــك ..؟
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>
                    شوف ربنا بيقولك اي واسمع كلامـــــه ..!
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent
            className={`max-w-3xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"} ${isHolyWeek() ? "bg-gray-900 text-gray-300 border-gray-700" : ""} ${isEaster() ? "border-yellow-300" : ""}`}
          >
            <DialogHeader>
              <DialogTitle
                className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : ""} ${isHolyWeek() ? "text-gray-300" : ""} ${isEaster() ? "text-yellow-700" : ""}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                رسالة من ربنا ليــــــــك ..؟
              </DialogTitle>
            </DialogHeader>
            <div
              className={`${darkMode ? "bg-amber-900/30" : "bg-amber-50"} p-6 rounded-lg ${isHolyWeek() ? "bg-gray-800" : ""} ${isEaster() ? "bg-yellow-50" : ""}`}
              dir="rtl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar
                  className={`h-5 w-5 ${darkMode ? "text-amber-400" : "text-amber-600"} ${isHolyWeek() ? "text-gray-400" : ""} ${isEaster() ? "text-yellow-600" : ""}`}
                />
                <p
                  className={`font-bold ${darkMode ? "text-amber-400" : "text-amber-800"} ${isHolyWeek() ? "text-gray-300" : ""} ${isEaster() ? "text-yellow-700" : ""}`}
                >
                  {currentVerse.date} - {currentVerse.day}
                </p>
              </div>
              <p
                className={`text-xl font-bold mb-2 ${darkMode ? "text-amber-300" : "text-amber-900"} ${isHolyWeek() ? "text-gray-200" : ""} ${isEaster() ? "text-yellow-800" : ""}`}
              >
                {`"${currentVerse.verse}"`}
              </p>
              <p
                className={`text-sm mb-4 ${darkMode ? "text-amber-400" : "text-amber-700"} ${isHolyWeek() ? "text-gray-400" : ""} ${isEaster() ? "text-yellow-600" : ""}`}
              >
                📖 {currentVerse.reference}
              </p>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>🕊️ {currentVerse.explanation}</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Synaxarium Section - make more compact */}
        <SynaxariumCard
          darkMode={darkMode}
          isHolyWeek={isHolyWeek()}
          isEaster={isEaster()}
          onClick={() => setShowSynaxarium(true)}
        />
      </div>

      {/* Statistics Section */}
      {showStats && students.length > 0 && (
        <Card
          className={`mb-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} relative z-10 ${
            isHolyWeek() ? "bg-gray-800 border-gray-700" : ""
          } ${isEaster() ? "border-yellow-300" : ""}`}
        >
          <CardHeader
            className={`${
              isHolyWeek()
                ? "bg-gray-700"
                : isEaster()
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-50"
                  : darkMode
                    ? "bg-gradient-to-r from-green-900 to-green-800"
                    : "bg-gradient-to-r from-green-50 to-green-100"
            } py-2 px-4`}
          >
            <CardTitle
              className={`text-center text-lg md:text-xl font-bold ${
                isHolyWeek()
                  ? "text-gray-300"
                  : isEaster()
                    ? "text-yellow-800"
                    : darkMode
                      ? "text-white"
                      : "text-green-800"
              }`}
              style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
            >
              إحصائيات الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(() => {
                const stats = calculateStats()
                if (!stats) return null

                return (
                  <>
                    <div
                      className={`p-3 rounded-lg ${
                        isHolyWeek()
                          ? "bg-gray-700"
                          : isEaster()
                            ? "bg-yellow-50"
                            : darkMode
                              ? "bg-gray-700"
                              : "bg-green-50"
                      }`}
                    >
                      <h3 className="text-sm font-bold mb-1 text-center">إجمالي الطلاب</h3>
                      <p
                        className={`text-xl font-bold text-center ${
                          isHolyWeek()
                            ? "text-gray-300"
                            : isEaster()
                              ? "text-yellow-600"
                              : darkMode
                                ? "text-green-400"
                                : "text-green-600"
                        }`}
                      >
                        {stats.totalStudents}
                      </p>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isHolyWeek()
                          ? "bg-gray-700"
                          : isEaster()
                            ? "bg-yellow-50"
                            : darkMode
                              ? "bg-gray-700"
                              : "bg-green-50"
                      }`}
                    >
                      <h3 className="text-sm font-bold mb-1 text-center">متوسط الحضور</h3>
                      <p
                        className={`text-xl font-bold text-center ${
                          isHolyWeek()
                            ? "text-gray-300"
                            : isEaster()
                              ? "text-yellow-600"
                              : darkMode
                                ? "text-green-400"
                                : "text-green-600"
                        }`}
                      >
                        {stats.averageAttendance}%
                      </p>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isHolyWeek()
                          ? "bg-gray-700"
                          : isEaster()
                            ? "bg-yellow-50"
                            : darkMode
                              ? "bg-gray-700"
                              : "bg-green-50"
                      }`}
                    >
                      <h3 className="text-sm font-bold mb-1 text-center">متوسط السلوك</h3>
                      <p
                        className={`text-xl font-bold text-center ${
                          isHolyWeek()
                            ? "text-gray-300"
                            : isEaster()
                              ? "text-yellow-600"
                              : darkMode
                                ? "text-green-400"
                                : "text-green-600"
                        }`}
                      >
                        {stats.averageBehavior}/5
                      </p>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isHolyWeek()
                          ? "bg-gray-700"
                          : isEaster()
                            ? "bg-yellow-50"
                            : darkMode
                              ? "bg-gray-700"
                              : "bg-green-50"
                      }`}
                    >
                      <h3 className="text-sm font-bold mb-1 text-center">متوسط الالتزام</h3>
                      <p
                        className={`text-xl font-bold text-center ${
                          isHolyWeek()
                            ? "text-gray-300"
                            : isEaster()
                              ? "text-yellow-600"
                              : darkMode
                                ? "text-green-400"
                                : "text-green-600"
                        }`}
                      >
                        {stats.averageCommitment}/5
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 relative z-10">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <Input
            placeholder="بحث بالاسم أو الرقم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${
              isHolyWeek()
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : isEaster()
                  ? "border-yellow-300"
                  : darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white"
            }`}
          />
        </div>

        <div className="w-full md:w-64">
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger
              className={`${
                isHolyWeek()
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : isEaster()
                    ? "border-yellow-300"
                    : darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-green-200"
              }`}
            >
              <SelectValue placeholder="تصفية حسب الشهر" />
            </SelectTrigger>
            <SelectContent
              className={
                isHolyWeek()
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : isEaster()
                    ? "border-yellow-300"
                    : darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : ""
              }
            >
              <SelectItem value="all">كل الشهور</SelectItem>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="entry" className="w-full relative z-10">
        <TabsList
          className={`grid grid-cols-2 mb-4 ${
            isHolyWeek() ? "bg-gray-800" : isEaster() ? "bg-yellow-100" : darkMode ? "bg-gray-800" : ""
          }`}
        >
          <TabsTrigger
            value="entry"
            className={`text-lg font-bold ${
              isHolyWeek()
                ? "data-[state=active]:bg-gray-700 data-[state=active]:text-gray-300"
                : isEaster()
                  ? "data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                  : darkMode
                    ? "data-[state=active]:bg-green-800 data-[state=active]:text-white"
                    : ""
            }`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            انتظار التسجيل
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className={`text-lg font-bold ${
              isHolyWeek()
                ? "data-[state=active]:bg-gray-700 data-[state=active]:text-gray-300"
                : isEaster()
                  ? "data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                  : darkMode
                    ? "data-[state=active]:bg-green-800 data-[state=active]:text-white"
                    : ""
            }`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            قبول الآنتظار
          </TabsTrigger>
        </TabsList>

        {/* Data Entry Tab */}
        <TabsContent value="entry">
          <Card
            className={`border-t-4 ${
              isHolyWeek() ? "border-gray-700" : isEaster() ? "border-yellow-500" : "border-green-600"
            } shadow-lg ${
              isHolyWeek()
                ? "bg-gray-800 text-gray-300"
                : isEaster()
                  ? "bg-white border-yellow-300"
                  : darkMode
                    ? "bg-gray-800 text-white"
                    : ""
            } border-8 border-black`}
          >
            <CardHeader
              className={`${
                isHolyWeek()
                  ? "bg-gray-700"
                  : isEaster()
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50"
                    : darkMode
                      ? "bg-gradient-to-r from-green-900 to-green-800"
                      : "bg-gradient-to-r from-green-50 to-green-100"
              } py-3`}
            >
              <CardTitle
                className={`text-center text-lg md:text-xl font-bold ${
                  isHolyWeek()
                    ? "text-gray-300"
                    : isEaster()
                      ? "text-yellow-800"
                      : darkMode
                        ? "text-white"
                        : "text-green-800"
                }`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                نظام متابعة الحضور والسلوك
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label htmlFor="name" className="block mb-1 font-bold">
                        الاسم
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أدخل الاسم"
                        className={`${
                          isHolyWeek()
                            ? "bg-gray-700 border-gray-600"
                            : isEaster()
                              ? "border-yellow-300"
                              : darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "border-green-200 focus:border-green-500"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="number" className="block mb-1 font-bold">
                        الرقم
                      </Label>
                      <Input
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="أدخل الرقم (سيبدأ بـ 666)"
                        className={`${
                          isHolyWeek()
                            ? "bg-gray-700 border-gray-600"
                            : isEaster()
                              ? "border-yellow-300"
                              : darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "border-green-200 focus:border-green-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label htmlFor="birthDate" className="block mb-1 font-bold">
                        تاريخ الميلاد
                      </Label>
                      <Input
                        id="birthDate"
                        placeholder="أدخل تاريخ الميلاد"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={`${
                          isHolyWeek()
                            ? "bg-gray-700 border-gray-600"
                            : isEaster()
                              ? "border-yellow-300"
                              : darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "border-green-200 focus:border-green-500"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="month" className="block mb-1 font-bold">
                        الشهر
                      </Label>
                      <Select value={month} onValueChange={setMonth}>
                        <SelectTrigger
                          className={`${
                            isHolyWeek()
                              ? "bg-gray-700 border-gray-600"
                              : isEaster()
                                ? "border-yellow-300"
                                : darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "border-green-200 focus:border-green-500"
                          }`}
                        >
                          <SelectValue placeholder="اختر الشهر" />
                        </SelectTrigger>
                        <SelectContent
                          className={
                            isHolyWeek()
                              ? "bg-gray-800 border-gray-700 text-gray-300"
                              : isEaster()
                                ? "border-yellow-300"
                                : darkMode
                                  ? "bg-gray-800 border-gray-700 text-white"
                                  : ""
                          }
                        >
                          {months.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label className="block mb-1 font-bold">الجمعات</Label>
                      <div
                        className={`${
                          isHolyWeek()
                            ? "bg-gray-700 border-gray-600"
                            : isEaster()
                              ? "bg-white border-yellow-300"
                              : darkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-green-200"
                        } p-2 rounded-lg border`}
                      >
                        <RadioGroup
                          className="flex justify-between"
                          value={fridays.filter((f) => f).length.toString()}
                          onValueChange={(value) => {
                            const count = Number.parseInt(value)
                            const newFridays = [false, false, false, false]
                            for (let i = 0; i < count; i++) {
                              newFridays[i] = true
                            }
                            setFridays(newFridays)
                          }}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="0" id="friday-0" />
                            <Label htmlFor="friday-0">0 جمعة</Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="1" id="friday-1" />
                            <Label htmlFor="friday-1">1 جمعة</Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="2" id="friday-2" />
                            <Label htmlFor="friday-2">2 جمعة</Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="3" id="friday-3" />
                            <Label htmlFor="friday-3">3 جمعة</Label>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="4" id="friday-4" />
                            <Label htmlFor="friday-4">4 جمعة</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="behavior" className="block mb-1 font-bold">
                          السلوك (5%)
                        </Label>
                        <div
                          className={`${
                            isHolyWeek()
                              ? "bg-gray-700 border-gray-600"
                              : isEaster()
                                ? "bg-white border-yellow-300"
                                : darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-green-200"
                          } p-2 rounded-lg border`}
                        >
                          <Slider
                            id="behavior"
                            min={0}
                            max={5}
                            step={1}
                            value={[behavior]}
                            onValueChange={(value) => setBehavior(value[0])}
                          />
                          <div className="text-center mt-1 font-bold">{behavior}</div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="commitment" className="block mb-1 font-bold">
                          الالتزام (5%)
                        </Label>
                        <div
                          className={`${
                            isHolyWeek()
                              ? "bg-gray-700 border-gray-600"
                              : isEaster()
                                ? "bg-white border-yellow-300"
                                : darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-green-200"
                          } p-2 rounded-lg border`}
                        >
                          <Slider
                            id="commitment"
                            min={0}
                            max={5}
                            step={1}
                            value={[commitment]}
                            onValueChange={(value) => setCommitment(value[0])}
                          />
                          <div className="text-center mt-1 font-bold">{commitment}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="block mb-1 font-bold">
                      ملاحظات
                    </Label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="أدخل أي ملاحظات إضافية عن الطالب..."
                      className={`w-full p-2 rounded-md ${isHolyWeek() ? "bg-gray-700 border-gray-600 text-gray-300" : isEaster() ? "border-yellow-300" : darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-green-200 focus:border-green-500"} h-20`}
                    />
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="flex flex-col items-center justify-center">
                  <Label className="block mb-1 font-bold">صورة الطالب</Label>
                  <div
                    className={`w-full h-32 border-2 border-dashed ${isHolyWeek() ? "border-gray-600 bg-gray-700" : isEaster() ? "border-yellow-300 bg-yellow-50" : darkMode ? "border-gray-600 bg-gray-700" : "border-green-300 bg-green-50"} rounded-lg flex flex-col items-center justify-center relative`}
                  >
                    {photoUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={photoUrl || "/placeholder.svg"}
                          alt="صورة الطالب"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          onClick={() => setPhotoUrl(null)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload
                          className={`h-8 w-8 ${isHolyWeek() ? "text-gray-400" : isEaster() ? "text-yellow-400" : darkMode ? "text-green-400" : "text-green-400"} mb-1`}
                        />
                        <p
                          className={`text-xs ${isHolyWeek() ? "text-gray-400" : isEaster() ? "text-yellow-500" : darkMode ? "text-green-400" : "text-green-500"} mb-1`}
                        >
                          اضغط لإضافة صورة
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${isHolyWeek() ? "text-gray-400 border-gray-600" : isEaster() ? "text-yellow-600 border-yellow-300" : darkMode ? "text-green-400 border-green-700" : "text-green-600 border-green-300"} text-xs`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          إضافة صورة
                        </Button>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={handleAddStudent}
                    disabled={students.length >= 200}
                    className={`${isHolyWeek() ? "bg-gray-700 hover:bg-gray-600" : isEaster() ? "bg-yellow-600 hover:bg-yellow-500" : darkMode ? "bg-green-700 hover:bg-green-600" : "bg-green-600 hover:bg-green-700"} mt-3 w-full`}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    إضافة طالب جديد ({students.length}/200)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students List Tab - Optimized for Mobile */}
        <TabsContent value="list">
          <Card
            className={`border-t-4 ${isHolyWeek() ? "border-gray-700" : isEaster() ? "border-yellow-500" : "border-green-600"} shadow-lg mb-4 ${isHolyWeek() ? "bg-gray-800 text-gray-300" : isEaster() ? "bg-white border-yellow-300" : darkMode ? "bg-gray-800 text-white" : ""} border-8 border-black`}
          >
            <CardHeader
              className={`${isHolyWeek() ? "bg-gray-700" : isEaster() ? "bg-gradient-to-r from-yellow-100 to-yellow-50" : darkMode ? "bg-gradient-to-r from-green-900 to-green-800" : "bg-gradient-to-r from-green-50 to-green-100"} py-3`}
            >
              <CardTitle
                className={`text-center text-lg md:text-xl font-bold ${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-800" : darkMode ? "text-white" : "text-green-800"}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                قائمة الطلاب {filteredStudents.length > 0 && `(${filteredStudents.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader
                    className={
                      isHolyWeek()
                        ? "bg-gray-700"
                        : isEaster()
                          ? "bg-yellow-50"
                          : darkMode
                            ? "bg-gray-700"
                            : "bg-green-50"
                    }
                  >
                    <TableRow>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        الصورة
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        الاسم
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        الرقم
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        تاريخ الميلاد
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        الشهر
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        ج1
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        ج2
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        ج3
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        ج4
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        السلوك
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        الالتزام
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        النسبة
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        التقدم
                      </TableHead>
                      <TableHead
                        className={`${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-700" : darkMode ? "text-green-400" : "text-green-800"} font-bold text-xs`}
                      >
                        التقرير
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className={
                          isHolyWeek()
                            ? "hover:bg-gray-700 border-gray-700"
                            : isEaster()
                              ? "hover:bg-yellow-50 border-yellow-100"
                              : darkMode
                                ? "hover:bg-gray-700 border-gray-700"
                                : "hover:bg-green-50"
                        }
                      >
                        <TableCell>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.photoUrl || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback
                              className={
                                isHolyWeek()
                                  ? "bg-gray-700"
                                  : isEaster()
                                    ? "bg-yellow-100"
                                    : darkMode
                                      ? "bg-gray-700"
                                      : ""
                              }
                            >
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium text-xs">{student.name}</TableCell>
                        <TableCell className="text-xs">{student.number}</TableCell>
                        <TableCell className="text-xs">{student.birthDate}</TableCell>
                        <TableCell className="text-xs">{student.month}</TableCell>
                        {[0, 1, 2, 3].map((index) => (
                          <TableCell key={index}>
                            <Checkbox
                              checked={student.fridays[index]}
                              onCheckedChange={(checked) => updateFriday(student.id, index, checked as boolean)}
                              className={`${isHolyWeek() ? "text-gray-500 border-gray-600" : isEaster() ? "text-yellow-500 border-yellow-300" : darkMode ? "text-green-500 border-gray-600" : "text-green-600 border-green-300"} h-4 w-4`}
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          <Slider
                            min={0}
                            max={5}
                            step={1}
                            value={[student.behavior]}
                            onValueChange={(value) => updateBehavior(student.id, value[0])}
                            className="w-16"
                          />
                          <div className="text-center mt-1 font-bold text-xs">{student.behavior}</div>
                        </TableCell>
                        <TableCell>
                          <Slider
                            min={0}
                            max={5}
                            step={1}
                            value={[student.commitment]}
                            onValueChange={(value) => updateCommitment(student.id, value[0])}
                            className="w-16"
                          />
                          <div className="text-center mt-1 font-bold text-xs">{student.commitment}</div>
                        </TableCell>
                        <TableCell
                          className={`font-bold text-xs ${isHolyWeek() ? "text-gray-300" : isEaster() ? "text-yellow-600" : darkMode ? "text-green-400" : "text-green-700"}`}
                        >
                          {student.percentage}%
                        </TableCell>
                        <TableCell className="text-xl">{getProgressEmoji(student.percentage)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${isHolyWeek() ? "text-gray-400 border-gray-600" : isEaster() ? "text-yellow-600 border-yellow-300" : darkMode ? "text-green-400 border-green-700" : "text-green-600 border-green-300"} text-xs p-1 h-7`}
                            onClick={() => generateStudentReport(student)}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            تقرير
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Print Confirmation Dialog */}
      <Dialog open={showPrintConfirm} onOpenChange={setShowPrintConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>طباعة التقرير</DialogTitle>
            <DialogDescription>هل تريد طباعة التقرير كصورة؟</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Alert>
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>سيتم إنشاء تقرير مفصل بتصميم متقدم</AlertDescription>
            </Alert>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="secondary" onClick={() => setShowPrintConfirm(false)}>
              إلغاء
            </Button>
            <Button type="button" onClick={downloadStudentReport} className="bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" /> متأكد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for report generation */}
      <canvas ref={reportCanvasRef} className="hidden" />

      {/* Synaxarium Dialog */}
      <SynaxariumDialog
        open={showSynaxarium}
        onOpenChange={setShowSynaxarium}
        darkMode={darkMode}
        isHolyWeek={isHolyWeek()}
        isEaster={isEaster()}
      />

      {/* Footer */}
      <div className="text-center text-gray-500 text-xs py-3 relative z-10">
        <p>© {new Date().getFullYear()} كنيسة الشهيد العظيم مارجرجس والانبا باخوميوس - العصافرة</p>
        <p className="mt-1">تطوير: بيشوي مراد</p>

        {/* Special message for Holy Week */}
        {isHolyWeek() && (
          <p className="mt-2 text-gray-400 animate-mourning">أسبوع الآلام المقدس - وقت للصلاة والتأمل</p>
        )}

        {/* Special message for Easter */}
        {isEaster() && <p className="mt-2 text-yellow-500 font-bold animate-celebration">المسيح قام! بالحقيقة قام!</p>}
      </div>

      <Toaster />
    </div>
  )
}
