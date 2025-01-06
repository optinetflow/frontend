import React from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout/Layout";

const ResellersPoliciesPage: NextPageWithLayout = () => {
  return (
    <div
      className="mx-auto my-12 flex min-h-screen max-w-xs flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          چطور با اضافه کردن مشتری‌ها، درآمدتون چند برابر میشه؟{" "}
        </h1>
        <p className="text-lg text-gray-700">
          اینجا یاد می‌گیرید چرا این سیاست‌ها به نفع شماست و چطور کمک می‌کنه فروش‌تون رو چند برابر کنید!
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800">چرا این سیستم طراحی شده؟</h2>
        <p className="mb-4 text-gray-700">
          ما این سیستم رو ساختیم تا فرآیند خرید VPN برای همه سریع و راحت بشه. هر کاربر بتونه هر وقت که خواست، به‌راحتی
          خرید خودش رو انجام بده. اما جذاب‌تر از این: شما، به عنوان نماینده فروش، می‌تونید از این سیستم برای درآمدزایی
          حرفه‌ای استفاده کنید.
        </p>
        <p className="text-gray-700">
          هدف ما اینه که تجربه خرید مشتری و مدیریت فروش برای شما ساده‌تر، سریع‌تر و پربازده‌تر بشه!
        </p>
      </section>

      <section className="mb-10">
        <div className="flex items-start">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-800">مشکلی که پیش اومده</h2>
            <p className="mb-4 text-gray-700">
              بعضی از نماینده‌ها به‌جای اینکه مشتری‌هاشون رو به سیستم اضافه کنن، خودشون بسته‌ها رو می‌خرن و دستی به
              مشتری می‌دن. این کار نه‌تنها زمان‌بره، بلکه جلوی رشد شما رو می‌گیره.
            </p>
            <p className="text-gray-700">
              ما می‌خوایم به شما کمک کنیم تا با اضافه کردن مشتری‌ها به سیستم، فروش‌تون رو چند برابر کنید!
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800">چرا باید کاربران رو به سیستم اضافه کنیم؟</h2>
        <ul className="list-inside list-disc space-y-4 text-gray-700">
          <li>
            <strong>صرفه‌جویی در وقت:</strong> مشتری‌ها خودشون خریدشون رو انجام می‌دن و شما زمان بیشتری برای جذب
            مشتری‌های جدید دارید.
          </li>
          <li>
            <strong>بازاریابی دهان به دهان:</strong> مشتری‌ها تجربه خوبشون رو با دوستانشون به اشتراک می‌ذارن و شما
            مشتری‌های بیشتری جذب می‌کنید.
          </li>
          <li>
            <strong>شفافیت مالی:</strong> همه تراکنش‌ها داخل سیستم ثبت میشه و شما می‌تونید فروش‌تون رو دقیقاً ردیابی
            کنید.
          </li>
          <li>
            <strong>برنامه‌های انگیزشی:</strong> سیستم ما با بسته‌های رایگان، برنامه‌های وفاداری و گیمیفیکیشن، مشتری‌ها
            رو به خرید بیشتر تشویق می‌کنه.
          </li>
          <li>
            <strong>مدیریت مشتری‌ها:</strong> می‌تونید مشتری‌ها رو دسته‌بندی کنید و استراتژی‌های خاص مثل تخفیف یا هدیه
            برای هر گروه اجرا کنید.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="flex items-start">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-800">
              نگرانی شما: آیا مشتری‌ها مستقیم از ما خرید می‌کنن؟
            </h2>
            <p className="mb-4 text-gray-700">
              خیالتون راحت باشه! هیچ دکمه ثبت‌نامی توی سایت ما وجود نداره. مشتری فقط می‌تونه با کد تبلیغاتی شما وارد
              سیستم بشه. این یعنی مشتری‌ها همیشه از طریق شما ثبت‌نام می‌کنن.
            </p>
            <p className="text-gray-700">
              علاوه بر این، ما برنامه‌هایی داریم که کدهای تبلیغاتی شما دست‌به‌دست بشه و مشتری‌های بیشتری به سمت شما
              بیان.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800">چطور مشتری‌ها رو وارد سیستم کنیم؟</h2>
        <ol className="list-inside list-decimal space-y-4 text-gray-700">
          <li>لینک ثبت‌نام اختصاصی خودتون رو به مشتری بدید.</li>
          <li>مشتری‌ها با استفاده از این لینک ثبت‌نام می‌کنن.</li>
          <li>مشتری‌های شما می‌تونن به‌راحتی خرید کنن و حتی دوستانشون رو هم دعوت کنن.</li>
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800">چرا باید این سیاست‌ها رو رعایت کنیم؟</h2>
        <p className="mb-4 text-gray-700">
          با رعایت این سیاست‌ها، شما فروش بیشتر، مدیریت بهتر و مشتری‌های وفادارتر خواهید داشت. ما کنار شما هستیم تا این
          مسیر رو ساده‌تر و لذت‌بخش‌تر کنیم!
        </p>
        <p className="text-gray-700">
          اگر سوالی دارید یا نیاز به راهنمایی بیشتر دارید، تیم پشتیبانی ما همیشه آماده کمک به شماست.
        </p>
      </section>
    </div>
  );
};

export default ResellersPoliciesPage;

ResellersPoliciesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
