import Link from "next/link";
import { LinkList } from "./link-list";
import { PaymentMethods } from "./payment-methods";

export type LinkListType = {
  title: string;
  links: {
    title: string;
    url: string;
    external?: boolean;
  }[];
};

const lists: LinkListType[] = [
  {
    title: "Om Mylla",
    links: [
      { title: "Varför Mylla?", url: "/pages/mat-sverige" },
      { title: "Om oss", url: "/pages/om-mylla-mat" },
      { title: "Mylla för företag", url: "/pages/mylla-for-foretag" },
      { title: "Press", url: "/pages/press" },
      { title: "Företagsinformation", url: "/pages/foretagsinformation" },
    ],
  },
  {
    title: "Läsvärt",
    links: [
      { title: "Våra bönder", url: "/vendors" },
      { title: "Recept", url: "/blogs/recept" },
      { title: "Mylla-bloggen", url: "/blogs/mylla-bloggen" },
      {
        title: "Tips till köket",
        url: "/blogs/mylla-bloggen/tagged/tips-till-koket",
      },
      {
        title: "Våra gästkockar",
        url: "/blogs/mylla-bloggen/tagged/vara-gastkockar",
      },
    ],
  },
  {
    title: "Kundtjänst",
    links: [
      { title: "Kontakta oss", url: "/pages/kontakta-oss" },
      { title: "Vanliga frågor", url: "/pages/vanliga-fragor" },
      { title: "Hemleverans", url: "/pages/hemleverans" },
      { title: "Hämta maten själv", url: "/pages/upphamtning" },
    ],
  },
  {
    title: "För företag",
    links: [
      { title: "Sälj via Mylla", url: "/pages/bli-producent-hos-mylla" },
      { title: "Handla som företag", url: "/pages/skapa-foretagskonto" },
    ],
  },
  {
    title: "Följ oss",
    links: [
      { title: "Facebook", url: "#", external: true },
      { title: "Instagram", url: "#", external: true },
      { title: "Youtube", url: "#", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-primary text-primary-foreground py-12 md:py-16 lg:py-28">
        <div className="gap-y-8 sm:gap-y-12 container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {lists.map((list, index) => (
            <LinkList key={index} list={list} />
          ))}
        </div>
      </div>
      <div className="bg-background py-3 md:py-4">
        <div className="container flex flex-col md:flex-row justify-between gap-1 md:gap-5 items-center">
          <div className="flex gap-4 text-muted-foreground text-sm">
            <Link
              href="/policies/terms-of-service"
              className="hover:underline underline-offset-4"
            >
              Köpvillkor
            </Link>
            <Link
              href="/policies/privacy-policy"
              className="hover:underline underline-offset-4"
            >
              Integritetspolicy
            </Link>
          </div>
          <PaymentMethods />
        </div>
      </div>
    </footer>
  );
}
