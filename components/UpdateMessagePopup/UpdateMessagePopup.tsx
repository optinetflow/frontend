import { RocketIcon, XIcon } from "lucide-react" // Use relevant icons
import React, { useEffect, useState } from "react"

const CURRENT_VERSION = "1.0.0" // You can get this from environment variables

const UpdateMessagePopup = () => {
  const [showUpdateMessage, setShowUpdateMessage] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // For animation control

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion")

    if (!storedVersion || storedVersion !== CURRENT_VERSION) {
      setShowUpdateMessage(true)
      setTimeout(() => setIsVisible(true), 20) // Trigger animation after a short delay
      localStorage.setItem("appVersion", CURRENT_VERSION)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false) // Start hiding the popup
    setTimeout(() => setShowUpdateMessage(false), 300) // Delay the complete removal after animation
  }

  if (!showUpdateMessage) return null

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg" dir="rtl">
          <div className="flex items-center justify-between">
            <RocketIcon className="size-6 text-blue-500" /> {/* Rocket icon for excitement */}
            <button onClick={handleClose}>
              <XIcon className="size-6 text-gray-500 hover:text-gray-700" /> {/* X icon to dismiss */}
            </button>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">به روزرسانی جدید! 🎉</h3>
            <p className="mt-2">نسخه {CURRENT_VERSION} برنامه با ویژگی‌های جدید منتشر شد.</p>
            <ul className="mt-2 list-inside list-disc text-right">
              <li>
                افزودن بسته های <b>اقتصادی</b>
              </li>
              <li>امکان فیلتر کردن بسته‌ها بر اساس نیاز کاربران</li>
              <li>
                افزایش مدت اعتبار بسته‌ها: <b>(ماهانه و سه ماهه)</b>
              </li>
              <li>بهبود طراحی و رابط کاربری برای تجربه کاربری بهتر</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleClose}
              className="w-full rounded-md bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-950"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateMessagePopup
