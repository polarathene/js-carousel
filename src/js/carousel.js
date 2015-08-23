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
	function transition(targetIndex) {
		// these might need checks?
		removeClass(slides[currentIndex], "fadeIn");
		removeClass(slides[currentIndex], "\--active");
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
});
