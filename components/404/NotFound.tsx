import Link from 'next/link';

const NotFound: React.FC = () => (
  <div className="text-center mt-20">
    <h1 className="text-4xl font-bold">۴۰۴ - صفحه پیدا نشد</h1>
    <p className="mt-4">صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
    <Link href="/" className="text-blue-600 underline">بازگشت به صفحه اصلی</Link>
  </div>
);

export default NotFound;
