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
import HtmlForms from "@/lib/topic-content/html-forms";
import ListsTables from "@/lib/topic-content/lists-tables";
import MultimediaElements from "@/lib/topic-content/multimedia-elements";
import MetaTagsSeoBasics from "@/lib/topic-content/meta-tags-seo-basics";
import HtmlAccessibilityBasics from "@/lib/topic-content/html-accessibility-basics";

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
  "html-forms": HtmlForms,
  "lists-tables": ListsTables,
  "multimedia-elements": MultimediaElements,
  "meta-tags-seo-basics": MetaTagsSeoBasics,
  "html-accessibility-basics": HtmlAccessibilityBasics,
};

export function getTopicContent(slug: string): ComponentType | undefined {
  return TOPIC_CONTENT[slug];
}
