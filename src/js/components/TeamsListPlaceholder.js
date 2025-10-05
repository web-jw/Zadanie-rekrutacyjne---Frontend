class TeamsListPlaceholder extends HTMLElement {
  // Lifecycle

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <li class="team">
          <div class="team__top">
            <div class="team__place">
              <div class="team__place__number skeleton">0</div>
            </div>

            <div class="team__details">
              <div class="team__details__container">
                <div class="team__header">
                  <div class="team__header__crest skeleton"></div>
                  <h3 class="team__header__name skeleton rounded"></h3>
                </div>

                <div class="team__stats">
                  <div class="team__stats__bar skeleton"></div>
                  <div class="team__stats__details skeleton rounded"></div>
                </div>
              </div>

              <div class="team__points badge badge--highlight skeleton"></div>
            </div>
          </div>
        </li>`;
  }
}

customElements.define('teams-table-placeholder', TeamsListPlaceholder);

export default TeamsListPlaceholder;
