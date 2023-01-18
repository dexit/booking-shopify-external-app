import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { useI18n } from "@shopify/react-i18n";

export const PolarisProvider = ({ children }: any) => {
  const [i18n] = useI18n({
    id: "Polaris",
    fallback: da,
    async translations(locale) {
      return locale === "en" ? en : da;
    },
  });
  return (
    <AppProvider
      i18n={i18n.locale === "da" ? i18n.translations[0] : i18n.translations[1]}
    >
      {children}
    </AppProvider>
  );
};
