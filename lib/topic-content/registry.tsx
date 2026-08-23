import type { ComponentType } from "react";
import HowTheInternetWorks from "@/lib/topic-content/how-the-internet-works";
import TerminalCommandLineBasics from "@/lib/topic-content/terminal-command-line-basics";
import GitFundamentals from "@/lib/topic-content/git-fundamentals";
import GithubEssentials from "@/lib/topic-content/github-essentials";
import VsCodeSetupExtensions from "@/lib/topic-content/vs-code-setup-extensions";
import BrowserDevtools from "@/lib/topic-content/browser-devtools";
import HtmlDocumentStructure from "@/lib/topic-content/html-document-structure";
import SemanticElements from "@/lib/topic-content/semantic-elements";
import TextTypographyElements from "@/lib/topic-content/text-typography-elements";
import LinksImages from "@/lib/topic-content/links-images";

export const TOPIC_CONTENT: Record<string, ComponentType> = {
  "how-the-internet-works": HowTheInternetWorks,
  "terminal-command-line-basics": TerminalCommandLineBasics,
  "git-fundamentals": GitFundamentals,
  "github-essentials": GithubEssentials,
  "vs-code-setup-extensions": VsCodeSetupExtensions,
  "browser-devtools": BrowserDevtools,
  "html-document-structure": HtmlDocumentStructure,
  "semantic-elements": SemanticElements,
  "text-typography-elements": TextTypographyElements,
  "links-images": LinksImages,
};

export function getTopicContent(slug: string): ComponentType | undefined {
  return TOPIC_CONTENT[slug];
}
