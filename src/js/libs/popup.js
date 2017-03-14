function popup() {
  var $body           = 'body',
      $bodyClass      = 'body-hidden',
      $popup          = 'popup-box',
      $popupItem      = 'popup',
      $popupClose     = 'popup__close',
      $popupVisible   = 'is-visible',
      $popupContainer = 'popup-box__container',
      $popupBg        = 'popup-box__bg',
      $popupOpen      = 'popup-open';

  function bodyAddClass() {
    $($body).addClass($bodyClass);
  }

  function bodyRemoveClass() {
    $($body).removeClass($bodyClass);
  }

  function bodyRemoveStyle() {
    $($body).removeAttr('style');
  }

  function popupHide() {
    $("." + $popup + "").fadeOut();
  }

  function closePopup() {
    $("." + $popupClose + "").trigger('click');
  }

  function getScrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarSize;
  }

  $("." + $popupItem + "").each(function(){
    var $this = $(this);
    if ($this.hasClass("." + $popupVisible + "")) {
      $this.wrap('<div class="'+ $popup + ' ' + $popupVisible +'"><div class="'+ $popupContainer +'">');
      bodyAddClass();
      $this.removeClass("." + $popupVisible + "");
    } else {
      $this.wrap('<div class="'+ $popup +'"><div class="'+ $popupContainer +'">');
    }
    $this.after('<div class="'+ $popupBg +'">')
    $this.parents("." + $popup + "").attr('id',$this.attr('id'));
    $this.removeAttr('id');
    console.log('init popop');
  });

  $("." + $popupBg + "").on("touchstart click", function(e){
    e.preventDefault();
    popupHide();
    bodyRemoveClass();
    bodyRemoveStyle();
  });

  $(document).keydown(function(e){
    if (e.keyCode == 27){
      popupHide();
      bodyRemoveClass();
      bodyRemoveStyle();
      e.preventDefault();
    }
  });

  $("." + $popupOpen + "").on('click',function(e){
    e.preventDefault();
    if ($("." + $popup + "").length) {
      popupHide();
      $($(this).attr('href')).fadeIn();
      bodyAddClass();
      $($body).css('margin-right', getScrollbarWidth());
    }
  });

  $("." + $popupClose + "").on('click', function(e) {
    e.preventDefault();
    popupHide();
    bodyRemoveClass();
    bodyRemoveStyle();
  });
}