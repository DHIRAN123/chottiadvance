import slackLogo from "@/assets/slack-logo.png";
import dockerLogo from "@/assets/docker-logo.png";
import figmaLogo from "@/assets/figma-logo.svg";
import githubLogo from "@/assets/github-logo.svg";
import vsCodeLogo from "@/assets/vs-code-logo.png";
import notionLogo from "@/assets/notion-logo.svg";
import jiraLogo from "@/assets/jira-logo.png";
import gcpLogo from "@/assets/gcp-logo.png";

export const featureshelp = [
  "Effortless integration",
  "Intelligent automation",
  "Robust security",
];

export const logos = [
  {
    src: slackLogo,
    alt: "slack logo",
    rotate: 0,
  },
  {
    src: dockerLogo,
    alt: "docker logo",
    rotate: 45,
  },
  {
    src: figmaLogo,
    alt: "figma logo",
    rotate: 90,
  },
  {
    src: githubLogo,
    alt: "github logo",
    rotate: 135,
  },
  {
    src: vsCodeLogo,
    alt: "vs code logo",
    rotate: 180,
  },
  {
    src: notionLogo,
    alt: "notion logo",
    rotate: 225,
  },
  {
    src: jiraLogo,
    alt: "jira logo",
    rotate: 270,
  },
  {
    src: gcpLogo,
    alt: "gcp logo",
    rotate: 315,
  },
];

export const Featureshelp = () => {
  return <section className="pb-[1000px]">
    <div className="container">

          <h2>Your AI powered collaboration companies.</h2>
          <ul> {featureshelp.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}</ul>

    </div>

  </section>;
};

export default featureshelp;
