export type Locale = 'ar' | 'en';
export type Bilingual = { ar: string; en: string };
export const copy = (ar: string, en: string): Bilingual => ({ ar, en });
export const routes = [
  '/',
  '/about',
  '/kitchens',
  '/projects',
  '/projects/quiet-contrast',
  '/projects/classic-light',
  '/process',
  '/showrooms',
  '/contact',
  '/catalog',
];
export const navigation = [
  { path: '/', label: copy('الرئيسية', 'Home') },
  { path: '/about', label: copy('عن رواد', 'About') },
  { path: '/kitchens', label: copy('مطابخنا', 'Kitchens') },
  { path: '/projects', label: copy('المشاريع والشراكات', 'Projects') },
  { path: '/process', label: copy('كيف نعمل', 'Our process') },
  { path: '/showrooms', label: copy('معارضنا', 'Showrooms') },
];
export const meta: Record<string, { title: Bilingual; description: Bilingual }> = {
  '/': {
    title: copy('رواد المطابخ | مساحة تشبهك', 'ROWAD Kitchens | A space of your own'),
    description: copy(
      'اكتشف تصاميم رواد المطابخ ورحلة التصميم من الفكرة والقياس إلى التصنيع والتركيب.',
      'Explore ROWAD kitchen designs and the journey from measuring and design to manufacturing and installation.',
    ),
  },
  '/about': {
    title: copy('عن رواد | رواد المطابخ', 'About ROWAD | ROWAD Kitchens'),
    description: copy(
      'رواد المطابخ، شركة سعودية لتصميم وتصنيع المطابخ. تعرّف على رؤيتنا للمساحة والتفاصيل.',
      'A Saudi kitchen design and manufacturing company. Discover an approach to space and considered detail.',
    ),
  },
  '/kitchens': {
    title: copy('مطابخنا | رواد المطابخ', 'Kitchen collection | ROWAD Kitchens'),
    description: copy(
      'مجموعة من صور مطابخ رواد؛ استكشف الطابع المعاصر والكلاسيكي وتفاصيل التصميم.',
      'A curated collection of ROWAD kitchen photography, from contemporary lines to classic details.',
    ),
  },
  '/projects': {
    title: copy('المشاريع والشراكات | رواد المطابخ', 'Projects & partnerships | ROWAD Kitchens'),
    description: copy(
      'قراءات بصرية في تصاميم رواد ومساحة للتواصل حول المشاريع والشراكات.',
      'Visual studies of ROWAD designs and a place to begin a project or partnership inquiry.',
    ),
  },
  '/projects/quiet-contrast': {
    title: copy('هدوء التباين | رواد المطابخ', 'Quiet contrast | ROWAD Kitchens'),
    description: copy(
      'قراءة تصميمية في صورة مطبخ رواد بألوان هادئة وإضاءة دافئة.',
      'A visual study of a ROWAD kitchen with muted tones and warm lighting.',
    ),
  },
  '/projects/classic-light': {
    title: copy('كلاسيكية يملؤها الضوء | رواد المطابخ', 'Classic, in the light | ROWAD Kitchens'),
    description: copy(
      'قراءة تصميمية في مطبخ بأبواب كلاسيكية ودرجات فاتحة من صور رواد.',
      'A visual study of classic cabinetry and a light palette from the supplied ROWAD collection.',
    ),
  },
  '/process': {
    title: copy('كيف نعمل | رواد المطابخ', 'Our process | ROWAD Kitchens'),
    description: copy(
      'القياس وتحديد المتطلبات، التصميم الأولي، التصنيع، ثم التركيب. رحلة مطبخك مع رواد.',
      'Measurement and requirements, initial design, manufacturing, then installation. Your kitchen journey with ROWAD.',
    ),
  },
  '/showrooms': {
    title: copy('المعارض | رواد المطابخ', 'Showrooms | ROWAD Kitchens'),
    description: copy(
      'خطّط لزيارة معرض رواد واستعد لمناقشة تصميم مطبخك.',
      'Plan a ROWAD showroom visit and prepare to discuss your kitchen design.',
    ),
  },
  '/contact': {
    title: copy('ابدأ رحلتك | رواد المطابخ', 'Start a conversation | ROWAD Kitchens'),
    description: copy(
      'جهّز طلبك لتصميم مطبخ أو مناقشة مشروع مع رواد المطابخ.',
      'Prepare your kitchen design or project inquiry for ROWAD Kitchens.',
    ),
  },
  '/catalog': {
    title: copy('دليل التصاميم | رواد المطابخ', 'Design guide | ROWAD Kitchens'),
    description: copy(
      'استكشف مجموعة صور رواد وتعرّف على حالة توفر الكتالوج الرسمي.',
      'Explore the ROWAD image collection and official catalog availability.',
    ),
  },
};
export type Kitchen = {
  id: string;
  image: string;
  title: Bilingual;
  description: Bilingual;
  category: 'modern' | 'classic';
  palette: Bilingual;
  colors: string[];
  large?: boolean;
  detail?: string;
};
export const kitchens: Kitchen[] = [
  {
    id: '13',
    image: '13',
    title: copy('هدوء التباين', 'Quiet contrast'),
    description: copy(
      'درجات رمادية وإضاءة دافئة تبرز الخطوط النظيفة.',
      'Muted grey cabinetry, clean lines, and a considered glow.',
    ),
    category: 'modern',
    palette: copy('رمادي · إضاءة دافئة', 'Grey · warm light'),
    colors: ['#414849', '#aca89b', '#d5b875'],
    large: true,
    detail: '/projects/quiet-contrast',
  },
  {
    id: '04',
    image: '04',
    title: copy('كلاسيكية يملؤها الضوء', 'Classic, in the light'),
    description: copy(
      'واجهات فاتحة وتفاصيل كلاسيكية حول جزيرة مفتوحة.',
      'Light cabinetry and classic details around an open island.',
    ),
    category: 'classic',
    palette: copy('عاجي · تفاصيل داكنة', 'Ivory · dark accents'),
    colors: ['#e8e3d7', '#a9a7a0', '#363539'],
    large: true,
    detail: '/projects/classic-light',
  },
  {
    id: '02',
    image: '02',
    title: copy('دفء التفاصيل', 'Warmth in the details'),
    description: copy(
      'درجات متوازنة ومساحة جلوس متصلة بالمطبخ.',
      'A balanced palette with a place to gather.',
    ),
    category: 'classic',
    palette: copy('أخضر هادئ · كريمي', 'Sage · cream'),
    colors: ['#777a68', '#d4c6ad', '#eae2d4'],
  },
  {
    id: '03',
    image: '03',
    title: copy('توازن الدرجات', 'A tonal balance'),
    description: copy(
      'خزائن داكنة تقابلها واجهات فاتحة.',
      'Dark cabinetry meets a lighter counterpoint.',
    ),
    category: 'classic',
    palette: copy('فحمي · رمادي فاتح', 'Charcoal · soft grey'),
    colors: ['#4c4c49', '#d1d1c7', '#9c9584'],
  },
  {
    id: '05',
    image: '05',
    title: copy('امتداد هادئ', 'Quiet continuity'),
    description: copy(
      'مساحة طولية بتفاصيل متتابعة.',
      'A continuous composition along a linear space.',
    ),
    category: 'classic',
    palette: copy('رمادي · خشبي', 'Grey · wood tones'),
    colors: ['#61635d', '#665145', '#c5bfb0'],
  },
  {
    id: '06',
    image: '06',
    title: copy('نغمة دافئة', 'A warmer note'),
    description: copy(
      'ألوان محايدة وإضاءة تحت الخزائن.',
      'Neutral tones with light beneath the cabinetry.',
    ),
    category: 'classic',
    palette: copy('حجري · كريمي', 'Stone · cream'),
    colors: ['#a19786', '#d6cbb9', '#6a6258'],
  },
  {
    id: '07',
    image: '07',
    title: copy('بساطة مدروسة', 'Considered simplicity'),
    description: copy('واجهات مسطحة وجزيرة بتباين واضح.', 'Flat fronts and a contrasting island.'),
    category: 'modern',
    palette: copy('عاجي · أسود', 'Ivory · black'),
    colors: ['#ccc5b5', '#272625', '#969082'],
  },
  {
    id: '08',
    image: '08',
    title: copy('ضوء ومساحة', 'Light and space'),
    description: copy(
      'خط إضاءة دافئ يعبر التكوين الداكن.',
      'Warm lighting traces a dark composition.',
    ),
    category: 'modern',
    palette: copy('فحمي · ضوء كهرماني', 'Charcoal · amber light'),
    colors: ['#3d3e3a', '#c5b893', '#c59a4b'],
  },
  {
    id: '09',
    image: '09',
    title: copy('مساحة للّقاء', 'A place to gather'),
    description: copy(
      'جزيرة تتوسط المطبخ بتفاصيل كلاسيكية.',
      'An island at the heart of a classic composition.',
    ),
    category: 'classic',
    palette: copy('رمادي · أبيض دافئ', 'Grey · warm white'),
    colors: ['#97958e', '#d7d2c7', '#5d5b57'],
  },
  {
    id: '10',
    image: '10',
    title: copy('خطوط طبيعية', 'Natural lines'),
    description: copy(
      'درجات خشبية فاتحة وخطوط بسيطة.',
      'Light wood tones and uncomplicated lines.',
    ),
    category: 'modern',
    palette: copy('خشبي · رملي', 'Wood tones · sand'),
    colors: ['#b59971', '#d8c9ad', '#7f6c52'],
  },
  {
    id: '14',
    image: '14',
    title: copy('اتساع الضوء', 'Room for light'),
    description: copy(
      'تكوين فاتح تحيط به درجات دافئة.',
      'An airy composition framed by warmer tones.',
    ),
    category: 'classic',
    palette: copy('كريمي · بني هادئ', 'Cream · soft brown'),
    colors: ['#dfcda9', '#997c57', '#eee2c9'],
  },
  {
    id: '15',
    image: '15',
    title: copy('إيقاع معاصر', 'A contemporary rhythm'),
    description: copy(
      'مساحات بيضاء ودرجات رمادية متتابعة.',
      'White surfaces and a rhythm of grey.',
    ),
    category: 'modern',
    palette: copy('رمادي · عاجي', 'Grey · ivory'),
    colors: ['#a7aca7', '#e0dfd5', '#656962'],
  },
];
export const steps = [
  {
    num: '01',
    title: copy('نبدأ بمساحتك', 'First, your space'),
    subtitle: copy('القياس وتحديد المتطلبات', 'Measurement & requirements'),
    body: copy(
      'كل مطبخ يبدأ بفهم مساحته. نبدأ بالقياسات واحتياجات الاستخدام لتكوين صورة واضحة عن متطلبات التصميم.',
      'Every kitchen begins with understanding its space. Measurements and everyday needs form the starting point for the design.',
    ),
    note: copy('المساحة، الاستخدام، والتوقعات.', 'Space, everyday use, and expectations.'),
  },
  {
    num: '02',
    title: copy('نرسم فكرتك', 'Your idea takes shape'),
    subtitle: copy('التصميم الأولي', 'Initial design'),
    body: copy(
      'تتحول المتطلبات إلى تصميم أولي يوضح توزيع المطبخ وعلاقة أجزائه. فرصة لمناقشة الفكرة والتفاصيل قبل الانتقال إلى التنفيذ.',
      'Requirements become an initial design that explores the layout and how the kitchen fits together. A moment to discuss the idea before moving into production.',
    ),
    note: copy('توزيع مدروس، وصورة أوضح.', 'A considered layout. A clearer picture.'),
  },
  {
    num: '03',
    title: copy('نعتني بالتفاصيل', 'Attention to detail'),
    subtitle: copy('التصنيع', 'Manufacturing'),
    body: copy(
      'ينتقل التصميم إلى مرحلة التصنيع، لتتحول الخطوط والأبعاد إلى أجزاء المطبخ وتفاصيله.',
      'The design moves into manufacturing, as dimensions and lines become the components of the kitchen.',
    ),
    note: copy('من خطوط التصميم إلى تفاصيل ملموسة.', 'From design lines to tangible details.'),
  },
  {
    num: '04',
    title: copy('تكتمل الحكاية', 'It all comes together'),
    subtitle: copy('التركيب', 'Installation'),
    body: copy(
      'في مرحلة التركيب، تجتمع أجزاء المطبخ في مساحتها لتكتمل رحلة الفكرة ويبدأ فصل جديد من الاستخدام اليومي.',
      'During installation, the components come together in their space. The design journey becomes part of everyday life.',
    ),
    note: copy('مساحة جاهزة لفصل جديد.', 'A space for a new chapter.'),
  },
];
// Add only owner-approved, verified business details. Never use example contact data.
export const business = {
  originalWebsite: 'https://rowadkitchens.co/',
  phone: null as string | null,
  email: null as string | null,
  catalogUrl: null as string | null,
  showrooms: [] as { name: Bilingual; address: Bilingual; phone: string; mapUrl: string }[],
};
