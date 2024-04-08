//* MENU
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
const menuLinks = document.querySelectorAll('.menu a');
const header = document.querySelector('.header');
const body = document.querySelector('body');

menuBtn.addEventListener('click', function () {
	menu.classList.toggle('active');
	menuBtn.classList.toggle('active');
	header.classList.toggle('active');
	body.classList.toggle('no-scroll');
});

menuLinks.forEach((menuLink) => {
	menuLink.addEventListener('click', function () {
		menu.classList.remove('active');
		menuBtn.classList.remove('active');
		header.classList.remove('active');
		body.classList.remove('no-scroll');
	})
})


//* АВТОВЫЧИСЛЕНИЕ ВЫСОТЫ ШАПКИ (защищает контент секции first от "налезания" шапки, если высота шапки будет меняться по какой-то причине)
const headerActualHeight = header.offsetHeight; // создали переменную, в которую ложим актуальную высоту шапки
const root = document.querySelector(':root'); // нашли css-селектор root (хранилище глобальных переменных)

root.style.setProperty('--header-height', `${headerActualHeight}px`); // заменили переменную с заданной высотой шапки из CSS на переменную с актуальной высотой шапки из JS


//* ПЛАВНЫЙ СКРОЛЛ НА ВСЕ ССЫЛКИ ВНУТРИ СТРАНИЦЫ (+ перемещение К САМОМУ НАЧАЛУ секции для ссылок, ведущих к секциям на странице)
const allLinks = document.querySelectorAll('a'); // нашли абсолютно ВСЕ ссылки на странице

// перебираем ссылки
allLinks.forEach((link) => {
	// навешиваем событие по клику на каждую ссылку
	link.addEventListener('click', (e) => {
		// находим атрибут href нажатой ссылки
		const href = link.getAttribute('href');

		// делаем проверку: если href нажатой ссылки - это просто заглушка #, то
		if (href === '#') {
			e.preventDefault(); // отключаем у ссылки действие по умолчанию (чтобы при нажатии на ссылку в адресной строке не появлялся адрес, по которому мы перешли, тут он не нужен)

			// ПЛАВНО скроллим к самому верху (началу) страницы
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})


		}

		// делаем проверку: если href нажатой ссылки - это НЕ просто заглушка # И если href НАЧИНАЕТСЯ с заглушки, то
		if (href !== '#' && href.startsWith('#')) {
			e.preventDefault(); // отключаем у ссылки действие по умолчанию (чтобы при нажатии на ссылку в адресной строке не появлялся адрес, по которому мы перешли, тут он не нужен)

			// находим секцию, на которую ведёт нажатая ранее ссылка по href (адресу)
			const sectionEl = document.querySelector(href);
			// находим координаты самого верха (начала) секции
			const sectionElPosition = sectionEl.getBoundingClientRect().top;
			// находим координаты начала секции с учётом размера шапки сверху (чтоб шапка не налазила на секцию, а стояла ПЕРЕД ней)
			const offsetPosition = sectionElPosition - headerActualHeight;

			// ПЛАВНО скроллим к самому верху (началу) секции
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	})
})


//* КНОПКИ ПОРТФОЛИО
const allFilterBtns = document.querySelectorAll('.filter-list__btn');

// сделали изначально активной первую кнопку
allFilterBtns[0].classList.add('active');

// перебираем все кнопки
allFilterBtns.forEach((filterBtn) => {
	// добавляем событие по нажатию на кнопку
	filterBtn.addEventListener('click', () => {
		// снова перебираем все кнопки
		allFilterBtns.forEach((filterBtn) => {
			// чтобы после клика убрать active со всех кнопок
			filterBtn.classList.remove('active');
		})

		// добавляем active конкретно нажатой кнопке
		filterBtn.classList.add('active');
	})
})


//* ФИЛЬТРЫ ПОРТФОЛИО
const allPortfolioCards = document.querySelectorAll('.portfolio-list__item');

// перебираем все кнопки-фильтры
allFilterBtns.forEach((filterBtn) => {
	// чтобы добавить событие по клику
	filterBtn.addEventListener('click', () => {
		// находим категорию конкретно нажатой кнопки
		const currentBtnCategory = filterBtn.getAttribute('data-filter-btn');

		// перебираем все карточки
		allPortfolioCards.forEach((portfolioCard) => {
			// убираем класс hidden у ВСЕХ карточек (это нужно, чтобы при выборе каждой следующей категории сбросить предыдущую)
			portfolioCard.classList.remove('hidden');

			// прячем все карточки, у которых значение атрибута data-filter-category НЕ СОВПАДАЕТ со значением атрибута data-filter-btn
			if (!portfolioCard.getAttribute('data-filter-category').includes(currentBtnCategory)) {
				portfolioCard.classList.add('hidden');
			}

			// если у нажатой кнопки значение атрибута data-filter-btn включает в себя all, то мы со всех карточек убираем класс hidden (т.е. показываем ВСЕ карточки)
			if (currentBtnCategory.includes('all')) {
				portfolioCard.classList.remove('hidden');
			}
		})
	})
})


//* ПОКАЗАТЬ КАРТОЧКИ
const viewMoreBtn = document.querySelector('.portfolio__btn');
// создаём переменную, в которой указываем индекс последней отображаемой карточки (т.о. сообщаем, сколько карточек должно отображаться за раз)
let lastIndex = 8;
// создаём переменную с индексом самой последней карточки в портфолио
const finishIndex = allPortfolioCards.length - 1;

// перебираем все карточки
allPortfolioCards.forEach((portfolioCard, index) => {
	// прячем все карточки изначально
	portfolioCard.classList.add('hidden');

	// показываем первые 9 карточек
	if (index <= lastIndex) {
		portfolioCard.classList.remove('hidden');
	}
})

// делаем событие по клику на кнопку
viewMoreBtn.addEventListener('click', () => {
	// МЕНЯЕМ значение переменной, в которой указываем индекс последней отображаемой карточки (т.о. сообщаем, сколько карточек должно отображаться за раз (после каждого нажатия на кнопку должно быть на 4 карточки больше))
	lastIndex += 4;

	// снова перебираем все карточки
	allPortfolioCards.forEach((portfolioCard, index) => {
		// показываем следующие 4 карточки
		if (index <= lastIndex) {
			portfolioCard.classList.remove('hidden');
		}

		// убираем кнопку "Показать больше" после того как отобразились все карточки
		if (lastIndex >= finishIndex) {
			viewMoreBtn.classList.add('hidden');
		}
	})
})


//* ВИДЕО
const videoBtn = document.querySelector('.video__btn');
const video = document.querySelector('.video video');

videoBtn.addEventListener('click', () => {
	if (video.paused === true) {
		video.play();
		videoBtn.classList.add('active');
	} else {
		video.pause();
		videoBtn.classList.remove('active');
	}
})


//* SWIPER
const featuredSlider = new Swiper('.featured-slider', {
	loop: true,

	// Стрелки навигации
	navigation: {
		nextEl: ".slider__btn-next",
		prevEl: ".slider__btn-prev",
	},

	// Пагинация (точки)
	pagination: {
		el: ".featured-slider__pagination",
		clickable: true,
	},
});