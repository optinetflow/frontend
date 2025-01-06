// pages/resellers-policies.tsx
import { AlertCircle } from "lucide-react";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout/Layout";

const ResellersPoliciesPage: NextPageWithLayout = () => {
  return (
    <div
      className="mx-auto my-12 flex min-h-screen max-w-xs flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">سیاست‌های نمایندگان فروش</h1>
        <p className="text-gray-700">
          در این بخش، به توضیح دلایل محدودیت تعداد بسته‌های خریداری شده و ضرورت اضافه کردن کاربران به سیستم پرداخته شده
          است.
        </p>
      </header>

      {/* Limitation Reason Section */}
      <section className="mb-8">
        <div className="flex items-start">
          <AlertCircle className="mr-3 mt-1 size-6 text-yellow-400" aria-hidden="true" />
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-800">دلیل محدودیت تعداد بسته‌های خریداری شده</h2>
            <p className="mb-4 text-gray-700">
              ما حداکثر تعداد ۲۰ بسته را برای هر نماینده فروش تعیین کرده‌ایم تا اطمینان حاصل کنیم که کیفیت خدمات و
              پشتیبانی ارائه شده به مشتریان حفظ می‌شود. این محدودیت به ما کمک می‌کند تا منابع را به طور بهینه مدیریت
              کنیم و از ارائه خدماتی با کیفیت بالا به همه نمایندگان فروش اطمینان حاصل کنیم.
            </p>
            <p className="text-gray-700">
              همچنین، این اقدام به جلوگیری از سوء استفاده و حفظ تعادل در توزیع بسته‌ها کمک می‌کند. با محدودیت تعداد
              بسته‌ها، ما می‌توانیم به هر نماینده فروش فرصت مناسبی برای مدیریت بهتر فروش‌ها و ارائه خدمات بهتر به
              مشتریان خود بدهیم.
            </p>
          </div>
        </div>
      </section>

      {/* User Addition Requirement Section */}
      <section className="mb-8">
        <div className="flex items-start">
          <AlertCircle className="mr-3 mt-1 size-6 text-yellow-400" aria-hidden="true" />
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-800">ضرورت اضافه کردن کاربران به سیستم</h2>
            <p className="mb-4 text-gray-700">
              نمایندگان فروش موظف هستند که کاربران را به سیستم اضافه کنند و بسته‌ها را به صورت مستقیم برای آنها خریداری
              نکنند. این فرآیند به ما امکان می‌دهد تا مدیریت بهتری بر روی کاربران و فروش‌های انجام شده داشته باشیم.
            </p>
            <p className="text-gray-700">
              با اضافه کردن کاربران به سیستم، می‌توانیم سابقه خرید، وضعیت فعال بودن سرویس‌ها و نیازهای مشتریان را به
              صورت دقیق‌تری پیگیری کنیم. این امر نه تنها به بهبود تجربه مشتری کمک می‌کند، بلکه به نمایندگان فروش نیز
              امکان می‌دهد تا خدمات بهتری ارائه دهند و ارتباطات خود را با مشتریان تقویت کنند.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section>
        <h2 className="mb-4 text-center text-2xl font-semibold text-yellow-800">نتیجه‌گیری</h2>
        <p className="text-center text-gray-700">
          ما معتقدیم که با اعمال این سیاست‌ها، می‌توانیم یک شبکه فروش پایدار و موثر ایجاد کنیم که به نفع همه طرف‌های
          درگیر باشد. اگر سوالی دارید یا نیاز به توضیحات بیشتری دارید، لطفاً با تیم پشتیبانی ما تماس بگیرید.
        </p>
      </section>
    </div>
  );
};

export default ResellersPoliciesPage;

ResellersPoliciesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
