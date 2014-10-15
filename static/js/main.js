;(function() {
		var parent = document.getElementById('fruits');
		var amount = 11;
		var score = 0;
		var threshold = 40;
		var fruits = [];

		function getRandomInt(min, max) {
  			return Math.floor(Math.random() * (max - min)) + min;
		}
		
		var pop = function() {

			// TODO create particles here
			// TODO play sound

			// get the class list of the element that was clicked
			score++;

			var scoreboard = document.getElementById('score');
			var previous = scoreboard.innerHTML;
			if (isNaN(parseInt(scoreboard.innerHTML))) {
				scoreboard.innerHTML = score;
			} else {
				scoreboard.innerHTML = parseInt(scoreboard.innerHTML) + score;
			}
			var classes = this.classList;
			var parent = document.getElementById('fruits');

			// get the unique class name (I could use a data attribute for this)
			for (var i = 0; i < classes.length; i++) {
				if (classes[i].indexOf('fruit-') == 0) {
					var children = document.getElementsByClassName(classes[i]);
					for (var j = 0; j < children.length; j++) {
						(function(n) {
							var child = children[n];

							var classes = child.classList;
							for (var k = 0; k < classes.length; k++) {
								if (classes[k].indexOf('vine') == 0) {
									child.style.top = '0%';	
								};
							};

							// create a timeout to destroy the element
							window.setTimeout(function() {
								parent.removeChild(child);
							}, 600);
							
						})(j);
					};
					classes.add('popped');
				};
			};


			var point = document.createElement('span');
			point.innerHTML = '+ ' + score;
			point.classList.add('point');
			point.style.left = this.style.left;
			point.style.top = this.style.top;

			window.setTimeout(function(){
				point.style.transform = 'scale(1, 1)';
			}, 20);

			window.setTimeout(function(){
				point.style.marginTop = '-10px';
			}, 50);

			window.setTimeout(function(){
				point.style.transform = 'scale(0, 0)';
			}, 550);

			window.setTimeout(function(){
				parent.removeChild(point);
			}, 750);

			parent.appendChild(point);

			spawnFruit(fruits, 1);

			var audio = document.getElementById('pop');
			window.setTimeout(function() { audio.play() }, 100);

		};

		var seed = Math.ceil(Math.random() * 1000);
		function random() {
		    var x = Math.sin(seed++) * 100;
		    return x - Math.floor(x);
		}

		// TODO finish this func
		var findSpawn = function(pool) {

			
			var x = 33 * random();
			if (random() > 0.5) {
				x  = 66 + 33 * random();
			};

			var y = 20 + 75 * random();

			return {'x': x, 'y': y}

			var spawned = false;
			var attempts = 20;
			while (!(spawned)) {

				var valid = true;
				var x = 33 * random();
				if (random() > 0.5) {
					x  = x + 33 + 33 * random();
				};


				var y = 15 + 70 * random();

				// check existing spawns for proximity
				for (var j = 0; j < pool.length; j++) {

					var sx = pool[j].style.left;
					var sy = pool[j].style.top;
					var ex = sx.substring(0, sx.length - 1);
					var ey = sy.substring(0, sy.length - 1);

					// if the bid position is closer than threshold, invalidate it
					var distance = Math.pow(ex - x, 2) + Math.pow(ey - y, 2);
					if (distance <= Math.pow(threshold, 2)) {
						//valid = false;
					};

					if ((Math.abs(ex - x) < 5) || (Math.abs(ey - y) < 5)) {
						//valid = false;
					};

					// TODO check distance to others
				};

				if (valid) {
					spawned = true;
					console.log('found a spot ' + x + ', ' + y);
					return {'x': x, 'y': y}
				} else {
					attempts--;
				}

				if (attempts <= 0) {
					spawned = false;
					return
					console.log('failed to find a spawn location')
				}

			};
		};

		var addFruit = function(x, y, i) {

			// TODO pick from several fruit options	
			var prefix = 'static/images/';
			var variant = 'fruit-' + getRandomInt(1, 4);

			// TODO skip center
			// TODO spread a little from other fruits
			// maybe the index to set the z-index?

			// TODO create a vine and position it the same way
			var vine = document.createElement('img');

			// create the img node
			var fruit = document.createElement('img');



			var identifier = 'fruit-' + x + '-' + y;
			// position the node
			//fruit.style.top = y + '%';
			fruit.style.left = x + '%';
			vine.style.left = x + '%';

			window.setTimeout(function() {
				fruit.style.top = y + '%';
				vine.style.top = y + '%';
			}, i * 75);

			//vine.style.top = y + '%';

			//vine.style.height = y + '%';
			//vine.style.width = '5px';

			// attach the selected src
			fruit.src = prefix + variant + '.png';
			vine.src = prefix + 'vine.png';

			// add the click handler
			fruit.onclick = pop;

			// add the node to the dom!
			vine.classList.add('vine', identifier)
			fruit.classList.add('fruit', identifier)


			parent.appendChild(vine);
			parent.appendChild(fruit);
			//fruits.push(fruit);
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

		window.setTimeout(function() { load(amount) }, 300);
		window.setTimeout(function() { document.getElementById('giraffe').classList.remove('hidden') }, 400);


	$('#gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'oops, image #%curr% isn\'t loading...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});





	})();