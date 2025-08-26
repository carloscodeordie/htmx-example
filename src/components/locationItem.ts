import { Location } from "../models/interfaces";

export default function renderLocationItem(location: Location) {
  return `
    <li class="location-item">
      <button>
        <img src="${`/images/${location.image.src}`}" alt="${
    location.image.alt
  }" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
