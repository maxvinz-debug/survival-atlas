const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Filter the field-guide cards by topic.
const filterButtons = document.querySelectorAll(".filter");
const guideCards = document.querySelectorAll(".guide-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;

    guideCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.hidden = !shouldShow;
    });
  });
});

// Starter field notes shown in the guide dialog.
const guideNotes = {
  kit: {
    title: "BUILD AN EMERGENCY KIT",
    intro: "A useful kit is organized, easy to reach, and suited to your household's needs.",
    points: [
      "Drinking water and shelf-stable food, following local preparedness guidance.",
      "Flashlight, spare batteries, and a charged power bank.",
      "First-aid supplies and personal medicines.",
      "Copies of important contacts and documents stored safely.",
      "Basic hygiene items, sturdy footwear, and weather-appropriate clothing."
    ],
    note: "Check supplies regularly and adapt the kit for children, older adults, pets, and medical needs."
  },
  water: {
    title: "WATER SAFETY",
    intro: "Water that looks clear is not necessarily safe to drink. Contamination may not be visible.",
    points: [
      "Store safe drinking water in clean, food-grade containers.",
      "Follow official advice during floods or water-service disruptions.",
      "Use an approved treatment method according to its instructions when authorities advise treating water.",
      "If a source may contain fuel or toxic chemicals, do not assume boiling will make it safe."
    ],
    note: "Follow your local water utility and public-health authority for current advice."
  },
  firstaid: {
    title: "FIRST-AID AWARENESS",
    intro: "A basic kit helps you prepare, but it does not replace training or professional care.",
    points: [
      "Keep clean dressings, bandages, gloves, and other basic supplies together.",
      "Learn first aid from a recognized training provider.",
      "Call local emergency services for serious or worsening conditions.",
      "Do not give medication or perform procedures unless you are trained and it is appropriate."
    ],
    note: "For a life-threatening emergency, contact emergency services and follow the dispatcher's instructions."
  },
  disaster: {
    title: "NATURAL-DISASTER READINESS",
    intro: "Preparedness starts with knowing the hazards in your area and where to find reliable alerts.",
    points: [
      "Monitor official weather and disaster-management announcements.",
      "Know your evacuation routes and designated shelters.",
      "Keep essential supplies and important contacts accessible.",
      "Follow evacuation orders promptly and avoid hazardous floodwater.",
      "Practice household communication and meeting plans."
    ],
    note: "In the Philippines, check PAGASA for weather information and the Office of Civil Defense or your local government for emergency guidance."
  }
};

const guideDialog = document.querySelector("#guideDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogContent = document.querySelector("#dialogContent");

document.querySelectorAll(".guide-more").forEach((button) => {
  button.addEventListener("click", () => {
    const note = guideNotes[button.dataset.guide];
    if (!note) return;

    dialogTitle.textContent = note.title;
    dialogContent.replaceChildren();

    const intro = document.createElement("p");
    intro.textContent = note.intro;
    dialogContent.append(intro);

    const heading = document.createElement("h3");
    heading.textContent = "KEY POINTS";
    dialogContent.append(heading);

    const list = document.createElement("ul");
    note.points.forEach((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      list.append(item);
    });
    dialogContent.append(list);

    const noteText = document.createElement("p");
    noteText.textContent = note.note;
    dialogContent.append(noteText);

    guideDialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => guideDialog.close());
guideDialog.addEventListener("click", (event) => {
  if (event.target === guideDialog) guideDialog.close();
});

// Illustrated Outdoor Field Manual: each topic opens a visual, offline-friendly guide.
const visualGuides = {
  food: {
    title: "WILD FOOD: KNOW THE DIFFERENCE",
    intro: "These drawings show familiar cultivated foods versus unknown wild items. They are not a field-identification tool.",
    pictures: [
      ["🥭", "MANGO", "Familiar cultivated fruit — eat only when correctly identified, clean, and in good condition.", "known"],
      ["🍌", "BANANA", "Familiar cultivated fruit — choose clean food from a trusted source.", "known"],
      ["🥥", "COCONUT", "A familiar food when sourced and handled safely; avoid damaged or contaminated food.", "known"],
      ["🫐", "UNKNOWN BERRIES", "DO NOT EAT. Many wild berries look similar, and appearance is not a safe test.", "avoid"],
      ["🍄", "UNKNOWN MUSHROOM", "DO NOT EAT. Some poisonous mushrooms closely resemble edible species.", "avoid"]
    ],
    steps: ["Use sealed emergency food or familiar cultivated food from a trusted source.", "Wash produce with safe water and keep it away from dirt, animals, and floodwater.", "Leave every unknown berry, leaf, root, seed, flower, and mushroom untouched.", "Never use taste, smell, colour, online photos, or cooking as a poison test."],
    warning: "A photo cannot confirm that a wild plant or mushroom is safe. Beginners should not forage or eat wild mushrooms. If someone may have eaten a poisonous plant or mushroom, contact local emergency medical services or a poison-information service immediately."
  },
  water: {
    title: "WATER SAFETY: VISUAL CHECKLIST",
    intro: "Clear water can still contain harmful germs or chemicals. Follow local public-health instructions first.",
    pictures: [["🧴", "SEALED BOTTLED WATER", "Preferred when the seal is intact and the source is trusted.", "known"], ["🚰", "OFFICIALLY APPROVED TAP WATER", "Use when the water provider or local authority confirms it is safe.", "known"], ["🌊", "FLOODWATER", "Avoid. It may contain sewage, chemicals, and debris.", "avoid"], ["🛢️", "OILY OR CHEMICAL WATER", "Avoid. Boiling does not remove many chemical contaminants.", "avoid"]],
    steps: ["Choose sealed bottled water or a source officially confirmed safe.", "If authorities issue a boil-water notice, follow their exact current instructions.", "Use a certified filter only for the contaminants it is designed to remove.", "Store safe water in clean, covered, food-grade containers."],
    warning: "Do not taste questionable water. Boiling can kill many germs but cannot make fuel-, pesticide-, heavy-metal-, or chemically contaminated water safe."
  },
  shelter: {
    title: "SHELTER: CHOOSE A SAFER PLACE",
    intro: "The safest shelter is usually a sturdy building, official evacuation centre, or established safe site.",
    pictures: [["🏠", "STURDY BUILDING", "Prefer a sound building or designated evacuation centre.", "known"], ["⛺", "APPROVED CAMPSITE", "Use an established site and follow its rules.", "known"], ["🌳", "DEAD OR HANGING BRANCHES", "Do not shelter beneath damaged trees or branches.", "avoid"], ["🌊", "RIVERBANK OR DRAINAGE", "Avoid low areas that can flood or become fast-moving waterways.", "avoid"]],
    steps: ["Check weather alerts and follow evacuation instructions.", "Choose stable, elevated ground away from rivers, cliffs, slopes, and damaged trees.", "Stay dry and use a ground barrier and dry insulating layers when available.", "Ask a trained adult before any practical shelter-building activity."],
    warning: "Do not enter unstable structures or build beneath dead branches. This guide focuses on choosing a safer location, not constructing a shelter."
  },
  fire: {
    title: "FIRE AWARENESS: STAY CLEAR AND SAFE",
    intro: "Fire can cause burns, smoke exposure, and wildfires. This guide covers safety, not how to start or build a fire.",
    pictures: [["🧑‍🏫", "ADULT SUPERVISION", "Only use a designated facility with a responsible adult and where fires are permitted.", "known"], ["🧯", "SAFETY EQUIPMENT", "Know where approved fire-safety equipment is located and how to alert an adult.", "known"], ["⛺", "INSIDE A TENT", "Never use an open flame or fuel-burning device inside a tent.", "avoid"], ["🌾", "DRY OR WINDY AREA", "Do not light fires where conditions could spread flames.", "avoid"]],
    steps: ["Check local fire restrictions and weather conditions.", "Keep people, pets, loose clothing, and combustible materials well away from flames.", "Never leave a permitted fire unattended; have the responsible adult manage it.", "If a fire spreads or feels unsafe, move away and contact emergency services."],
    warning: "Never experiment with fire alone. Learn practical fire skills only through a qualified instructor and direct adult supervision."
  },
  navigation: {
    title: "NAVIGATION: PLAN BEFORE YOU GO",
    intro: "A simple plan and reliable communication reduce the chance of getting lost.",
    pictures: [["🗺️", "MAP AND ROUTE", "Know the planned route and safe exit points.", "known"], ["📱", "CHARGED PHONE", "Carry a charged phone and power bank where possible.", "known"], ["🌧️", "UNSAFE WEATHER", "Check forecasts, trail closures, and local advisories before leaving.", "avoid"], ["↗️", "WANDERING OFF-ROUTE", "Do not guess a new route when lost.", "avoid"]],
    steps: ["Tell a trusted person where you are going and when you expect to return.", "Check weather, route conditions, and official advisories.", "Carry a map, charged phone, and emergency contact details.", "If lost, pause in a safe place, contact help, and share your location."],
    warning: "Do not enter restricted areas or continue into dangerous weather. Follow park staff and emergency responders."
  },
  wildlife: {
    title: "WILDLIFE: OBSERVE FROM A DISTANCE",
    intro: "Wild animals and unfamiliar plants should be treated with caution and respect.",
    pictures: [["🦋", "OBSERVE, DON'T HANDLE", "Enjoy wildlife from a respectful distance.", "known"], ["🎒", "SEALED FOOD", "Keep food packed away so animals are not attracted to people.", "known"], ["🐍", "UNKNOWN ANIMAL", "Do not touch, corner, feed, or try to capture it.", "avoid"], ["🌿", "UNKNOWN PLANT", "Do not touch or eat unfamiliar plants.", "avoid"]],
    steps: ["Keep a safe distance and never feed or handle wild animals.", "Keep food sealed and dispose of rubbish properly.", "Avoid nests, burrows, and unfamiliar plants.", "If bitten or stung, move away and seek medical advice; do not try to capture the animal."],
    warning: "If an animal appears sick, trapped, or aggressive, keep away and notify the appropriate local authority."
  }
};

function renderVisualGuide(key) {
  const guide = visualGuides[key];
  if (!guide) return;
  dialogTitle.textContent = guide.title;
  dialogContent.replaceChildren();

  const intro = document.createElement("p");
  intro.className = "visual-intro";
  intro.textContent = guide.intro;
  dialogContent.append(intro);

  const pictureHeading = document.createElement("h3");
  pictureHeading.textContent = "VISUAL REFERENCE";
  dialogContent.append(pictureHeading);

  const gallery = document.createElement("div");
  gallery.className = "visual-gallery";
  guide.pictures.forEach(([emoji, name, description, status]) => {
    const card = document.createElement("article");
    card.className = `visual-card ${status === "avoid" ? "visual-avoid" : "visual-known"}`;
    const art = document.createElement("div");
    art.className = "visual-art";
    art.setAttribute("aria-hidden", "true");
    art.textContent = emoji;
    const label = document.createElement("span");
    label.className = "visual-status";
    label.textContent = status === "avoid" ? "AVOID / UNSAFE" : "FAMILIAR EXAMPLE";
    const title = document.createElement("h4");
    title.textContent = name;
    const copy = document.createElement("p");
    copy.textContent = description;
    card.append(art, label, title, copy);
    gallery.append(card);
  });
  dialogContent.append(gallery);

  const stepsHeading = document.createElement("h3");
  stepsHeading.textContent = "WHAT TO DO — STEP BY STEP";
  dialogContent.append(stepsHeading);
  const steps = document.createElement("ol");
  steps.className = "visual-steps";
  guide.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    steps.append(item);
  });
  dialogContent.append(steps);

  const warning = document.createElement("p");
  warning.className = "visual-warning";
  warning.textContent = guide.warning;
  dialogContent.append(warning);
  guideDialog.showModal();
}

document.querySelectorAll(".wild-open").forEach((button) => {
  button.addEventListener("click", () => renderVisualGuide(button.dataset.visual));
});

// Update progress for the interactive preparedness checklist.
const checklistItems = [...document.querySelectorAll(".check-item input")];
const checklistStorageKey = "survival-atlas-checklist-v1";
try {
  const savedChecklist = JSON.parse(localStorage.getItem(checklistStorageKey) || "[]");
  checklistItems.forEach((item, index) => { item.checked = savedChecklist[index] === true; });
} catch (error) { /* The checklist still works if browser storage is unavailable. */ }
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");

function updateProgress() {
  const completed = checklistItems.filter((item) => item.checked).length;
  progressText.textContent = `${completed} / ${checklistItems.length} COMPLETE`;
  progressFill.style.width = `${(completed / checklistItems.length) * 100}%`;
}

checklistItems.forEach((item) => item.addEventListener("change", () => {
  updateProgress();
  try { localStorage.setItem(checklistStorageKey, JSON.stringify(checklistItems.map((entry) => entry.checked))); } catch (error) { /* Storage is optional. */ }
}));

document.querySelector("#resetChecklist").addEventListener("click", () => {
  checklistItems.forEach((item) => { item.checked = false; });
  try { localStorage.removeItem(checklistStorageKey); } catch (error) { /* Storage is optional. */ }
  updateProgress();
});


// Show whether the browser currently has a network connection.
const offlineStatus = document.querySelector("#offlineStatus");
const connectionText = document.querySelector("#connectionText");
function updateConnectionStatus() {
  const offline = !navigator.onLine;
  offlineStatus.classList.toggle("is-offline", offline);
  connectionText.textContent = offline
    ? "OFFLINE MODE · SAVED FIELD GUIDES ARE AVAILABLE"
    : "ONLINE · OFFLINE ACCESS AVAILABLE AFTER FIRST VISIT";
}
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
