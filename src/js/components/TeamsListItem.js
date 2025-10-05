class TeamsListItem extends HTMLElement {
  intRank = 0;
  strBadge = '';
  strTeam = '';
  intWin = 0;
  intLoss = 0;
  intDraw = 0;
  intPoints = 0;
  intPlayed = 0;
  strForm = '';
  intGoalsFor = 0;
  intGoalsAgainst = 0;
  intGoalDifference = 0;
  assigned = false;

  partials = {
    statsBar: () => {
      const barWidth = {
        wins: (this.intWin / this.intPlayed) * 100,
        loses: (this.intLoss / this.intPlayed) * 100,
        draws: (this.intDraw / this.intPlayed) * 100,
      };

      return `
        <div class="team__stats">
          <div class="team__stats__bar">
            <div class="team__stats__filler bg--win" style="width: ${barWidth.wins}%"></div>
            <div class="team__stats__filler bg--draw" style="width: ${barWidth.draws}%"></div>
            <div class="team__stats__filler bg--lose" style="width: ${barWidth.loses}%"></div>
          </div>

          <div class="team__stats__details">
            <span>W: ${this.intWin}</span>
            <span>D: ${this.intDraw}</span>
            <span>L: ${this.intLoss}</span>
          </div>
        </div>`;
    },

    form: () => {
      const bg = {
        W: 'bg--win',
        D: 'bg--draw',
        L: 'bg--lose',
      };

      const listItems = this.strForm
        .split('')
        .map((letter) => `<li class="team__form__item ${bg[letter]}">${letter}</li>`)
        .reverse()
        .join('');

      return `
        <div class="badge">
          <div class="team__form">
            <div class="team__bottom__label">Form:</div>

            <ul class="team__form__list" role="list">
              ${listItems}
            </ul>
          </div>
        </div>`;
    },
  };

  // Lifecycle

  constructor(teamData) {
    super();
    teamData && this.setTeamDetails(teamData);
  }

  connectedCallback() {
    this.render();
  }

  // Methods

  setTeamDetails(teamData) {
    if (!teamData) return;

    Object.assign(this, teamData);
    this.assigned = true;
  }

  render() {
    if (!this.assigned) return;

    const podiumClass = this.intRank < 4 ? 'team__place__number--podium' : '';

    this.innerHTML = `
      <li class="team">
        <div class="team__top">
          <div class="team__place">
            <div class="team__place__number ${podiumClass}">${this.intRank}</div>
          </div>

          <div class="team__details">
            <div class="team__details__container">
              <div class="team__header">
                <img class="team__header__crest" src="${this.strBadge}" alt="${this.strTeam} Crest" />
                <h3 class="team__header__name">${this.strTeam}</h3>
              </div>

              ${this.partials.statsBar()}
            </div>
            <div class="team__points badge badge--highlight">${this.intPoints} PTS</div>
          </div>
        </div>

        <div class="team__bottom">
          ${this.partials.form()}

          <div class="badge badge--col">
            <div class="team__bottom__label">Goals for:</div>
            <div>${this.intGoalsFor}</div>
          </div>

          <div class="badge badge--col">
            <div class="team__bottom__label">Goals against:</div>
            <div>${this.intGoalsAgainst}</div>
          </div>

          <div class="badge badge--col">
            <div class="team__bottom__label">Goals difference:</div>
            <div>${this.intGoalDifference}</div>
          </div>
        </div>
      </li>`;
  }
}

customElements.define('teams-table-item', TeamsListItem);

export default TeamsListItem;
