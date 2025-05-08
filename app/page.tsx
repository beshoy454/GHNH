"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Brain, Moon, Sun, AlertCircle, Calendar, PlusCircle, Check } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// CSS Animations and Styles
const styles = `
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

@font-face {
  font-family: 'El Messiri';
  src: url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap');
}

@font-face {
  font-family: 'Amiri';
  src: url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
}

@font-face {
  font-family: 'Noto Kufi Arabic';
  src: url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap');
}

.watermark-text {
  font-family: 'El Messiri', 'Noto Kufi Arabic', serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #000000;
}

.fancy-border {
  position: relative;
  border: 8px solid black;
  box-shadow: 0 0 0 2px gold, 0 0 0 4px black, 0 0 15px rgba(0,0,0,0.5);
}

.fancy-border::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border: 1px solid rgba(218, 165, 32, 0.3);
  pointer-events: none;
}

.report-border {
  position: relative;
  border: 12px solid black;
  box-shadow: 0 0 0 3px gold, 0 0 0 6px black, 0 0 20px rgba(0,0,0,0.7);
  padding: 20px;
  background-color: white;
}

.report-header {
  border: 4px solid black;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.report-photo {
  border: 3px solid black;
  border-radius: 50%;
  overflow: hidden;
  width: 120px;
  height: 120px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.report-table th, .report-table td {
  border: 2px solid black;
  padding: 8px;
  text-align: center;
}

.report-table th {
  background-color: #f0f0f0;
}

.report-watermark {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  color: #000000;
  opacity: 0.2;
  transform: rotate(-5deg);
  font-family: 'El Messiri', 'Noto Kufi Arabic', serif;
  font-weight: bold;
  pointer-events: none;
}

.verse-text {
  font-family: 'Amiri', serif;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: #000000;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.verse-reference {
  font-family: 'Noto Kufi Arabic', serif;
  font-weight: 500;
  color: #4b5563;
}

.verse-explanation {
  font-family: 'Noto Kufi Arabic', serif;
  line-height: 1.6;
  text-align: justify;
}

.saint-card {
  border: 2px solid #000000;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.saint-header {
  background-color: #1e3a8a;
  color: white;
  padding: 0.75rem;
  font-family: 'El Messiri', serif;
  font-weight: bold;
  text-align: center;
  font-size: 1.25rem;
}

.saint-content {
  padding: 1rem;
  font-family: 'Amiri', serif;
}

.saint-name {
  font-family: 'El Messiri', serif;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e3a8a;
}

.saint-date {
  font-family: 'Noto Kufi Arabic', serif;
  color: #4b5563;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.saint-description {
  font-family: 'Amiri', serif;
  line-height: 1.6;
  text-align: justify;
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

// Bible verses data
const bibleVerses = [
  {
    date: "8 مايو",
    day: "الخميس",
    verse: "لَكِنِ الَّذِينَ يَتَرَجَّونَ الرَّبَّ يُجَدِّدُونَ قُوَّتَهُمْ.",
    reference: "إشعياء 40: 31",
    explanation:
      "في هذه الآية، يذكرنا النبي إشعياء بأن الذين يضعون رجاءهم في الرب سيجددون قوتهم باستمرار. عندما نشعر بالتعب والإرهاق، فإن الاتكال على الله يمنحنا قوة متجددة لمواصلة المسيرة. هذا وعد إلهي بأن الله يعطي قوة للمتعبين وشدة لعديمي القوة، فهو مصدر القوة الحقيقية التي لا تنضب.",
  },
  {
    date: "9 مايو",
    day: "الجمعة",
    verse: "قَدْ غَلَبْتُمُوهُمْ، لأَنَّ الَّذِي فِيكُمْ أَعْظَمُ مِنَ الَّذِي فِي الْعَالَمِ.",
    reference: "1 يوحنا 4: 4",
    explanation:
      "تؤكد هذه الآية على قوة الله العاملة فينا، فالروح القدس الساكن في المؤمنين أعظم من قوى الشر في العالم. مهما كانت التحديات والصعوبات التي نواجهها، فإن الله الذي يسكن فينا أقوى من كل قوى الظلام. هذه الآية تمنحنا الثقة والشجاعة لمواجهة تجارب الحياة، عالمين أن النصرة مضمونة لأن الله معنا.",
  },
  {
    date: "10 مايو",
    day: "السبت",
    verse: "اَلرَّبُّ يُحَافِظُ عَلَى جَمِيعِ مُحِبِّيهِ.",
    reference: "مزمور 145: 20",
    explanation:
      "يطمئننا داود النبي في هذه الآية بأن الله يحافظ على كل من يحبه. محبة الله ليست مجرد عاطفة، بل هي حماية ورعاية مستمرة. عندما نحب الله ونسير في طرقه، فإنه يحيطنا بعنايته الإلهية ويحفظنا من كل شر. هذه الآية تذكرنا بأن الله أمين في وعوده وأنه يرعى أولاده المحبين له بأمانة.",
  },
  {
    date: "11 مايو",
    day: "الأحد",
    verse: "اُطْلُبُوا وَتُعْطَوْا. اُقْرَعُوا وَيُفْتَحُ لَكُمْ.",
    reference: "متى 7: 7",
    explanation:
      "في هذه الآية، يعلمنا السيد المسيح أهمية المثابرة في الصلاة. الطلب والقرع يشيران إلى الاستمرار في الصلاة بإيمان وثقة. الله يستجيب لصلواتنا، ليس دائماً بالطريقة التي نتوقعها، ولكن دائماً بما هو أفضل لنا. هذه الآية تشجعنا على الاستمرار في التواصل مع الله، واثقين أنه يسمع ويستجيب لصلواتنا الصادقة.",
  },
  {
    date: "12 مايو",
    day: "الإثنين",
    verse: "اَلرَّبُّ قُوَّتِي وَتَرْنِيمَتِي، وَقَدْ صَارَ لِي خَلاَصًا.",
    reference: "خروج 15: 2",
    explanation:
      "هذه الآية جزء من ترنيمة موسى بعد عبور البحر الأحمر، وهي تعبر عن الفرح والامتنان لله على خلاصه العظيم. الرب هو مصدر قوتنا وسبب فرحنا وترنيمنا. عندما نواجه صعوبات الحياة، يمكننا أن نتذكر أن الله هو خلاصنا وأنه قادر على تحويل أصعب المواقف إلى أسباب للتسبيح والشكر.",
  },
  {
    date: "13 مايو",
    day: "الثلاثاء",
    verse: "فِي الضِّيقِ دَعَوْتَ، فَنَجَّيْتُكَ.",
    reference: "مزمور 81: 7",
    explanation:
      "تذكرنا هذه الآية بأن الله يستجيب لصرخاتنا في وقت الضيق. عندما نكون في أصعب الظروف، فإن الله قريب منا ومستعد للاستماع والاستجابة. الضيقات ليست نهاية المطاف، بل هي فرصة لاختبار قوة الله وتدخله في حياتنا. مهما كانت الصعوبات التي نواجهها، يمكننا أن ندعو الله بثقة، عالمين أنه سينجينا.",
  },
  {
    date: "14 مايو",
    day: "الأربعاء",
    verse: "لَا يَتْرُكُكَ وَلاَ يَخْذُلُكَ.",
    reference: "تثنية 31: 6",
    explanation:
      "هذه الآية هي وعد إلهي بالحضور المستمر والدعم الدائم. الله لا يتركنا أبداً، حتى في أحلك الظروف وأصعب الأوقات. عندما نشعر بالوحدة أو الخذلان من الآخرين، يمكننا أن نتذكر أن الله معنا دائماً. هذا الوعد يمنحنا الشجاعة والثقة لمواجهة تحديات الحياة، عالمين أن الله لن يتخلى عنا أبداً.",
  },
  {
    date: "15 مايو",
    day: "الخميس",
    verse: "اَلرَّبُّ يُعِينُهُمْ وَيُنَجِّيهِمْ.",
    reference: "مزمور 37: 40",
    explanation:
      "تؤكد هذه الآية على عون الله ونجدته للمتكلين عليه. الله يعين أولاده في وقت الضيق وينجيهم من الشدائد. هذه ليست مجرد كلمات تشجيع، بل هي حقيقة اختبرها الكثيرون عبر العصور. عندما نواجه صعوبات تفوق قدراتنا، يمكننا أن نتكل على الله، واثقين أنه سيعيننا وينجينا في الوقت المناسب.",
  },
  {
    date: "16 مايو",
    day: "الجمعة",
    verse: "لِكُلِّ شَيْءٍ زَمَانٌ، وَلِكُلِّ أَمْرٍ تَحْتَ السَّمَاوَاتِ وَقْتٌ.",
    reference: "جامعة 3: 1",
    explanation:
      "تذكرنا هذه الآية بحكمة الله في توقيت الأحداث في حياتنا. قد لا نفهم دائماً لماذا تحدث بعض الأمور في وقت معين، لكن الله لديه خطة وتوقيت مثالي لكل شيء. هذه الآية تعلمنا الصبر والثقة في توقيت الله، حتى عندما لا نفهم ما يحدث. الله يعمل كل شيء حسناً في وقته المناسب، وهذا يمنحنا السلام وسط تقلبات الحياة.",
  },
  {
    date: "17 مايو",
    day: "السبت",
    verse: "إِنَّكَ تُحِيطُ بِي مِنْ كُلِّ جِهَةٍ، وَتَضَعُ يَدَكَ عَلَيَّ.",
    reference: "مزمور 139: 5",
    explanation:
      "تصور هذه الآية محبة الله الشاملة وحمايته الكاملة لنا. الله يحيط بنا من كل جانب، ويضع يده علينا للحماية والتوجيه. هذه الصورة تمنحنا شعوراً بالأمان والطمأنينة وسط عالم مضطرب. مهما كانت المخاوف أو التحديات التي نواجهها، فإن الله يحيط بنا بمحبته ويحمينا بقوته، وهذا يمنحنا السلام والثقة.",
  },
  {
    date: "18 مايو",
    day: "الأحد",
    verse: "اَلرَّبُّ يُبَارِكُ شَعْبَهُ بِالسَّلاَمِ.",
    reference: "مزمور 29: 11",
    explanation:
      "تؤكد هذه الآية على بركة السلام التي يمنحها الله لشعبه. السلام هو عطية ثمينة من الله، وهو ليس مجرد غياب للمشاكل، بل هو طمأنينة داخلية وسط العواصف. الله يبارك أولاده بسلام يفوق كل عقل، سلام لا يتأثر بالظروف المحيطة. هذه البركة متاحة لكل من يثق في الله ويسير في طرقه.",
  },
  {
    date: "19 مايو",
    day: "الإثنين",
    verse: "مَا لَمْ تَرَهُ عَيْنٌ، وَمَا لَمْ تَسْمَعْ بِهِ أُذُنٌ، مَا أَعَدَّهُ اللهُ لِلَّذِينَ يُحِبُّونَهُ.",
    reference: "1 كورنثوس 2: 9",
    explanation:
      "تتحدث هذه الآية عن عظمة ما أعده الله لمحبيه، وهو أمر يفوق كل تصور بشري. الله أعد لنا بركات وأمجاداً تفوق ما يمكن أن نراه أو نسمعه أو نتخيله. هذه الآية تشجعنا على محبة الله والثقة في وعوده، عالمين أن ما ينتظرنا أعظم بكثير مما نختبره الآن. مهما كانت صعوبات الحياة الحالية، فإن ما أعده الله لنا يستحق كل انتظار.",
  },
  {
    date: "20 مايو",
    day: "الثلاثاء",
    verse: "اَلرَّبُّ مَلْجَأٌ لِلْمَسَاكِينِ، مَلْجَأٌ فِي أَزْمِنَةِ الضِّيقِ.",
    reference: "إشعياء 25: 4",
    explanation:
      "تصور هذه الآية الله كملجأ وحصن في وقت الضيق. عندما تعصف بنا رياح الحياة وعواصفها، يمكننا أن نلجأ إلى الله ونجد فيه الأمان والحماية. الله يهتم بشكل خاص بالمساكين والمحتاجين، ويقدم لهم ملجأً في وقت الضيق. هذه الآية تشجعنا على اللجوء إلى الله في كل ظروفنا، واثقين أنه سيكون ملجأنا وحصننا.",
  },
  {
    date: "21 مايو",
    day: "الأربعاء",
    verse: "لَا تَخَافُوا لأَنِّي مَعَكُمْ.",
    reference: "إشعياء 43: 5",
    explanation:
      "تحمل هذه الآية وعداً إلهياً بالحضور والمعية في مواجهة المخاوف. الخوف هو شعور طبيعي، لكن وجود الله معنا يمنحنا الشجاعة لمواجهة مخاوفنا. عندما نتذكر أن الله معنا، تتلاشى مخاوفنا وتحل محلها الثقة والطمأنينة. هذه الآية تدعونا إلى التخلي عن الخوف والاتكال على حضور الله المستمر في حياتنا.",
  },
  {
    date: "22 مايو",
    day: "الخميس",
    verse: "اَلرَّبُّ نُورِي وَخَلاَصِي.",
    reference: "مزمور 27: 1",
    explanation:
      "يصف داود النبي في هذه الآية الله بأنه النور والخلاص في حياته. النور يبدد الظلام ويرشد الطريق، والخلاص ينقذ من الخطر ويمنح الأمان. عندما نواجه ظلام الشك أو الخوف أو الحزن، يمكننا أن نتذكر أن الله هو نورنا الذي يبدد كل ظلام. وعندما نواجه تهديدات أو مخاطر، يمكننا أن نثق في الله كمصدر خلاصنا وأماننا.",
  },
  {
    date: "23 مايو",
    day: "الجمعة",
    verse: "تَشَدَّدُوا وَتَشَجَّعُوا، لَا تَخَافُوا.",
    reference: "تثنية 31: 6",
    explanation:
      "تحمل هذه الآية دعوة إلهية للتشدد والتشجع وعدم الخوف. الله لا يريدنا أن نعيش في خوف أو قلق، بل يدعونا إلى التحلي بالشجاعة والقوة. هذه الدعوة مبنية على وعد الله بحضوره معنا وعدم تركنا. عندما نواجه تحديات تبدو أكبر من قدراتنا، يمكننا أن نستمد القوة والشجاعة من وعود الله وحضوره معنا.",
  },
  {
    date: "24 مايو",
    day: "السبت",
    verse: "لَا تَتْرُكْ قَلْبَكَ يَفْشَلُ.",
    reference: "أمثال 4: 23",
    explanation:
      "تذكرنا هذه الآية بأهمية حفظ القلب والعناية به. القلب هو مركز العواطف والأفكار والقرارات، ومنه تنبع ينابيع الحياة. عندما نحفظ قلوبنا من الأفكار السلبية والمشاعر الهدامة، نحمي حياتنا كلها. هذه الآية تدعونا إلى الانتباه لما ندخله إلى قلوبنا من أفكار ومشاعر، واختيار ما يبني ويشجع ويقوي إيماننا.",
  },
  {
    date: "25 مايو",
    day: "الأحد",
    verse: "اَلرَّبُّ حَارِسُكَ، الرَّبُّ ظِلُّكَ عَنْ يَدِكَ الْيُمْنَى.",
    reference: "مزمور 121: 5",
    explanation:
      "تصور هذه الآية الله كحارس أمين وظل واقٍ من حرارة الشمس. الحارس يحمي ويسهر، والظل يوفر الراحة والحماية. الله يحرسنا من كل خطر ويحمينا من كل أذى، وهو قريب منا كظل عن يدنا اليمنى. هذه الصورة تمنحنا شعوراً بالأمان والحماية المستمرة. مهما كانت المخاطر التي نواجهها، فإن الله حارسنا الأمين الذي لا ينعس ولا ينام.",
  },
  {
    date: "26 مايو",
    day: "الإثنين",
    verse: "قَدْ جَعَلْتُ الرَّبَّ أَمَامِي فِي كُلِّ حِينٍ.",
    reference: "مزمور 16: 8",
    explanation:
      "يشارك داود النبي في هذه الآية سر قوته وثباته، وهو جعل الرب أمامه في كل حين. عندما نضع الله في مركز حياتنا ونتذكر حضوره باستمرار، نختبر الثبات والاستقرار. هذه الآية تدعونا إلى تذكر حضور الله في كل لحظة من لحظات حياتنا، في الفرح والحزن، في النجاح والفشل. عندما نجعل الرب أمامنا في كل حين، نختبر سلاماً وفرحاً لا يتزعزع.",
  },
  {
    date: "27 مايو",
    day: "الثلاثاء",
    verse: "اَلرَّبُّ يُحَارِبُ عَنْكُمْ، وَأَنْتُمْ تَصْمُتُونَ.",
    reference: "خروج 14: 14",
    explanation:
      "تذكرنا هذه الآية بأن الله يحارب عنا، ونحن مدعوون للثقة والانتظار بصمت. عندما واجه بنو إسرائيل البحر أمامهم وجيش فرعون خلفهم، قال لهم موسى هذه الكلمات. الله لا يتركنا نواجه معاركنا وحدنا، بل هو يحارب عنا. هذه الآية تدعونا إلى الثقة في قوة الله وقدرته على التدخل في أصعب المواقف، حتى عندما تبدو الأمور مستحيلة من وجهة نظرنا البشرية.",
  },
  {
    date: "28 مايو",
    day: "الأربعاء",
    verse: "اُثْبُتُوا فِي الإِيمَانِ، تَشَدَّدُوا.",
    reference: "1 كورنثوس 16: 13",
    explanation:
      "تحمل هذه الآية دعوة للثبات في الإيمان والتشدد في مواجهة التحديات. الثبات في الإيمان يعني الاستمرار في الثقة بالله والاتكال عليه مهما كانت الظروف. التشدد يعني التحلي بالشجاعة والقوة في مواجهة الصعوبات. هذه الآية تشجعنا على عدم التراجع أو الاستسلام عندما نواجه تحديات، بل الثبات في إيماننا والتشدد بقوة الله العاملة فينا.",
  },
  {
    date: "29 مايو",
    day: "الخميس",
    verse: "لَا يَخْذُلُكَ وَلاَ يَتْرُكُكَ.",
    reference: "يشوع 1: 5",
    explanation:
      "تحمل هذه الآية وعداً إلهياً بعدم الخذلان أو الترك. الله أمين في وعوده، وهو لا يتخلى عن أولاده أبداً. عندما نشعر بالوحدة أو الخذلان من الآخرين، يمكننا أن نتذكر هذا الوعد الإلهي. الله معنا في كل خطوة من خطوات حياتنا، وهو لن يتركنا أو يتخلى عنا مهما كانت الظروف. هذا الوعد يمنحنا الثقة والطمأنينة في رحلة الحياة.",
  },
  {
    date: "30 مايو",
    day: "الجمعة",
    verse: "اَلرَّبُّ يَسْمَعُ، وَيُنْقِذُكَ.",
    reference: "مزمور 34: 17",
    explanation:
      "تؤكد هذه الآية على استجابة الله لصرخات أولاده وتدخله لإنقاذهم. الله ليس إلهاً بعيداً لا يسمع صلواتنا، بل هو قريب يسمع ويستجيب. عندما نصرخ إلى الله في ضيقاتنا، فإنه يسمع ويتدخل لإنقاذنا. هذه الآية تشجعنا على الصلاة بثقة، عالمين أن الله يسمع ويستجيب في الوقت المناسب وبالطريقة المناسبة.",
  },
  {
    date: "31 مايو",
    day: "السبت",
    verse: "إِنَّ اللهَ لَنَا مَلْجَأٌ وَقُوَّةٌ، عَوْنًا فِي الضِّيقَاتِ.",
    reference: "مزمور 46: 1",
    explanation:
      "تصف هذه الآية الله بأنه ملجأ وقوة وعون في الضيقات. الملجأ هو مكان الأمان والحماية، والقوة هي مصدر الدعم والتمكين، والعون هو المساعدة في وقت الحاجة. الله يوفر لنا كل هذه الأمور في وقت الضيق. مهما كانت الصعوبات التي نواجهها، يمكننا أن نلجأ إلى الله ونجد فيه الأمان والقوة والعون. هذه الآية تشجعنا على الثقة في الله وسط العواصف، عالمين أنه معنا وأنه قادر على مساعدتنا.",
  },
]

// Saints data
const dailySaints = [
  {
    date: "8 مايو",
    name: "القديس أرسانيوس معلم أولاد الملوك",
    title: "معلم أولاد الملوك",
    description:
      "ولد القديس أرسانيوس في روما من أبوين مسيحيين غنيين، وتعلم العلوم الدينية والفلسفية. كان معلماً لأولاد الإمبراطور ثيؤدوسيوس الكبير، أركاديوس وأنوريوس. بعد أن سمع صوتاً يقول له: 'اهرب من الناس تخلص'، ترك القصر وذهب إلى برية شيهيت بمصر حيث عاش حياة النسك والعبادة. اشتهر بصمته وحكمته، وكان يقول: 'كثيراً ما ندمت على الكلام، أما على الصمت فلم أندم قط'. عاش أكثر من 95 عاماً في النسك والعبادة، وتنيح بسلام عام 445م.",
  },
  {
    date: "9 مايو",
    name: "الشهيد إيسيذوروس الأنطاكي",
    title: "جندي الإيمان",
    description:
      "ولد القديس إيسيذوروس في أنطاكية من أبوين مسيحيين. كان جندياً في الجيش الروماني في عهد الإمبراطور دقلديانوس. عندما اكتشف الوالي أنه مسيحي، حاول إقناعه بالتخلي عن إيمانه وتقديم البخور للأوثان، لكنه رفض بشجاعة. تعرض لتعذيب شديد، ثم قطعوا رأسه ونال إكليل الشهادة. اشتهر بمعجزات كثيرة حدثت بعد استشهاده، وبنيت كنائس كثيرة على اسمه في مصر وسوريا.",
  },
  {
    date: "10 مايو",
    name: "القديس بيمن المتوحد",
    title: "نجم البرية",
    description:
      "ولد القديس بيمن (باخوميوس) في صعيد مصر من أسرة فقيرة. ترك العالم وذهب إلى برية شيهيت حيث ترهب وعاش حياة النسك الشديد. اشتهر بحكمته وإرشاداته الروحية، وكان يقول: 'إذا رأيت خطايا أخيك، فاستر عليه، وإذا رأيت فضائله فأخبر بها الآخرين'. جاء إليه الكثيرون من كل مكان ليستمعوا إلى تعاليمه وإرشاداته. عاش أكثر من 70 عاماً في النسك والعبادة، وتنيح بسلام في القرن الرابع الميلادي.",
  },
  {
    date: "11 مايو",
    name: "الشهيد فيلوثاوس الأنطاكي",
    title: "شاهد الحق",
    description:
      "ولد القديس فيلوثاوس في أنطاكية من أبوين وثنيين، لكنه تعرف على المسيحية وآمن بالسيد المسيح. كان طبيباً ماهراً، واستخدم مهنته لخدمة الفقراء والمحتاجين. في عهد اضطهاد الإمبراطور دقلديانوس للمسيحيين، تم القبض عليه واعترف بإيمانه بالمسيح. تعرض لتعذيب شديد، لكنه ظل ثابتاً على إيمانه. أخيراً قطعوا رأسه ونال إكليل الشهادة عام 303م. ظهرت من جسده معجزات كثيرة، وبنيت كنيسة على اسمه في أنطاكية.",
  },
  {
    date: "12 مايو",
    name: "القديس إبيفانيوس أسقف قبرص",
    title: "عمود الأرثوذكسية",
    description:
      "ولد القديس إبيفانيوس في فلسطين من أبوين يهوديين، ثم اعتنق المسيحية. درس في الإسكندرية وتتلمذ على يد القديس أنطونيوس الكبير. أسس ديراً في فلسطين وترأسه لمدة 30 عاماً. ثم اختير أسقفاً لقبرص حيث خدم لمدة 36 عاماً. كان مدافعاً قوياً عن الإيمان الأرثوذكسي ضد الهرطقات، وكتب كتباً كثيرة في الدفاع عن الإيمان. تنيح بسلام عام 403م عن عمر يناهز 115 عاماً. تعيد له الكنيسة في 12 مايو من كل عام.",
  },
  {
    date: "13 مايو",
    name: "القديسة تكلا هيمانوت الحبشي",
    title: "كوكب الحبشة المنير",
    description:
      "ولد القديس تكلا هيمانوت في الحبشة (إثيوبيا) عام 1215م من أبوين تقيين. منذ صغره أظهر تقوى وحباً للكتاب المقدس. ترهب في سن مبكرة وعاش حياة النسك الشديد. قام بتبشير مناطق كثيرة في الحبشة، وأسس ديراً شهيراً هناك. كان له دور كبير في نشر المسيحية في الحبشة وتثبيت الإيمان الأرثوذكسي. اشتهر بمعجزات كثيرة وبحياة الصلاة والصوم. تنيح بسلام عام 1313م عن عمر يناهز 98 عاماً. تعتبره الكنيسة الإثيوبية من أعظم قديسيها.",
  },
  {
    date: "14 مايو",
    name: "الشهيد إسحق الدفراوي",
    title: "شهيد الصعيد",
    description:
      "ولد القديس إسحق في قرية دفرة بالصعيد المصري من أبوين مسيحيين تقيين. كان فلاحاً بسيطاً يعمل في الأرض، لكنه كان غنياً بإيمانه ومحبته للمسيح. في عهد الاضطهاد الروماني للمسيحيين، تم القبض عليه واعترف بإيمانه بالمسيح. حاول الوالي إقناعه بالتخلي عن إيمانه وتقديم البخور للأوثان، لكنه رفض بشجاعة. تعرض لتعذيب شديد، ثم قطعوا رأسه ونال إكليل الشهادة. بنيت كنيسة على اسمه في قريته، وتحتفل الكنيسة بتذكار استشهاده في 14 مايو",
  },
]

// App version and updates
const APP_VERSION = "1.0.0"
const APP_UPDATES = {
  "1.0.3": {
    version: "1.0.3",
    title: "تحديث شامل",
    description: "تم إضافة مجموعة من الميزات الجديدة لتحسين تجربة المستخدم",
    features: [
      "إضافة الوضع الليلي (الداكن) للتطبيق",
      "إمكانية تصدير البيانات بصيغة Excel",
      "إضافة نظام تنبيهات للمناسبات والاجتماعات",
      "إمكانية مشاركة التقارير عبر الواتساب",
    ],
  },
}

// QR Code URL and Church logo
const QR_CODE_URL = "/placeholder.svg?height=100&width=100"
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
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [hasBorder, setHasBorder] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState("")
  const [showStats, setShowStats] = useState(false)
  const [showPrintConfirm, setShowPrintConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const reportCanvasRef = useRef<HTMLCanvasElement>(null)

  const { toast } = useToast()

  // Get current date for Bible verse and special events
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1
  const currentDate = `${currentDay} ${months[today.getMonth()]}`

  // Find the verse for today's date
  const getCurrentVerse = () => {
    const verseByDate = bibleVerses.find((v) => v.date === currentDate)
    if (verseByDate) return verseByDate
    return bibleVerses[0]
  }

  const currentVerse = getCurrentVerse()

  // Get current saint
  const getCurrentSaint = () => {
    const saintByDate = dailySaints.find((s) => s.date === currentDate)
    if (saintByDate) return saintByDate
    return dailySaints[0]
  }

  const currentSaint = getCurrentSaint()

  // Special Text Watermark component
  const SpecialTextWatermark = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="text-center w-full flex flex-col items-center justify-center py-10">
          <div className="flex items-center justify-center">
            <h1
              className="text-6xl md:text-7xl font-extrabold watermark-text"
              style={{
                color: "#000000",
                opacity: 0.5,
                textAlign: "center",
              }}
            >
              الكمـــــــبيوتر وتكنلوجيا المعلومات والآتصالآت
            </h1>
            <span
              className="text-6xl md:text-7xl font-extrabold ml-4"
              style={{
                fontFamily: "'Arial Black', 'Helvetica', sans-serif",
                textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                color: "#000000",
                opacity: 0.5,
              }}
            >
              VS
            </span>
          </div>
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

    // Show update dialog
    setShowUpdateDialog(true)
    localStorage.setItem("lastUpdateCheck", Date.now().toString())

    // Set border if app version is 1.0.3 or higher
    setHasBorder(true)
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

  const handleUpdateAccept = () => {
    toast({
      title: "جاري التحديث",
      description: "يتم الآن تحديث التطبيق إلى الإصدار الجديد...",
    })

    // Simulate update process
    setTimeout(() => {
      localStorage.setItem("appVersion", "1.0.3")
      setShowUpdateDialog(false)
      setHasBorder(true)
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث التطبيق إلى الإصدار 1.0.3",
      })
    }, 2000)
  }

  const generateStudentReport = (student: Student) => {
    setSelectedStudent(student)
    setShowPrintConfirm(true)
  }

  const renderAdvancedReport = () => {
    if (!selectedStudent || !reportCanvasRef.current) return

    setTimeout(() => {
      if (reportCanvasRef.current && selectedStudent) {
        const canvas = reportCanvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        canvas.width = 800
        canvas.height = 1000

        // Fill background
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw fancy black border
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 15
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

        // Add inner border
        ctx.strokeStyle = "#222222"
        ctx.lineWidth = 2
        ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50)

        // Add header rectangle with black border
        ctx.fillStyle = "#f8f8f8"
        ctx.fillRect(50, 50, canvas.width - 100, 150)
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 3
        ctx.strokeRect(50, 50, canvas.width - 100, 150)

        // Add student name and info
        ctx.fillStyle = "#000000"
        ctx.font = "bold 28px 'Noto Kufi Arabic', serif"
        ctx.textAlign = "right"
        ctx.fillText(`الاسم: ${selectedStudent.name}`, canvas.width - 80, 90)

        // Add student number (starting with 666)
        const studentNumber = selectedStudent.number.startsWith("666")
          ? selectedStudent.number
          : "666" + selectedStudent.number
        ctx.font = "bold 20px 'Noto Kufi Arabic', serif"
        ctx.fillText(`الرقم: ${studentNumber}`, canvas.width - 80, 130)

        // Add code
        const randomCode =
          "SYS" +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")
        ctx.fillText(`الكود: ${randomCode} من النظــــــام`, canvas.width - 80, 170)

        // Add birth date
        ctx.fillText(`تاريخ الميلاد: ${selectedStudent.birthDate}`, canvas.width - 80, 210)

        // Draw circular student photo on the left
        const photoX = 120
        const photoY = 125
        const photoRadius = 60

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
          // Draw horizontal line
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(50, 240)
          ctx.lineTo(canvas.width - 50, 240)
          ctx.stroke()

          // Create attendance table
          const tableTop = 280
          const tableWidth = canvas.width - 100
          const rowHeight = 50
          const colWidth = tableWidth / 4

          // Draw table header
          ctx.fillStyle = "#f0f0f0"
          ctx.fillRect(50, tableTop, tableWidth, rowHeight)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 1
          ctx.strokeRect(50, tableTop, tableWidth, rowHeight)

          // Draw table header text
          ctx.fillStyle = "#000000"
          ctx.font = "bold 18px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"

          ctx.fillText("الجمعة 1", 50 + colWidth * 0.5, tableTop + 30)
          ctx.fillText("الجمعة 2", 50 + colWidth * 1.5, tableTop + 30)
          ctx.fillText("الجمعة 3", 50 + colWidth * 2.5, tableTop + 30)
          ctx.fillText("الجمعة 4", 50 + colWidth * 3.5, tableTop + 30)

          // Draw vertical lines
          for (let i = 1; i < 4; i++) {
            ctx.beginPath()
            ctx.moveTo(50 + colWidth * i, tableTop)
            ctx.lineTo(50 + colWidth * i, tableTop + rowHeight * 2)
            ctx.stroke()
          }

          // Draw attendance data
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(50, tableTop + rowHeight, tableWidth, rowHeight)
          ctx.strokeRect(50, tableTop + rowHeight, tableWidth, rowHeight)

          // Fill attendance data
          ctx.fillStyle = "#000000"
          ctx.font = "16px 'Noto Kufi Arabic', serif"

          for (let i = 0; i < 4; i++) {
            const status = selectedStudent.fridays[i] ? "✓ حاضر" : "✗ غائب"
            ctx.fillText(status, 50 + colWidth * (i + 0.5), tableTop + rowHeight + 30)
          }

          // Draw behavior and commitment section
          const bcTop = tableTop + rowHeight * 2 + 30

          ctx.font = "bold 20px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "right"
          ctx.fillText("السلوك:", canvas.width - 80, bcTop)
          ctx.fillText("الالتزام:", canvas.width - 80, bcTop + 50)

          // Draw behavior bar
          const barWidth = 300
          const barHeight = 20
          const barLeft = canvas.width - 400

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
          ctx.fillRect(barLeft, bcTop + 35, barWidth, barHeight)

          ctx.fillStyle = "#2196f3"
          ctx.fillRect(barLeft, bcTop + 35, (selectedStudent.commitment / 5) * barWidth, barHeight)

          ctx.strokeStyle = "#000000"
          ctx.strokeRect(barLeft, bcTop + 35, barWidth, barHeight)

          ctx.fillStyle = "#000000"
          ctx.textAlign = "left"
          ctx.fillText(`${selectedStudent.commitment}/5`, barLeft + barWidth + 10, bcTop + 50)

          // Draw percentage
          const percentTop = bcTop + 100
          ctx.font = "bold 24px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "right"
          ctx.fillText(`النسبة الإجمالية: ${selectedStudent.percentage}%`, canvas.width - 80, percentTop)

          // Draw attendance message
          const currentFridayIndex = Math.min(3, Math.floor(currentDay / 7))
          const attendanceMessage = selectedStudent.fridays[currentFridayIndex]
            ? "هذا الشخص حضر الجمعة الحالية."
            : "هذا الشخص لم يحضر الجمعة الحالية."

          ctx.font = "20px 'Noto Kufi Arabic', serif"
          ctx.fillText(attendanceMessage, canvas.width - 80, percentTop + 50)

          // Add watermark
          ctx.save()
          ctx.globalAlpha = 0.2
          ctx.font = "bold 40px 'El Messiri', 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"
          ctx.fillStyle = "#000000"
          ctx.fillText("الكمـــــــبيوتر وتكنلوجيا المعلومات والآتصالآت", canvas.width / 2, canvas.height - 100)
          ctx.fillText("VS", canvas.width / 2, canvas.height - 50)
          ctx.restore()

          // Add footer
          ctx.font = "14px 'Noto Kufi Arabic', serif"
          ctx.textAlign = "center"
          ctx.fillText("كنيسة الشهيد العظيم مارجرجس والانبا باخوميوس - العصافرة", canvas.width / 2, canvas.height - 30)
          ctx.fillText("خدمة لاحظ نفسك", canvas.width / 2, canvas.height - 10)
        }
      }
    }, 100)
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

  return (
    <div
      className={`relative container mx-auto py-4 space-y-6 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen ${hasBorder ? "border-8 border-black" : ""}`}
      style={{ fontFamily: "'Amiri', 'Noto Kufi Arabic', serif" }}
    >
      {/* Add styles */}
      <style>{styles}</style>

      {/* Special Text Watermark */}
      <SpecialTextWatermark />

      {/* Header with Church Name */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 md:p-6 rounded-lg shadow-lg text-center mb-6 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <img src={QR_CODE_URL || "/placeholder.svg"} alt="QR Code" className="h-12 w-12 rounded" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="text-white hover:bg-blue-700/50"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <img src={CHURCH_LOGO || "/placeholder.svg"} alt="Church Logo" className="h-16 w-16" />
        </div>
        <h1 className="text-xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}>
          كنيسة الشهيد العظيم مارجرجس والانبا باخوميوس - العصافرة
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-5 w-5 md:h-6 md:w-6" />
          <h2 className="text-lg md:text-xl font-semibold" style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}>
            خدمة لاحظ نفسك
          </h2>
        </div>
      </div>

      {/* Help and Verse Section - Optimized for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
        {/* Help Section */}
        <Dialog>
          <DialogTrigger asChild>
            <Card
              className={`cursor-pointer ${darkMode ? "hover:bg-gray-800 bg-gray-800" : "hover:bg-blue-50 bg-white"} transition-colors`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`${darkMode ? "bg-blue-900" : "bg-blue-100"} p-3 rounded-full`}>
                  <HelpCircle className={`h-6 w-6 md:h-8 md:w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-800"}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
                  >
                    عن التطبيق
                  </h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    اضغط هنا لمعرفة المزيد عن استخدام التطبيق
                  </p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
            <DialogHeader>
              <DialogTitle
                className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : ""}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                عن التطبيق
              </DialogTitle>
            </DialogHeader>
            <div className="text-right" dir="rtl">
              <h3 className="text-xl font-bold mb-3">تطبيق متابعة الحضور والسلوك</h3>
              <p className="mb-3">
                تم تطوير هذا التطبيق بواسطة فريق "الكمـــــــبيوتر وتكنلوجيا المعلومات والآتصالآت" لمساعدة خدام مدارس
                الأحد في متابعة حضور الطلاب وسلوكهم والتزامهم.
              </p>
              <p className="mb-3">
                يتيح التطبيق إمكانية تسجيل بيانات الطلاب، ومتابعة حضورهم في الجمعات، وتقييم سلوكهم والتزامهم، وإصدار
                تقارير مفصلة عن كل طالب.
              </p>
              <p className="mb-3">
                كما يوفر التطبيق آية يومية للتأمل، ومعلومات عن القديسين والشهداء، لتعزيز الجانب الروحي والتعليمي.
              </p>
              <h4 className="text-lg font-bold mt-4 mb-2">المطور:</h4>
              <p className="mb-3">
                <strong>بيشوي مراد</strong> - مبرمج ومطور تطبيقات ويب متخصص في تطوير الحلول التقنية للكنائس والخدمات
                المسيحية.
              </p>
              <p className="mb-3">
                للتواصل والاستفسارات:{" "}
                <a href="mailto:info@beshoymorad.com" className="text-blue-600 hover:underline">
                  info@beshoymorad.com
                </a>
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Daily Verse Section */}
        <Dialog>
          <DialogTrigger asChild>
            <Card
              className={`cursor-pointer ${darkMode ? "hover:bg-gray-800 bg-gray-800" : "hover:bg-blue-50 bg-white"} transition-colors`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`${darkMode ? "bg-amber-900" : "bg-amber-100"} p-3 rounded-full`}>
                  <AlertCircle className={`h-6 w-6 md:h-8 md:w-8 ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold ${darkMode ? "text-amber-400" : "text-amber-800"}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
                  >
                    رسالة من ربنا ليــــــــك ..؟
                  </h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>آية اليوم للتأمل والتشجيع</p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className={`max-w-3xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
            <DialogHeader>
              <DialogTitle
                className={`text-2xl font-bold text-center mb-4 ${darkMode ? "text-white" : ""}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                رسالة من ربنا ليــــــــك ..؟
              </DialogTitle>
            </DialogHeader>
            <div className={`${darkMode ? "bg-amber-900/30" : "bg-amber-50"} p-6 rounded-lg`} dir="rtl">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className={`h-5 w-5 ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
                <p className={`font-bold ${darkMode ? "text-amber-400" : "text-amber-800"}`}>
                  {currentVerse.date} - {currentVerse.day}
                </p>
              </div>
              <p className="verse-text mb-2">{`"${currentVerse.verse}"`}</p>
              <p className="verse-reference mb-4">📖 {currentVerse.reference}</p>
              <p className="verse-explanation">{currentVerse.explanation}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Saints Section */}
      <div className="mb-6 relative z-10">
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 py-3">
            <CardTitle
              className="text-center text-lg md:text-xl font-bold text-white"
              style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
            >
              ذكرى القديسين اليومية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="saint-card">
              <div className="saint-header">
                {currentSaint.date} - {currentSaint.title}
              </div>
              <div className="saint-content">
                <h3 className="saint-name">{currentSaint.name}</h3>
                <p className="saint-description">{currentSaint.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="entry" className="w-full relative z-10">
        <TabsList className={`grid grid-cols-2 mb-4 ${darkMode ? "bg-gray-800" : ""}`}>
          <TabsTrigger
            value="entry"
            className={`text-lg font-bold ${darkMode ? "data-[state=active]:bg-blue-800 data-[state=active]:text-white" : ""}`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            انتظار التسجيل
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className={`text-lg font-bold ${darkMode ? "data-[state=active]:bg-blue-800 data-[state=active]:text-white" : ""}`}
            style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
          >
            قبول الآنتظار
          </TabsTrigger>
        </TabsList>

        {/* Data Entry Tab */}
        <TabsContent value="entry">
          <Card
            className={`border-t-4 border-blue-600 shadow-lg ${darkMode ? "bg-gray-800 text-white" : ""} border-8 border-black`}
          >
            <CardHeader
              className={`${darkMode ? "bg-gradient-to-r from-blue-900 to-blue-800" : "bg-gradient-to-r from-blue-50 to-blue-100"} py-3`}
            >
              <CardTitle
                className={`text-center text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-blue-800"}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                نظام متابعة الحضور والسلوك
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {/* Form content would go here */}
              <Button
                onClick={handleAddStudent}
                disabled={students.length >= 200}
                className={`${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} mt-3 w-full`}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                إضافة طالب جديد ({students.length}/200)
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students List Tab */}
        <TabsContent value="list">
          <Card
            className={`border-t-4 border-blue-600 shadow-lg mb-4 ${darkMode ? "bg-gray-800 text-white" : ""} border-8 border-black`}
          >
            <CardHeader
              className={`${darkMode ? "bg-gradient-to-r from-blue-900 to-blue-800" : "bg-gradient-to-r from-blue-50 to-blue-100"} py-3`}
            >
              <CardTitle
                className={`text-center text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-blue-800"}`}
                style={{ fontFamily: "'Noto Kufi Arabic', 'Amiri', serif" }}
              >
                قائمة الطلاب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">{/* Table content would go here */}</CardContent>
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

      {/* Footer */}
      <div className="text-center text-gray-500 text-xs py-3 relative z-10">
        <p>© {new Date().getFullYear()} كنيسة الشهيد العظيم مارجرجس والانبا باخوميوس - العصافرة</p>
        <p className="mt-1">تطوير: beshoymorad</p>
      </div>

      <Toaster />
    </div>
  )
}
