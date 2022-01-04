const dotList = document.querySelector('[role="tablist"]');
const dots = dotList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

dotList.addEventListener("keydown", changeDotFocus);

dots.forEach((dot) => {
  dot.addEventListener("click", changeDotPanel);
});

function changeDotFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    dots[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = dots.length - 1;
      }
    }
    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= dots.length) {
        tabFocus = 0;
      }
    }
    dots[tabFocus].setAttribute("tabindex", 0);
    dots[tabFocus].focus();
  }
}

function changeDotPanel(e) {
  const targetDot = e.target;
  const targetPanel = targetDot.getAttribute("aria-controls");
  const targetImage = targetDot.getAttribute("data-image");

  const targetContainer = targetDot.parentNode;
  const mainContainer = targetContainer.parentNode;

  targetContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetDot.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');

  showContent(mainContainer, `#${targetPanel}`);

  hideContent(mainContainer, "picture");

  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => {
    item.setAttribute("hidden", true);
  });
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
