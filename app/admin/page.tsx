"use client"

import { useLocale } from "@/context/locale-context"
import { useEffect, useState } from "react"
import { getAdminData } from "@/actions/get-admin-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { adminLogout } from "@/actions/auth"

export default function AdminDashboardPage() {
  const { t } = useLocale()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminMessage, setAdminMessage] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const result = await getAdminData()
      if (result.success) {
        setAdminMessage(result.message)
      } else {
        setError(result.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("admin_panel_title")}</h1>
          <p className="text-muted-foreground">{t("loading_data")}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="text-center p-8 rounded-lg shadow-md bg-white">
          <h1 className="text-3xl font-bold text-destructive mb-4">{t("error_loading_data")}</h1>
          <p className="text-muted-foreground">{error}</p>
          <p className="text-sm text-gray-500 mt-4">{t("admin_panel_note")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">{t("admin_panel_title")}</h1>
          <form action={adminLogout}>
            <Button type="submit" variant="destructive">
              {t("admin_logout_button")}
            </Button>
          </form>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("admin_panel_title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{adminMessage}</p>
            <p className="text-sm text-red-600">**{t("admin_panel_note")}**</p>
            <p className="text-sm text-red-600 mt-2">**{t("no_database_warning")}**</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
