import Validator from './Validator';

export default class ValidatorDOM {
  constructor() {
    this.button = document.querySelector('.button');
    this.input = document.querySelector('.input');
    this.errorEl = document.querySelector('.error');
    this.validator = new Validator();
    this.paySystems = [
      this.visa = document.querySelector('.visa'),
      this.masterCard = document.querySelector('.master-card'),
      this.americanExpress = document.querySelector('.american-express'),
      this.discover = document.querySelector('.discover'),
      this.maestro = document.querySelector('.maestro'),
      this.mir = document.querySelector('.mir'),
    ];
  }

  init() {
    this.addListners();
  }

  addListners() {
    this.button.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.validate();
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        this.validate();
      }
    });

    this.input.addEventListener('input', () => {
      this.paySystems.forEach((el) => {
        if (el.classList.contains('valid')) {
          el.classList.toggle('valid');
        }
      });

      if (!this.errorEl.classList.contains('hidden')) {
        this.errorEl.classList.add('hidden');
        this.errorEl.classList.remove('invalid');
      }
    });
  }

  getNumber() {
    return parseInt(this.input.value.replace(/\s/g, ''), 10);
  }

  validate() {
    const cardNumber = this.getNumber();
    if (Validator.checkLuhnAlgorithm(cardNumber)) {
      const paySystem = this.validator.checkPaySystem(cardNumber);
      try {
        const system = document.querySelector(`.${paySystem}`);
        system.classList.toggle('valid');
      } catch (err) {
        this.showErrorTooltip('Платежная система не поддерживается');
      }
      return;
    }
    this.showErrorTooltip('Неверный номер карты');
  }

  showErrorTooltip(text) {
    this.errorEl.classList.remove('hidden');
    this.errorEl.classList.add('invalid');
    this.errorEl.textContent = text;
    this.errorEl.style.left = `${this.input.offsetLeft - 40}px`;
    this.errorEl.style.top = `${this.input.offsetTop + this.input.offsetHeight + 10}px`;
  }
}
