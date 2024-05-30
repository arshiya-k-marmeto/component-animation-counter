class NumberCounter extends HTMLElement {
    constructor() {
        super();
      // console.log('NumberCounter constructor called');
        this._init();
    }

    _init() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._startCount();
                    observer.unobserve(this);
                }
            });
        }, { rootMargin: "-100px" });

        observer.observe(this);
    }

    _startCount() {
        const targetNumber = parseInt(this.getAttribute('data-counter-number'), 10);
        const speed = 500;
        const increment = targetNumber / speed;
        let currentNumber = 0;

        const updateCount = () => {
            currentNumber += increment;
            if (currentNumber < targetNumber) {
                this.innerText = Math.ceil(currentNumber) + "+";
                requestAnimationFrame(updateCount);
            } else {
                this.innerText = targetNumber + "+";
            }
        };

        updateCount();
    }
}

customElements.define('number-counter', NumberCounter);
