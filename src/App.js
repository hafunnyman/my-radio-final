import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
  Radio,
  AlertCircle,
} from "lucide-react";

// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// ★ 雲端音樂電台 - 9 大頻道 (最終完全體)
// 包含：爵士、輕柔、電子、中文、韓語、巴薩諾瓦、水晶、鋼琴、史詩歌劇
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

// --- 1. 爵士音樂 (Jazz) ---
const jazzSongs = Array.from({ length: 50 }, (_, i) => {
  const num = 254 + i;
  return {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/JAZZ-RADIO(50)/${num}.JAZZ.mp3`,
    trackName: `Jazz ${num}`,
  };
});

// --- 2. 輕柔音樂 (Soft/Lo-fi) ---
const softRanges = [
  { start: 587, end: 600, suffix: "Lo-fi.mp3" },
  { start: 16, end: 50, suffix: "Lo-fi.mp3" },
  { start: 51, end: 65, suffix: "LO-FI.mp3" },
  { start: 435, end: 484, suffix: "Lo-fi.mp3" },
];
const softSongs = softRanges.flatMap((range) =>
  Array.from({ length: range.end - range.start + 1 }, (_, i) => {
    const num = range.start + i;
    return {
      url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/SOFT-RADIO/${num}.${range.suffix}`,
      trackName: `Lo-fi ${num}`,
    };
  })
);

// --- 3. 電子音樂 (Electronic) ---
const electronicSongs = [
  ...Array.from({ length: 5 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/${
      62 + i
    }.電音${i + 1}.mp3`,
    trackName: `Electronic ${62 + i}`,
  })),
  ...Array.from({ length: 56 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/${
      67 + i
    }.電音${i + 6}.mp3`,
    trackName: `Electronic ${67 + i}`,
  })),
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/304.電音.mp3`,
    trackName: `Electronic 304`,
  },
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/305.sex.mp3`,
    trackName: `Electronic 305`,
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/${
      306 + i
    }.電音.mp3`,
    trackName: `Electronic ${306 + i}`,
  })),
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/312..電音.mp3`,
    trackName: `Electronic 312`,
  },
  ...Array.from({ length: 29 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/${
      313 + i
    }.電音.mp3`,
    trackName: `Electronic ${313 + i}`,
  })),
  ...Array.from({ length: 63 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/ELECTRONIC-RADIO/${
      342 + i
    }.SEX.mp3`,
    trackName: `Electronic ${342 + i}`,
  })),
];

// --- 4. 中文音樂 (Chinese) ---
const chineseFilenames = [
  "09瘋狂的夢.mp3",
  "10臭臉貓.mp3",
  "11準時下班.mp3",
  "12欠揍的貓星人.mp3",
  "13奇妙的外星奇遇.mp3",
  "14戀愛腦.mp3",
  "15煩人的過年逼問.mp3",
  "16牧羊座.mp3",
  "17美食的信仰.mp3",
  "18情人節 Bullshit.mp3",
  "19別再說追星是一種浪費.mp3",
  "20賓果賓果.mp3",
  "21揮霍吧！世界.mp3",
  "22在同個車站等你.mp3",
  "23不只愛你.mp3",
  "24獅子發威.mp3",
  "25完美主義.mp3",
  "26雙子座老大.mp3",
  "27選擇障礙.mp3",
  "28那些曾傷害我人.mp3",
  "29勇敢過生活.mp3",
  "30不再這麼想長大.mp3",
  "31.無冕之王(含歌詞)_.mp3",
  "32.興亡嘆(含字幕).mp3",
  "33.煙花不再(含歌詞).mp3",
  "34.倚夢長安(含字幕_).mp3",
  "35.亂世行(含字幕).mp3",
  "36.破雪而行(含字幕).mp3",
  "37.殘照(含歌詞).mp3",
  "38.赤壁風雲(E歌詞版).mp3",
  "39.孤星殞(E含字幕).mp3",
  "40.孤燈如舊(含字幕).mp3",
  "41.枯城(含字幕).mp3",
  "42.萬里歸途(含歌詞).mp3",
  "43.月下等你歸(字幕).mp3",
  "44.長河萬里(含字幕).mp3",
  "45.烏江不渡(含字幕).mp3",
  "46.終章之前(含字幕).mp3",
  "47.紙上殘花(含歌詞).mp3",
  "48.落筆成灰(含字幕).mp3",
  "49.九天戰魂(字幕).mp3",
  "50.大江滾滾(字幕).mp3",
  "51.山河不滅(字幕).mp3",
  "52.天皇戰歌(字幕).mp3",
  "53.永恆戰歌(字幕).mp3",
  "54.光耀蒼芎(字幕).mp3",
  "55.星河霸主(字幕).mp3",
  "56.風雲霸業(字幕).mp3",
  "57.烈焰長歌(字幕).mp3",
  "58.破天之刃(含字幕).mp3",
  "59.無疆之誓(字幕).mp3",
  "60.雷霆萬年(字幕).mp3",
  "61.蒼龍破曉(字幕).mp3",
  "123.再見.mp3",
  "124.道.mp3",
  "125.深夜的甜蜜.mp3",
  "126.不想聽你說！.mp3",
  "127.熟悉的街口少了誰的溫柔.mp3",
  "128.星座害我暈船.mp3",
  "129.그때도 지금도 너야(那時和現在都是你).mp3",
  "130.甜蜜的節奏(E歌詞版).mp3",
  "131.파도 소리 속에 우리(海浪聲中的我們).mp3",
  "132.無法逃脫的你.mp3",
  "133.one and only.mp3",
  "134.想賴床.mp3",
  "135.滑呀滑.mp3",
  "136.等等等.mp3",
  "137.肚子咕嚕咕嚕叫.mp3",
  "138.星期五的下午三點半.mp3",
  "139.陽光灑在我的臉龐.mp3",
  "140.前面好多人.mp3",
  "141.看著地圖轉啊轉.mp3",
  "142.叮咚一聲.mp3",
  "143.肚子開始不太對勁.mp3",
  "144.走到路口紅燈亮起.mp3",
  "145.奇怪奇怪真奇怪.mp3",
  "146.鬧鐘不要響起.mp3",
  "147.站上手扶梯慢慢向上.mp3",
  "148.手機螢幕看呀看.mp3",
  "149.夜幕降臨燈火通明.mp3",
  "150.畢一聲卡片進了閘門.mp3",
  "151.肚子餓了口渴了.mp3",
  "152.房間亂糟糟看了就煩.mp3",
  "153.滑呀滑手機在手.mp3",
  "154.準備出門東摸西摸.mp3",
  "155.又要訂飲料囉大家快點.mp3",
  "156.點飲料囉.mp3",
  "157.陽光灑落在小陽台.mp3",
  "158.洗衣機.mp3",
  "159.準備出門囉.mp3",
  "160.站上體重計深呼吸.mp3",
  "161.拿起牙刷擠呀擠.mp3",
  "162.洗完頭髮濕漉漉.mp3",
  "163.燈泡壞了黑漆漆.mp3",
  "164.小腳小腳點一點.mp3",
  "165.拍拍手呀點點頭.mp3",
  "166.鼻子有點癢癢的.mp3",
  "167.睡醒了身體有點僵.mp3",
  "168.喉嚨有點乾乾的.mp3",
  "169.靜靜坐著.mp3",
  "170.什麼都不想做.mp3",
  "171.打開電腦按下開機.mp3",
  "172.走進書店靜悄悄.mp3",
  "173.早晨一杯提神醒腦.mp3",
  "174.戴上耳機音樂響起.mp3",
  "175.睜開雙眼看見陽光.mp3",
  "176.微風輕輕吹吹過臉龐.mp3",
  "177.雨過天晴彩虹出現.mp3",
  "178.夜幕低垂星星出現.mp3",
  "179.春天來了花兒開了.mp3",
  "180.清晨醒來聽見鳥叫.mp3",
  "181.踏著輕快的腳步.mp3",
  "182.睜開雙眼迎接晨曦.mp3",
  "183.揹起我的小小背包.mp3",
  "184.吹一吹吹出泡泡.mp3",
  "185.小小的腳丫踩呀踩.mp3",
  "186.拿起我的七彩蠟筆.mp3",
  "187.心裡有個小小的夢想.mp3",
  "188.躂躂躂.mp3",
  "189.低頭看看地上的小草.mp3",
  "190.拿起蠟筆隨意塗鴉.mp3",
  "191.遇到困難有點害怕.mp3",
  "192.睜開雙眼看見陽光.mp3",
  "193.拿起我的小小樂器.mp3",
  "194.拿起我的快樂畫筆.mp3",
  "195.心裡有個小小的夢想.mp3",
  "196.陽光灑在我的臉龐.mp3",
  "197.今天想要來個小探險.mp3",
  "198.空氣中飄著快樂的音符.mp3",
  "199.心裡有艘小小的夢想船.mp3",
  "200.世界充滿快樂的顏色.mp3",
  "201.心裡有顆小小的夢想種子.mp3",
  "202.睜開雙眼看見美好.mp3",
  "203.吹起我的小小夢想氣球.mp3",
  "204.小腳小腳踩呀踩.mp3",
  "205.我的夢想是塊七彩畫版.mp3",
  "206.73.夜空閃爍小小的願望.mp3",
  "207.陽光灑下來我們一起跳舞.mp3",
  "208.心裡有個小小的夢想花園.mp3",
  "209.張開嘴巴唱起歌.mp3",
  "210.我的心是艘小小的發現號.mp3",
  "211.歡迎來到我的彩色世界.mp3",
  "212.心裡有座小小的夢想燈塔.mp3",
  "213.拿起我的快樂跳繩.mp3",
  "214.我是小小夢想畫家.mp3",
  "215.放起我的快樂風箏.mp3",
  "216.心裡有個小小的夢想城堡.mp3",
  "217.滴答滴答快樂的雨滴.mp3",
  "218.心裡長出一雙小小的夢想翅膀.mp3",
  "219.騎上我的快樂腳踏車.mp3",
  "220.心裡有個小小的夢想星空.mp3",
  "221.雨後天空架起一座彩虹橋.mp3",
  "222.心裡種下一顆小小的夢想花朵.mp3",
  "223.拉起我的快樂旅行箱.mp3",
  "224.我的心是顆小小的夢想熱氣球.mp3",
  "225.爬上高高的快樂溜滑梯.mp3",
  "226.我的夢想是幅小小的拼圖.mp3",
  "227.(更新)吹起一個大大的泡泡糖.mp3",
  "228.拿起我的快樂積木.mp3",
  "229.天空落下小小的夢想種子雨.mp3",
  "230.摺一架快樂的紙飛機.mp3",
  "231.回首望去感謝所有相遇.mp3",
  "232.周末的早晨.mp3",
  "233.陽光灑下來 心情真好.mp3",
  "234.雨夜的思念.mp3",
  "235.聽見你沒說的話.mp3",
  "236.你說愛 不如痛快.mp3",
  "237.你說愛 不如痛快(心碎版).mp3",
  "238.擁抱是場焚風(撕碎版).mp3",
  "239.錯身而過的光.mp3",
  "240.留不住的你.mp3",
  "241.空城無你.mp3",
  "242.初見若夢.mp3",
  "243.隔著命運的你.mp3",
  "244.餘生無妳.mp3",
  "245.歡樂看.mp3",
  "246.等我回家.mp3",
  "247.等妳回眸.mp3",
  "248.步步靠近妳.mp3",
  "249.此心安處.mp3",
  "250.風起時別離.mp3",
  "251.願無歸期.mp3",
  "252.空山無回.mp3",
  "253.最後一次心軟.mp3",
  "01心肝寶貝.mp3",
  "02不再續約的愛情.mp3",
  "03在城市流浪.mp3",
  "04痛到瘋.mp3",
  "05煙雨江南.mp3",
  "06輕快的步伐.mp3",
  "07壞婆婆.mp3",
  "08眼裡星光.mp3",
];

const chineseSongs = chineseFilenames.map((filename) => ({
  url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CHINESE-RADIO/${encodeURIComponent(
    filename
  )}`,
  trackName: filename.replace(".mp3", ""),
}));

// --- 5. 韓語音樂 (K-Pop) ---
const koreanFilenames = [
  "550.WHO I AM.mp3",
  "551.너를 처음 본 순간.mp3",
  "552.I feel good.mp3",
  "553.무기력.mp3",
  "554.너만 보면.mp3",
  "555.하루종일 너만 보여.mp3",
  "556.스물다섯의 나에게.mp3",
  "557.Next Time, It’s Mine (다음엔 나야).mp3",
  "558.비 오는 날에도 너를 기다려就算下雨我也會等你.mp3",
  "559.항상 거기 있어(你一直都在).mp3",
  "560.그때는 몰랐지 (I Didn’t Know Back Then).mp3",
  "561.Who Am I.mp3",
  "562.다시, 너를 (再次，遇見你).mp3",
  "563.넌 내 인생의 빛이야（你是我人生的光）.mp3",
  "564.절대 포기하지 마!（絕對不要放棄！）.mp3",
  "565.그 사람 나한테 너무해（那個人對我太過分了）.mp3",
  "566.Sorry Polar Bear (미안해 북극곰).mp3",
  "567.조금씩 가볍게（一點一點更輕盈）.mp3",
  "568.좋은 아침이야（早安，親愛的你）.mp3",
  "569.오늘, 잘 지냈어（今天過得好嗎？）.mp3",
  "570.오늘은 좀 일찍 나갈게요（今天我就先下班囉）.mp3",
  "571.괜찮을 거야（你會沒事的）.mp3",
  "572.포춘 쿠키 (幸運餅乾).mp3",
  "573.달빛 편지 (月光信).mp3",
  "574.BOOM UP.mp3",
  "575.Flash me.mp3",
  "576.이별 메뉴分手菜單.mp3",
  "577.내 뒤에 있는 너 (在我身後的你).mp3",
  "578.오늘도 살아있는 하루야 (今天又是活著的一天).mp3",
  "579.CTRL + Me.mp3",
  "580.Catch Me If You Can.mp3",
  "581.Break the Frame.mp3",
  "582.Flashback Love.mp3",
  "583.우린 인연이 아니었나 봐（我們大概不是命中注定吧）.mp3",
  "584.너의 하루는 나야 (你的每天都有我).mp3",
  "585.꼭 달고 나가 (Tag Along, Buddy!).mp3",
  "586.몰래 응원해(默默為你加油).mp3",
];

const koreanSongs = koreanFilenames.map((filename) => ({
  url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/KOREAN-RADIO/${encodeURIComponent(
    filename
  )}`,
  trackName: filename.replace(".mp3", ""),
}));

// --- 6. 巴薩諾瓦 (Bossa Nova) ---
const bossaSongs = [
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/BOSSA-RADIO/Untitled%20(Extend)%20(Extend).mp3`,
    trackName: `Bossa Nova 1`,
  },
  ...Array.from({ length: 91 }, (_, i) => {
    const num = i + 1;
    const filename = `Untitled (Extend) (Extend) (${num}).mp3`;
    return {
      url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/BOSSA-RADIO/${encodeURIComponent(
        filename
      )}`,
      trackName: `Bossa Nova ${num + 1}`,
    };
  }),
];

// --- 7. 水晶音樂 (Crystal) ---
const crystalSongs = [
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/Untitled.mp3`,
    trackName: `Crystal Music 1`,
  },
  ...Array.from({ length: 43 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/${encodeURIComponent(
      `Untitled (${i + 1}).mp3`
    )}`,
    trackName: `Crystal Music ${i + 2}`,
  })),
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/${encodeURIComponent(
      `Untitled (Extend).mp3`
    )}`,
    trackName: `Crystal Music 45`,
  },
  ...Array.from({ length: 13 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/${encodeURIComponent(
      `Untitled (Extend) (${i + 1}).mp3`
    )}`,
    trackName: `Crystal Music ${45 + i + 1}`,
  })),
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/${encodeURIComponent(
      `Untitled (Extend) (Extend).mp3`
    )}`,
    trackName: `Crystal Music 59`,
  },
  ...Array.from({ length: 11 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/CRYSTAL-RADIO/${encodeURIComponent(
      `Untitled (Extend) (Extend) (${i + 1}).mp3`
    )}`,
    trackName: `Crystal Music ${59 + i + 1}`,
  })),
];

// --- 8. 鋼琴音樂 (Piano) ---
const pianoSongs = [
  ...Array.from({ length: 71 - 8 + 1 }, (_, i) => {
    const num = i + 8; // 從 8 開始
    const filename = `Untitled (Extend) (Extend) (${num}).mp3`;
    return {
      url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/PIANO-RADIO/${encodeURIComponent(
        filename
      )}`,
      trackName: `Piano Music ${num}`,
    };
  }),
  {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/PIANO-RADIO/${encodeURIComponent(
      `Untitled (Extend) (Extend).mp3`
    )}`,
    trackName: `Piano Music 72`,
  },
  ...Array.from({ length: 7 }, (_, i) => {
    const num = i + 1;
    const filename = `Untitled (Extend) (Extend) (${num}).mp3`;
    return {
      url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/PIANO-RADIO/${encodeURIComponent(
        filename
      )}`,
      trackName: `Piano Music ${72 + num}`,
    };
  }),
];

// --- 9. 史詩歌劇 (Epic Opera) ---
// 根據清單：485-549 共 65 首
const epicSongs = Array.from({ length: 549 - 485 + 1 }, (_, i) => {
  const num = 485 + i;
  return {
    url: `https://raw.githubusercontent.com/hafunnyman/my-radio/main/EPIC-RADIO/${encodeURIComponent(
      `${num}.歌劇.mp3`
    )}`,
    trackName: `Epic Opera ${num}`,
  };
});

// --- 頻道總表 ---
const categories = [
  {
    id: "jazz",
    title: "爵士音樂",
    cover: "https://placehold.co/400x400/2a2a2a/FFF?text=Jazz+Radio",
    description: "放鬆心情的經典爵士選曲",
    songs: jazzSongs,
  },
  {
    id: "soft",
    title: "輕柔音樂",
    cover: "https://placehold.co/400x400/4a7a6a/FFF?text=Soft+Music",
    description: "舒緩身心的 Lo-fi 輕音樂",
    songs: softSongs,
  },
  {
    id: "electronic",
    title: "電子音樂",
    cover: "https://placehold.co/400x400/2a2a7a/FFF?text=Electronic",
    description: "充滿活力的電子節奏",
    songs: electronicSongs,
  },
  {
    id: "chinese",
    title: "中文音樂",
    cover: "https://placehold.co/400x400/7a2a2a/FFF?text=C-Pop",
    description: "華語流行精選",
    songs: chineseSongs,
  },
  {
    id: "korean",
    title: "韓語音樂",
    cover: "https://placehold.co/400x400/7a2a7a/FFF?text=K-Pop",
    description: "熱門韓語歌曲",
    songs: koreanSongs,
  },
  {
    id: "bossa",
    title: "巴薩諾瓦",
    cover: "https://placehold.co/400x400/c0a060/FFF?text=Bossa+Nova",
    description: "慵懶午後的 Bossa Nova",
    songs: bossaSongs,
  },
  {
    id: "crystal",
    title: "水晶音樂",
    cover: "https://placehold.co/400x400/a0d0e0/FFF?text=Crystal",
    description: "清澈療癒的水晶音樂",
    songs: crystalSongs,
  },
  {
    id: "piano",
    title: "鋼琴音樂",
    cover: "https://placehold.co/400x400/303030/FFF?text=Piano",
    description: "優美動人的鋼琴旋律",
    songs: pianoSongs,
  },
  {
    id: "epic",
    title: "史詩歌劇",
    cover: "https://placehold.co/400x400/8a2a2a/FFF?text=Epic+Opera",
    description: "氣勢磅礡的史詩與歌劇",
    songs: epicSongs,
  },
];

export default function App() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const audioRef = useRef(null);

  const currentCategory = categories[currentCategoryIndex];
  const currentSong = currentCategory.songs[currentSongIndex];

  const handleCategorySelect = (index) => {
    if (index !== currentCategoryIndex) {
      setCurrentCategoryIndex(index);
      setCurrentSongIndex(0);
      setIsPlaying(true);
      setErrorMsg("");
    } else {
      togglePlay();
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [currentCategoryIndex, currentSongIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.log("Autoplay prevented or interrupted");
          }
        });
      }
    }
  }, [currentSongIndex, currentCategoryIndex, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % currentCategory.songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex(
      (prev) =>
        (prev - 1 + currentCategory.songs.length) % currentCategory.songs.length
    );
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) setProgress((current / duration) * 100);
  };

  const handleError = () => {
    console.error("Playback error url:", currentSong.url);
    if (isPlaying) {
      setTimeout(() => nextSong(), 1000);
    }
    setErrorMsg(`無法播放 ${currentSong.trackName}，正在嘗試下一首...`);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const handleProgressClick = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    if (audioRef.current && duration) {
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* 左側：頻道列表 */}
      <div style={styles.sidebar}>
        <div style={styles.logoArea}>
          <Radio size={24} color="#4ade80" />
          <h2 style={styles.logoText}>Cloud Radio</h2>
        </div>

        <div style={styles.playlistHeader}>頻道列表 (CHANNELS)</div>

        <div style={styles.scrollableList}>
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(index)}
              style={{
                ...styles.channelItem,
                backgroundColor:
                  index === currentCategoryIndex
                    ? "rgba(74, 222, 128, 0.15)"
                    : "transparent",
                borderLeft:
                  index === currentCategoryIndex
                    ? "4px solid #4ade80"
                    : "4px solid transparent",
                opacity:
                  index !== currentCategoryIndex &&
                  index > 0 &&
                  cat.songs.length <= 2
                    ? 0.6
                    : 1,
              }}
            >
              {index === currentCategoryIndex && isPlaying ? (
                <Music size={18} color="#4ade80" style={{ marginRight: 12 }} />
              ) : (
                <div style={styles.channelIndex}>{index + 1}</div>
              )}

              <div style={styles.channelInfo}>
                <div
                  style={{
                    ...styles.channelTitle,
                    color: index === currentCategoryIndex ? "#4ade80" : "#fff",
                  }}
                >
                  {cat.title}
                </div>
                <div style={styles.channelDesc}>{cat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右側：主播放區 */}
      <div style={styles.playerArea}>
        <div style={styles.playerContent}>
          {errorMsg && (
            <div style={styles.errorBanner}>
              <AlertCircle size={20} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 唱片封面 */}
          <div style={styles.cdContainer}>
            <div
              style={{
                ...styles.cdWrapper,
                animation: isPlaying ? "spin 12s linear infinite" : "none",
              }}
            >
              <img
                src={currentCategory.cover}
                alt="Cover"
                style={styles.coverImage}
              />
              <div style={styles.cdHole}></div>
            </div>
          </div>

          {/* 顯示資訊：只顯示頻道名稱 */}
          <div style={styles.infoSection}>
            <h1 style={styles.bigTitle}>{currentCategory.title}</h1>
          </div>

          {/* 進度條 */}
          <div style={styles.progressSection}>
            <div style={styles.progressBg} onClick={handleProgressClick}>
              <div
                style={{ ...styles.progressFill, width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* 控制按鈕 */}
          <div style={styles.controlsSection}>
            <button style={styles.iconBtn} onClick={prevSong} title="上一首">
              <SkipBack size={32} />
            </button>
            <button style={styles.playBtn} onClick={togglePlay}>
              {isPlaying ? (
                <Pause size={40} fill="black" />
              ) : (
                <Play size={40} fill="black" style={{ marginLeft: 4 }} />
              )}
            </button>
            <button style={styles.iconBtn} onClick={nextSong} title="下一首">
              <SkipForward size={32} />
            </button>
          </div>

          {/* 音量 */}
          <div style={styles.volumeSection}>
            <Volume2 size={20} color="#888" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              style={styles.volumeSlider}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
        onError={handleError}
        crossOrigin="anonymous"
      />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}

const styles = {
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    background: "#121212",
    color: "#fff",
    fontFamily: "sans-serif",
    overflow: "hidden",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#000",
    borderRight: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  },
  logoArea: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid #333",
  },
  logoText: { margin: 0, fontSize: "20px", color: "#fff", fontWeight: "bold" },
  playlistHeader: {
    padding: "15px 20px",
    fontSize: "12px",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  scrollableList: {
    flex: 1,
    overflowY: "auto",
  },
  channelItem: {
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.2s",
    borderBottom: "1px solid #1a1a1a",
  },
  channelIndex: {
    width: "25px",
    color: "#555",
    fontSize: "14px",
    fontWeight: "bold",
  },
  channelInfo: { flex: 1, overflow: "hidden" },
  channelTitle: { fontSize: "16px", marginBottom: "4px", fontWeight: "500" },
  channelDesc: {
    fontSize: "12px",
    color: "#666",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  playerArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #1e1e2e, #000)",
  },
  playerContent: {
    width: "400px",
    textAlign: "center",
    position: "relative",
  },
  errorBanner: {
    position: "absolute",
    top: "-60px",
    left: "0",
    right: "0",
    background: "#ff4d4d",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
  },
  cdContainer: {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  },
  cdWrapper: {
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    border: "8px solid #222",
    position: "relative",
    overflow: "hidden",
  },
  coverImage: { width: "100%", height: "100%", objectFit: "cover" },
  cdHole: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50px",
    height: "50px",
    background: "#121212",
    borderRadius: "50%",
    border: "4px solid #333",
  },
  infoSection: { marginBottom: "30px" },
  bigTitle: {
    fontSize: "28px",
    margin: "0 0 10px 0",
    fontWeight: "bold",
    color: "#fff",
  },
  progressSection: { marginBottom: "30px", padding: "0 10px" },
  progressBg: {
    width: "100%",
    height: "6px",
    background: "#333",
    borderRadius: "3px",
    cursor: "pointer",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#4ade80",
    transition: "width 0.1s linear",
  },
  controlsSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    marginBottom: "30px",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#ccc",
    cursor: "pointer",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
  },
  playBtn: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#4ade80",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)",
    transition: "transform 0.1s",
  },
  volumeSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    width: "60%",
    margin: "0 auto",
  },
  volumeSlider: {
    flex: 1,
    height: "4px",
    accentColor: "#4ade80",
    cursor: "pointer",
  },
};
