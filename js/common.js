var tabletBreakpoint = 960;
var mobileBreakpoint = 750;


function preloaderRemove() {
	var body = document.getElementsByTagName('body')[0];
	var preloader = body.getElementsByClassName('preloader')[0];
	preloader.classList.add('preloader--removed');
	function e() {
		body.removeChild(preloader);
	}
	setTimeout(function() {
		e();
	}, 2000);
}

function ExtractNumberFromClass(nameOfClass, cl, mode) {
	var index = cl.search(nameOfClass + '--' + (mode ? mode : ''));
	var i = index;
	while (cl[i] != ' ' && cl[i] != undefined) {
		i++;
	}
	index = i;
	while (cl[index] != (mode ? mode : '-')) {
		index--;
	}
	var number = parseFloat(cl.slice(index+1, i));
	return number;
} 

function topMenu() {
	var ourClass = 'b-top-menu--active';
	var button = document.getElementsByClassName('b-top-menu-js');
	var menu = document.getElementsByClassName('b-top-menu')[0];
	for (var i = 0; i < button.length; i++) {
		button[i].onclick = function() {
			if (menu.classList.contains(ourClass)) {
				menu.classList.remove(ourClass);

			}
			else {
				menu.classList.add(ourClass);
			}
			return false;
		}
	}
}

function fixedFooter() {
	function e() {
		var footer = document.getElementsByClassName('b-footer')[0];
		var height = footer.getBoundingClientRect().height;
		var body = document.getElementsByTagName('body')[0];
		body.style.paddingBottom = height + 'px';
		
	}
	// setTimeout(function() {
		// e();
	// },500);
	e();
}

// main 
function slider() {
	$('.b-slider-container').slick({
		dots: true,
		arrows: true,
		infinte: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 1000
	})
	var worksSlider = $('.b-works-slider');
	worksSlider.slick({
		dots: false,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		speed: 1000,
		responsive: [
			{
				breakpoint: 959,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 749,
				settings: {
					slidesToShow: 1
				}
			}
		]
	})
	$('.b-works__prev').click(function() {worksSlider.slick('slickPrev'); return false;})
	$('.b-works__next').click(function() {worksSlider.slick('slickNext'); return false;})
	var postSlider = $('.b-post-slider');
	postSlider.slick({
		dots: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		speed: 1000
	})
	$('.b-post__prev').click(function() {postSlider.slick('slickPrev'); return false;})
	$('.b-post__next').click(function() {postSlider.slick('slickNext'); return false;})
}

function Posts() {
	$('.b-posts-text').dotdotdot({
		height: 80,
		watch: 'window',

	})
}

function mainAdaptive() {
	var width = window.innerWidth;
	var curMode, initMode;
	if (width >= tabletBreakpoint) {
		initMode = 'd';
	}
	else if (width >= mobileBreakpoint) {
		initMode = 't';
	}
	else {
		initMode = 'm';
	}
	AutoScaling(initMode);
	window.onresize = function() {
		width = window.innerWidth;
		if (width >= tabletBreakpoint) {
			curMode = 'd';
		}
		else if (width >= mobileBreakpoint) {
			curMode = 't';
		}
		else {
			curMode = 'm';
			AutoScaling(curMode);
			fixedFooter();
		}
		if (initMode != curMode) {
			console.log('eee');
			if (curMode == 'd') {
				AutoScaling(curMode);
			}
			else if (curMode == 't') {
				AutoScaling(curMode);
			}
			else if (curMode == 'm') {

			}
			fixedFooter();
			initMode = curMode;
		}
	}
}

// company 

function countUp() {
	var items = document.getElementsByClassName('com-whatwedo-item');
	var activePart;
	var width;
	function exec(x, width) {
		var span = x.getElementsByClassName('com-whatwedo-number')[0];
		span.innerHTML = '';
		var i = 10;
		function e() {
			x.style.width = i + "%";
			span.innerHTML = i + "%";
			i++;
			if (i > width) {
				clearInterval(timeId);
			}
		}
		var timeId = setInterval(function() {
			e();
		},1000/width);

	}
	for (var i = 0; i < items.length; i++) {
		activePart = items[i].getElementsByClassName('com-whatwedo-active')[0];
		width = ExtractNumberFromClass('whatwedo-indicator', items[i].className);
		exec(activePart, width);
	}
}

// portfolio

function pAdaptive() {
	var width = window.innerWidth;
	var curMode, initMode;
	if (width >= tabletBreakpoint) {
		initMode = 'd';
	}
	else if (width >= mobileBreakpoint) {
		initMode = 't';
	}
	else {
		initMode = 'm';
		pMenu('enable');
	}
	AutoScaling(initMode);
	window.onresize = function() {
		width = window.innerWidth;
		if (width >= tabletBreakpoint) {
			curMode = 'd';
		}
		else if (width >= mobileBreakpoint) {
			curMode = 't';
		}
		else {
			curMode = 'm';
			AutoScaling(curMode);
			fixedFooter();
		}
		if (initMode != curMode) {
			AutoScaling(curMode);
			fixedFooter();
			if (curMode == 'd') {
				pMenu('disable');
			}
			else if (curMode == 't') {
				pMenu('disable');
			}
			else if (curMode == 'm') {
				pMenu('enable');
			}

			initMode = curMode;
		}
	}
}

function pIndicator() {
	var container = document.getElementsByClassName('p-top')[0];
	var menu = container.getElementsByClassName('p-menu-list')[0];
	var containerWidth = container.getBoundingClientRect().width;
	var items = container.getElementsByClassName('p-menu__item');
	var activeClass = 'p-menu__item--active';
	var activeItem = container.getElementsByClassName(activeClass)[0];
	var indicator = container.getElementsByClassName('p-menu__indicator')[0];
	var mobButton = container.getElementsByClassName('p-menu__button')[0];
	var newWidth;
	function getCoords(i) {
		var sum = 0;
		for (var j = 0; j < i; j++) {
			var sum = sum + items[j].width;  
		}
		return sum;
	}
	for (var i = 0; i < items.length; i++) {
		items[i].width = items[i].getBoundingClientRect().width;
		items[i].beginning = getCoords(i);
	}
	function returnToDefault() {
		indicator.style.left = activeItem.beginning + 'px';
		indicator.style.width = activeItem.width - 30 + 'px';
	}	
	returnToDefault();
	for (i = 0; i < items.length; i++) {
		items[i].onmouseover = function() {
			indicator.style.left = this.beginning + 'px';
			newWidth = this.width;
			function e(x) {
				indicator.style.width = x - 30 + 'px';
			}
			e(newWidth);
		}	
		items[i].onclick = function() {
			activeItem.classList.remove(activeClass);
			activeItem = this;
			activeItem.classList.add(activeClass);
			mobButton.innerHTML = activeItem.innerHTML;
			return false;
		} 
	}
	menu.onmouseout = function() {
		returnToDefault();
	}
}

function pMenu(mode) {
	var menu = document.getElementsByClassName('p-menu-list')[0];
	if (mode == 'enable') {
		menu.classList.add('dropdown-menu');
	}
	else {
		menu.classList.remove('dropdown-menu');
	}
}

//blog

function blAdaptive() {
	var width = window.innerWidth;
	var curMode, initMode;
	if (width >= tabletBreakpoint) {
		initMode = 'd';
	}
	else if (width >= mobileBreakpoint) {
		initMode = 't';
	}
	else {
		initMode = 'm';
	}
	AutoScaling(initMode);
	window.onresize = function() {
		width = window.innerWidth;
		if (width >= tabletBreakpoint) {
			curMode = 'd';
		}
		else if (width >= mobileBreakpoint) {
			curMode = 't';
		}
		else {
			curMode = 'm';
			AutoScaling(curMode);
			fixedFooter();
		}
		if (initMode != curMode) {

			if (curMode == 'd') {
				
			}
			else if (curMode == 't') {
				
			}
			else if (curMode == 'm') {
			
			}
			AutoScaling(curMode);
			fixedFooter();
			initMode = curMode;
		}
	}
}

function blTextOverflow() {
	$('.bl-post--img-text').dotdotdot({
		watch: 'window',
		height: 110,
		ellipsis: '',
		after: $('.bl-readmore--img')
	})
	$('.bl-post--slider-text').dotdotdot({
		watch: 'window',
		height: 110,
		ellipsis: '',
		after: $('.bl-readmore--slider')
	})
	$('.bl-post--video-text').dotdotdot({
		watch: 'window',
		height: 110,
		ellipsis: '',
		after: $('.bl-readmore--video')
	})
}

function blSlider() {			// used in blog and in portfolio--inner
	$('.bl-slider').slick({
		infinite: true,
		arrows: false,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.b-slider-arrow--next').click(function() {
		$(this).parent().find($('.bl-slider')).slick('slickNext');
	})
	$('.b-slider-arrow--prev').click(function() {
		$(this).parent().find($('.bl-slider')).slick('slickPrev');
	})
}

function blRightMenu() {
	var container = document.getElementsByClassName('bl-right')[0];
	var items = container.getElementsByClassName('bl-right-list-item');
	var itemsActiveClass = 'bl-right-list-item--active';
	var buttonClass = 'bl-right-list-item__span';
	var chevronClass = 'bl-right-list-item__chevron';
	var chevronActiveClass = 'fa-caret-down';
	var chevronInactiveClass = 'fa-caret-right';
	var itemsArr = [];
	function Item(item, button, chevron, i) {
		var self = this;
		this.item = item;
		this.button = button;
		this.i = i;
		this.chevron = chevron;
		this.button.onclick = function() {
			if (self.item.getElementsByClassName('bl-right-list').length >= 1) {
				self.toggleClass();
				return false;
			}
		}
	}
	Item.prototype.toggleClass = function() {
		if (this.item.classList.contains(itemsActiveClass)) {
			this.chevron.classList.remove(chevronActiveClass);
			this.chevron.classList.add(chevronInactiveClass);
			this.item.classList.remove(itemsActiveClass);
		}
		else {
			this.chevron.classList.remove(chevronInactiveClass);
			this.chevron.classList.add(chevronActiveClass);
			this.item.classList.add(itemsActiveClass);
		}
	}
	for (var i = 0; i < items.length; i++) {
		var button = items[i].getElementsByClassName(buttonClass)[0];
		var chevron = items[i].getElementsByClassName(chevronClass)[0];
		itemsArr[i] = new Item(items[i], button, chevron, i);
	}
	for (var i in itemsArr) {
		;
	}
}

function blTabs() {
	var container = document.getElementsByClassName('bl-right-tabs-buttons')[0];
	var items = container.getElementsByClassName('bl-right-tabs-buttons__item');
	var activeClass = 'bl-right-tabs-buttons__item--active';
	var activeTab = container.getElementsByClassName(activeClass)[0];
	for (var i = 0; i < items.length; i++) {
		items[i].onclick = function() {
			if (this.classList.contains(activeClass)) {
				return false;
			}
			else 
				activeTab.classList.remove(activeClass);
				this.classList.add(activeClass);
				activeTab = this;
				return false;
		}
	}
}

function blTestimonialsSlider() {
	var slider = $('.bl-right-testimonials-slider');
	$(slider).slick({
		dots: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true
	})
	var container = $('.bl-right-testimonials-controls');
	var arrowPrev = container.find($('.b-slider-arrow--sm--prev'));
	var arrowNext = container.find($('.b-slider-arrow--sm--next'));
	arrowPrev.click(function() {
		$(slider).slick('slickPrev'); return false;
	})
	arrowNext.click(function() {
		$(slider).slick('slickNext'); return false;
	})
}

function blRightMobButton() {
	var menu = document.getElementsByClassName('bl-right')[0];
	var button = menu.getElementsByClassName('bl-right__mob-button')[0];
	var activeClass = 'bl-right--active';
	button.onclick = function() {
		menu.classList.contains(activeClass) ?
			menu.classList.remove(activeClass) :
				menu.classList.add(activeClass);
		console.log('hui');		
		return false;		
	}
}

// contact

function conMap() {
	var myLatlng = new google.maps.LatLng(-34.397, 150.644);
	var myOptions = {
		zoom: 7,
		scrollwheel: false,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map'), myOptions);
} 

function conAdaptive() {
	var width = window.innerWidth;
	var curMode, initMode;
	if (width >= tabletBreakpoint) {
		initMode = 'd';
	}
	else if (width >= mobileBreakpoint) {
		initMode = 't';
	}
	else {
		initMode = 'm';
	}
	AutoScaling(initMode);
	window.onresize = function() {
		width = window.innerWidth;
		if (width >= tabletBreakpoint) {
			curMode = 'd';
		}
		else if (width >= mobileBreakpoint) {
			curMode = 't';
		}
		else {
			curMode = 'm';
			fixedFooter();
		}
		AutoScaling(curMode);
		if (initMode != curMode) {
			fixedFooter();
			if (curMode == 'd') {
			}
			else if (curMode == 't') {
			}
			else if (curMode == 'm') {
			}

			initMode = curMode;
		}
	}
}

// portfolio--inner 

function pSlider() {
	var worksSlider = $('.b-works-slider');
	worksSlider.slick({
		dots: false,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		speed: 1000,
		responsive: [
			{
				breakpoint: 959,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 749,
				settings: {
					slidesToShow: 1
				}
			}
		]
	})
	$('.b-works__prev').click(function() {worksSlider.slick('slickPrev'); return false;})
	$('.b-works__next').click(function() {worksSlider.slick('slickNext'); return false;})
	var postSlider = $('.b-post-slider');
	postSlider.slick({
		dots: false,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		speed: 1000
	})
	$('.b-post__prev').click(function() {postSlider.slick('slickPrev'); return false;})
	$('.b-post__next').click(function() {postSlider.slick('slickNext'); return false;})
}

// pages 


function prAdaptive() {
	var width = window.innerWidth;
	var curMode, initMode;
	if (width >= tabletBreakpoint) {
		initMode = 'd';
	}
	else if (width >= mobileBreakpoint) {
		initMode = 't';
	}
	else {
		initMode = 'm';
	}
	window.onresize = function() {
		width = window.innerWidth;
		if (width >= tabletBreakpoint) {
			curMode = 'd';
		}
		else if (width >= mobileBreakpoint) {
			curMode = 't';
		}
		else {
			curMode = 'm';
			fixedFooter();
		}
		if (initMode != curMode) {
			fixedFooter();
			if (curMode == 'd') {
			}
			else if (curMode == 't') {
			}
			else if (curMode == 'm') {
			}
			initMode = curMode;
		}
	}
}


	// default 
		topMenu();
		fixedFooter();
		preloaderRemove();


	// main
	if (window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/')) {
		topMenu();
		slider();
		Posts();
		mainAdaptive();
	}

	else if (window.location.pathname.endsWith('/company.html')) {
		// company 
		countUp();
		mainAdaptive();
	}
	
	else if (window.location.pathname.endsWith('/portfolio.html')) {
		// portfolio
		setTimeout(function() {
			pIndicator();
		}, 100);
		pAdaptive();
	}
	else if (window.location.pathname.endsWith('/portfolio--inner.html')) {
		// portfolio--inner
		mainAdaptive();
		blSlider();
		pSlider();
	}
	else if (window.location.pathname.endsWith('/blog.html') || window.location.pathname.endsWith('/post--img.html')
	|| window.location.pathname.endsWith('/post--slider.html') || window.location.pathname.endsWith('/post--video.html')) {
		// blog
		blAdaptive();
		blSlider();
		blRightMenu();
		blTabs();
		blTestimonialsSlider();
		blRightMobButton();
		if (window.location.pathname.endsWith('/blog.html')) {
			blTextOverflow();
		}
	}
	else if (window.location.pathname.endsWith('/contact.html')) {
		// contact
		conAdaptive();
		conMap();
	}
	else if (window.location.pathname.endsWith('/pages.html')) {
		prAdaptive();
	}


