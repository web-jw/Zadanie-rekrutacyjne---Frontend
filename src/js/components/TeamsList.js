import SearchBar from './SearchBar.js';
import TeamsListItem from './TeamsListItem.js';
import TeamsListPlaceholder from './TeamsListPlaceholder.js';

class TeamsList extends HTMLElement {
  teams = [];
  searched = '';
  fetching = true;
  error = true;

  partials = {
    empty: (type) => {
      const text = {
        error: `There was a problem. Please try ${this.fetching ? 'scrolling' : 'again later'}.`,
        notFound: `No teams found matching "${this.searched}"`,
      };

      return `
        <div class="teams__empty badge badge--col">
          <img src="./assets/icons/teams-table-${type}.svg" alt="${type} icon" />
          ${text[type]}
        </div>`;
    },

    placeholders() {
      return Array.from({ length: 5 }, () => new TeamsListPlaceholder());
    },
  };

  // Lifecycle

  constructor() {
    super();
  }

  async connectedCallback() {
    this.render();
    this.renderItems();

    window.addEventListener('scroll', this.getTeams.bind(this), { once: true });
  }

  // Methods

  async getTeams() {
    try {
      this.error = false;
      this.fetching = true;

      const response = await fetch('https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=4328&s=2024-2025');

      this.teams = (await response.json())?.table;
    } catch (error) {
      this.error = true;
      console.error(error);
    } finally {
      this.fetching = false;
    }

    this.renderItems();
  }

  renderItems() {
    const table = this.querySelector('.teams__table');
    table.innerHTML = '';

    if (this.fetching && !this.searched.length) {
      return table.append(...this.partials.placeholders());
    }

    if (this.error) {
      return (table.innerHTML = this.partials.empty('error'));
    }

    const searched = this.searched.toLowerCase();
    const filtered = this.searched
      ? this.teams.filter(({ strTeam }) => strTeam.toLowerCase().includes(searched))
      : this.teams;

    if (!filtered.length) {
      return (table.innerHTML = this.partials.empty('notFound'));
    }

    table.append(...filtered.map((team) => new TeamsListItem(team)));
  }

  render() {
    const searchBar = new SearchBar({
      name: 'search-teams',
      placeholder: 'Search for a team',
    });

    searchBar.emits.valueChanged = (value) => {
      this.searched = value;
      this.renderItems();
    };

    this.innerHTML = `
      <div class="teams">
        <!-- Teams  Header -->

        <div class="teams__header">
          <img class="teams__header__icon" class="svg" src="assets/icons/teams-table-mobile.svg" />
          <h1 class="teams__header__heading">Premier League</h1>

          <div class="teams__header__search">
            
          </div>
        </div>

        <!-- Teams Table -->

        <ul class="teams__table" role="list">
        </ul>
      </div>`;

    this.querySelector('.teams__header__search').append(searchBar);
  }
}

customElements.define('teams-table', TeamsList);
