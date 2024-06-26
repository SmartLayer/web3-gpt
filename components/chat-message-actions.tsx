"use client"

import { Button } from "@/components/ui/button"
import { IconCheck, IconChevronUpDown, IconCopy } from "@/components/ui/icons"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"
import type { Message } from "ai"

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message
}

export function ChatMessageActions({
  message,
  className,
  onExpandClick,
  ...props
}: ChatMessageActionsProps & { onExpandClick?: () => void }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0",
        className
      )}
      {...props}
    >
      {message.function_call && (
        <Button variant="ghost" size="icon" onClick={onExpandClick}>
          <IconChevronUpDown />
          <span className="sr-only">Expand</span>
        </Button>
      )}

      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(message.content ?? "")}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}
