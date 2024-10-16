import React from "react"
import { useGetClientStatsLazyQuery } from "../../graphql/queries/clientStats.graphql.interface"

interface ProgressBarProp {
  progress: number
}
const ProgressBar: React.FC<ProgressBarProp> = ({ progress }) => {
  const rounded = Math.round(progress)
  return (
    <div className="ltr flex-1 rounded-full bg-neutral-100 dark:bg-neutral-600">
      <div
        className="rounded-full bg-neutral-700 py-1 text-center font-sans text-xs font-medium leading-none text-neutral-200"
        style={{ width: `${rounded}%` }}
      >
        {rounded}%
      </div>
    </div>
  )
}

function extractUUID(str: string) {
  // Define a regular expression pattern to match UUIDs
  const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

  // Use the match() function to find the first UUID in the string
  const matches = str.match(uuidPattern)

  // Check if a UUID was found
  if (matches && matches.length > 0) {
    return matches[0] // Return the first matched UUID
  } else {
    return null // Return null if no UUID was found
  }
}

function bytesToGB(bytes: number): number {
  const gigabyte = 1024 * 1024 * 1024 // 1 gigabyte = 1024 megabytes * 1024 kilobytes * 1024 bytes
  return bytes / gigabyte
}

function roundTo(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(number * factor) / factor
}

const getConsumedTraffic = (up: number, down: number): number => {
  return roundTo(bytesToGB(up + down), 1)
}

const getRemainingDays = (expired: number): number => {
  const now = new Date()
  const expiredDate = new Date(expired)

  const diff = (expiredDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)

  return Math.round(diff)
}

interface SubmitButtonProps {
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, loading, children }) => {
  const isDisable = disabled || loading
  return (
    <button
      disabled={isDisable}
      type="submit"
      className={`rounded px-4 py-2 text-white ${
        isDisable ? "cursor-not-allowed bg-gray-400" : "bg-neutral-800 hover:bg-neutral-900"
      }`}
    >
      {loading ? "یه لحظه...." : children}
    </button>
  )
}

export function GetStat() {
  const [getClientStats, clientStats] = useGetClientStatsLazyQuery({
    fetchPolicy: "network-only",
  })
  const [input, setInput] = React.useState("")

  const currentStat = clientStats?.data?.clientStats?.[0]
  const totalTraffic = currentStat && roundTo(bytesToGB(currentStat?.total), 1)
  const consumedTraffic = currentStat && getConsumedTraffic(currentStat.up, currentStat.down)
  const remainingDays =
    currentStat?.expiryTime === 0 ? false : currentStat?.expiryTime && getRemainingDays(currentStat?.expiryTime)

  const uuid = extractUUID(input)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (uuid) {
      e.preventDefault() // Prevent default form submission behavior
      getClientStats({
        variables: {
          filters: {
            id: uuid,
          },
        },
      })
    }
  }

  return (
    <section className="flex min-h-screen  items-center justify-center bg-white p-4 dark:bg-neutral-900">
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">لینک:</h1>
        <form className="mb-12" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            rows={6}
            placeholder="لینک را وارد کنید"
            className="ltr mb-2 w-full resize-none rounded border px-3 py-2"
          />
          <SubmitButton disabled={!uuid} loading={clientStats.loading}>
            مشاهده
          </SubmitButton>
        </form>
        {typeof remainingDays === "number" && remainingDays > 0 && (
          <div>{remainingDays} روز مانده تا اتمام بسته‌ی شما</div>
        )}
        {typeof remainingDays === "number" && remainingDays <= 0 && <div>بسته‌ی شما منقضی شده است.</div>}

        {currentStat && (
          <div className="mt-2 flex flex-row items-center justify-center">
            <ProgressBar progress={(consumedTraffic! / totalTraffic!) * 100} />
            <div className="ltr mr-4">
              {consumedTraffic} / {totalTraffic} GB
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
