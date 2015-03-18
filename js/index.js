(function(){

	// set random color
	var domain = 'http://kublikon.github.io/junkmail/',
		index = 1,
		maxIndex = 5,
		code = '',
		format = false;

	changeColor(true);
	getSample(index);

	$('.controls span').click(function(data){
		$('.controls span').removeClass('on');
		$('#' + data.target.id).addClass('on');

		if(data.target.id > index){
			$('.b-move').addClass('bottom');
		} else {
			$('.b-move').addClass('top');
		}

		changeColor();

		index = data.target.id;
		getSample(index);
	});

	$('.up').click(function(){
		if(index > 1){
			index--;

			$('.b-move').addClass('top');

			$('.controls span').removeClass('on');
			$('#' + index).addClass('on');

			changeColor();
			getSample(index);
		}
	});

	$('.down').click(function(){
		if(index < maxIndex){
			index++;

			$('.b-move').addClass('bottom');

			$('.controls span').removeClass('on');
			$('#' + index).addClass('on');

			changeColor();
			getSample(index);
		}

	});	


	$('#source').click(function(){
		$('#modal').show();
		$('.modal-back').show();

		$.get(domain + 'templates/simple-' + index + '.html', function(data){
			

			$('#code').html(formatCode(data));
		});
		
	});

	$('.modal-back').click(function(){
		$('#modal').hide();
		$('.modal-back').hide();
		$('#code').html('<i class="fa-spinner fa-spin"></i>');
	});

	function getSample(number){
		$.get(domain + 'assets/sample-' + number + '.html', function(data){
			$('#template').html(data);

			setTimeout(function(){
				$('.b-move').removeClass('top');
				$('.b-move').removeClass('bottom');
			},300);
		});
	};

	function changeColor(static){
		var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

		if(static){
			$('.b-color').css({backgroundColor: randomColor});
			$('.f-color').css({color: randomColor});
		} else {
			$('.b-color').animate({backgroundColor: randomColor}, 'slow');
			$('.f-color').animate({color: randomColor}, 'slow');
		}

		$('body').css({ '::selection': randomColor });
		$('body').css({ '::-moz-selection': randomColor });
	};

	function formatCode(data){
		var tags = '',
			indentCount = -1;

		data = data.split('<');
		data.shift();

		for (var t = 0; t < data.length; t++) {
			data[t] = '<' + data[t];
		};

		for (var t = 0; t < data.length; t++) {
			if(data[t] != ''){
				var indents = '',
					br = '';

				if((t + 1) < data.length){
					if(format){

						console.log(data[t].indexOf('<'), '<', data[t]);
						console.log(data[t].indexOf('</'), '</');
						console.log(data[t+1].indexOf('</'), '+</');
						if(t-1 >= 0){
							console.log(data[t-1].indexOf('</'), '-</');
						}
						console.log('---------------');

						if(data[t].indexOf('</') == -1 && data[t+1].indexOf('</') == -1){
							br = '<br>';
							indentCount++;
							console.log('> br');
						} else if (data[t].indexOf('</') == -1 && data[t+1].indexOf('</') != -1){
							indentCount++;
							console.log('>');
						} else if(data[t].indexOf('</') != -1 && data[t-1].indexOf('</') != -1) {
							console.log('!');
						}
						// } else if (data[t].indexOf('</') != -1 && data[t-1].indexOf('/') == -1){
						// 	// br = '<br>';
						// 	indentCount--;
						// }



						// if(data[t].indexOf('</') != -1){
						// 	br = '<br>';
						// 	indentCount--;						
						// } else if(data[t+1].indexOf('/') != -1){
						// 	indentCount++;
						// } else if (data[t-1].indexOf('/') == -1){

						// } else if (data[t].indexOf('>') != -1) {
						// 	br = '<br>';
						// 	indentCount++;
						// }
					}
				}

				for (var i = 0; i < indentCount; i++) {
					indents += '&nbsp;&nbsp;';
				};

				data[t] = data[t].replace('<', '&lt;');
				data[t] = data[t].replace('>', '&gt;');
				data[t] = indents + data[t];
				
				tags += data[t] + br;
			}
		};

		return tags;
	};

})();