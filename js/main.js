$(document).ready(
	//handler
	function(){
		//cache main div that will be frequently modified
		var content_div = $('#content');
		//setup nav link highlighting
		$('nav ul li a').hover(function(){
			$(this).parent().toggleClass('navselected');
		});
		//ajax stuff
		$('.post a').click(function(){
			
		});
	}
);
