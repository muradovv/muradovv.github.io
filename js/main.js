$(document).ready(function(){     
    
    /*****************************************
    // Лайтбокс
    *****************************************/

    var lightboxBackground = $('.lightbox-bg'), // Полупрозрачный фон
        lightboxBlock = $('.lightbox-block'), // Лайтбокс
        lightboxContent = $('#lightbox-content'), // Место для контента
        lightboxDuration = 500; // Время анимации

    function lightboxOpen() {
        lightboxBackground.fadeIn();
        lightboxBlock.css('top', '-500px').show().animate({top: ($(window).scrollTop() + 50)}, lightboxDuration);
    }

    function lightboxClose() {
        lightboxBlock.animate({top: '-' + ($(this).height() + 50)}, lightboxDuration, 'linear', function() {
            $(this).hide();
        });
        lightboxBackground.fadeOut();
//        lightboxContent.html('');
    }

    lightboxBackground.click( function() {
        lightboxClose();
    });
    
    $('a.lightbox-close').click( function() {
        lightboxClose();
        
        return false;
    });

    $('a.btn-appointments').click( function() {
        lightboxOpen();
        
        return false;
    });    
    
    /*****************************************
    // Форма обратной связи: выбор даты, маски на поля
    *****************************************/
    
    $('#inputDate').attr('readonly', 'readonly').datepicker({
		dateFormat : 'd.mm.yy',
		monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
    });
    
    $("input[name=phone]").inputmask("+9(999) 999-99-99");
    
    /*****************************************
    // Отправка письма из формы обратной связи
    *****************************************/
    
    var obForm = $('form[name=feedback]');
    
    obForm.find('input[type=submit]').click( function() {
    	var txtError = '',
    		sendData = {};
    	
    	sendData['date'] = obForm.find('input[name=date]').val();
    	if (sendData['date'] == '') {
			txtError += "\n не выбрана дата";
    	}
    	
    	sendData['time'] = obForm.find('input[name=time]').val();
    	if (sendData['time'] == '' && false) {
			txtError += "\n не выбрано время";
    	}
    	
    	sendData['fio'] = obForm.find('input[name=fio]').val();
    	if (sendData['fio'] == '') {
			txtError += "\n укажите пожалуйста как к Вам обращаться";
    	}
    	
    	sendData['email'] = obForm.find('input[name=email]').val();
    	sendData['phone'] = obForm.find('input[name=phone]').val();
    	if (sendData['email'] == '' && sendData['phone'] == '') {
			txtError += "\n укажите пожалуйста Ваш адрес электронной почты или номер контактного телефона";
    	}
    	if (sendData['email'] != '') {
			var pattern = /^([\w-~_]+\.)*[\w-~_]+@([\w-_]+\.){1,3}\w{2,3}$/;
            if (!pattern.test(sendData['email'])){
            	txtError += "\n адрес Вашей электронной почты кажется нам подозрительным"
            }
    	}
    	
    	if (txtError != '') {
			alert(txtError);
    	}
		else {
			$.post(
	            "mail.php",
	            sendData,
	            function (data) {
	                lightboxContent.html(data);
	            }
	        );
		}
		
		return false;
    });
});