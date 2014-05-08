describe('KaitenNX UI Lib', function() {

  it('should define KaitenNX global interface', function () {
    expect(window.KaitenNX).toBeDefined();
  });

  describe('Interface', function () {

    beforeEach(function () {
      this.frame = window.KaitenNX.push();
    });

    afterEach(function () {
      var container  = document.getElementsByClassName('knx-container')[0]
      if(container.contains(this.frame.element)) {
        container.removeChild(this.frame.element);
      }
      this.frame = null;
    })

    it('should create a new frame on push', function () {
      expect(this.frame).toBeDefined();
    });

    it('should add the new frame to the container', function () {
      expect($('.knx-container > .frame').length).toBe(1);
    })

    it('should scroll until the new frame is visible', function () {
      var frames = [];
      var count = 100;
      for(var i=0; i < count; ++i) {
        frames.push(KaitenNX.push());
      }

      frames.forEach(function (f) {
        f.close();
      })
    })

    describe('Frame', function () {

      it('should have a title', function () {
        var title = $(this.frame.element).find('.title');
        expect(title.length).toBe(1);
      });

      it('should have a close link', function () {
        var close = $(this.frame.element).find('.close');
        expect(close.length).toBe(1);
      });

      it('should remove the frame after click on close', function () {
        var close =$(this.frame.element).find('.close')[0];
        close.click();
        var el = $('.knx-container > .frame');
        expect(el.length).toBe(0);
      });

      describe('Events', function () {
        it('should expose an "on" event subscription', function () {
          expect(this.frame.on).toBeDefined();
        });
      });

      describe('Close', function () {
        it('should have a close function', function () {
          expect(this.frame.close).toBeDefined();
        });
        it('should allow cancelling the close event', function () {
          this.frame.on('close', function () {
            return false
          })
          this.frame.close();
          var el = $('.knx-container > .frame');
          expect(el.length).toBe(1);
        });
      });
    });    
  });
});

