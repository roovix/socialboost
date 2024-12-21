const slider = document.getElementById("serviceSlider");
let isDown = false;
let startX;
let scrollLeft;

// Mouse events for drag scrolling
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.style.cursor = "grabbing";
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile swipe
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  if (e.touches.length !== 1) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Arrow navigation
function slideServices(direction) {
  const scrollAmount = 250;
  slider.scrollBy({
    left: scrollAmount * direction,
    behavior: "smooth",
  });
}

// Function to add new service dynamically
function addService(name, icon, tag = null, tagType = "new") {
  const serviceItem = document.createElement("a");
  serviceItem.href = `#${name.toLowerCase()}`;
  serviceItem.className = "service-item";

  serviceItem.innerHTML = `
    <div class="service-icon" style="background: #f0e6ff;">
    ${icon}
    </div>
    <span class="service-name">${name}</span>
    ${tag ? `<span class="service-tag tag-${tagType}">${tag}</span>` : ""}
`;

  slider.appendChild(serviceItem);
}

// Example usage:
// addService('Facebook', '<svg>...</svg>', 'Popular', 'popular');
