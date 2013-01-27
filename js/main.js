$(document).ready( function(){
		var $content_div = $('#content'), 
			$paging_div = $('#paging');
		var base_link = "http://potstickers.github.com/blog_posts/";
		var cur_nav = "blog_posts", last_nav = "";
		var chrome_popped = false;

		if(Modernizr.history){
			//clicking on navigation link
			$('nav ul li').delegate('a','click',function(){
				_link = $(this).attr('href');
				last_nav = cur_nav;
				if(_link.indexOf('about.html', _link.length - 10) > -1){
					cur_nav = 'about';
				}else{
					cur_nav = 'blog_posts';
				}//else nontech stuff when it comes around
				if(cur_nav != last_nav){
					pushRelStateAndLoad();
					$('li.navselected').removeClass('navselected');
					$(this).parent().addClass('navselected');
				}else{
					_link = base_link + _link;
					loadContent(_link);
				}
				return false;
			});
			//clicking on paging nav
			if($('#paging').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					cur_nav = 'blog_posts';
					pushRelStateAndLoad();
					return false;
				});
			}
			//clicking on a post
			if($('.post').length){
				$(this).delegate('a', 'click', function(){
					_link = $(this).attr('href');
					cur_nav = 'blog_posts';
					pushRelStateAndLoad();
					return false;
				});
			}
			//back button
			$(window).bind('popstate', function(){
				if(chrome_popped){
		       		_link = location.pathname.replace(/^.*[\\\/]/, '');
		       		console.log("Pop event fired: '"+ _link+"'");
	       			var $nav_selected = $('li.navselected').removeClass('navselected').siblings();
	       			var splitted = _link.split(/\/\./);
	       			last_nav = splitted[0];
	       			if(_link == "about.html"){
	       				_link = "http://potstickers.github.com/"+_link;
	       				$nav_selected.find("a[href*='about']").parent().addclass('navselected');
	       			}else{
	       				_link = base_link + _link;
	       				$nav_selected.find("a[href='']").parent().addclass('navselected');
	       			}
		 			loadContent(_link);
	 			}
	    	});
			//load landing page content
			$('nav li:eq(1)').addClass('navselected');
			loadContent(base_link);
		}
		function pushRelStateAndLoad(){
			chrome_popped = true;
			if(_link == "about.html") {
				history.replaceState(null, null, _link);
			}else{
				history.pushState(null, null, _link);
				_link = base_link + _link;
			}
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
	}
);
