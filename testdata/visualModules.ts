export interface VisualModule {
  name: string;
  url: string;
  selector?: string;
  index?: number;
  fullPage?: boolean;
}

export const modules: VisualModule[] = [
  {
    name: "Whatwebuild-full",
    url: "https://dev-appian-team-a.pantheonsite.io/what-we-build/",
    fullPage: true,
  },
  {
    name: "404",
    selector: ".error-404",
    url: "https://dev-appian-team-a.pantheonsite.io/404/",
  },
  {
    name: "footer",
    selector: ".site-footer__inner",
    url: "https://dev-appian-team-a.pantheonsite.io/home/",
  },
  {
    name: "WWB-Hero",
    selector: ".m-secondary-hero",
    url: "https://dev-appian-team-a.pantheonsite.io/what-we-build/",
  },
  {
    name: "Testimonialarrow",
    selector: ".m-testimonial",
    url: "https://dev-appian-team-a.pantheonsite.io/home/",
    index: 0,
  },
  {
    name: "FAQ",
    selector: ".faq-module",
    url: "https://dev-appian-team-a.pantheonsite.io/what-we-build/",
  },
  {
    name: "Hero Projects",
    selector: ".hero-projects",
    url: "https://dev-appian-team-a.pantheonsite.io/home/",
  },
  {
    name: "PDP-Leadspace",
    selector: ".entry-content",
    url: "https://dev-appian-team-a.pantheonsite.io/project-detail/",
  },
];
