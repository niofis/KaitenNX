describe('KaitenNX UI lib Global', function() {
  it('contains spec with an expectation', function() {
    expect(true).toBe(true);
  });

  it('should define KaitenNX global interface', function () {
    expect(window.KaitenNX).toBeDefined();
  });

  describe('Interface', function () {
    
    it('should create a new frame on push', function () {
      window.KaitenNX.push();
      expect($('.kaitennx-container').children().length).toBe(1);
    });

  describe('Frame', function () {
      it('should have a title', function () {
        var frame = $('.kaitennx-container > .frame > .title');
        expect(frame.length).toBe(1);
      });

      it('should have a close link', function () {
        var close = $('.kaitennx-container > .frame > .title  > .close');
        expect(close.length).toBe(1);
      });

      it('should remove the frame after click on close', function () {
        var close = $('.kaitennx-container > .frame > .title  > .close')[0];
        close.click();
        close = $('.kaitennx-container > .frame > .title  > .close');
        expect(close.length).toBe(0);
      })
    });

    var frame = null;
    it('should have a close function', function () {
      
    });
  });
});

