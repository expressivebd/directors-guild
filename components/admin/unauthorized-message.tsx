import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UnauthorizedMessageProps {
  message: string
  description?: string
}

export function UnauthorizedMessage({ message, description }: UnauthorizedMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-white">Access Denied</CardTitle>
          <CardDescription className="text-slate-400">{message}</CardDescription>
        </CardHeader>
        {description && (
          <CardContent className="text-center">
            <p className="text-sm text-slate-500">{description}</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
