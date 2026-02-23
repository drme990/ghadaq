import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حاسبة العقيقة',
  description:
    'احسب عدد الذبائح المطلوبة للعقيقة بسهولة - حاسبة مؤسسة غدق لتحديد عدد الأضاحي حسب عدد الأولاد الذكور والإناث. خدمة عقيقة موثوقة بالوكالة الشرعية.',
  keywords: [
    'حاسبة العقيقة',
    'عقيقة',
    'عقيقة الأولاد',
    'ذبيحة العقيقة',
    'عدد الذبائح',
    'مؤسسة غدق',
    'aqiqah calculator',
    'aqiqah',
  ],
  alternates: {
    canonical: 'https://www.ghadqplus.com/calc-aqeqa',
  },
  openGraph: {
    title: 'حاسبة العقيقة | مؤسسة غدق',
    description:
      'احسب عدد الذبائح المطلوبة للعقيقة بسهولة - خدمة عقيقة موثوقة بالوكالة الشرعية.',
    url: 'https://www.ghadqplus.com/calc-aqeqa',
    type: 'website',
  },
};

export default function CalcAqeqaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
