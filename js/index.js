(function(){

	// set random color
	var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16),
		domain = 'http://kublikon.github.io/junkmail/';
		code = '';

	$('.b-color').css({backgroundColor: randomColor});
	$('.f-color').css({color: randomColor});


	$('.controls span').click(function(){
		var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

		$('.b-color').animate({backgroundColor: randomColor}, 'slow', function(){
			$(this).addClass('on');
		});
		$('.f-color').animate({color: randomColor}, 'slow');
	});

	$('#source').click(function(){
		$('#modal').show();

		$.get(domain + 'templates/simple-1.html', function(data){
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


})();