import { pages } from "./pages";

export interface VisualModule {
  name: string;
  pageKey: keyof typeof pages;
  selector?: string;
  index?: number;
  fullPage?: boolean;
}

export const modules: VisualModule[] = [
  {
    name: "Whatwebuild-full", //907
    pageKey: "whatWeBuild",
    fullPage: true,
  },
  {
    name: "404", //810
    selector: ".error-404",
    pageKey: "notFound",
  },
  {
    name: "footer",
    selector: ".site-footer__inner",
    pageKey: "home",
  },
  {
    name: "WWB-Hero",
    selector: ".m-secondary-hero",
    pageKey: "whatWeBuild",
  },
  {
    name: "Testimonialarrow",
    selector: ".m-testimonial",
    pageKey: "home",
    index: 0,
  },
  {
    name: "FAQ",
    selector: ".faq-module",
    pageKey: "whatWeBuild",
  },
  {
    name: "Hero Projects",
    selector: ".hero-projects",
    pageKey: "home",
  },
  {
    name: "PDP-Leadspace", //906
    selector: ".m-tertiary-hero",
    pageKey: "projectDetail",
  },
  {
    name: "Our story",
    selector: ".our-story",
    pageKey: "home",
  },
  {
    name: "Two column module",
    selector: ".m-two-column",
    pageKey: "home",
  },
  {
    name: "Home-full",
    pageKey: "home",
    fullPage: true,
  },
];

// Helper function to get URL from a module
export function getModuleUrl(module: VisualModule): string {
  return pages[module.pageKey].url;
}
