(function(){

	$('.controls span').click(function(){
		var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

		$('.b-color').animate({backgroundColor: randomColor}, 'slow', function(){
			$(this).addClass('on');
		});
		$('.f-color').animate({color: randomColor}, 'slow');
	});

	$('#source').click(function(){
		$('#modal').show();
	});

	$('#modal').click(function(){
		$('#modal').hide();
	});

})();