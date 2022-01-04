const tablist = document.querySelector('[role="tablist"]');
const tabs = tablist.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tablist.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

function changeTabFocus(e) {
  const leftkeyDown = 37;
  const rightkeyDown = 39;
  const upArrow = 38;
  const downArrow = 40;

  if (
    e.keyCode === leftkeyDown ||
    e.keyCode === rightkeyDown ||
    e.keyCode === upArrow ||
    e.keyCode === downArrow
  ) {
    tabs[tabFocus].setAttribute("tabindex", -1);
    if (e.keyCode === rightkeyDown || e.keyCode === downArrow) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    if (e.keyCode === leftkeyDown || e.keyCode === upArrow) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
    console.log(tabFocus);
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');

  showContent(mainContainer, `#${targetPanel}`);

  hideContent(mainContainer, "picture");

  showContent(mainContainer, `#${targetImage}`);

  console.log(mainContainer);
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => {
    item.setAttribute("hidden", true);
  });
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
