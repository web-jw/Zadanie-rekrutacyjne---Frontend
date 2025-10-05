class SearchBar extends HTMLElement {
  icon = 'empty';
  input;
  emits = {
    valueChanged: () => '',
  };

  // Lifecycle

  constructor({ name, placeholder }) {
    super();

    this.name = name;
    this.placeholder = placeholder;
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  disconnectedCallback() {
    this.removeEvents();
  }

  // Methods

  addEvents() {
    this.input = this.querySelector('.search-bar__input');
    this.button = this.querySelector('.search-bar__icon');

    this.input?.addEventListener('input', this.#valueChanged.bind(this));
    this.button?.addEventListener('click', this.#clearValue.bind(this));
  }

  removeEvents() {
    this.input?.removeEventListener('input', this.#valueChanged.bind(this));
    this.input?.removeEventListener('input', this.#clearValue.bind(this));
  }

  #valueChanged() {
    this.emits.valueChanged(this.input.value);
    this.renderIcon();
  }

  #clearValue() {
    this.input.value = '';
    this.emits.valueChanged(this.input.value);
    this.renderIcon();
  }

  renderIcon() {
    const img = this.button?.querySelector('img');

    this.icon = !!this.input.value.length ? 'clear' : 'empty';

    img.src = img.src.replace(/[^-]+\.svg$/, `${this.icon}.svg`);

    this.icon === 'clear' ? this.button.classList.remove('none-events') : this.button.classList.add('none-events');
  }

  render() {
    this.innerHTML = `
      <div class="search-bar">
        <input class="search-bar__input" type="text" name="${this.name}" placeholder="Search for a team" />
        <button class="search-bar__icon none-events">
          <img src="./assets/icons/search-bar-${this.icon}.svg" alt="Search icon" />
        </button>
      </div>`;
  }
}

customElements.define('search-bar', SearchBar);

export default SearchBar;
