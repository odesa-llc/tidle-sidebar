import { ItemView, Plugin, WorkspaceLeaf, addIcon } from "obsidian";

export const VIEW_TYPE_TIDLE = "tidle-view";

export default class TidlePlugin extends Plugin {
  onload(): void {
    this.registerView(VIEW_TYPE_TIDLE, (leaf: WorkspaceLeaf) => new TidleView(leaf));

    addIcon(
      "tidle-icon",
      `
      <svg viewBox="0 0 27 43" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.6066 42.462C16.0546 42.462 13.7886 42.044 11.8086 41.208C9.82865 40.372 8.26665 39.03 7.12265 37.182C6.02265 35.334 5.47265 32.892 5.47265 29.856V17.184H-0.00535148V9.33H5.73665V0.0239975H16.2966V9.33H25.2726V17.25H16.3627V29.526C16.3627 31.198 16.7586 32.342 17.5506 32.958C18.3866 33.574 19.3767 33.882 20.5206 33.882C21.2246 33.882 21.9946 33.816 22.8306 33.684C23.7107 33.508 24.3926 33.266 24.8766 32.958L26.6586 40.746C25.5586 41.362 24.2826 41.802 22.8306 42.066C21.4226 42.33 20.0146 42.462 18.6066 42.462Z"
          fill="currentColor"
        />
      </svg>
      `
    );

    const ribbonEl = this.addRibbonIcon("tidle-icon", "Open sidebar", () => {
      return this.activateView().catch(console.error);
    });
    ribbonEl.classList.add("tidle-ribbon-icon");

    this.addCommand({
      id: "open-tidle",
      name: "Open sidebar",
      callback: () => {
        return this.activateView().catch(console.error);
      },
    });
  }

  onunload(): void {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_TIDLE).forEach((leaf) => leaf.detach());
  }

  private async activateView(): Promise<void> {
    const existingLeaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_TIDLE);

    if (existingLeaves.length > 0) {
      this.app.workspace.revealLeaf(existingLeaves[0]);
      return;
    }

    const leaf = this.app.workspace.getLeaf(true);

    await leaf.setViewState({
      type: VIEW_TYPE_TIDLE,
      active: true,
    });

    this.app.workspace.revealLeaf(leaf);
  }
}

class TidleView extends ItemView {
  private iframe: HTMLIFrameElement | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_TIDLE;
  }

  getDisplayText(): string {
    return "Tidle";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.classList.add("tidle-view-container");

    this.iframe = document.createElement("iframe");
    this.iframe.src = "https://tidle.app/main";
    this.iframe.title = "Tidle";
    this.iframe.classList.add("tidle-iframe");

    this.contentEl.appendChild(this.iframe);
  }

  onClose(): void {
    if (this.iframe) {
      this.iframe.src = "about:blank";
      this.iframe.remove();
      this.iframe = null;
    }

    this.contentEl.classList.remove("tidle-view-container");
  }
}
