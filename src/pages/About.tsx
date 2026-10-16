import { useState } from 'react'
import { Target, Eye, Users, BookOpen, TrendingUp, Handshake, DollarSign, Users2, Building2, MapPin, Mail, ChevronDown, ChevronUp, Download, X, Info } from 'lucide-react'

export default function About() {
  const [showFullBoard, setShowFullBoard] = useState<number | null>(null)
  const [selectedFederation, setSelectedFederation] = useState<number | null>(null)

  const federations = [
    {
      name: "Burka Galana Federation",
      location: "Holata, Oromia",
      shgs: 45,
      clas: 5,
      members: 900,
      year: 2018,
      amharic: {
        fullName: "ቡርቃ ጋላና ሴቶች ራስን ለመርዳት ጉድኝት",
        description: "ቡርቃ ጋላና ፌዴሬሽን በ2018 ዓ.ም ተቋቁሟል። ይህ ፌዴሬሽን በሆላታ፣ ኦሮሚያ ክልል ውስጥ ተግባር ያከናውናል። በ5 ክሎስተር ማህበራትና 45 ራስን ለመርዳት ቡድኖች (SHGs) አማካኝነት 900 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ በበለጠ ለማበረታታት፣ ለአባላት የብድር አገልግሎትን፣ የጤና ትምህርት፣ እና የአካባቢን ጥበቃ ለመሳል ስልጠናዎችን ያዘጋጃል።"
      }
    },
    {
      name: "Wotean SHG Federation",
      location: "Hawassa, Sidama",
      shgs: 62,
      clas: 7,
      members: 1240,
      year: 2016,
      amharic: {
        fullName: "ወተን ራስን ለመርዳት ጉድኝት ፌዴሬሽን",
        description: "ወተን ፌዴሬሽን በ2016 ዓ.ም ተቋቁሟል። በሀዋሳ፣ ሲዳማ ክልል ውስጥ ተግባር ያከናውናል። በ7 ክሎስተር ማህበራትና 62 ራስን ለመርዳት ቡድኖች አማካኝነት 1,240 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶች መብትን ለማስተማር በንቃት ያገለግላል።"
      }
    },
    {
      name: "Timret Lelewt Federation",
      location: "Adama, Oromia",
      shgs: 78,
      clas: 9,
      members: 1560,
      year: 2015,
      amharic: {
        fullName: "ትምህርት ለልጆች ፌዴሬሽን",
        description: "ትምህርት ለልጆች ፌዴሬሽን በ2015 ዓ.ም ተቋቁሟል። በአዳማ፣ ኦሮሚያ ክልል ውስጥ ተግባር ያከናውናል። በ9 ክሎስተር ማህበራትና 78 ራስን ለመርዳት ቡድኖች አማካኝነት 1,560 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ የብድር አገልግሎት፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የአካባቢን ማሻሻያ ለመሳል ተግባራትን ያከናውናል።"
      }
    },
    {
      name: "YeDire Enist Federation",
      location: "Dire Dawa",
      shgs: 38,
      clas: 4,
      members: 760,
      year: 2019,
      amharic: {
        fullName: "የድሬ እንስት ፌዴሬሽን",
        description: "የድሬ እንስት ፌዴሬሽን በ2019 ዓ.ም ተቋቁሟል። በድሬዳዋ መስተዳድር ውስጥ ተግባር ያከናውናል። በ4 ክሎስተር ማህበራትና 38 ራስን ለመርዳት ቡድኖች አማካኝነት 760 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ እና የሴቶችን ኢኮኖሚያዊ ደህንነት ለማሻሻል ስልጠናዎችን ያዘጋጃል።"
      }
    },
    {
      name: "Anley Federation",
      location: "Jimma, Oromia",
      shgs: 51,
      clas: 6,
      members: 1020,
      year: 2018,
      amharic: {
        fullName: "አንሌይ ፌዴሬሽን",
        description: "አንሌይ ፌዴሬሽን በ2018 ዓ.ም ተቋቁሟል። በጅማ፣ ኦሮሚያ ክልል ውስጥ ተግባር ያከናውናል። በ6 ክሎስተር ማህበራትና 51 ራስን ለመርዳት ቡድኖች አማካኝነት 1,020 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ ራስን ጥገኝነት ለማስወገድ ተግባራትን ያከናውናል።"
      }
    },
    {
      name: "Yehabru Fre Federation",
      location: "Dessie, Amhara",
      shgs: 48,
      clas: 6,
      members: 960,
      year: 2017,
      amharic: {
        fullName: "የሀብሩ ፍሬ ፌዴሬሽን",
        description: "የሀብሩ ፍሬ ፌዴሬሽን በ2017 ዓ.ም ተቋቁሟል። በደሴ፣ አማራ ክልል ውስጥ ተግባር ያከናውናል። በ6 ክሎስተር ማህበራትና 48 ራስን ለመርዳት ቡድኖች አማካኝነት 960 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Jigjiga Federation",
      location: "Jigjiga, Somali",
      shgs: 35,
      clas: 4,
      members: 700,
      year: 2019,
      amharic: {
        fullName: "ጅጅጋ ራስን ለመርዳት ጉድኝት ፌዴሬሽን",
        description: "ጅጅጋ ፌዴሬሽን በ2019 ዓ.ም ተቋቁሟል። በጅጅጋ፣ ሶማሌ ክልል ውስጥ ተግባር ያከናውናል። በ4 ክሎስተር ማህበራትና 35 ራስን ለመርዳት ቡድኖች አማካኝነት 700 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ እና የሴቶችን ኢኮኖሚያዊ ደህንነት ለማሻሻል ስልጠናዎችን ያዘጋጃል።"
      }
    },
    {
      name: "Edget Bandnet Federation",
      location: "Amhara, Debremarkos",
      shgs: 62,
      clas: 6,
      members: 987,
      year: 2009,
      amharic: {
        fullName: "እድገት ባንድነት ፌዴሬሽን",
        description: "እድገት ባንድነት ፌዴሬሽን በ2009 ዓ.ም ተቋቁሟል። በደብረ ማርቆስ፣ አማራ ክልል ውስጥ ተግባር ያከናውናል። በ6 ክሎስተር ማህበራትና 62 ራስን ለመርዳት ቡድኖች አማካኝነት 987 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Addis Hiwot Federation",
      location: "Amhara, Debremarkos",
      shgs: 114,
      clas: 5,
      members: 1658,
      year: 2008,
      amharic: {
        fullName: "አዲስ ህይወት ፌዴሬሽን",
        description: "አዲስ ህይወት ፌዴሬሽን በ2008 ዓ.ም ተቋቁሟል። በደብረ ማርቆስ፣ አማራ ክልል ውስጥ ተግባር ያከናውናል። በ5 ክሎስተር ማህበራትና 114 ራስን ለመርዳት ቡድኖች አማካኝነት 1,658 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Hanis Federation",
      location: "Wolayta Sodo",
      shgs: 253,
      clas: 16,
      members: 4252,
      year: 2010,
      amharic: {
        fullName: "ሀንስ ፌዴሬሽን",
        description: "ሀንስ ፌዴሬሽን በ2010 ዓ.ም ተቋቁሟል። በወላይታ ሶዶ ውስጥ ተግባር ያከናውናል። በ16 ክሎስተር ማህበራትና 253 ራስን ለመርዳት ቡድኖች አማካኝነት 4,252 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Msale Federation",
      location: "Debre Brhan, Amhara",
      shgs: 30,
      clas: 4,
      members: 1120,
      year: 2013,
      amharic: {
        fullName: "ምሳሌ ፌዴሬሽን",
        description: "ምሳሌ ፌዴሬሽን በ2013 ዓ.ም ተቋቁሟል። በደብረ ብርሃን፣ አማራ ክልል ውስጥ ተግባር ያከናውናል። በ4 ክሎስተር ማህበራትና 30 ራስን ለመርዳት ቡድኖች አማካኝነት 1,120 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Tusa Federation",
      location: "Wolayta Sodo",
      shgs: 93,
      clas: 7,
      members: 1301,
      year: 2011,
      amharic: {
        fullName: "ቱሳ ፌዴሬሽን",
        description: "ቱሳ ፌዴሬሽን በ2011 ዓ.ም ተቋቁሟል። በወላይታ ሶዶ ውስጥ ተግባር ያከናውናል። በ7 ክሎስተር ማህበራትና 93 ራስን ለመርዳት ቡድኖች አማካኝነት 1,301 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
    {
      name: "Dandi Gudina Federation",
      location: "Fiche City, North Shewa Zone, Oromia Region",
      shgs: 108,
      clas: 6,
      members: 1378,
      year: 2014,
      amharic: {
        fullName: "ዳንዲ ጉዲና ፌዴሬሽን",
        description: "ዳንዲ ጉዲና ፌዴሬሽን በ2014 ዓ.ም ተቋቁሟል። በፊቼ፣ ሰሜን ሸዋ ዞን፣ ኦሮሚያ ክልል ውስጥ ተግባር ያከናውናል። በ6 ክሎስተር ማህበራትና 108 ራስን ለመርዳት ቡድኖች አማካኝነት 1,378 ሴቶችን ያገለግላል።",
        activities: "ፌዴሬሽኑ ለአባላት የብድር አገልግሎትን፣ የንግድ ስልጠና፣ የጤና ትምህርት፣ እና የሴቶችን ኢኮኖሚያዊ እና ማህበራዊ ሁኔታ ለማሻሻል በንቃት ያገለግላል።"
      }
    },
  ]

  const boardMembers = [
    {
      name: "Mr. Mulugeta Gebru",
      title: "Chairperson, CoSAP Board of Directors",
      org: "Jerusalem Children and Community Development Organization (JeCCDO)",
      image: "/board-mulugeta.jpg",
      bio: "Mr. Mulugeta Gebru is the Chief Executive Officer of Jerusalem Children and Community Development Organization (JeCCDO). JeCCDO is a pioneer organization for initiating SHG approach implementation in Ethiopia and JeCCDO is a founding member of CoSAP. Mr Mulugeta is serving as the Chairperson of CoSAP Board of Directors since 2019 (re-elected). He holds Master's Degree with close to forty years of professional experience in the civil society sector in Ethiopia.",
      email: "jeccdo@gmail.com"
    },
    {
      name: "Mrs. Mulu Haile",
      title: "Deputy Chairperson, CoSAP Board of Directors",
      org: "Mission of Community Development Program (MCDP)",
      image: "/board-mulu.jpg",
      bio: "Mrs. Mulu Haile is the founder and Executive Director of Mission of Community Development Program (MCDP). MCDP is founding member of CoSAP and Mrs. Mulu is serving as CoSAP Board of Directors Deputy Chairperson since 2019 (re-elected). She holds MA in Social Work with over thirty years of professional experience in the civil society sector in Ethiopia.",
      email: "muluhagush@gmail.com"
    },
    {
      name: "Mrs. Martha Nemera",
      title: "Member, CoSAP Board of Directors",
      org: "Women Empowerment Action (WE-Action)",
      image: "/board-martha.jpg",
      bio: "Mrs. Martha Nemera is the Executive Director of Women Empowerment Action (WE-Action). WE-Action is a member of CoSAP and promotes the SHG approach in various areas. Mrs. Martha holds MA degree in Gender and is serving as the member of CoSAP Board of Directors since 2019.",
      email: "martha.n@we-actionethiopia.org"
    },
    {
      name: "Mrs. Lemlem Tekuye",
      title: "Member, CoSAP Board of Directors",
      org: "Love for Children Organization (LCO)",
      image: "/board-lemlem.jpg",
      bio: "Mrs. Lemlem Tekuye is the founder and Executive Director of Love for Children Organization (LCO). LCO is the founding member of CoSAP. Mrs. Lemlem is serving as the member of CoSAP Board of Directors since 2022. She holds BA degree in Social Work and with over thirty years of professional experience in the Ethiopian CSO sector.",
      email: "lcoethiopia@yahoo.com"
    },
    {
      name: "Mrs. Zertihun Tefera",
      title: "Member, CoSAP Board of Directors",
      org: "Siiqqee Women's Development Association (SWDA)",
      image: "/board-zertihun.jpg",
      bio: "Mrs. Zertihun Tefera is the founder and Executive Director of Siiqqee Women's Development Association (SWDA). SWDA is the founding member of CoSAP. Mrs. Zertihun is serving as the member of CoSAP Board of Directors since 2022. She holds BA degree and with over twenty years of professional experience in the Ethiopian CSO sector.",
      email: "zertefera@gmail.com"
    },
    {
      name: "Mr. Dessisa Kabeta",
      title: "Member, CoSAP Board of Directors",
      org: "Vision of Community Development Association (VoCDA)",
      image: "/board-dessisa.jpg",
      bio: "Mr. Dessisa Kabeta is the founder and Executive Director of Vision of Community Development Association (VoCDA). VoCDA is the founding member of CoSAP. Mr. Dessisa is serving as the member of CoSAP board since 2019 (re-elected). He holds BA degree with over thirty years of professional experience in the Ethiopian CSO sector.",
      email: "vcda2003@gmail.com"
    },
    {
      name: "Mr. Gelaye Hailu",
      title: "Member, CoSAP Board of Directors",
      org: "Facilitator for Change (FC)",
      image: "",
      bio: "Mr. Gelaye Hailu is the Executive Director of Facilitator for Change (FC). FC is the founding member of CoSAP. Mr. Gelaye is serving as the member of CoSAP board since 2019 (re-elected). He holds BA degree with over thirty years of professional experience in the Ethiopian CSO sector.",
      email: "gelaye@gmail.com"
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-[#0047AB] py-20">
        <div className="w-full section-padding text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About CoSAP</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Consortium of Self Help Group Approach Promoters
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-full section-padding max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            The Consortium of Self-help group Approach Promoters (CoSAP) is an umbrella of organizations 
            engaged in the promotion of the women's Self Help Group (SHG) program in different parts of Ethiopia.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            CoSAP is established and operational with registration number 1590. Currently, CoSAP partners 
            are promoting the Self Help Group approach in Afar, Amhara, Benishangul Gumuz, Central Ethiopia, 
            Gambella, Oromiya, Sidama, South Ethiopia, Somali, Tigray, Addis Ababa and Dire Dawa.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            By end of 2024, about <strong>347,128 women</strong> were organized in more than <strong>28,924 SHGs</strong>, 
            <strong> 1,384 Cluster of SHGs</strong> and <strong>30 Federations (Timrets)</strong>. These women have been able to raise more than 
            <strong> ETB 439 million capital (USD 3.3 million)</strong>; subsequently, more than half a million children were directly benefiting from their mothers (guardians) by receiving better education, nutritious food, psychosocial 
            and health care not through external inputs but through the initiatives of their own parents and guardians.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="w-full section-padding">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0047AB] text-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Eye size={32} />
                </div>
                <h2 className="text-2xl font-bold">VISION</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To see Self help groups support each other for economic betterment and stand for social justice in Ethiopia
              </p>
            </div>
            <div className="bg-[#0047AB] text-white p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target size={32} />
                </div>
                <h2 className="text-2xl font-bold">MISSION</h2>
              </div>
              <p className="text-lg leading-relaxed">
                To coordinate and catalyze sustainable Self help development through capacity enhancement, advocacy, research and partnerships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-16">
        <div className="w-full section-padding">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-10 text-center">STRATEGIC OBJECTIVES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, title: "Promote the Self Help Group (SHG) approach" },
              { icon: BookOpen, title: "Capacity Enhancement of CSOs, SHG institutions and CoSAP" },
              { icon: Handshake, title: "Strengthen Advocacy and Partnerships" },
              { icon: DollarSign, title: "Stimulate Financial Inclusion" },
              { icon: TrendingUp, title: "Expand Resource Mobilization" },
            ].map((obj, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4 border border-gray-100">
                <div className="w-12 h-12 bg-[#0047AB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <obj.icon size={24} className="text-[#0047AB]" />
                </div>
                <p className="font-medium text-gray-800">{obj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHG Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full section-padding max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-4 text-center">The Self Help Group (SHG) Approach</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            The Self Help Group (SHG) approach is a powerful development model which recognizes poverty not only 
            as material deprivation but also as a continuous process of disempowerment.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="w-20 h-20 bg-[#0047AB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users2 size={36} className="text-[#0047AB]" />
              </div>
              <div className="w-10 h-10 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Self Help Group (SHG)</h3>
              <p className="text-gray-600">Grassroots level group made up of 15 to 20 women from similar socioeconomic background.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="w-20 h-20 bg-[#0047AB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 size={36} className="text-[#0047AB]" />
              </div>
              <div className="w-10 h-10 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cluster Level Association (CLA)</h3>
              <p className="text-gray-600">Second level whereby 8 to 10 strong SHGs form a CLA.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="w-20 h-20 bg-[#0047AB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={36} className="text-[#0047AB]" />
              </div>
              <div className="w-10 h-10 bg-[#0047AB] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Federation (Timret)</h3>
              <p className="text-gray-600">At the apex level, 8 or more strong CLAs come together to form the Federation ('Timet').</p>
            </div>
          </div>
        </div>
      </section>

      {/* Federations */}
      <section className="py-16">
        <div className="w-full section-padding">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-4 text-center">Our Federations</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Our federations (Timrets) serve as apex bodies that coordinate and support Cluster Level Associations across Ethiopia.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {federations.map((fed, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-sm font-semibold text-[#0047AB] mb-1">{fed.name}</h3>
                <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                  <MapPin size={12} /> {fed.location}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div><p className="text-gray-400">SHGs</p><p className="font-semibold text-gray-700">{fed.shgs}</p></div>
                  <div><p className="text-gray-400">CLAs</p><p className="font-semibold text-gray-700">{fed.clas}</p></div>
                  <div><p className="text-gray-400">Members</p><p className="font-semibold text-gray-700">{fed.members}</p></div>
                  <div><p className="text-gray-400">Est.</p><p className="font-semibold text-gray-700">{fed.year}</p></div>
                </div>
                <button 
                  onClick={() => setSelectedFederation(index)}
                  className="flex items-center gap-1 text-[#0047AB] text-xs font-medium hover:underline mt-1"
                >
                  <Info size={12} /> Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-16 bg-gray-50">
        <div className="w-full section-padding">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-4 text-center">Our Board Members</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Our Board of Directors guides CoSAP's strategic direction and governance.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Users size={64} className="mb-2 opacity-30" />
                      <span className="text-sm font-medium">Photo not available</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-[#0047AB] text-sm font-medium mb-1">{member.title}</p>
                  <p className="text-gray-500 text-xs mb-3">{member.org}</p>
                  
                  {showFullBoard === index ? (
                    <div className="animate-fade-in">
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{member.bio}</p>
                      <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm text-[#0047AB] hover:underline">
                        <Mail size={14} /> {member.email}
                      </a>
                      <button onClick={() => setShowFullBoard(null)} className="flex items-center gap-1 text-gray-500 text-xs mt-3 hover:text-gray-700">
                        <ChevronUp size={14} /> Show Less
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setShowFullBoard(index)} className="flex items-center gap-1 text-[#0047AB] text-sm font-medium hover:underline">
                      <ChevronDown size={14} /> Read More
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Board Group Photo */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src="/board-group-photo.jpg" 
                alt="CoSAP Board Members Group Photo"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-center bg-gray-50">
                <p className="text-gray-700 font-medium text-sm">CoSAP Board of Directors</p>
                <p className="text-gray-500 text-xs mt-1">Strategic guidance and governance for CoSAP's mission across Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Organizations */}
      <section className="py-16">
        <div className="w-full section-padding text-center">
          <h2 className="text-3xl font-bold text-[#0047AB] mb-4">Member Organizations</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            CoSAP brings together 52 member organizations working across Ethiopia to promote the SHG approach.
          </p>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img src="/member-orgs.jpg" alt="CoSAP Member Organizations" className="w-full" />
          </div>
        </div>
      </section>

      {/* Federation Detail Modal */}
      {selectedFederation !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedFederation(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0047AB]">{federations[selectedFederation].name}</h3>
                <button onClick={() => setSelectedFederation(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                <MapPin size={14} /> {federations[selectedFederation].location}
              </p>
              <div className="grid grid-cols-4 gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0047AB]">{federations[selectedFederation].shgs}</p>
                  <p className="text-xs text-gray-500">SHGs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0047AB]">{federations[selectedFederation].clas}</p>
                  <p className="text-xs text-gray-500">CLAs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0047AB]">{federations[selectedFederation].members}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#0047AB]">{federations[selectedFederation].year}</p>
                  <p className="text-xs text-gray-500">Est.</p>
                </div>
              </div>
              {federations[selectedFederation].amharic && (
                <div className="space-y-4">
                  <div className="bg-[#0047AB]/5 p-4 rounded-xl border border-[#0047AB]/10">
                    <h4 className="font-semibold text-[#0047AB] mb-2 text-sm uppercase tracking-wide">Amharic Name</h4>
                    <p className="text-gray-800 text-lg leading-relaxed font-medium">
                      {federations[selectedFederation].amharic!.fullName}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {federations[selectedFederation].amharic!.description}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Key Activities</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {federations[selectedFederation].amharic!.activities}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* How to Join */}
      <section className="py-16 bg-[#0047AB]">
        <div className="w-full section-padding">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#0047AB] mb-4 text-center">How to Become a Member</h2>
            <p className="text-gray-600 text-center mb-8">
              Thank you for your interest in joining the Consortium of Self Help Group Approach Promoters (CoSAP).
            </p>
            
            <p className="text-gray-700 mb-6">To process your membership application, please prepare the following documents:</p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Letter of Request: Printed, signed, stamped, and scanned.",
                "CoSAP Membership Form: Completed.",
                "SHG Approach Info Collection Sheet: Completed.",
                "Company Profile: Digital copy.",
                "Registration Licenses: Scanned copies.",
                "Board Meeting Minutes: Formally approving your organization's application to join CoSAP."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#0047AB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0047AB] text-xs font-bold">{index + 1}</span>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Downloadable Documents */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Download Required Forms</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="/reports/cosap-membership-form-2026.docx"
                  download
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3">
                    <Download size={20} className="text-[#0047AB]" />
                    <div>
                      <span className="text-gray-700 font-medium group-hover:text-[#0047AB] transition-colors block text-sm">CoSAP Membership Form (2026)</span>
                      <span className="text-gray-400 text-xs">.docx format</span>
                    </div>
                  </div>
                </a>
                <a 
                  href="/reports/shg-approach-info-collection.doc"
                  download
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3">
                    <Download size={20} className="text-[#0047AB]" />
                    <div>
                      <span className="text-gray-700 font-medium group-hover:text-[#0047AB] transition-colors block text-sm">SHG Approach Info Collection Sheet</span>
                      <span className="text-gray-400 text-xs">.doc format</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <h3 className="font-semibold text-gray-800 mb-3">Submission Instructions</h3>
              <p className="text-gray-600 mb-4">
                Please email all files to{' '}
                <a href="mailto:yosef.cosap@gmail.com" className="text-[#0047AB] font-medium hover:underline">yosef.cosap@gmail.com</a>
              </p>
              <p className="text-gray-500 text-sm mb-6">
                We appreciate your commitment to the SHG approach and look forward to collaborating with you toward a better future.
              </p>
              <a href="mailto:yosef.cosap@gmail.com?subject=CoSAP Membership Application"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white font-medium rounded-full hover:bg-[#003380] transition-colors">
                <Mail size={18} /> Apply via Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
