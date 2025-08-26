import { Location } from "../models/interfaces";

export default function renderLocationItem(location: Location) {
  return `
    <li class="location-item">
      <button
        hx-post="/places"
        hx-target="#interesting-locations"
        hx-swap="beforeend"
        hx-vals='{"locationId": "${location.id}"}'
      >
        <img src="${`/images/${location.image.src}`}" alt="${
    location.image.alt
  }" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
