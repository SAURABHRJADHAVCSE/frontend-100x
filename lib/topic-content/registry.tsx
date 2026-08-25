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

// Phase 02 (CSS) Imports
import BoxModelTopic from "@/lib/topic-content/box-model";
import SelectorsSpecificityTopic from "@/lib/topic-content/selectors-specificity";
import ColorsUnitsValuesTopic from "@/lib/topic-content/colors-units-values";
import TypographyTopic from "@/lib/topic-content/typography";
import DisplayPositioningTopic from "@/lib/topic-content/display-positioning";
import FlexboxCompleteTopic from "@/lib/topic-content/flexbox-complete";
import CssGridCompleteTopic from "@/lib/topic-content/css-grid-complete";
import ResponsiveDesignTopic from "@/lib/topic-content/responsive-design-media-queries";
import CustomPropertiesTopic from "@/lib/topic-content/css-custom-properties";
import PseudoClassesElementsTopic from "@/lib/topic-content/pseudo-classes-pseudo-elements";
import AnimationsTransitionsTopic from "@/lib/topic-content/css-animations-transitions";
import CssFunctionsTopic from "@/lib/topic-content/css-functions";
import TailwindCssBasicsTopic from "@/lib/topic-content/tailwind-css-basics";

// Phase 03 (JavaScript) Imports
import VariablesDataTypesTopic from "@/lib/topic-content/variables-data-types";
import OperatorsExpressionsTopic from "@/lib/topic-content/operators-expressions";
import ControlFlowTopic from "@/lib/topic-content/control-flow";
import FunctionsTopic from "@/lib/topic-content/functions";
import ScopeClosuresTopic from "@/lib/topic-content/scope-closures";
import DomManipulationTopic from "@/lib/topic-content/dom-manipulation";
import EventHandlingTopic from "@/lib/topic-content/event-handling";
import ArraysArrayMethodsTopic from "@/lib/topic-content/arrays-array-methods";
import ObjectsDestructuringTopic from "@/lib/topic-content/objects-destructuring";
import ES6FeaturesTopic from "@/lib/topic-content/es6-features";
import ErrorHandlingTopic from "@/lib/topic-content/error-handling";
import PromisesAsyncAwaitTopic from "@/lib/topic-content/promises-async-await";
import FetchApiRestApisTopic from "@/lib/topic-content/fetch-api-rest-apis";
import WebStorageBrowserApisTopic from "@/lib/topic-content/web-storage-browser-apis";

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

  // Phase 02 (CSS) Topics
  "box-model": BoxModelTopic,
  "selectors-specificity": SelectorsSpecificityTopic,
  "colors-units-values": ColorsUnitsValuesTopic,
  "typography": TypographyTopic,
  "display-positioning": DisplayPositioningTopic,
  "flexbox-complete": FlexboxCompleteTopic,
  "css-grid-complete": CssGridCompleteTopic,
  "responsive-design-media-queries": ResponsiveDesignTopic,
  "css-custom-properties": CustomPropertiesTopic,
  "pseudo-classes-pseudo-elements": PseudoClassesElementsTopic,
  "css-animations-transitions": AnimationsTransitionsTopic,
  "css-functions": CssFunctionsTopic,
  "tailwind-css-basics": TailwindCssBasicsTopic,

  // Phase 03 (JavaScript) Topics
  "variables-data-types": VariablesDataTypesTopic,
  "operators-expressions": OperatorsExpressionsTopic,
  "control-flow": ControlFlowTopic,
  "functions": FunctionsTopic,
  "scope-closures": ScopeClosuresTopic,
  "dom-manipulation": DomManipulationTopic,
  "event-handling": EventHandlingTopic,
  "arrays-array-methods": ArraysArrayMethodsTopic,
  "objects-destructuring": ObjectsDestructuringTopic,
  "es6-features": ES6FeaturesTopic,
  "error-handling": ErrorHandlingTopic,
  "promises-async-await": PromisesAsyncAwaitTopic,
  "fetch-api-rest-apis": FetchApiRestApisTopic,
  "web-storage-browser-apis": WebStorageBrowserApisTopic,
};

export function getTopicContent(slug: string): ComponentType | undefined {
  return TOPIC_CONTENT[slug];
}

