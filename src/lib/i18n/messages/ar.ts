import { type I18nMessages } from './en'

export const arMessages = {
  common: {
    actions: {
      goHome: 'العودة للرئيسية',
      retry: 'إعادة المحاولة',
      signIn: 'تسجيل الدخول',
      signOut: 'تسجيل الخروج',
      switchToArabic: 'التبديل إلى العربية',
      switchToEnglish: 'التبديل إلى الإنجليزية',
    },
    app: {
      name: 'سور أوبتيك',
      tagline: 'إدارة العيادة',
      online: 'متصل',
      role: 'أخصائي بصريات',
    },
    navigation: {
      collapseSidebar: 'طي الشريط الجانبي',
      dashboard: 'لوحة التحكم',
      expandSidebar: 'توسيع الشريط الجانبي',
      help: 'المساعدة',
      notifications: 'الإشعارات',
      openNavigation: 'فتح التنقل',
      settings: 'الإعدادات',
    },
    theme: {
      switchToDark: 'التبديل إلى الوضع الداكن',
      switchToLight: 'التبديل إلى الوضع الفاتح',
    },
  },
  backendErrors: {
    auth: {
      invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      unauthorized: 'ليس لديك صلاحية لتنفيذ هذا الإجراء.',
      sessionExpired: 'انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.',
      accountDisabled: 'هذا الحساب معطل. تواصل مع المسؤول.',
    },
    resource: {
      notFound: 'تعذر العثور على العنصر المطلوب.',
      conflict: 'يتعارض هذا الإجراء مع الحالة الحالية.',
    },
    validation: {
      error: 'بعض المعلومات المدخلة غير صالحة.',
    },
    server: {
      internal: 'حدث خطأ لدينا. يرجى المحاولة مرة أخرى.',
    },
    ai: {
      unavailable: 'المساعد غير متاح مؤقتا.',
    },
    patient: {
      notFound: 'تعذر العثور على المريض المطلوب.',
    },
    inventory: {
      outOfStock: 'هذا الصنف غير متوفر في المخزون.',
    },
    network: {
      error: 'تعذر الوصول إلى الخادم. تحقق من اتصالك وحاول مرة أخرى.',
    },
    fallback: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    unknownKey: 'أعاد الخادم مفتاح خطأ غير مترجم: {key}',
  },
  feedback: {
    empty: {
      description: 'عند إضافة البيانات، ستظهر هنا.',
      title: 'لا يوجد شيء هنا بعد',
    },
    error: {
      description: 'تعذر تحميل هذا القسم. يرجى المحاولة مرة أخرى.',
      title: 'حدث خطأ ما',
    },
    loading: {
      description: 'يرجى الانتظار أثناء جلب البيانات.',
      title: 'جار التحميل...',
    },
    notFound: {
      description: 'العنصر الذي تبحث عنه غير موجود أو لم يعد متاحا.',
      title: 'غير موجود',
    },
    pageNotFound: {
      description: 'الصفحة التي تبحث عنها غير موجودة.',
      title: 'الصفحة غير موجودة',
    },
  },
  forms: {
    submit: {
      idle: 'إرسال',
      submitting: 'جار الإرسال...',
    },
  },
  login: {
    title: 'مرحبا بعودتك',
    subtitle: 'سجل الدخول إلى سور أوبتيك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
  },
} satisfies I18nMessages
