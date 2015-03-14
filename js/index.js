(function(){

	// set random color
	var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16),
		domain = 'http://kublikon.github.io/junkmail/',
		index = 1,
		code = '';

	$('.b-color').css({backgroundColor: randomColor});
	$('.f-color').css({color: randomColor});

	getSample(index);


	$('.controls span').click(function(data){
		var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

		$('.b-color').animate({backgroundColor: randomColor}, 'slow', function(){
			$('.controls span').removeClass('on');
			$('#' + data.target.id).addClass('on');
		});
		$('.f-color').animate({color: randomColor}, 'slow');
	});

	$('#source').click(function(){
		$('#modal').show();

		$.get(domain + 'templates/simple-' + index + '.html', function(data){
			code = data;

			code = code.replace('<', '&lt;');
			code = code.replace('>', '&gt;');
			code = code.replace('</', '&lt;/');

			$('#code').html(code);
		});
		
	});

	$('#modal').click(function(){
		$('#modal').hide();
		$('#code').html('<i class="fa-spinner fa-spin"></i>');
	});

	function getSample(number){
		$.get(domain + 'assets/sample-' + number + '.html', function(data){
			$('#template').html(data);
		});
	};

})();