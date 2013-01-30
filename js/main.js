$(document).ready( function(){
		var $main_div = $('#main');
			$content_div = $('#content'), 
			$paging_div = $('#paging');
		var chrome_popped = false;

		if(Modernizr.history){
			//clicking on navigation link
			$('nav ul li').delegate('a','click',function(){
				_link = $(this).attr('href');
				$('li.navselected').removeClass('navselected');
				$(this).parent().addClass('navselected');
				pushRelStateAndLoad();
				return false;
			});
			//clicking on paging nav
			if($('#paging').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					pushRelStateAndLoad();
					return false;
				});
			}
			//clicking on a post
			if($('.post').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					pushRelStateAndLoad();
					return false;
				});
			}
			//back button
			$(window).bind('popstate', function(){
				if(chrome_popped){
					_link = location.pathname;
					var cur_nav;
					if(_link.length==0){
						_link = "/blog";
						cur_nav = _link;
					}else{
		       			cur_nav = _link.split('/')[1];
		       		}
		 			loadContent(_link);
	       			$('nav ul li').removeClass('navselected').find('a[href$="'+ cur_nav +'"]').parent().addClass('navselected');
	 			}
	    	});
			//load landing page content
			$('nav li:eq(1)').addClass('navselected');
			loadContent("/blog");
			var remainder_height = $(window).height() - $paging_div.outerHeight();
			$content_div.animate({
				height: '+='+remainder_height
			}, 'fast', function(){
				$paging_div.animate({
					width: '+='+$content_div.width()
				}, 'fast');
			});
		}
		function pushRelStateAndLoad(){
			chrome_popped = true;
			history.pushState(null, null, _link);
			//_link = base_link + _link;
			loadContent(_link);
		}
		function loadContent(href){
			$.get(href,function(data){
				var	new_content = $(data).filter('#content').html(),
					new_paging = $(data).filter('#paging').html();

				var $old_posts = $('article.fadeIn');
				if($old_posts.length){
					var last_to_fade = '.post'+ ($old_posts.length-1);
					$old_posts.addClass('fadeOut');
					$old_posts.filter(last_to_fade).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
						postLoadContent();				
					});
				}else{
					postLoadContent();
				}
				function postLoadContent(){
					$content_div.html(new_content);
					$paging_div.html(new_paging);
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
		$(window).resize(function(){
			$content_div.height($(window).height()-$paging_div.outerHeight());
		});
	}
);
