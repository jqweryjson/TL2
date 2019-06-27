import 'expose-loader?$!expose-loader?jQuery!jquery';
import Modal from 'modal';

$('[data-modal-video]').click(function() {
  new Modal($('.jsModalVideo')).show($(this));

  return false;
});