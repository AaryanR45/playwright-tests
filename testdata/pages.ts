export interface Page {
  name: string;
  url: string;
}

export const pages: Record<string, Page> = {
  home: {
    name: "Home",
    url: "https://dev-appian-team-a.pantheonsite.io/home/",
  },
  whatWeBuild: {
    name: "What We Build",
    url: "https://dev-appian-team-a.pantheonsite.io/what-we-build/",
  },
  notFound: {
    name: "404",
    url: "https://dev-appian-team-a.pantheonsite.io/404/",
  },
  projectDetail: {
    name: "Project Detail",
    url: "https://dev-appian-team-a.pantheonsite.io/projects/modern-building-solutions/",
  },
   ourProjects: {
    name: "Our Projects",
    url: "https://dev-appian-team-a.pantheonsite.io/our-projects/",
  },
   contactUs: {
    name: "Contact Us",
    url: "https://dev-appian-team-a.pantheonsite.io/contact-us/",
  },
};
