/******************************************
 *  Author : Fernando Herrero
 *  Created On : Tue May 07 2024
 *  File : scripts.js
 *******************************************/
$(function() {
    $('.form-group.dropzone').parent('form').on('reset', function(event) {
        $(this).find('.form-group.dropzone .input-group .file').remove();
    });

    $('.form-group.dropzone input[type=file]').on({
        'change': function(event) {
            var files = $(this)[0].files;

            $(this).parent().find('.file').remove();

            var $this = $(this);
            $.each(files, function(index, file) {
                var div = $('<div>').html(file.name);
                div.addClass('file');
                $this.parent().find('.input-group').prepend(div);
            });
        }
    });

    $('.form-group.dropzone .input-group').on({
        'click': function(event) {
            event.preventDefault();
            $(this).parent().find('input[type="file"]').click();
        },
        'dragover': function(event) {
            $(this).addClass('dragover');
            event.preventDefault();
        },
        'dragleave dragend': function(event) {
            $(this).removeClass('dragover');
            event.preventDefault();
        },
        'drop': function(event) {
            $(this).removeClass('dragover');
            event.preventDefault();

            var files =  event.originalEvent.dataTransfer.files;
            if (undefined == $(this).parent().find('input[type="file"]').attr('multiple')) {
                var dt = new DataTransfer();
                dt.items.add(files[0]);
                files = dt.files;
            }

            $(this).find('.file').remove();

            var $this = $(this);
            $.each(files, function(index, file) {
                var div = $('<div>').html(file.name);
                div.addClass('file');
                $this.prepend(div);
            });

            $(this).parent().find('input[type="file"]')[0].files = files;
        }
    });

    $('.form-group.file').on({
        'dragover': function(event) {
            $(this).addClass('dragover');
            event.preventDefault();
        },
        'dragleave dragend': function(event) {
            $(this).removeClass('dragover');
            event.preventDefault();
        },
        'drop': function(event) {
            $(this).removeClass('dragover');
            event.preventDefault();

            var files =  event.originalEvent.dataTransfer.files;
            if (undefined == $(this).find('input[type="file"]').attr('multiple')) {
                var dt = new DataTransfer();
                dt.items.add(files[0]);
                files = dt.files;
            }

            var text = '';
            $.each(files, function(index, file) {
                if (text !== '') {
                    text += ', ';
                }
                text += file.name;
            });

            $(this).find('input[type="text"]').val(text);
            $(this).find('input[type="file"]')[0].files = files;
        }
    });
});
