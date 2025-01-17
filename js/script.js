window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item '),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });



        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }



    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;


        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });

        }
    });
    const deadline = '2020-12-19';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }




    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const t = getTimeRemaining(endTime);


            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);


    // modal


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');




    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }



    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }


    });


    //const modalTimerId = setTimeout(openModal, 2000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);





    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = ` 
            
                <img src="${this.src}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                    </div>
                    
            `;






            this.parent.style.perspective = '1000px';
            //this.parent.style.transform-style = 'preserve 3d';





            element.style.transition = 'transform 0.2s'
            element.style.transform = 'rotateX(20deg)'


            element.addEventListener('click', () => {
                console.log(this.parent)
            })

            this.parent.append(element);
        }

    }



    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',




    ).render();

    new MenuCard(
        "img/tabs/hamburger.jpg",
        "elite",
        'Меню “Премиум',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container',



    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        9,
        '.menu .container',



    ).render();
});