import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({"namespace":"15min"});
      cal("floatingButton", {"calLink":"innovatex/15min","config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"},"buttonColor":"#2b4bff","buttonTextColor":"#fff"});
      cal("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#2b4bff"},"dark":{"cal-brand":"#6a9bc9"}},"hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, [])
};
  