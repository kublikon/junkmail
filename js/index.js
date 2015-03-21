(function(){

	// set random color
	var domain = 'http://kublikon.github.io/junkmail/',
		index = 1,
		maxIndex = 5,
		code = '',
		format = true,
		color = '';

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
			$('.name').css({color: color});
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

		color = randomColor;

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
		$('ol').html('');

		for (var t = 0; t < data.length; t++) {
			data[t] = '<' + data[t];
		};

		for (var t = 0; t < data.length; t++) {
			if(data[t] != ''){
				var indents = '',
					br = '';

				data[t] = data[t].replace('<', '&lt;');
				data[t] = data[t].replace('>', '&gt;');

				if(format){

					if(data[t].indexOf('&lt;!') != -1){
						data[t] = '<span class="comment">' + data[t] + '</span>';
					} else {
						data[t] = data[t].replace('&lt;html', '<span class="name">&lt;html</span>');
						data[t] = data[t].replace('&lt;meta', '<span class="name">&lt;meta</span>');
						data[t] = data[t].replace('&lt;head', '<span class="name">&lt;head</span>');
						data[t] = data[t].replace('&lt;body', '<span class="name">&lt;body</span>');
						data[t] = data[t].replace('&lt;table', '<span class="name">&lt;table</span>');
						data[t] = data[t].replace('&lt;tr', '<span class="name">&lt;tr</span>');
						data[t] = data[t].replace('&lt;td', '<span class="name">&lt;td</span>');
						data[t] = data[t].replace('&lt;p', '<span class="name">&lt;p</span>');
						data[t] = data[t].replace('&lt;a', '<span class="name">&lt;a</span>');
						data[t] = data[t].replace('&lt;img', '<span class="name">&lt;img</span>');
						data[t] = data[t].replace('&lt;h1', '<span class="name">&lt;h1</span>');

						data[t] = data[t].replace('&lt;/html', '<span class="name">&lt;/html</span>');
						data[t] = data[t].replace('&lt;/meta', '<span class="name">&lt;/meta</span>');
						data[t] = data[t].replace('&lt;/head', '<span class="name">&lt;/head</span>');
						data[t] = data[t].replace('&lt;/body', '<span class="name">&lt;/body</span>');
						data[t] = data[t].replace('&lt;/table', '<span class="name">&lt;/table</span>');
						data[t] = data[t].replace('&lt;/tr', '<span class="name">&lt;/tr</span>');
						data[t] = data[t].replace('&lt;/td', '<span class="name">&lt;/td</span>');
						data[t] = data[t].replace('&lt;/p', '<span class="name">&lt;/p</span>');
						data[t] = data[t].replace('&lt;/a', '<span class="name">&lt;/a</span>');
						data[t] = data[t].replace('&lt;/h1', '<span class="name">&lt;/h1</span>');

						data[t] = data[t].replace('/&gt;', '<span class="name">/&gt;</span>');
						data[t] = data[t].replace('&gt;', '<span class="name">&gt;</span>');

						data[t] = data[t].replace('{{', '<span class="imp">{{</span>');
						data[t] = data[t].replace('}}', '<span class="imp">}}</span>');
					}

					// if(data[t].indexOf('<') != -1 && data[t+1].indexOf('</') != -1){
						$('ol').append('<li></li>');
					// }
					
				}
				
				tags += data[t];
			}
		};

		return tags;
	};

})();