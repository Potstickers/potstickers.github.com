$(document).ready(
	//handler
	function(){
		//cache main div that will be frequently modified
		var $content_div = $('#content'), $paging_div = $('#paging');
		/*dynamic content loading weeeeeeeeeeeee*/
		if(Modernizr.history){
			//load landing page content
			loadContent($('.navselected a').attr('href'));
			//clicking on navigation link
			$('nav ul li').delegate('a','click',function(){
				_link = $(this).attr('href');
				history.pushState(null,null,_link);
				loadContent(_link);
				$('.navselected').removeClass('navselected');
				$(this).parent().addClass('navselected');
				return false;
			});
			//clicking on paging nav
			if($('#paging').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					alert(_link);
					history.pushState(null,null,_link);
					loadContent(_link);
					return false;
				});
			}
			//clicking on a post
			if($('.post').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					alert(_link);
					history.pushState(null,null,_link);
					loadContent(_link);
					return false;
				});
			}
			//paging a
			function loadContent(href){
				$.get(href,function(data){
					var $response = $(data),
						 new_content = $response.filter('#content').html(),
						 new_paging = $response.filter('#paging').html();
					$content_div.html(new_content);
					$paging_div.html(new_paging);
					$content_div.find('.post').addClass('fadeIn').each(function(i){
						$(this).addClass('post'+(i));
					});
				});
			}
			//back button
			$(window).bind('popstate', function(){
	       		_link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
	 			//load content
	    	});
		}else{
			alert('Dinosaur-aged users... Y U NO UPDATE BROWSER?!'); 
		}
	}
);
