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
			$('nav li:nth-of-type(2)').addClass('navselected');
			loadContent("page1/");
		}
		function loadContent(href){
			$.get(href,function(data){
				var	new_content = $(data).filter('#content').html(),
					new_paging = $(data).filter('#paging').html();

				var $old_posts = $('article.fadeIn');
				if($old_posts.length){
					$old_posts.addClass('fadeOut');
					$old_posts.filter('.post4').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
						postLoadContent();				
					});
				}else{
					postLoadContent();
				}
				function postLoadContent(){
					$content_div.html(new_content);
					$paging_div.html(new_paging);
					console.log($content_div.html());
					var $posts = $('article.post');
					if($posts.length){
						$posts.addClass('fadeIn').each(function(i){
							$(this).addClass('post'+(i));
						});
						//plus paging contents
					}else{
						var $post_title = $('#post-title');
						if($post_title.length){
							$post_title.addClass('slideInFromTop').siblings().addClass('fadeIn');
							eval($(data).filter('script').text());
						}
					}				
				}
			});
		}
	}
);
