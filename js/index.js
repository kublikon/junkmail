(function(){

	// set random color
	var domain = 'http://kublikon.github.io/junkmail/',
		index = 1,
		maxIndex = 5,
		code = '';

	changeColor(true);
	getSample(index);

	$('.controls span').click(function(data){
		$('.controls span').removeClass('on');
		$('#' + data.target.id).addClass('on');

		changeColor();

		index = data.target.id;
		getSample(index);
	});

	$('.up').click(function(){
		if(index > 1){
			index--;

			$('.controls span').removeClass('on');
			$('#' + index).addClass('on');

			changeColor();
			getSample(index);
		}
	});

	$('.down').click(function(){
		if(index < maxIndex){
			index++;

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
			code = data;

			code = code.replace('<', '&lt;');
			code = code.replace('>', '&gt;');
			code = code.replace('</', '&lt;/');

			$('#code').html(code);
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
	};

})();