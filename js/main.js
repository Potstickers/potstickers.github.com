$(document).ready( function(){
		//cache main div that will be frequently modified
		var $content_div = $('#content'), 
			$paging_div = $('#paging');
		/*dynamic content loading weeeeeeeeeeeee*/
		if(Modernizr.history){
			//clicking on navigation link
			$('nav ul li').delegate('a','click',function(){
				_link = $(this).attr('href');
				history.pushState(null,null,_link);
				loadContent(_link);
				$('li.navselected').removeClass('navselected');
				$(this).parent().addClass('navselected');
				return false;
			});
			//clicking on paging nav
			if($('#paging').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					history.pushState(null,null,_link);
					loadContent(_link);
					return false;
				});
			}
			//clicking on a post
			if($('.post').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					history.pushState(null,null,_link);
					loadContent(_link);
					return false;
				});
			}
			//back button
			$(window).bind('popstate', function(){
	       		_link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
	 			loadContent(_link);
	 			$('.navselected').removeClass('navselected');
	 			$("li a[href*='" + _link +"']").parent().addClass('navselected');
	    	});
			//load landing page content
			loadContent("page1/");
		}
		function loadContent(href){
			$.get(href,function(data){
				var	new_content = $(data).filter('#content').html(),
					new_paging = $(data).filter('#paging').html(),
					disqus_script = $(data).filter('script').text();
				if($content_div.find('article .fadeIn').length){
					$(this).addClass('fadeOut');
					$('article.fadeOut.post4').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
						console.log('animation ended');
						$content_div.html(new_content);
						$paging_div.html(new_paging);
						$content_div.find('.post').addClass('fadeIn').each(function(i){
							$(this).addClass('post'+(i));
						});
						if(new_paging.length){
							console.log('page does not have pagination')
							$paging_div.addClass('slide_hidden');
							$content_div.addClass('slide_expand');
						}
						if(disqus_script.length){
							console.log('Page is a blog post, Disqus loaded');
							eval(disqus_script);
						}						
				});
				}else{
					$content_div.html(new_content);
					$paging_div.html(new_paging);
					$content_div.find('.post').addClass('fadeIn').each(function(i){
						$(this).addClass('post'+(i));
					});
					if(new_paging.length){
						console.log('page does not have pagination')
						$paging_div.addClass('slide_hidden');
						$content_div.addClass('slide_expand');
					}
					if(disqus_script.length){
						console.log('Page is a blog post, Disqus loaded');
						eval(disqus_script);
					}
				}
			});
		}
	}
);
