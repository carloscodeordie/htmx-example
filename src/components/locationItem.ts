import { Location } from "../models/interfaces";

export default function renderLocationItem(
  location: Location,
  isAvailableLocation: boolean = true
) {
  let attributes;

  if (isAvailableLocation) {
    attributes = `
      hx-post="/places"
      hx-target="#interesting-locations"
      hx-swap="beforeend show:#interesting-locations-section:top"
      hx-vals='{"locationId": "${location.id}"}'
    `;
  } else {
    attributes = `
      hx-delete="/places/${location.id}"
      hx-confirm="Are you sure you want to delete?"
      hx-target="closest li"
      hx-swap="outerHTML"
    `;
  }

  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${
    location.image.alt
  }" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
