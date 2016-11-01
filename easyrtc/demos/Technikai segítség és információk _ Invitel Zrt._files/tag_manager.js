var dataLayer = new Array();
$(document).ready(function(){
	$('a').click(function(){
		var href = $(this).attr('href');
		if(href != ''){
			
			var lctn = location.href.split('lakossagi');
			
			if(lctn[1] != undefined)
				lctn = lctn[1];
			else
				lctn = '/';

			if((new RegExp("(\.jpg)|(\.jpeg)|(\.png)|(\.gif)|(\.png)")).test(href))
				dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Images', 'dl_label': lctn +' - '+ href});
			else if((new RegExp("(\.pdf)")).test(href))
				dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Pdfs', 'dl_label': lctn +' - '+ href});
			else if((new RegExp("(\.doc)|(\.xls)|(\.ppt)|(\.docx)|(\.xlsx)|(\.pptx)")).test(href))
				dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Documents', 'dl_label': lctn +' - '+ href});
			else if((new RegExp("\#")).test(href)){
				if($(this).data('toggle') == 'collapse')
					dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Anchors', 'dl_label': lctn +' - '+ $(this).data('title') + (($(this).attr('aria-expanded') == 'false')? ' (open)' : ' (close)')});
				else
					dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Anchors', 'dl_label': lctn +' - '+ href});
			}
			else
				if(!((new RegExp("javascript")).test(href)))
					dataLayer.push({'event': 'activation', 'dl_category':'Links', 'dl_action':'Others', 'dl_label': lctn +' - '+ $(this).text().trim()});	
		}
	});

/* Formok */
	$('form').on('focus', 'input', function(){
		dataLayer.push({
					'event':'activation',
					'dl_category': uri_array[uri_array.length - 1],
					'dl_action': 'Focus',
					'dl_label': $(this).attr('name').trim(),
					});
	});	

	$('form').on('change', 'select', function(){
		dataLayer.push({
					'event':'activation',
					'dl_category': uri_array[uri_array.length - 1],
					'dl_action': 'Focus',
					'dl_label': $(this).attr('name').trim(),
					});
	});

/*HOME*/
	$('#home .carousel a').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'home',
					'dl_action': 'box',
					'dl_label': $(this).data('title').trim(),
					});
	});

/*MENUS*/

	$('#top-menu a').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'top',
					'dl_label': $(this).text().trim(),
					});
	});


	$('#main-menu a').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'main',
					'dl_label': $(this).text().trim(),
					});
	});

	$('#mainMenu a').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'main',
					'dl_label': $(this).text().trim(),
					});
	});

	$('#main-menu .search-button').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'main',
					'dl_label': 'Keresés',
					});
	});

	$('#main-menu .support-button').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'main',
					'dl_label': 'Ügyfélszolgálat belépés',
					});
	});

	$('#footer-top a, #copyright a').click(function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'menu',
					'dl_action': 'footer',
					'dl_label': $(this).text().trim(),
					});
	});



/* FORMS, CHECKOUT */

	$('#save-offer-button').on('click', function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'s2aadatmentes',
					'dl_action': current_page
					});
	});	

	$('#back-link').on('click', function(){
		dataLayer.push({
					'event':'activation',
					'dl_category':'s2aadatmentes',
					'dl_action': $(this).text().trim()
					});
	});	
	
});