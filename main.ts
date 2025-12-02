import { addIcon, Plugin, ItemView, WorkspaceLeaf } from "obsidian";

const VIEW_TYPE_TIDLE = "tidle-view";

export default class TidlePlugin extends Plugin {

  async onload() {
    addIcon("tidle-icon", `
      <svg width="100" height="78" viewBox="0 0 27 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.6066 42.462C16.0546 42.462 13.7886 42.044 11.8086 41.208C9.82865 40.372 8.26665 39.03 7.12265 37.182C6.02265 35.334 5.47265 32.892 5.47265 29.856V17.184H-0.00535148V9.33H5.73665V0.0239975H16.2966V9.33H25.2726V17.25H16.3627V29.526C16.3627 31.198 16.7586 32.342 17.5506 32.958C18.3866 33.574 19.3767 33.882 20.5206 33.882C21.2246 33.882 21.9946 33.816 22.8306 33.684C23.7107 33.508 24.3926 33.266 24.8766 32.958L26.6586 40.746C25.5586 41.362 24.2826 41.802 22.8306 42.066C21.4226 42.33 20.0146 42.462 18.6066 42.462Z" fill="currentColor"/>
      </svg>
    `);

    this.addRibbonIcon("tidle-icon", "Open Tidle", () => {
      this.activateView();
    });

    this.registerView(
      VIEW_TYPE_TIDLE,
      (leaf: WorkspaceLeaf) => new TidleView(leaf)
    );
  }

  async activateView() {
    const { workspace } = this.app;

    const leaves = workspace.getLeavesOfType(VIEW_TYPE_TIDLE);

    if (leaves.length > 0) {
      leaves[0].detach();
      return;
    }

    const leaf = workspace.getRightLeaf(false);
    await leaf.setViewState({ type: VIEW_TYPE_TIDLE });
    workspace.revealLeaf(leaf);
  }
}

class TidleView extends ItemView {
  getViewType() {
    return VIEW_TYPE_TIDLE;
  }

  getDisplayText() {
    return "Tidle";
  }

  getIcon() {
    return "tidle-icon";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.classList.add("tidle-view-container");

    const iframe = document.createElement("iframe");
    iframe.src = "https://tidle.app/main";
    iframe.style.width = "100 percent";
    iframe.style.height = "100 percent";
    iframe.style.border = "none";

    container.appendChild(iframe);
  }
}