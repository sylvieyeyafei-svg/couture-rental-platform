const backdrop = document.querySelector(".modal-backdrop");
const steps = [...document.querySelectorAll(".quiz-step")];
const progress = [...document.querySelectorAll(".quiz-progress span")];
const toast = document.querySelector(".toast");
let currentStep = 0;
let currentLanguage = "en";
const quizSelection = { occasion: null, mood: null };

const coutureReferences = {
  featured: [
    ["SCHIAPARELLI","FALL 2024 COUTURE","The Sculptural Black Gown","雕塑感黑色礼服","Dramatic Couture","戏剧高定","Gala / Museum Opening / Art Dinner","晚宴 / 博物馆开幕 / 艺术晚餐","Sculptural black silhouette, strong couture presence, high visual impact.","雕塑感黑色廓形，拥有强烈高定存在感与视觉冲击力。","Perfect for rare formal occasions where the client wants a memorable and powerful entrance.","适合希望留下难忘而有力量第一印象的稀有正式场合。","assets/schiaparelli-fall-2024-sculptural-black-gown.jpg","ref-black"],
    ["IRIS VAN HERPEN","FALL 2023 COUTURE","The Aquatic Architecture Dress","水生建筑礼服","Future Couture / Wearable Art","未来高定 / 可穿戴艺术","Museum Gala / Technology Luxury Event / Fashion Exhibition","博物馆晚宴 / 科技奢侈活动 / 时尚展览","Fluid, biomorphic and architectural silhouette inspired by water and movement.","受水与运动启发的流动、生物形态与建筑感廓形。","Ideal for clients seeking something intellectual, artistic and future-facing rather than a traditional evening gown.","适合追求思想性、艺术性和未来感，而非传统晚礼服的客户。","assets/iris-van-herpen-fall-2023-aquatic-architecture-dress.jpg","ref-aquatic"],
    ["JEAN PAUL GAULTIER BY SIMONE ROCHA","SPRING 2024 COUTURE","The Subversive Pearl Dress","颠覆性珍珠礼服","Young Couture / Feminine Tension","年轻高定 / 女性张力","Fashion Week Dinner / Cocktail Event / Editorial Dinner","时装周晚餐 / 鸡尾酒会 / 编辑晚宴","Pearls, sheer texture, romantic details and subversive femininity.","珍珠、透明质感、浪漫细节与颠覆性女性气质。","Perfect for younger luxury clients who want a look that feels artistic, feminine and unexpected.","适合追求艺术感、女性气质与意外感的年轻奢侈客群。","assets/gaultier-simone-rocha-spring-2024-subversive-pearl-dress.jpg","ref-pearl"],
    ["CHANEL","SPRING 2024 COUTURE","The Couture Tweed Set","高定斜纹软呢套装","Day Couture / Parisian Quiet Luxury","日间高定 / 巴黎静奢","Private Viewing / Luxury Lunch / Gallery Preview","私人预展 / 奢华午宴 / 画廊预览","Refined tweed, polished silhouette, elegant daytime couture.","精致斜纹软呢、利落廓形与优雅日间高定。","A sophisticated alternative to evening gowns, extending couture rental into daytime luxury occasions.","作为晚礼服之外的高级选择，将高定租赁延伸至日间奢华场合。","assets/chanel-spring-2024-couture-tweed-set.jpg","ref-tweed"],
    ["ELIE SAAB","FALL 2023 COUTURE","The Red Carpet Cape Gown","红毯披风礼服","Red Carpet Glamour","红毯魅力","Black Tie / Gala / Awards Night / Formal Dinner","黑领结晚宴 / 盛典 / 颁奖夜 / 正式晚餐","Embroidery, cape detail, dramatic evening silhouette and photogenic luxury.","刺绣、披风细节、戏剧性晚装廓形与上镜奢华感。","Makes strong commercial sense for one-time, high-impact events.","适合一次性高影响力活动，具备明确商业租赁价值。","assets/elie-saab-fall-2023-red-carpet-cape-gown.jpg","ref-cape"]
  ],
  iconic: [
    ["SCHIAPARELLI","SPRING 2024 COUTURE","The Sculptural Ivory Look","雕塑感象牙白造型","Iconic Sculpture","标志性雕塑","Gala / Art Dinner","盛典 / 艺术晚餐","Monumental ivory form with surreal couture presence.","超现实高定语言中的纪念碑式象牙白造型。","For a singular, art-led entrance.","适合独特且艺术导向的亮相。","assets/schiaparelli-spring-2024-sculptural-ivory-look.jpg","ref-ivory"],
    ["DIOR","SPRING 2024 COUTURE","The Architectural White Dress","建筑感白色礼服","Architectural Purity","建筑纯粹","Museum Gala / Private Viewing","博物馆晚宴 / 私人预展","Precise white volume and disciplined construction.","精准白色体量与严谨结构。","For refined cultural occasions with quiet impact.","适合强调克制影响力的文化场合。","assets/dior-spring-2024-architectural-white-dress.jpg","ref-white"],
    ["VALENTINO","SPRING 2024 COUTURE","The Soft Ivory Couture Dress","柔软象牙白高定礼服","Soft Couture","柔软高定","Formal Lunch / Gallery Preview","正式午宴 / 画廊预览","Airy ivory layers with effortless elegance.","轻盈象牙白层次与松弛优雅。","For clients seeking gentle distinction.","适合追求柔和独特感的客户。","assets/valentino-spring-2024-soft-ivory-couture-dress.jpg","ref-soft"],
    ["SCHIAPARELLI","FALL 2024 COUTURE","The Black Anatomy Gown","黑色解剖结构礼服","Surreal Drama","超现实戏剧","Gala / Fashion Exhibition","盛典 / 时尚展览","Anatomical structure and commanding black volume.","解剖式结构与强势黑色体量。","For maximum visual impact at rare events.","适合稀有场合中的最大视觉冲击。","assets/schiaparelli-fall-2024-black-anatomy-gown.jpg","ref-anatomy"]
  ],
  young: [
    ["JEAN PAUL GAULTIER BY SIMONE ROCHA","SPRING 2024 COUTURE","The Subversive Pearl Mini","颠覆性珍珠短裙","Young Couture","年轻高定","Cocktail / Fashion Week Dinner","鸡尾酒会 / 时装周晚餐","Pearls and abbreviated volume with rebellious charm.","珍珠与短款体量带来叛逆魅力。","For a playful, editorial evening statement.","适合俏皮且具有编辑感的晚间表达。","assets/gaultier-simone-rocha-spring-2024-subversive-pearl-mini.jpg","ref-pearl"],
    ["JEAN PAUL GAULTIER BY SIMONE ROCHA","SPRING 2024 COUTURE","The Sheer Rose Dress","透明玫瑰礼服","Romantic Tension","浪漫张力","Editorial Dinner / Cocktail","编辑晚宴 / 鸡尾酒会","Sheer layers and rose details balance delicacy with tension.","透明层次与玫瑰细节平衡精致与张力。","For an intimate, artful occasion.","适合亲密而艺术化的场合。","assets/gaultier-simone-rocha-spring-2024-sheer-rose-dress.jpg","ref-rose"],
    ["JEAN PAUL GAULTIER BY SIMONE ROCHA","SPRING 2024 COUTURE","The Black Corset Tulle Gown","黑色束身薄纱礼服","Dark Romance","暗黑浪漫","Fashion Gala / Formal Dinner","时尚盛典 / 正式晚宴","Corsetry and black tulle create a subversive romantic silhouette.","束身结构与黑色薄纱构成颠覆性浪漫廓形。","For clients seeking femininity with edge.","适合追求带有锋芒女性气质的客户。","assets/gaultier-simone-rocha-spring-2024-black-corset-tulle-gown.jpg","ref-corset"],
    ["GIAMBATTISTA VALLI","SPRING 2024 COUTURE","The Floral Volume Gown","花卉体量礼服","Joyful Volume","愉悦体量","Garden Gala / Wedding Celebration","花园盛典 / 婚礼庆典","Floral abundance and exuberant couture volume.","丰富花卉与充满生命力的高定体量。","For celebratory moments that invite spectacle.","适合需要戏剧效果的庆祝时刻。","assets/giambattista-valli-spring-2024-floral-volume-gown.jpg","ref-floral"]
  ],
  future: [
    ["IRIS VAN HERPEN","FALL 2023 COUTURE","The Aquatic Architecture Dress","水生建筑礼服","Aquatic Architecture","水生建筑","Museum Gala / Technology Luxury Event","博物馆晚宴 / 科技奢侈活动","Fluid biomorphic construction inspired by water.","受水启发的流动生物形态结构。","For an intellectual, future-facing statement.","适合具有思想性与未来感的表达。","assets/iris-van-herpen-fall-2023-aquatic-architecture-dress.jpg","ref-aquatic"],
    ["IRIS VAN HERPEN","FALL 2023 COUTURE","The Oceanic Wing Gown","海洋之翼礼服","Oceanic Motion","海洋动态","Cultural Gala / Fashion Exhibition","文化盛典 / 时尚展览","Wing-like layers evoke currents and oceanic movement.","翼状层次唤起水流与海洋运动。","For high-impact cultural occasions.","适合高影响力文化场合。","assets/iris-van-herpen-fall-2023-oceanic-wing-gown.jpg","ref-wing"],
    ["IRIS VAN HERPEN","SPRING 2023 COUTURE","The Ethereal Lace Structure","空灵蕾丝结构礼服","Ethereal Science","空灵科学","Art Dinner / Innovation Event","艺术晚餐 / 创新活动","Delicate lace translated through scientific structure.","通过科学结构重新诠释精致蕾丝。","For clients drawn to poetic innovation.","适合被诗意创新吸引的客户。","assets/iris-van-herpen-spring-2023-ethereal-lace-structure.jpg","ref-ethereal"],
    ["IRIS VAN HERPEN","FALL 2024 COUTURE","The Kinetic Sculpture Gown","动态雕塑礼服","Kinetic Couture","动态高定","Museum Opening / Gala","博物馆开幕 / 盛典","Sculptural movement appears suspended around the body.","雕塑般运动感仿佛悬浮于身体周围。","For a memorable, performance-like entrance.","适合如表演般令人难忘的亮相。","assets/iris-van-herpen-fall-2024-kinetic-sculpture-gown.jpg","ref-kinetic"],
    ["IRIS VAN HERPEN","FALL 2024 COUTURE","The Celestial Web Dress","天体织网礼服","Celestial Technology","天体科技","Technology Gala / Fashion Exhibition","科技晚宴 / 时尚展览","Web-like construction connects body, cosmos and technology.","网状结构连接身体、宇宙与科技。","For a visionary cultural statement.","适合具有远见的文化表达。","assets/iris-van-herpen-fall-2024-celestial-web-dress.jpg","ref-celestial"]
  ],
  occasion: [
    ["ELIE SAAB","SPRING 2024 COUTURE","The Crystal Cape Gown","水晶披风礼服","Red Carpet Radiance","红毯光芒","Awards Night / Gala","颁奖夜 / 盛典","Crystal embellishment and cape movement create camera-ready drama.","水晶装饰与披风动态营造镜头感戏剧效果。","For a highly photographed formal occasion.","适合高度曝光的正式场合。","assets/elie-saab-spring-2024-crystal-cape-gown.jpg","ref-crystal"],
    ["ELIE SAAB","FALL 2023 COUTURE","The Embroidered Evening Gown","刺绣晚礼服","Embroidered Glamour","刺绣魅力","Black Tie / Formal Dinner","黑领结晚宴 / 正式晚餐","Rich embroidery and a classic evening silhouette.","丰富刺绣与经典晚装廓形。","For timeless formal glamour without ownership.","无需拥有即可体验永恒正式魅力。","assets/elie-saab-fall-2023-embroidered-evening-gown.jpg","ref-embroidered"],
    ["ZUHAIR MURAD","FALL 2023 COUTURE","The Red Carpet Cape Gown","红毯披风礼服","Photogenic Drama","上镜戏剧","Gala / Awards Night","盛典 / 颁奖夜","A dramatic cape and embellished silhouette designed for impact.","戏剧披风与装饰廓形专为视觉冲击设计。","For one-time events demanding maximum presence.","适合需要最大存在感的一次性活动。","assets/zuhair-murad-fall-2023-red-carpet-cape-gown.jpg","ref-cape"],
    ["CHANEL","FALL 2024 COUTURE","The Pearl Trim Jacket Dress","珍珠饰边夹克裙","Parisian Day Couture","巴黎日间高定","Luxury Lunch / Gallery Preview","奢华午宴 / 画廊预览","Pearl trim and tailored polish bring couture into daylight.","珍珠饰边与精致剪裁将高定带入日间。","For sophisticated occasions beyond eveningwear.","适合晚装之外的精致场合。","assets/chanel-fall-2024-pearl-trim-jacket-dress.jpg","ref-tweed"],
    ["ARMANI PRIVÉ","SPRING 2024 COUTURE","The Liquid Satin Suit","液态缎面套装","Quiet Evening Luxury","静奢晚装","Private Dinner / Cultural Event","私人晚宴 / 文化活动","Liquid satin tailoring offers a refined alternative to gowns.","液态缎面剪裁提供礼服之外的精致选择。","For clients who prefer understated authority.","适合偏爱低调权威感的客户。","assets/armani-prive-spring-2024-liquid-satin-suit.jpg","ref-satin"]
  ]
};

const externalImageSources = {
  "assets/sculpted.png": ["https://assets.vogue.com/photos/65b0c3283a7c1b133dfccfc3/master/w_960,c_limit/00017-armani-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/armani-prive/slideshow/collection"],
  "assets/schiaparelli-fall-2024-sculptural-black-gown.jpg": ["https://assets.vogue.com/photos/667998fcb487fb6923e41e85/master/w_960,c_limit/00015-schiaparelli-fall-2024-couture-credit-brand.jpg","https://www.vogue.com/fashion-shows/fall-2024-couture/schiaparelli/slideshow/collection"],
  "assets/iris-van-herpen-fall-2023-aquatic-architecture-dress.jpg": ["https://assets.vogue.com/photos/64a2b9cb117ea73b4611d9f9/master/w_960,c_limit/00006-iris-van-herpen-fall-2023-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2023-couture/iris-van-herpen/slideshow/collection"],
  "assets/gaultier-simone-rocha-spring-2024-subversive-pearl-dress.jpg": ["https://assets.vogue.com/photos/65b140691cde98af98bd67ef/master/w_960,c_limit/00023-jean-paul-gaultier-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/jean-paul-gaultier/slideshow/collection"],
  "assets/chanel-spring-2024-couture-tweed-set.jpg": ["https://assets.vogue.com/photos/65afaff83a3bb201156e9fef/master/w_960,c_limit/00016-chanel-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/chanel/slideshow/collection"],
  "assets/elie-saab-fall-2023-red-carpet-cape-gown.jpg": ["https://assets.vogue.com/photos/64a594eb117ea73b4611daee/master/w_960,c_limit/00001-elie-saab-fall-2023-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2023-couture/elie-saab/slideshow/collection"],
  "assets/schiaparelli-spring-2024-sculptural-ivory-look.jpg": ["https://assets.vogue.com/photos/65ae6a32a16abb705eb0e834/master/w_960,c_limit/00014-schiaparelli-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/schiaparelli/slideshow/collection"],
  "assets/dior-spring-2024-architectural-white-dress.jpg": ["https://assets.vogue.com/photos/65ae99aa124d13d49ce33ec1/master/w_960,c_limit/00043-christian-dior-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/christian-dior/slideshow/collection"],
  "assets/valentino-spring-2024-soft-ivory-couture-dress.jpg": ["https://assets.vogue.com/photos/65b1abc8862b797267286f54/master/w_960,c_limit/00055-valentino-spring-2024-couture-credit-brand.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/valentino/slideshow/collection"],
  "assets/schiaparelli-fall-2024-black-anatomy-gown.jpg": ["https://assets.vogue.com/photos/667998f984b803aa9072870e/master/w_960,c_limit/00013-schiaparelli-fall-2024-couture-credit-brand.jpg","https://www.vogue.com/fashion-shows/fall-2024-couture/schiaparelli/slideshow/collection"],
  "assets/gaultier-simone-rocha-spring-2024-subversive-pearl-mini.jpg": ["https://assets.vogue.com/photos/65b1405974f6d2d7a5234799/master/w_960,c_limit/00008-jean-paul-gaultier-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/jean-paul-gaultier/slideshow/collection"],
  "assets/gaultier-simone-rocha-spring-2024-sheer-rose-dress.jpg": ["https://assets.vogue.com/photos/65b14069fd4c2d75f8695702/master/w_960,c_limit/00024-jean-paul-gaultier-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/jean-paul-gaultier/slideshow/collection"],
  "assets/gaultier-simone-rocha-spring-2024-black-corset-tulle-gown.jpg": ["https://assets.vogue.com/photos/65b14070c6a9bc555a0b508d/master/w_960,c_limit/00028-jean-paul-gaultier-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/jean-paul-gaultier/slideshow/collection"],
  "assets/giambattista-valli-spring-2024-floral-volume-gown.jpg": ["https://assets.vogue.com/photos/65aed6e7332b0ccedfea448d/master/w_960,c_limit/00034-giambattista-valli-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/giambattista-valli/slideshow/collection"],
  "assets/iris-van-herpen-fall-2023-oceanic-wing-gown.jpg": ["https://assets.vogue.com/photos/64a2b9f2bbb79c09d48ce93f/master/w_960,c_limit/00016-iris-van-herpen-fall-2023-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2023-couture/iris-van-herpen/slideshow/collection"],
  "assets/iris-van-herpen-spring-2023-ethereal-lace-structure.jpg": ["https://assets.vogue.com/photos/63ce695d426d4c71724c371d/master/w_960,c_limit/00005-iris-van-herpen-spring-2023-couture-brand.jpg","https://www.vogue.com/fashion-shows/spring-2023-couture/iris-van-herpen/slideshow/collection"],
  "assets/iris-van-herpen-fall-2024-kinetic-sculpture-gown.jpg": ["https://assets.vogue.com/photos/66795410d4fa131ddb033daf/master/w_960,c_limit/00001-iris-van-herpen-fall-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2024-couture/iris-van-herpen/slideshow/collection"],
  "assets/iris-van-herpen-fall-2024-celestial-web-dress.jpg": ["https://assets.vogue.com/photos/667954103ee158af9249cc18/master/w_960,c_limit/00002-iris-van-herpen-fall-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2024-couture/iris-van-herpen/slideshow/collection"],
  "assets/elie-saab-spring-2024-crystal-cape-gown.jpg": ["https://assets.vogue.com/photos/65b132f580f16dd088f06d43/master/w_960,c_limit/00002-elie-saab-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/elie-saab/slideshow/collection"],
  "assets/elie-saab-fall-2023-embroidered-evening-gown.jpg": ["https://assets.vogue.com/photos/64a5952f0def6fd42956f9ae/master/w_960,c_limit/00054-elie-saab-fall-2023-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2023-couture/elie-saab/slideshow/collection"],
  "assets/zuhair-murad-fall-2023-red-carpet-cape-gown.jpg": ["https://assets.vogue.com/photos/64a5a97193ebb91b8337451e/master/w_960,c_limit/00001-zuhair-murad-fall-2023-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2023-couture/zuhair-murad/slideshow/collection"],
  "assets/chanel-fall-2024-pearl-trim-jacket-dress.jpg": ["https://assets.vogue.com/photos/667a9f99b9c327e551e6a2d7/master/w_960,c_limit/00016-chanel-fall-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/fall-2024-couture/chanel/slideshow/collection"],
  "assets/armani-prive-spring-2024-liquid-satin-suit.jpg": ["https://assets.vogue.com/photos/65b0c3283a7c1b133dfccfc3/master/w_960,c_limit/00017-armani-spring-2024-couture-credit-gorunway.jpg","https://www.vogue.com/fashion-shows/spring-2024-couture/armani-prive/slideshow/collection"]
};

const referenceKey = (brand, look) => `${brand}|${look}`;
const recommendationLookup = new Map(
  Object.values(coutureReferences).flat().map(item => [referenceKey(item[0], item[2]), item])
);

const recommendationMatrix = {
  "Formal Dinner": {
    "Quietly Powerful": [["CHANEL","The Couture Tweed Set"],["DIOR","The Architectural White Dress"],["ARMANI PRIVÉ","The Liquid Satin Suit"]],
    "Romantic & Dramatic": [["ELIE SAAB","The Embroidered Evening Gown"],["ZUHAIR MURAD","The Red Carpet Cape Gown"],["VALENTINO","The Soft Ivory Couture Dress"]],
    "Sharp & Futuristic": [["IRIS VAN HERPEN","The Aquatic Architecture Dress"],["IRIS VAN HERPEN","The Kinetic Sculpture Gown"],["SCHIAPARELLI","The Sculptural Black Gown"]],
    "Relaxed & Refined": [["CHANEL","The Couture Tweed Set"],["ARMANI PRIVÉ","The Liquid Satin Suit"],["VALENTINO","The Soft Ivory Couture Dress"]]
  },
  "Wedding": {
    "Quietly Powerful": [["DIOR","The Architectural White Dress"],["VALENTINO","The Soft Ivory Couture Dress"],["CHANEL","The Couture Tweed Set"]],
    "Romantic & Dramatic": [["GIAMBATTISTA VALLI","The Floral Volume Gown"],["ELIE SAAB","The Crystal Cape Gown"],["VALENTINO","The Soft Ivory Couture Dress"]],
    "Sharp & Futuristic": [["IRIS VAN HERPEN","The Ethereal Lace Structure"],["IRIS VAN HERPEN","The Celestial Web Dress"],["SCHIAPARELLI","The Sculptural Ivory Look"]],
    "Relaxed & Refined": [["CHANEL","The Couture Tweed Set"],["VALENTINO","The Soft Ivory Couture Dress"],["ARMANI PRIVÉ","The Liquid Satin Suit"]]
  },
  "Art & Culture": {
    "Quietly Powerful": [["SCHIAPARELLI","The Black Anatomy Gown"],["DIOR","The Architectural White Dress"],["CHANEL","The Pearl Trim Jacket Dress"]],
    "Romantic & Dramatic": [["JEAN PAUL GAULTIER BY SIMONE ROCHA","The Sheer Rose Dress"],["JEAN PAUL GAULTIER BY SIMONE ROCHA","The Subversive Pearl Dress"],["GIAMBATTISTA VALLI","The Floral Volume Gown"]],
    "Sharp & Futuristic": [["IRIS VAN HERPEN","The Oceanic Wing Gown"],["IRIS VAN HERPEN","The Aquatic Architecture Dress"],["IRIS VAN HERPEN","The Kinetic Sculpture Gown"]],
    "Relaxed & Refined": [["CHANEL","The Couture Tweed Set"],["ARMANI PRIVÉ","The Liquid Satin Suit"],["VALENTINO","The Soft Ivory Couture Dress"]]
  },
  "Private Party": {
    "Quietly Powerful": [["SCHIAPARELLI","The Sculptural Black Gown"],["CHANEL","The Pearl Trim Jacket Dress"],["DIOR","The Architectural White Dress"]],
    "Romantic & Dramatic": [["JEAN PAUL GAULTIER BY SIMONE ROCHA","The Subversive Pearl Mini"],["JEAN PAUL GAULTIER BY SIMONE ROCHA","The Black Corset Tulle Gown"],["ELIE SAAB","The Crystal Cape Gown"]],
    "Sharp & Futuristic": [["IRIS VAN HERPEN","The Celestial Web Dress"],["IRIS VAN HERPEN","The Oceanic Wing Gown"],["SCHIAPARELLI","The Black Anatomy Gown"]],
    "Relaxed & Refined": [["ARMANI PRIVÉ","The Liquid Satin Suit"],["CHANEL","The Couture Tweed Set"],["VALENTINO","The Soft Ivory Couture Dress"]]
  }
};

function quizRecommendationCard(item) {
  const [brand, season, enLook, zhLook, enMood, zhMood, enOccasion, zhOccasion, , , enWhy, zhWhy, image, visualClass] = item;
  const zh = currentLanguage === "zh";
  const [externalImage] = externalImageSources[image] || [image];
  return `<article class="quiz-recommendation-card">
    <div class="quiz-recommendation-image ${visualClass}"><img src="${externalImage}" data-fallback="${image}" alt="${brand} ${season} — ${zh ? zhLook : enLook}, ${zh ? "仅作视觉参考" : "visual reference only"}"><span>${zh ? "仅作视觉参考" : "VISUAL REFERENCE ONLY"}</span></div>
    <div class="quiz-recommendation-copy"><p>${brand} · ${season}</p><h3>${zh ? zhLook : enLook}</h3>
    <dl><div><dt>${zh ? "情绪" : "Mood"}</dt><dd>${zh ? zhMood : enMood}</dd></div><div><dt>${zh ? "场合" : "Occasion"}</dt><dd>${zh ? zhOccasion : enOccasion}</dd></div><div><dt>${zh ? "推荐理由" : "Why this look"}</dt><dd>${zh ? zhWhy : enWhy}</dd></div></dl></div>
  </article>`;
}

function renderQuizRecommendations() {
  const container = document.querySelector(".quiz-recommendations");
  if (!quizSelection.occasion || !quizSelection.mood) {
    container.innerHTML = "";
    return;
  }
  const recommendations = recommendationMatrix[quizSelection.occasion][quizSelection.mood]
    .map(([brand, look]) => recommendationLookup.get(referenceKey(brand, look)))
    .filter(Boolean);
  container.innerHTML = recommendations.map(quizRecommendationCard).join("");
  const summary = document.querySelectorAll(".quiz-selection-summary button");
  summary[0].textContent = `${currentLanguage === "zh" ? "场合" : "Occasion"} · ${currentLanguage === "zh" ? translations[quizSelection.occasion] : quizSelection.occasion} ↗`;
  summary[1].textContent = `${currentLanguage === "zh" ? "情绪" : "Mood"} · ${currentLanguage === "zh" ? translations[quizSelection.mood] : quizSelection.mood} ↗`;
}

function renderQuizSelections() {
  document.querySelectorAll(".option-grid button").forEach(button => {
    const selectionType = button.closest(".quiz-step").dataset.step === "1" ? "occasion" : "mood";
    button.classList.toggle("selected", quizSelection[selectionType] === button.dataset.selectionValue);
  });
}

function referenceCard(item, featured = false, future = false) {
  const [brand, season, enLook, zhLook, enMood, zhMood, enOccasion, zhOccasion, enNotes, zhNotes, enWhy, zhWhy, image, visualClass] = item;
  const zh = currentLanguage === "zh";
  const [externalImage, sourcePage] = externalImageSources[image] || [image, "#"];
  return `<article class="${featured ? "featured-card" : "archive-card"} ${future ? "future-card" : ""}">
    <div class="reference-media"><div class="reference-visual ${visualClass}"><img src="${externalImage}" data-fallback="${image}" alt="${brand} ${season} — ${zh ? zhLook : enLook}, ${zh ? "仅作视觉参考" : "visual reference only"}"><span>${zh ? "仅作视觉参考" : "VISUAL REFERENCE ONLY"}</span><b>${brand}<br>${season}</b></div><a class="source-credit" href="${sourcePage}" target="_blank" rel="noreferrer">${zh ? "图片参考：Vogue Runway" : "Image reference: Vogue Runway"} ↗</a></div>
    <div class="reference-copy"><p class="reference-season">${brand} · ${season}</p><h3>${zh ? zhLook : enLook}</h3>
    <dl><div><dt>${zh ? "情绪" : "Mood"}</dt><dd>${zh ? zhMood : enMood}</dd></div><div><dt>${zh ? "场合" : "Occasion"}</dt><dd>${zh ? zhOccasion : enOccasion}</dd></div><div><dt>${zh ? "造型笔记" : "Style Notes"}</dt><dd>${zh ? zhNotes : enNotes}</dd></div><div><dt>${zh ? "租赁价值" : "Why Rent"}</dt><dd>${zh ? zhWhy : enWhy}</dd></div></dl>
    <button class="reference-consult quiz-trigger">${zh ? "以此造型开启咨询" : "Consult from this reference"} <span>↗</span></button></div></article>`;
}

function renderArchive() {
  document.querySelector("#featured-grid").innerHTML = coutureReferences.featured.map(item => referenceCard(item, true)).join("");
  document.querySelector("#iconic-grid").innerHTML = coutureReferences.iconic.map(item => referenceCard(item)).join("");
  document.querySelector("#young-grid").innerHTML = coutureReferences.young.map(item => referenceCard(item)).join("");
  document.querySelector("#future-grid").innerHTML = coutureReferences.future.map(item => referenceCard(item, false, true)).join("");
  document.querySelector("#occasion-grid").innerHTML = coutureReferences.occasion.map(item => referenceCard(item)).join("");
  bindQuizTriggers();
}

document.addEventListener("error", event => {
  if (!(event.target instanceof HTMLImageElement) || !event.target.dataset.fallback) return;
  const image = event.target;
  image.src = image.dataset.fallback;
  image.removeAttribute("data-fallback");
  const credit = image.closest(".reference-media")?.querySelector(".source-credit");
  if (credit) {
    credit.textContent = currentLanguage === "zh" ? "编辑视觉占位图 · 外部图片不可用" : "Editorial placeholder · external image unavailable";
    credit.removeAttribute("href");
  }
}, true);

const translations = {
  "PRIVATE COUTURE CONSULTATION · DIGITAL ARCHIVE": "私人高定咨询 · 数字档案",
  "PARIS · LONDON · NEW YORK": "巴黎 · 伦敦 · 纽约",
  "THE COUTURE INTELLIGENCE ISSUE · 01": "高定洞察特刊 · 01",
  "Runway intelligence,": "秀场洞察，",
  "personally worn.": "为你而穿。",
  "An editorial styling service translating runway research and brand intelligence into singular couture directions, curated around the way you want to arrive.": "一项编辑式造型服务，将秀场研究与品牌洞察转化为独特的高定方向，围绕你期待的亮相方式而策划。",
  "Explore the Edit": "探索本期编辑",
  "Begin Consultation": "开始造型咨询",
  "01 / EDITORIAL THESIS": "01 / 编辑主张",
  "Couture access needs": "体验高定需要",
  "an editor.": "一位编辑。",
  "We connect the cultural intelligence of the runway with the intimacy of personal styling, turning research into considered, wearable expression.": "我们连接秀场的文化洞察与私人造型的亲密体验，将研究转化为经过思考、真正可穿的个人表达。",
  "Read the platform thesis": "阅读平台主张",
  "Observe": "观察",
  "Runway signals and cultural shifts": "秀场信号与文化变化",
  "Interpret": "解读",
  "Brand codes through a personal lens": "以个人视角解读品牌语言",
  "Curate": "策划",
  "A singular, occasion-led direction": "独特且以场合为导向的方向",
  "THE FEATURED EDIT · ISSUE 01": "精选编辑 · 第 01 期",
  "PLATFORM THESIS · 2026": "平台主张 · 2026",
  "GRADUATE INNOVATION PROJECT · 2026": "研究生创新项目 · 2026",
  "FROM RUNWAY INTELLIGENCE TO RENTABLE COUTURE": "从秀场洞察到可租赁高定",
  "The Edit": "趋势编辑",
  "Featured Edit": "精选编辑",
  "Couture Archive": "高定档案",
  "01 · HOMEPAGE FEATURED EDIT": "01 · 首页精选编辑",
  "Five couture ideas.": "五种高定灵感。",
  "Five ways to arrive.": "五种亮相方式。",
  "Runway research translated into occasion-led styling directions for a consultation conversation.": "将秀场研究转译为以场合为导向的造型方向，开启咨询对话。",
  "Runway references are used for research and styling concept demonstration only. Not actual rental inventory.": "秀场参考仅用于研究与造型概念展示，并非实际租赁库存。",
  "04 · CURATED COUTURE ARCHIVE": "04 · 精选高定档案",
  "A research library for": "一个服务于",
  "personal expression.": "个人表达的研究资料库。",
  "Not a catalogue of inventory. A visual archive used by stylists to interpret silhouette, mood, occasion, and cultural relevance.": "这不是库存目录，而是造型师用于解读廓形、情绪、场合与文化关联的视觉档案。",
  "ARCHIVE 01": "档案 01",
  "Iconic Couture Impact": "标志性高定冲击力",
  "High-presence silhouettes for clients seeking an unforgettable formal entrance.": "为追求难忘正式亮相的客户提供高存在感廓形。",
  "ARCHIVE 02": "档案 02",
  "Young Couture & Feminine Tension": "年轻高定与女性张力",
  "Romantic codes disrupted through transparency, volume, pearls, and attitude.": "通过透明、体量、珍珠与态度颠覆浪漫语言。",
  "ARCHIVE 03 · FUTURE COUTURE EDIT": "档案 03 · 未来高定编辑",
  "Iris van Herpen represents the intersection of couture, science, nature and technology. This edit is designed for clients seeking sculptural, future-facing pieces for cultural and high-impact occasions.": "Iris van Herpen 代表高定、科学、自然与科技的交汇。本编辑为在文化与高影响力场合中寻求雕塑感和未来感的客户而设计。",
  "ARCHIVE 04": "档案 04",
  "Red Carpet Rental & Day Couture": "红毯租赁与日间高定",
  "Commercially relevant occasion dressing, from photogenic evening glamour to polished daytime luxury.": "从上镜晚装魅力到精致日间奢华，探索具有商业价值的场合着装。",
  "Rental Wardrobe": "租赁衣橱",
  "Project Rationale": "项目理念",
  "How It Works": "服务方式",
  "Journal": "趋势日志",
  "Style Profile": "风格档案",
  "RUNWAY TO WARDROBE · 2026": "RUNWAY TO WARDROBE · 2026",
  "From runway insight": "从秀场洞察",
  "to your wardrobe.": "到你的衣橱。",
  "A consultation-driven couture rental platform that translates runway trends and brand analysis into personalized, rentable styling.": "一个咨询驱动型高定租赁平台，将秀场趋势与品牌分析转化为个性化、可租赁的完整造型。",
  "View Project Rationale": "查看项目理念",
  "Explore Featured Edit": "探索首页精选",
  "Experience the Service": "体验造型服务",
  "Scroll to explore": "向下探索",
  "01 / OUR POINT OF VIEW": "01 / 我们的主张",
  "Trends should go beyond": "趋势不应止步于",
  "the report.": "一份报告。",
  "We bring expert trend intelligence into every rental decision, turning fashion research into personal expression you can actually wear.": "我们将专业趋势洞察前置到每一次租赁决策中，让时尚研究成为真正可以穿上的个人表达。",
  "Discover the strategic opportunity": "探索战略机会",
  "Global designer brands": "全球设计师品牌",
  "Garment recirculation rate": "单品循环使用率",
  "Personal styling support": "专属造型顾问",
  "THE RUNWAY EDIT · 01": "秀场趋势编辑 · 01",
  "This season's trends,": "本季趋势，",
  "ready to wear.": "已经为你备好。",
  "Curated by our trend research team,": "由趋势研究团队筛选，",
  "translated into complete rentable looks.": "并转译为可租赁的完整造型。",
  "TREND 01 · MODERN ROMANTICISM": "趋势 01 · 现代浪漫主义",
  "Modern Romanticism": "现代浪漫主义",
  "The return of soft draping and dramatic silhouettes": "柔软褶皱与戏剧廓形的重新回归",
  "Explore 18 curated pieces →": "探索 18 件精选单品 →",
  "TREND 02 · SCULPTED MINIMALISM": "趋势 02 · 雕塑极简主义",
  "Sculpted Minimalism": "雕塑极简主义",
  "Restrained structure with undeniable presence": "以克制结构塑造鲜明存在感",
  "Explore 12 curated pieces →": "探索 12 件精选单品 →",
  "03 / PROJECT RATIONALE": "03 / 项目理念",
  "GRADUATE INNOVATION PROJECT · JAN 2026 — PRESENT": "研究生创新项目 · 2026年1月至今",
  "A missing connection": "洞察与获取之间",
  "between": "缺失的",
  "insight": "关键连接",
  "and access.": "。",
  "Luxury trend intelligence influences the industry long before it reaches the individual. This project asks: what if that intelligence could guide a more personal, circular way to experience couture?": "奢侈时尚趋势洞察影响行业的时间，远早于其触达个人。本项目提出：如果这些洞察能够引导一种更个性化、更循环的高定体验，会发生什么？",
  "THE PROBLEM": "问题",
  "Trend knowledge stops at the report.": "趋势知识止步于报告。",
  "Runway analysis and forecasting shape production, yet rarely help consumers make more informed wardrobe decisions. The result is a gap between what the industry knows and what people can meaningfully access.": "秀场分析与趋势预测影响生产，却很少帮助消费者做出更明智的衣橱决策，由此造成行业知识与个人可获得体验之间的断层。",
  "THE COMPETITOR GAP": "竞品缺口",
  "Rental platforms offer inventory, not interpretation.": "租赁平台提供库存，却缺少趋势解读。",
  "Research across Rent the Runway, HURR, Une Robe Un Soir, and WGSN revealed a structural disconnect: rental provides access, while forecasting provides insight. Few services unite the two.": "对 Rent the Runway、HURR、Une Robe Un Soir 与 WGSN 的研究揭示了结构性断层：租赁提供获取，预测提供洞察，却很少有服务将二者连接。",
  "THE PROPOSED SOLUTION": "解决方案",
  "Consultation-driven rental.": "咨询驱动型租赁。",
  "Runway to Wardrobe translates runway signals and brand analysis into personalized, rentable couture styling. A stylist becomes the bridge between cultural insight, individual expression, and circular luxury.": "Runway to Wardrobe 将秀场信号与品牌分析转译为个性化、可租赁的高定造型。造型顾问成为文化洞察、个人表达与循环奢侈之间的桥梁。",
  "Runway Signals": "秀场信号",
  "Brand Analysis": "品牌分析",
  "Personal Consultation": "个人咨询",
  "Rentable Couture Look": "可租赁高定造型",
  "CURATED RENTAL": "精选租赁",
  "For your next": "为你的下一次",
  "important entrance.": "重要亮相。",
  "CURATED LOOKS · MORE ADDED WEEKLY": "套精选造型 · 每周持续更新",
  "All Curated": "全部精选",
  "Evening": "晚宴",
  "Wedding Guest": "婚礼宾客",
  "Art & Culture": "艺术活动",
  "Cocktail": "鸡尾酒会",
  "EDITOR'S PICK": "编辑推荐",
  "ON TREND": "本季趋势",
  "ONLY 1 LEFT": "仅余一件",
  "NEW ARRIVAL": "新品",
  "STYLIST'S CHOICE": "造型师精选",
  "RUNWAY EDIT": "秀场精选",
  "MODERN ROMANCE": "现代浪漫",
  "LIMITED EDITION": "限量款",
  "FUTURE CLASSIC": "未来经典",
  "Rose Pleated Gown": "玫瑰褶裥礼服",
  "Two-Tone Satin Gown": "双色缎面礼服",
  "Silver Sculpted Gown": "银色结构礼服",
  "Sculpted Burgundy Mini": "酒红雕塑感短裙",
  "Ivory Draped Column": "象牙白垂坠长裙",
  "Graphite Architectural Dress": "石墨色建筑感礼服",
  "Blush Organza Gown": "柔粉欧根纱礼服",
  "Asymmetric Draped Gown": "不对称垂坠礼服",
  "Liquid Silver Column": "液态银色长裙",
  "/ 4 days": "/ 4天",
  "HOW IT WORKS": "服务方式",
  "More than renting a dress.": "不只是租一件礼服。",
  "Find your expression.": "找到你的表达。",
  "Build My Style Profile": "建立我的风格档案",
  "Tell us about your occasion": "告诉我们你的场合",
  "Share the event, your preferences, and how you want to feel.": "分享活动信息、个人偏好与期待呈现的感觉。",
  "Receive a trend-led proposal": "收到趋势造型提案",
  "Your stylist curates three complete looks grounded in trend research.": "造型顾问基于趋势研究，为你策划三套完整造型。",
  "Try, arrive, return": "试穿、亮相、归还",
  "Flexible rental, trusted delivery, and professional care make the cycle effortless.": "灵活租期、安心配送与专业护理，让循环轻松完成。",
  "RUNWAY TO WARDROBE · PROJECT PERSPECTIVE": "RUNWAY TO WARDROBE · 项目观点",
  "The value of a garment": "一件衣服的价值",
  "is not in being owned,": "不在于被拥有，",
  "but in being worn.": "而在于被真正穿着。",
  "PERSPECTIVE / 06.2026": "观点 / 06.2026",
  "From forecast to wardrobe: why the next generation of fashion platforms must reconnect trend research with consumer decisions.": "从预测到衣橱：为什么下一代时尚平台必须重新连接趋势研究与消费决策。",
  "Read the full perspective →": "阅读完整观点 →",
  "YOUR NEXT LOOK": "你的下一套造型",
  "Your next entrance": "下一次亮相，",
  "starts with a conversation.": "从一次对话开始。",
  "Book a Complimentary Styling": "预约免费造型咨询",
  "Turning runway intelligence into personalized rentable couture.": "将秀场洞察转化为个性化可租赁高定。",
  "Contact": "联系",
  "Concept, research, strategy, and experience design.": "概念、研究、策略与体验设计。",
  "Where are you going?": "这次，你要去哪里？",
  "Choose the closest occasion. We will begin the curation from here.": "选择最接近的场合，我们会从这里开始策划。",
  "Formal Dinner": "正式晚宴",
  "Wedding": "婚礼现场",
  "Private Party": "私人派对",
  "How do you want to be remembered?": "你希望被如何记住？",
  "There is no right answer, only an expression closer to you.": "没有标准答案，只有更接近你的表达。",
  "Quietly Powerful": "安静而有力量",
  "Romantic & Dramatic": "浪漫且戏剧化",
  "Sharp & Futuristic": "利落与未来感",
  "Relaxed & Refined": "松弛但精致",
  "Your curated couture direction.": "你的高定精选方向。",
  "Three runway references selected for your occasion and desired presence.": "根据你的场合与期待呈现的气质，精选三组秀场参考。",
  "Recommendations are based on occasion, mood, and runway reference research. Visual references only, not actual rental inventory.": "推荐基于场合、情绪与秀场参考研究。仅作视觉参考，并非实际租赁库存。",
  "See My Curated Looks": "查看为我精选的造型"
};

const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([en, zh]) => [zh, en]));

function translateTextNodes(root, dictionary) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (node.parentElement.closest(".language-toggle, script, style")) return;
    const original = node.textContent;
    const trimmed = original.trim();
    if (!trimmed || !dictionary[trimmed]) return;
    node.textContent = original.replace(trimmed, dictionary[trimmed]);
  });
}

function setLanguage(language) {
  if (language === currentLanguage) return;
  translateTextNodes(document.body, language === "zh" ? translations : reverseTranslations);
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll(".lang-en").forEach(item => item.classList.toggle("active", language === "en"));
  document.querySelectorAll(".lang-zh").forEach(item => item.classList.toggle("active", language === "zh"));
  renderArchive();
  renderQuizSelections();
  renderQuizRecommendations();
}

document.querySelectorAll(".language-toggle").forEach(toggle => toggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "zh" : "en");
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderQuiz() {
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  progress.forEach((item, index) => item.classList.toggle("on", index <= currentStep));
  document.querySelector(".quiz-modal").classList.toggle("quiz-results-open", currentStep === 2);
  renderQuizSelections();
  if (currentStep === 2) renderQuizRecommendations();
}

function bindQuizTriggers() {
  document.querySelectorAll(".quiz-trigger").forEach(button => {
    if (button.dataset.quizBound) return;
    button.dataset.quizBound = "true";
    button.addEventListener("click", () => {
      document.querySelector(".mobile-menu").classList.remove("open");
      currentStep = 0;
      renderQuiz();
      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden", "false");
    });
  });
}

renderArchive();

document.querySelectorAll(".option-grid button").forEach(button => {
  button.dataset.selectionValue = button.textContent.trim();
});

document.querySelector(".modal-close").addEventListener("click", () => backdrop.classList.remove("open"));
backdrop.addEventListener("click", event => {
  if (event.target === backdrop) backdrop.classList.remove("open");
});

document.querySelectorAll(".option-grid button").forEach(option => option.addEventListener("click", () => {
  const selectionType = option.closest(".quiz-step").dataset.step === "1" ? "occasion" : "mood";
  quizSelection[selectionType] = option.dataset.selectionValue;
  currentStep = selectionType === "occasion" ? 1 : 2;
  renderQuiz();
}));

document.querySelectorAll(".quiz-selection-summary button").forEach(button => button.addEventListener("click", () => {
  currentStep = Number(button.dataset.editStep);
  renderQuiz();
}));

document.querySelector(".finish-quiz").addEventListener("click", () => {
  backdrop.classList.remove("open");
  document.querySelector("#archive").scrollIntoView({ behavior: "smooth" });
  showToast(currentLanguage === "zh" ? "风格档案已完成，精选衣橱已为你更新。" : "Style profile complete. Your curated wardrobe is ready.");
});

document.querySelectorAll(".save-button").forEach(button => button.addEventListener("click", () => {
  button.classList.toggle("saved");
  button.textContent = button.classList.contains("saved") ? "♥" : "♡";
  document.querySelector(".saved-count").textContent = document.querySelectorAll(".save-button.saved").length;
  const message = button.classList.contains("saved")
    ? (currentLanguage === "zh" ? "已加入你的风格档案" : "Added to your style profile")
    : (currentLanguage === "zh" ? "已取消收藏" : "Removed from saved items");
  showToast(message);
}));

document.querySelectorAll(".filter").forEach(filter => filter.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  filter.classList.add("active");
  document.querySelectorAll(".product-card").forEach(card => {
    card.classList.toggle("hidden", filter.dataset.filter !== "all" && !card.dataset.category.includes(filter.dataset.filter));
  });
}));

const mobileMenu = document.querySelector(".mobile-menu");
document.querySelector(".menu-button").addEventListener("click", () => mobileMenu.classList.add("open"));
document.querySelector(".menu-close").addEventListener("click", () => mobileMenu.classList.remove("open"));
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mobileMenu.classList.remove("open")));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    backdrop.classList.remove("open");
    mobileMenu.classList.remove("open");
  }
});

const header = document.querySelector(".site-header");
const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealTargets = document.querySelectorAll(
  ".manifesto-copy, .stats, .archive-heading, .featured-card, .rationale-title, .rationale-grid, .chapter-heading, .archive-card, .future-intro, .future-card, .how-intro, .steps, .journal-content, .cta h2"
);
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
  revealTargets.forEach(target => {
    target.classList.add("reveal-ready");
    revealObserver.observe(target);
  });
}
