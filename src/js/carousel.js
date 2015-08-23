"use-strict";
document.addEventListener('DOMContentLoaded', function(){

	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else {
			el.className += ' ' + className;
		}
	}

	function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	var slides = document.querySelectorAll('.slides__item');
	var currentIndex = 0;
	var timer_auto_transition = 5000;
	function transition(targetIndex) {
		// not a fan of this approach, crossfade doesn't seem right either
		removeClass(slides[currentIndex], "fadeIn");
		removeClass(slides[currentIndex], "fadeOut");
		// setTimeout anonymous function references currentIndex var, allocate to a temporary var instead
		// prevents reading the wrong value(currentIndex 1000ms from now has become targetIndex)
		var rememberIndex = currentIndex;
		setTimeout(function(){ removeClass(slides[rememberIndex], "\--active") }, 1000);
		addClass(slides[currentIndex], "animated");
		addClass(slides[currentIndex], "fadeOut");

		removeClass(slides[targetIndex], "fadeOut");
		addClass(slides[targetIndex], "animated");
		addClass(slides[targetIndex], "fadeIn");
		addClass(slides[targetIndex], "\--active");

		currentIndex=targetIndex;
	}

	function transition_prev(event) {
		var targetIndex = (currentIndex==0) ? slides.length-1 : currentIndex-1;
		transition(targetIndex);
	};
	function transition_next(event) {
		var targetIndex = (currentIndex===slides.length-1) ? 0 : currentIndex+1;
		transition(targetIndex);
	};

	var ui_arrow_left = document.querySelectorAll('.carousel__ui-arrow.\--left');
	var ui_arrow_right = document.querySelectorAll('.carousel__ui-arrow.\--right');

	ui_arrow_left[0].addEventListener('click', transition_prev, false);
	ui_arrow_right[0].addEventListener('click', transition_next, false);

	setInterval(function(){ transition_next(null) }, timer_auto_transition); // anonymous function best approach?
});
