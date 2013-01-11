$(document).ready(
	//handler
	function(){

		//setup nav link highlighting
		$('nav ul li a').hover(function(){
			$(this).parent().toggleClass('navselected');
		});
	}
);
