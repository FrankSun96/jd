$(function(){

	showhide()
	hoverSubMenu()
	search()
	share()
	address()
	clickTabs()
	clickProductTabs()
	hoverMiniCart()
	moveMiniImg()
	hoverMiniImg()
	bigImg()

	function showhide () {
		$('[name=show_hide]').hover(function () {
			var id = this.id + "_items"
			$('#' + id).show()
		}, function () {
			var id = this.id + "_items"
			$('#' + id).hide()
		})
	}

	function hoverSubMenu () {
		$('#category_items>div').hover(function () {
			$(this).children(':last').show()
		}, function(){
			$(this).children(':last').hide()
		})
	}

	function search () {
		$('#txtSearch')
			.on('keyup focus', function () {
				var txt = this.value.trim()
				if(txt){
					$('#search_helper').show()
				}
			})
			.blur(function () {
				$('#search_helper').hide()
			})
	}

	function share () {
		var isOpen = false
		var $shareMore = $('#shareMore')
		var $parent = $shareMore.parent()
		var $as = $shareMore.prevAll('a:lt(2)')
		var $b = $shareMore.children()
		$('#shareMore').click(function () {
			if(isOpen){
				$parent.css('width', 155)
				$as.hide()
				$b.removeClass('backword')
			} else {
				$parent.css('width', 200)
				$as.show()
				$b.addClass('backword')
			}
			isOpen =! isOpen
		})
	}

	function address () {
		var $select = $('#store_select')
			$select
			.hover(function () {
				$(this).children(':gt(0)').show()
			}, function(){
				$(this).children(':gt(0)').hide()
			})
			.children(':last')
			.click(function () {
				// $(this).children(':gt(0)').hide() is wrong coz this here doesnt point to the corrent node
				$select.children(':gt(0)').hide()
			})
	}

	function clickTabs () {
		$('#store_tabs>li').click(function () {
			$('#store_tabs>li').removeClass('hover')
			this.className = 'hover'
		})
	}

	function hoverMiniCart () {
		$('#minicart').hover(function () {
			this.className = 'minicart'
			$(this).children(':last').show()
		}, function(){
			this.className = ''
			$(this).children(':last').hide()
		})
	}

	function clickProductTabs () {
		var $lis = $('#product_detail>ul>li')
		var $contents = $('#product_detail>div:gt(0)')
		$('#product_detail>ul>li').click(function () {
			$lis.removeClass('current')
			this.className = 'current'
			$contents.hide()
			var index = $(this).index()
			console.log(index)
			$contents.eq(index).show()
			//$contents[index].style.display = 'block'
		})
	}

	function moveMiniImg () {
		var $as = $('#preview>h1>a')
		var $backward = $as.first()
		var $forward = $as.last()
		var SHOW_COUNT = 5
		var $UI = $('#icon_list')
		var imgCount = $UI.children('li').length
		var moveCount = 0 // right positive 
		var liWidth = $UI.children(':first').width()

		if(imgCount>SHOW_COUNT){
			$forward.attr('class', 'forward')
		}

		$forward.click(function () {
			//check if move is needed
			if(moveCount === imgCount - SHOW_COUNT){
				return
			}
			moveCount++
			$backward.attr('class', 'backward')
			if(moveCount === imgCount - SHOW_COUNT){
				$forward.attr('class', 'forward_disabled')
			}
			//move UI
			$UI.css({
				left: -moveCount * liWidth
			})
		})

		$backward.click(function () {
			//check if move is needed
			if(moveCount === 0){
				return
			}
			moveCount--
			$backward.attr('class', 'backward')
			if(moveCount === 0){
				$backward.attr('class', 'backward_disabled')
			}
			//move UI
			$UI.css({
				left: -moveCount * liWidth
			})
		})
	}

	function hoverMiniImg () {
		$('#icon_list>li').hover(function () {
			var $img = $(this).children()
			//this.children()[0].className = 'hoveredThumb'
			$img.addClass('hoveredThumb')
			var src = $img.attr('src').replace('.jpg', '-m.jpg')
			$('#mediumImg').attr('src', src)
		}, function () {
			$(this).children().removeClass('hoveredThumb')
		})
	}

	function bigImg () {
		var $mediumImg = $('#mediumImg')
		var $mask = $('#mask')
		var $maskTop = $('#maskTop')
		var $largeImgContainer = $('#largeImgContainer')
		var $loading = $('#loading')
		var $largeImg = $('#largeImg')
		var maskWidth = $mask.width()
		var maskHeight = $mask.height()
		var maskTopWidth = $maskTop.width()
		var maskTopHeight = $maskTop.height()

		$maskTop.hover(function () {
			$mask.show()

			var src = $mediumImg.attr('src').replace('-m.', '-l.')
			$largeImg.attr('src', src)
			$largeImgContainer.show()
			$largeImg.on('load', function () {

				var largeWidth = $largeImg.width()
				var largeHeight = $largeImg.height()

				$largeImg.show()
				$loading.hide()

				$largeImgContainer.css({
					width: largeWidth / 2,
					height: largeHeight / 2
				})

				$maskTop.mousemove(function (event) {
					/**
						move yellow block
					*/
					var left = 0
					var top = 0
					var eventLeft = event.offsetX
					var eventRight = event.offsetY
					left = eventLeft - maskWidth / 2
					top = eventRight - maskHeight / 2

					if(left < 0) {
						left = 0
					} else if(left > maskTopWidth - maskWidth) {
						left = maskTopWidth - maskWidth
					}
					if(top < 0) {
						top = 0
					} else if(top > maskTopHeight - maskHeight) {
						top = maskTopHeight - maskHeight
					}
					$mask.css({
						left: left,
						top: top
					})

					/**
						move large image
					*/


					left = -left * largeWidth / maskTopWidth
					top = -top * largeHeight / maskTopHeight
					$largeImg.css({
						left: left,
						top: top
					})
				})
			})


		}, function () {
			$mask.hide()
			$largeImgContainer.hide()
		})
	}
})