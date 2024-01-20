import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { copyText } from '../../helpers';

interface CopyableProps {
  content: string
  className?: string
  isCenter?: boolean;
}

export function Copyable({ className, content, isCenter }: CopyableProps) {
  const { toast } = useToast()

  const handleCopy = () => {
    copyText(content);
    toast({
      description: "متن کپی شد.",
      duration: 500,
    })
  }

  return (
    <div className={`flex rounded-md border ${className}`}>
      <div
        className={`ltr mr-2 mt-1 flex w-full items-center overflow-x-auto overflow-y-hidden whitespace-nowrap ${
          isCenter ? "justify-center" : ""
        }`}
      >
        {content}
      </div>
      <Button className="m-1 mr-2 text-xs" onClick={handleCopy} size="sm" type="button">
        کپی کردن
      </Button>
    </div>
  )
}
