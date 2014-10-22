;(function() {

	// preload
	$.get('static/images/giraffe.png');
	$.get('static/images/giraffe-b.png');
	$.get('static/images/fruit-1.png');
	$.get('static/images/fruit-2.png');
	$.get('static/images/fruit-3.png');
	$.get('static/images/fruit-1.png');
	$.get('static/images/vine.png');

	var giraffe = document.getElementById('giraffe');
	var parent = document.getElementById('fruits');
	var amount = 11;
	var score = 0;
	var threshold = 40;
	var harvested = false;
	var fruits = [];

	var audio = document.getElementById('pop');
	audio.volume = 0.2;

	function getRandomInt(min, max) {
 			return Math.floor(Math.random() * (max - min)) + min;
	}
	
	var pop = function() {

		// TODO create particles

		// increment the combo value
		score++;

		var classes = this.classList;
		var parent = document.getElementById('fruits');

		// set the scoreboard text
		var scoreboard = document.getElementById('score');
		var previous = scoreboard.innerHTML;
		if (isNaN(parseInt(scoreboard.innerHTML))) {
			scoreboard.innerHTML = score;
		} else {
			scoreboard.innerHTML = parseInt(scoreboard.innerHTML) + score;
		}

		// get the indentifier and add a 'popped' class to its vine
		for (var i = 0; i < classes.length; i++) {

			if (classes[i].indexOf('fruit-') == 0) {

				var children = document.getElementsByClassName(classes[i]);
				for (var j = 0; j < children.length; j++) {
					(function(n) {

						var child = children[n];
						child.classList.add('popped');
						window.setTimeout(function() {
							parent.removeChild(child);
						}, 600);
						
					})(j);
				};

			};


		};

		// create the score popup element
		var point = document.createElement('span');
		point.innerHTML = '+ ' + score;
		point.classList.add('point');
		point.style.left = this.style.left;
		point.style.top = this.style.top;

		// sequence the easing target changes
		window.setTimeout(function(){
			point.classList.add('visible');
		}, 20);
		window.setTimeout(function(){
			point.style.marginTop = '-10px';
		}, 50);
		window.setTimeout(function(){
			point.classList.remove('visible');
		}, 550);
		window.setTimeout(function(){
			parent.removeChild(point);
		}, 750);

		// add the point element to the dom
		parent.appendChild(point);

		// spawn a new fruit
		spawnFruit(fruits, 1);

		// play the pop sound effect (100ms delayed)
		window.setTimeout(function() { audio.play() }, 100);

	};
	var seed = Math.ceil(Math.random() * 1000);
	function random() {
	    var x = Math.sin(seed++) * 100;
	    return x - Math.floor(x);
	}

	// TODO finish this func
	var findSpawn = function(pool) {
		
		var x = 3 + 30 * random();
		if (random() > 0.5) {
			x  = 66 + 30 * random();
		};
		var y = 20 + 75 * random();

		return {'x': x, 'y': y}

	};

	var addFruit = function(x, y, i) {

		var prefix = 'static/images/';
		var variant = 'fruit-' + getRandomInt(1, 4);

		var vine = document.createElement('img');
		var fruit = document.createElement('img');

		var identifier = 'fruit-' + x + '-' + y;

		// set the x value immidiately
		fruit.style.left = x + '%';
		vine.style.left = x + '%';

		// stagger the top animation
		window.setTimeout(function() {
			$(fruit).animate({top: y + '%'}, 1500, 'easeOutElastic');
			$(vine).animate({top: y + '%'}, 1500, 'easeOutElastic');
		}, i * 75);

		fruit.src = prefix + variant + '.png';
		vine.src = prefix + 'vine.png';

		// add the click handler
		fruit.onclick = pop;

		// add classes
		vine.classList.add('vine', identifier)
		fruit.classList.add('fruit', identifier)

		// add the node to the dom!
		parent.appendChild(vine);
		parent.appendChild(fruit);
	};

	var spawnFruit = function(pool, i) {
		var position = findSpawn(pool);
		if (position) {
			addFruit(position.x, position.y, i);
		};
	};

	var load = function(n) {
		for (var i = 1; i < n; i++) {
			spawnFruit(fruits, i)
		};
	}

	var blink = function() {
		giraffe.src = 'static/images/giraffe-b.png';
		window.setTimeout(function() {
			giraffe.src = 'static/images/giraffe.png';
		}, 160);
	};

	(function loop() {
		var timer = Math.round(Math.random() * (3000 - 500)) + 8000;
		window.setTimeout(function() {
			blink();
			loop();
		}, timer);
	})();

	// spawn fruits
	window.setTimeout(function() { load(amount) }, 600);

	// show giraffe
	window.setTimeout(function() {
		giraffe.classList.remove('hidden');
	}, 1200);

	// init magnific gallery
	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'loading',
		mainClass: 'mfp-img',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'Oops, <a href="%url%">image %curr%</a> isn\'t loading...',
		},
	});

	$('a[href="#soon"]').magnificPopup({
		type: 'inline',
		preloader: false,
		closeBtnInside: false,
	});

})();